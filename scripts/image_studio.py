"""Product image treatments: catalog (keep bg) vs pro studio (no marble, white cyclorama)."""
from __future__ import annotations

import gc
import os
from io import BytesIO
from typing import Any

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps

try:
    from rembg import new_session, remove

    _HAS_REMBG = True
except ImportError:
    _HAS_REMBG = False

# Listing size
CANVAS = 2000
PADDING = 0.08
MAX_EDGE_CATALOG = 2000

# Pro / ad grade (4K square — sharp on mobile + meta ads; print upscales from masters)
# 3072 keeps ad-grade sharpness without 4×4K RGBA blow-ups that caused MemoryError on long batches
CANVAS_PRO = 2560
PADDING_PRO = 0.07
MAX_EDGE_PRO = 1536

BG_CATALOG = (248, 249, 251)
BG_STUDIO = (255, 255, 255)

_SESSIONS: dict[str, Any] = {}
MAX_EDGE_STUDIO = 1536


def clear_rembg_sessions() -> None:
    global _SESSIONS
    _SESSIONS.clear()
    gc.collect()


def rembg_session(model: str = "u2net") -> Any:
    if not _HAS_REMBG:
        raise RuntimeError("rembg is not installed")
    if model not in _SESSIONS:
        _SESSIONS[model] = new_session(model)
    return _SESSIONS[model]


def refine_alpha(fg: Image.Image, aggressive: bool = False) -> Image.Image:
    """Clean mask edges after background removal."""
    r, g, b, a = fg.split()
    if aggressive:
        a = a.point(lambda p: 255 if p > 220 else (0 if p < 25 else p))
    a = a.filter(ImageFilter.MinFilter(3))
    a = a.filter(ImageFilter.MaxFilter(3))
    a = a.filter(ImageFilter.GaussianBlur(1))
    return Image.merge("RGBA", (r, g, b, a))


def _fit_on_canvas(im: Image.Image, bg: tuple[int, int, int], canvas: int, padding: float) -> Image.Image:
    w, h = im.size
    inner = int(canvas * (1 - 2 * padding))
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    rgb = Image.new("RGB", (canvas, canvas), bg)
    px, py = (canvas - nw) // 2, (canvas - nh) // 2
    rgb.paste(im, (px, py))
    return rgb


def _enhance(rgb: Image.Image, level: str = "catalog") -> Image.Image:
    if level == "pro":
        rgb = ImageEnhance.Brightness(rgb).enhance(1.04)
        rgb = ImageEnhance.Contrast(rgb).enhance(1.12)
        rgb = ImageEnhance.Color(rgb).enhance(1.05)
        return ImageEnhance.Sharpness(rgb).enhance(1.35)
    rgb = ImageEnhance.Brightness(rgb).enhance(1.05)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
    rgb = ImageEnhance.Color(rgb).enhance(1.04)
    return ImageEnhance.Sharpness(rgb).enhance(1.18)


def _cyclorama_bg(size: int) -> Image.Image:
    """Soft studio sweep: pure white centre, barely grey at bottom edge."""
    top = (255, 255, 255)
    bottom = (246, 247, 249)
    bg = Image.new("RGB", (size, size), top)
    draw = ImageDraw.Draw(bg)
    for y in range(size):
        t = y / max(size - 1, 1)
        t = t * t * 0.35
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    return bg


def _cutout_fg(src_path: str, max_edge: int, model: str = "u2net") -> Image.Image:
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=94)
    raw = buf.getvalue()
    models = ["u2net"] if model == "u2net" else [model, "u2net"]
    last_err: Exception | None = None
    for m in models:
        try:
            cut = remove(raw, session=rembg_session(m))
            return refine_alpha(Image.open(BytesIO(cut)).convert("RGBA"), aggressive=True)
        except Exception as exc:
            last_err = exc
            gc.collect()
    raise RuntimeError(f"background removal failed for {src_path}") from last_err


def _composite_pro(fg: Image.Image, canvas: int, padding: float) -> Image.Image:
    bbox = fg.getbbox()
    if bbox:
        fg = fg.crop(bbox)

    w, h = fg.size
    inner = int(canvas * (1 - 2 * padding))
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    fg = fg.resize((nw, nh), Image.Resampling.LANCZOS)

    rgb = _cyclorama_bg(canvas)
    px = (canvas - nw) // 2
    py = int((canvas - nh) // 2 - canvas * 0.02)

    alpha = fg.split()[3]

    # Ground shadow
    shadow = alpha.filter(ImageFilter.GaussianBlur(int(canvas * 0.018)))
    shadow_layer = Image.new("RGBA", (nw, nh), (0, 0, 0, 0))
    dark = Image.new("RGBA", (nw, nh), (30, 35, 45, 95))
    shadow_layer.paste(dark, (0, 0), shadow)
    layer = rgb.convert("RGBA")
    off_y = py + int(nh * 0.92)
    layer.paste(shadow_layer, (px, off_y), shadow_layer)
    layer.paste(fg, (px, py), fg)

    reflect_h = max(12, int(nh * 0.18))
    crop = fg.crop((0, nh - reflect_h, nw, nh))
    crop = ImageOps.flip(crop)
    fade = Image.linear_gradient("L").resize((nw, reflect_h))
    fade = fade.point(lambda p: int(p * 0.18))
    ra, ga, ba, aa = crop.split()
    aa = ImageChops.multiply(aa, fade)
    crop = Image.merge("RGBA", (ra, ga, ba, aa))
    layer.paste(crop, (px, py + nh - 4), crop)
    out = _enhance(layer.convert("RGB"), level="pro")
    layer.close()
    fg.close()
    shadow_layer.close()
    return out


def process_catalog(src_path: str, out_path: str) -> None:
    """Keeps original background (marble visible) — not for ad-grade."""
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_EDGE_CATALOG, MAX_EDGE_CATALOG), Image.Resampling.LANCZOS)
    rgb = _fit_on_canvas(im, BG_CATALOG, CANVAS, PADDING)
    rgb = _enhance(rgb, level="catalog")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=93, optimize=True, progressive=True)


def process_studio_cutout(src_path: str, out_path: str, model: str = "u2net") -> None:
    fg = _cutout_fg(src_path, MAX_EDGE_STUDIO, model=model)
    w, h = fg.size
    inner = int(CANVAS * (1 - 2 * PADDING))
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    fg = fg.resize((nw, nh), Image.Resampling.LANCZOS)

    rgb = Image.new("RGB", (CANVAS, CANVAS), BG_STUDIO)
    px, py = (CANVAS - nw) // 2, (CANVAS - nh) // 2
    alpha = fg.split()[3]
    shadow = alpha.filter(ImageFilter.GaussianBlur(22))
    shadow_rgb = Image.new("RGB", (nw, nh), (235, 237, 240))
    rgb.paste(shadow_rgb, (px, py + 12), shadow)
    rgb.paste(fg, (px, py), fg)
    rgb = _enhance(rgb, level="catalog")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=93, optimize=True, progressive=True)


def process_pro_studio(src_path: str, out_path: str) -> None:
    """White studio cutout (u2net) — stable on limited RAM; no marble."""
    fg = _cutout_fg(src_path, MAX_EDGE_PRO, model="u2net")
    rgb = _composite_pro(fg, CANVAS_PRO, PADDING_PRO)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=95, optimize=True, progressive=True, subsampling=0)
    rgb.close()
    fg.close()
    gc.collect()


def resolve_photo_src() -> str:
    base = os.environ.get(
        "HASNAIN_PHOTO_SRC",
        r"C:\Users\qasim.faridi.LT-LE-126\Downloads\hasnain-product-photos-extract",
    )
    nested = os.path.join(base, "WhatsApp Unknown 2026-10-31 at 9.27.19 PM")
    if os.path.isdir(nested) and any(f.lower().endswith(".jpeg") for f in os.listdir(nested)):
        return nested
    legacy = r"C:\Users\qasim.faridi.LT-LE-126\Downloads\WhatsApp Unknown 2026-10-31 at 9.27.19 PM"
    if os.path.isdir(legacy):
        return legacy
    return base

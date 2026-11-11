"""Shared product image treatments for Hasnain catalog (catalog vs cutout studio)."""
from __future__ import annotations

import os
from io import BytesIO

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

try:
    from rembg import new_session, remove

    _HAS_REMBG = True
except ImportError:
    _HAS_REMBG = False

CANVAS = 2000
PADDING = 0.08
MAX_EDGE_STUDIO = 1536
MAX_EDGE_CATALOG = 2000
BG_CATALOG = (248, 249, 251)
BG_STUDIO = (255, 255, 255)

_SESSION = None


def rembg_session(model: str = "u2net"):
    global _SESSION
    if not _HAS_REMBG:
        raise RuntimeError("rembg is not installed")
    if _SESSION is None:
        _SESSION = new_session(model)
    return _SESSION


def refine_alpha(fg: Image.Image) -> Image.Image:
    """Reduce halos and speckle from background removal on metallic products."""
    r, g, b, a = fg.split()
    a = a.filter(ImageFilter.MinFilter(3))
    a = a.filter(ImageFilter.MaxFilter(3))
    a = a.filter(ImageFilter.GaussianBlur(1))
    return Image.merge("RGBA", (r, g, b, a))


def _fit_on_canvas(im: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    w, h = im.size
    inner = int(CANVAS * (1 - 2 * PADDING))
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    rgb = Image.new("RGB", (CANVAS, CANVAS), bg)
    px, py = (CANVAS - nw) // 2, (CANVAS - nh) // 2
    rgb.paste(im, (px, py))
    return rgb


def _enhance(rgb: Image.Image) -> Image.Image:
    rgb = ImageEnhance.Brightness(rgb).enhance(1.05)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
    rgb = ImageEnhance.Color(rgb).enhance(1.04)
    return ImageEnhance.Sharpness(rgb).enhance(1.18)


def process_catalog(src_path: str, out_path: str) -> None:
    """Professional listing look: colour fix + sharpness, no cutout (best for shop-floor WhatsApp shots)."""
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_EDGE_CATALOG, MAX_EDGE_CATALOG), Image.Resampling.LANCZOS)
    rgb = _fit_on_canvas(im, BG_CATALOG)
    rgb = _enhance(rgb)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=93, optimize=True, progressive=True)


def process_studio_cutout(src_path: str, out_path: str, model: str = "u2net") -> None:
    """White-background cutout — use only when subject is simple; metals may need manual touch-up."""
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_EDGE_STUDIO, MAX_EDGE_STUDIO), Image.Resampling.LANCZOS)

    buf = BytesIO()
    im.save(buf, format="JPEG", quality=92)
    cut = remove(buf.getvalue(), session=rembg_session(model))
    fg = refine_alpha(Image.open(BytesIO(cut)).convert("RGBA"))

    bbox = fg.getbbox()
    if bbox:
        fg = fg.crop(bbox)

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
    rgb = _enhance(rgb)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=93, optimize=True, progressive=True)


def resolve_photo_src() -> str:
    """Locate nested WhatsApp extract folder (JPEG batches live one level down)."""
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

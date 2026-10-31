"""Process every WhatsApp JPEG per SKU into numbered white-studio gallery files."""
from __future__ import annotations

import glob
import os
import re
from io import BytesIO

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from rembg import new_session, remove

SRC = r"C:\Users\qasim.faridi.LT-LE-126\Downloads\WhatsApp Unknown 2026-10-31 at 9.27.19 PM"
OUT = r"C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories\public\images\products"

# glob pattern (relative to SRC) -> output filename prefix
BATCHES: list[tuple[str, str]] = [
    ("Product001*.jpeg", "rego-racing-led"),
    ("Product 002*.jpeg", "mother-6-copper-led"),
    ("product 003*.jpeg", "b-pro-8-copper-led"),
    ("Product 004*.jpeg", "mother-5-copper-led"),
    ("product007*.jpeg", "black-box-rego-led"),
    ("product008*.jpeg", "y6-projector-led-h4"),
    ("product009*.jpeg", "mini-projector-lens-led"),
    ("product010*.jpeg", "golden-box-rego-led"),
    ("product011*.jpeg", "wooden-box-zinc-alloy-led"),
    ("product 012*.jpeg", "tasa-h4-premium-led"),
    ("product 014*.jpeg", "ultra-bright-4-lens-fog"),
]

CANVAS = 2000
PADDING = 0.1
MAX_EDGE = 1024
SESSION = new_session("u2net")

NUM_RE = re.compile(r"\((\d+)\)")


def sort_key(path: str) -> int:
    m = NUM_RE.search(os.path.basename(path))
    return int(m.group(1)) if m else 0


def process_one(src_path: str, out_path: str) -> None:
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)

    buf = BytesIO()
    im.save(buf, format="JPEG", quality=92)
    cut = remove(buf.getvalue(), session=SESSION)
    fg = Image.open(BytesIO(cut)).convert("RGBA")

    bbox = fg.getbbox()
    if bbox:
        fg = fg.crop(bbox)

    w, h = fg.size
    inner = int(CANVAS * (1 - 2 * PADDING))
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    fg = fg.resize((nw, nh), Image.Resampling.LANCZOS)

    rgb = Image.new("RGB", (CANVAS, CANVAS), (255, 255, 255))
    px, py = (CANVAS - nw) // 2, (CANVAS - nh) // 2

    shadow = Image.new("L", (nw, nh), 0)
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    shadow_rgb = Image.new("RGB", (nw, nh), (230, 232, 235))
    rgb.paste(shadow_rgb, (px, py + 14), shadow)

    rgb.paste(fg, (px, py), fg)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.05)
    rgb = ImageEnhance.Color(rgb).enhance(1.06)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.25)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb.save(out_path, "JPEG", quality=94, optimize=True, progressive=True)


def main() -> None:
    manifest: dict[str, list[str]] = {}
    for pattern, prefix in BATCHES:
        paths = sorted(glob.glob(os.path.join(SRC, pattern)), key=sort_key)
        urls: list[str] = []
        for i, src_path in enumerate(paths, start=1):
            out_name = f"{prefix}-{i:02d}.jpg"
            out_path = os.path.join(OUT, out_name)
            process_one(src_path, out_path)
            urls.append(f"/images/products/{out_name}")
            print(f"OK {out_name} <- {os.path.basename(src_path)}")
        manifest[prefix] = urls

    manifest_path = os.path.join(
        os.path.dirname(__file__), "..", "src", "data", "gallery-manifest.json"
    )
    import json

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Wrote {manifest_path}")


if __name__ == "__main__":
    main()

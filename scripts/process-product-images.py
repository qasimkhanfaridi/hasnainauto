"""White-studio product images: resize + u2net rembg + enhance."""
from __future__ import annotations

import os
from io import BytesIO

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

from rembg import new_session, remove

SRC = r"C:\Users\qasim.faridi.LT-LE-126\Downloads\WhatsApp Unknown 2026-10-31 at 9.27.19 PM"
OUT = r"C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories\public\images\products"

JOBS: list[tuple[str, str]] = [
    ("Product001 (1).jpeg", "rego-racing-led-hero.jpg"),
    ("Product001 (4).jpeg", "rego-racing-led-gallery-02.jpg"),
    ("Product 002 (1).jpeg", "mother-6-copper-led-hero.jpg"),
    ("product 003 (1).jpeg", "b-pro-8-copper-led-hero.jpg"),
    ("Product 004 (1).jpeg", "mother-5-copper-led-hero.jpg"),
    ("product007 (1).jpeg", "black-box-rego-led-hero.jpg"),
    ("product008 (1).jpeg", "y6-projector-led-h4-hero.jpg"),
    ("product009 (1).jpeg", "mini-projector-lens-led-hero.jpg"),
    ("product010 (1).jpeg", "golden-box-rego-led-hero.jpg"),
    ("product011 (1).jpeg", "wooden-box-zinc-alloy-led-hero.jpg"),
    ("product 012 (1).jpeg", "tasa-h4-premium-led-hero.jpg"),
    ("product 014 (1).jpeg", "ultra-bright-4-lens-fog-hero.jpg"),
]

CANVAS = 2000
PADDING = 0.1
MAX_EDGE = 1024

SESSION = new_session("u2net")


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
    print(f"OK {os.path.basename(out_path)}")


def main() -> None:
    for src_name, out_name in JOBS:
        src_path = os.path.join(SRC, src_name)
        if not os.path.isfile(src_path):
            print(f"SKIP {src_name}")
            continue
        process_one(src_path, os.path.join(OUT, out_name))


if __name__ == "__main__":
    main()

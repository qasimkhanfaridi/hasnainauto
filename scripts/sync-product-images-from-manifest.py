"""Update products.ts image arrays from src/data/gallery-manifest.json."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

DEFAULT_MAX_IMAGES = 7

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src" / "data" / "gallery-manifest.json"
PRODUCTS = ROOT / "src" / "data" / "products.ts"

PREFIX_TO_SLUG = {
    "rego-racing-led": "rego-racing-led-headlights",
    "mother-6-copper-led": "mother-6-copper-led-headlights",
    "b-pro-8-copper-led": "b-pro-8-copper-led-headlights",
    "mother-5-copper-led": "mother-5-copper-led-headlights",
    "black-box-rego-led": "black-box-rego-led-headlights",
    "y6-projector-led-h4": "y6-projector-led-h4",
    "mini-projector-lens-led": "mini-projector-lens-led-headlights",
    "golden-box-rego-led": "golden-box-rego-led-headlights",
    "wooden-box-zinc-alloy-led": "wooden-box-zinc-alloy-led-headlights",
    "tasa-h4-premium-led": "tasa-h4-premium-led-headlights",
    "ultra-bright-4-lens-fog": "ultra-bright-4-lens-fog-aux-light",
}


def format_images(urls: list[str]) -> str:
    lines = ",\n".join(f'      "{u}"' for u in urls)
    return f"    images: [\n{lines},\n    ]"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--max",
        type=int,
        default=DEFAULT_MAX_IMAGES,
        help=f"Max gallery images per product on site (default {DEFAULT_MAX_IMAGES})",
    )
    args = parser.parse_args()
    max_img = max(1, args.max)

    manifest: dict[str, list[str]] = json.loads(MANIFEST.read_text(encoding="utf-8"))
    text = PRODUCTS.read_text(encoding="utf-8")

    for prefix, slug in PREFIX_TO_SLUG.items():
        urls = manifest.get(prefix)
        if not urls:
            print(f"skip {slug}: no manifest entry")
            continue
        urls = urls[:max_img]

        pattern = (
            rf'(slug: "{re.escape(slug)}",[\s\S]*?)'
            r"images: \[[\s\S]*?\],"
        )
        replacement_img = format_images(urls)
        new_block = rf"\1{replacement_img},"
        updated, n = re.subn(pattern, new_block, text, count=1)
        if n != 1:
            raise SystemExit(f"Could not patch images for slug={slug} (matches={n})")
        text = updated
        print(f"OK {slug}: {len(urls)} images")

    PRODUCTS.write_text(text, encoding="utf-8")
    print(f"Wrote {PRODUCTS}")


if __name__ == "__main__":
    main()

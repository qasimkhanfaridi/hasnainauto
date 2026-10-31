"""Apply gallery-manifest.json image paths to products.ts by slug prefix map."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src" / "data" / "gallery-manifest.json"
PRODUCTS = ROOT / "src" / "data" / "products.ts"

SLUG_BY_PREFIX = {
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
    lines = ",\n      ".join(f'"{u}"' for u in urls)
    return f"images: [\n      {lines},\n    ]"


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    text = PRODUCTS.read_text(encoding="utf-8")

    for prefix, urls in manifest.items():
        slug = SLUG_BY_PREFIX.get(prefix)
        if not slug or not urls:
            continue
        block_re = re.compile(
            rf'(slug: "{re.escape(slug)}",[\s\S]*?)images: \[[\s\S]*?\],',
            re.MULTILINE,
        )
        new_images = format_images(urls)
        text, n = block_re.subn(rf"\1{new_images},", text, count=1)
        if n != 1:
            raise SystemExit(f"Failed to patch slug {slug} (matches={n})")
        print(f"Patched {slug} ({len(urls)} images)")

    PRODUCTS.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()

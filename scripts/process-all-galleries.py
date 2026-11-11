"""Process WhatsApp JPEG batches into 2000×2000 catalog or studio gallery files."""
from __future__ import annotations

import argparse
import gc
import glob
import json
import os
import re
import sys

from image_studio import (
    process_catalog,
    process_pro_studio,
    process_studio_cutout,
    resolve_photo_src,
)

OUT = os.path.join(
    os.path.dirname(__file__),
    "..",
    "public",
    "images",
    "products",
)

# glob pattern (relative to SRC) -> output filename prefix
BATCHES: list[tuple[str, str]] = [
    ("Product001*.jpeg", "rego-racing-led"),
    ("Product 002*.jpeg", "mother-6-copper-led"),
    ("product 003*.jpeg", "b-pro-8-copper-led"),
    ("Product 004*.jpeg", "mother-5-copper-led"),
    ("Product 005*.jpeg", "product-005-led"),
    ("product007*.jpeg", "black-box-rego-led"),
    ("product008*.jpeg", "y6-projector-led-h4"),
    ("product009*.jpeg", "mini-projector-lens-led"),
    ("product010*.jpeg", "golden-box-rego-led"),
    ("product011*.jpeg", "wooden-box-zinc-alloy-led"),
    ("product 012*.jpeg", "tasa-h4-premium-led"),
    ("product 014*.jpeg", "ultra-bright-4-lens-fog"),
]

NUM_RE = re.compile(r"\((\d+)\)")


def sort_key(path: str) -> int:
    m = NUM_RE.search(os.path.basename(path))
    return int(m.group(1)) if m else 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Build product JPG galleries from WhatsApp photos.")
    parser.add_argument(
        "--mode",
        choices=("pro", "catalog", "studio"),
        default="pro",
        help="pro = 4K white studio, no marble (recommended); catalog = keeps floor; studio = basic cutout",
    )
    parser.add_argument(
        "--only",
        metavar="PREFIX",
        help="Process one batch prefix only, e.g. rego-racing-led",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Max images per batch (0 = all)",
    )
    args = parser.parse_args()

    src = resolve_photo_src()
    if not os.path.isdir(src):
        print(f"Photo source not found: {src}", file=sys.stderr)
        sys.exit(1)

    print(f"Source: {src}")
    print(f"Mode: {args.mode}")

    if args.mode == "pro":
        process = process_pro_studio
    elif args.mode == "catalog":
        process = process_catalog
    else:
        process = process_studio_cutout

    manifest: dict[str, list[str]] = {}
    for pattern, prefix in BATCHES:
        if args.only and prefix != args.only:
            continue
        paths = sorted(glob.glob(os.path.join(src, pattern)), key=sort_key)
        if args.limit:
            paths = paths[: args.limit]
        if not paths:
            print(f"SKIP {prefix}: no files for {pattern}")
            continue

        urls: list[str] = []
        for i, src_path in enumerate(paths, start=1):
            out_name = f"{prefix}-{i:02d}.jpg"
            out_path = os.path.join(OUT, out_name)
            process(src_path, out_path)
            urls.append(f"/images/products/{out_name}")
            print(f"OK {out_name} <- {os.path.basename(src_path)}", flush=True)
            gc.collect()
        manifest[prefix] = urls

    manifest_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "gallery-manifest.json")
    if args.only:
        merged: dict[str, list[str]] = {}
        if os.path.isfile(manifest_path):
            with open(manifest_path, encoding="utf-8") as f:
                merged = json.load(f)
        merged.update(manifest)
        payload = merged
    else:
        payload = manifest
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print(f"Wrote {manifest_path}")
    print("Next: python scripts/sync-product-images-from-manifest.py")


if __name__ == "__main__":
    main()

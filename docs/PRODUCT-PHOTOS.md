# Product photos

## Why marble was showing

`catalog` mode **keeps the shop floor** (marble). That is intentional for “real shop” listings — not for ad-grade white studio.

## What to use now (`pro` mode)

| Mode | Marble? | Output |
|------|---------|--------|
| **`pro`** | Removed | 4096×4096, white cyclorama, soft shadow |
| `catalog` | Visible | 2000, light grey frame |
| `studio` | Removed | 2000, basic cutout |

```powershell
cd ...\hasnain-auto-accessories\scripts
python process-all-galleries.py --mode pro
python sync-product-images-from-manifest.py
```

## “8K” / heavy ads

- Script output = **4096px** (sharp for web + Facebook/Instagram). True **7680×8K** for every SKU = real photoshoot or Photoshop per image.
- **Gemini / AI image generators** can make fancy ads but may **change the product shape** — use only for **banners**, not the main product gallery, unless a human checks each image.

## Full Photoshop tier

1. Shoot or pick best WhatsApp frame per SKU.
2. Designer: pen tool cutout + dodge/burn on copper + export 4K/8K masters.
3. Site uses `pro` script for all gallery slots until masters are ready.

# Product photos — what is edited vs raw

## Current status

| Layer | What it is |
|-------|------------|
| **WhatsApp originals** | Shop-floor shots (marble counter, box + bulbs). Best for trust; need light retouch for web. |
| **Old site JPGs** | AI **background removal** (rembg) on a **wrong folder** in some runs → white **smudges** on metal (not Photoshop quality). |
| **Recommended for production** | **`catalog` mode** — brightness, contrast, sharpness, 2000×2000 on light grey (**no cutout**). |

I cannot replace a human retoucher in Photoshop/Figma for hero banners, but the scripts give **consistent listing-grade** images for all SKUs.

## Rebuild all galleries (recommended)

From the repo root, with Python 3 and `pip install pillow rembg`:

```powershell
cd C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories\scripts
python process-all-galleries.py --mode catalog
python sync-product-images-from-manifest.py
cd ..
npm run build
```

- Source auto-detects:  
  `Downloads\hasnain-product-photos-extract\WhatsApp Unknown 2026-10-31 at 9.27.19 PM\`
- Override: set env `HASNAIN_PHOTO_SRC` to your extract folder.

### Modes

- **`--mode catalog`** (default) — professional Daraz/Amazon-style **enhanced photo**, keeps box and real lighting.
- **`--mode studio`** — white cutout via AI; can look bad on **chrome/copper**; use only for simple shapes.

### One product test

```powershell
python process-all-galleries.py --mode catalog --only rego-racing-led --limit 3
```

## If you want “full pro”

1. **Hero image (1 per SKU)** — designer: clip path + true white + soft shadow in Photoshop.
2. **Gallery** — keep `catalog` script output or retouch heroes only.
3. **Product 005** — photos exist; add specs in `products.ts` when confirmed, then add to sync map.

## Honest limits

- AI cutout ≠ studio photography.
- Box text (e.g. “5000W” on Rego box) may differ from your WhatsApp spec sheet — site copy uses your sheet; photos show retail packaging.

# Hasnain Auto — LED Catalog AI Master Brief

**Single file for all AI work:** product photos, white-background edits, and website copy/code.

---

## 0. Website project (where everything lands)

| Item | Path / value |
|------|----------------|
| **Repo root** | `C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories` |
| **Stack** | Next.js 14, React 18, Tailwind — `npm run dev` |
| **Business** | Hasnain Auto Decoration & Accessories — Saddar, Rawalpindi (`src/config/business.ts`) |
| **Live URL (meta)** | https://hasnainauto.com |
| **Product data** | `src/data/products.ts` — array `PRODUCTS_DATA` |
| **Product pages** | `/product/[slug]` e.g. `/product/rego-racing-led-headlights` |
| **Shop** | `/shop` — category filter `led-lights` |
| **Images on site** | `public/images/products/` → served as `/images/products/...` |

### LED SKUs wired in `products.ts` (IDs 11–18)

| Supplier SKU | Website `slug` | Hero image |
|--------------|----------------|------------|
| 001 Rego Racing | `rego-racing-led-headlights` | `rego-racing-led-hero.jpg` |
| 002 Mother 6 | `mother-6-copper-led-headlights` | `mother-6-copper-led-hero.jpg` |
| 003 B Pro | `b-pro-8-copper-led-headlights` | `b-pro-8-copper-led-hero.jpg` |
| 004 Mother 5 | `mother-5-copper-led-headlights` | `mother-5-copper-led-hero.jpg` |
| 007 Black Box Rego | `black-box-rego-led-headlights` | `black-box-rego-led-hero.jpg` |
| 008 Y6 Projector | `y6-projector-led-h4` | `y6-projector-led-h4-hero.jpg` |
| 009 Mini Projector Lens | `mini-projector-lens-led-headlights` | `mini-projector-lens-led-hero.jpg` |
| 010 Golden Box Rego | `golden-box-rego-led-headlights` | `golden-box-rego-led-hero.jpg` |

All paths under `/images/products/` in `public/images/products/`.

**After AI photo edit:** overwrite the same filenames (or add `-02-gallery.webp` and append paths to the `images: []` array in `products.ts`).

**Prices in code are placeholders (PKR)** — client should set real shop prices in `products.ts` (`basePrice`, `price`, `salePrice`, `originalPrice`).

### `Product` shape (for AI editing `products.ts`)

Required fields: `id`, `name`, `slug`, `shortDescription`, `description`, `category` (`led-lights`), `subcategory` (`Headlight LEDs`), `basePrice`, `price`, `inStock`, `rating`, `reviewCount`, `images`, `features[]`, `specifications{}`, `vehicleCompatibility`, `relatedSlugs[]`.

Optional: `variants` with `Socket Type` → H4 / H11 / 9005, `badge`, `featured`, `bestSeller`, `warranty`, `brand`, `salePrice`, `originalPrice`.

---

## 1. Project goal

1. **Images:** Pure white (#FFFFFF) studio background, denoise, color fix, 2000×2000 hero, WebP or JPG.
2. **Copy:** Align with Section 3 specs; enrich `description` / `features` / `specifications` in `products.ts` if needed.
3. **Files:** Save edited assets into `public/images/products/` using names in Section 0.

**Critical:** Preserve exact real products (logos, colors, wire layout). No generic 3D renders.

**Specs:** Section 3 is source of truth. Ignore promotional wattage on retail boxes (5000W, 8500W, etc.) on the website.

---

## 2. Raw source photos (WhatsApp)

```
C:\Users\qasim.faridi.LT-LE-126\Downloads\WhatsApp Unknown 2026-10-31 at 9.27.19 PM
```

Optional: `...\WhatsApp Unknown 2026-10-31 at 9.27.13 PM`

Video: `WhatsApp Video 2026-10-31 at 9.26.33 PM.mp4` (social only)

---

## 3. Supplier specs (website source of truth)

### Product 001 — Rego Racing

| Field | Value |
|--------|--------|
| Cooling | 4 copper pipe tube |
| Bases | H4, H11, 9005 |
| Canbus | Compatible |
| Fan | Aluminium fan |
| Power | 260W |
| Lumens | 30,000 LM |
| Other | German technology |
| Warranty | 1 year replacement |

### Product 002 — Mother 6

| Field | Value |
|--------|--------|
| Cooling | 6 copper pipe tube |
| Bases | H4, H11, 9005 |
| Canbus | Compatible |
| Power | 280W |
| Lumens | 35,000 LM |
| Fan | 12,000 RPM turbo fan |
| Warranty | 1 year replacement |

### Product 003 — B Pro

| Field | Value |
|--------|--------|
| Cooling | 8 copper pipe tube |
| Bases | H4, H11, 9005 |
| Canbus | Compatible |
| Power | 240W |
| Lumens | 30,000 LM |
| Warranty | 1 year replacement |

### Product 004 — Mother 5

| Field | Value |
|--------|--------|
| Cooling | 5 copper pipe tube |
| Bases | H4, H11, 9005 |
| Canbus | Compatible |
| Power | 260W |
| Lumens | 35,000 LM |
| Color temp | 6000K |
| Fan | 12,000 RPM turbo fan |
| Warranty | 1 year replacement |

### Product 007 — Black Box Rego

| Field | Value |
|--------|--------|
| Cooling | 2 copper tubes |
| Bases | H4, H11, 9005 |
| Power | 180W |
| Lumens | 25,000 LM |
| Color temp | 6500K |
| Warranty | 1 year replacement |

### Product 008 — Y6 Projector LED Tubes

| Field | Value |
|--------|--------|
| Bases | H4 only |
| Power | 65W |
| Color temp | 5500K |
| Cooling | Aluminium fan |

### Product 009 — Mini Projector Lens

| Field | Value |
|--------|--------|
| Bases | H4, H11, 9005 |
| Power | 75W |
| Lumens | 12,000 LM |
| Cooling | Aluminium fan |

### Product 010 — Golden Box Rego

| Field | Value |
|--------|--------|
| Cooling | 4 copper tubes |
| Bases | H4, H11, 9005 |
| Canbus | Compatible |
| Power | 230W |
| Lumens | 35,000 LM |
| Color temp | 6500K |
| Warranty | 1 year replacement |

**TBD (photos only):** Product 005, 011, 012, 014 — add to `products.ts` when specs confirmed.

---

## 4. Visual identity (keep in edits)

- **001:** Orange/black REGO RACING box, rose-gold bulbs, black-red braided wire.
- **002:** Teal/black Mother box, gold M logo, “6 COPPER”.
- **003:** Eight copper pipes (see `product 003 *.jpeg`).
- **004:** 6000K + turbo fan callouts on packaging.
- **007:** Compact black box Rego, 2 copper tubes.
- **008:** Y6 projector tube style, H4 packaging.
- **009:** Mini projector lens housing.
- **010:** Golden box Rego, 4 copper tubes.

Banner accents (not on cutouts): orange `#FF6600`, black `#111111`, Mother teal.

---

## 5. Website copy drafts

Use for meta/SEO or to refresh `products.ts` text. Slugs are fixed in Section 0.

**Shared disclaimers:** Canbus not universal — verify fitment. Install with battery disconnected. 1-year replacement warranty (manufacturing defects).

*(Full copy in `src/data/products.ts` IDs 11–18.)*

---

## 6. Raw image inventory

| Prefix | Count | Maps to |
|--------|------:|---------|
| Product001 | 7 | 001 |
| Product 002 | 6 | 002 |
| product 003 | 7 | 003 |
| Product 004 | 6 | 004 |
| product007 | 7 | 007 |
| product008 | 7 | 008 |
| product009 | 5 | 009 |
| product010 | 7 | 010 |
| Product 005 / 011–014 / WhatsApp Image… | many | TBD |

**Process first (raw → edited → save to `public/images/products/`):**

| SKU | Raw file | Output filename |
|-----|----------|-----------------|
| 001 | `Product001 (1).jpeg` | `rego-racing-led-hero.jpg` |
| 002 | `Product 002 (1).jpeg` | `mother-6-copper-led-hero.jpg` |
| 003 | `product 003 (1).jpeg` | `b-pro-8-copper-led-hero.jpg` |
| 004 | `Product 004 (1).jpeg` | `mother-5-copper-led-hero.jpg` |
| 007 | `product007 (1).jpeg` | `black-box-rego-led-hero.jpg` |
| 008 | `product008 (1).jpeg` | `y6-projector-led-h4-hero.jpg` |
| 009 | `product009 (1).jpeg` | `mini-projector-lens-led-hero.jpg` |
| 010 | `product010 (1).jpeg` | `golden-box-rego-led-hero.jpg` |

**Gallery extras:** `{slug-base}-02-detail.jpg`, `-03-box.jpg`, etc. — add each path to `images: [...]` in `products.ts`.

---

## 7. MASTER IMAGE PROMPT

```
ROLE: Professional e-commerce photo retoucher for automotive LED headlight products.

INPUT: Real seller photo from Hasnain Auto WhatsApp batch. Preserve EXACT product: finishes, logos (REGO RACING, MOTHER, M logo), wires, drivers, foam, box art. NO generic 3D replacement. NO new text overlays.

PRODUCT SKU: [001 | 002 | 003 | 004 | 007 | 008 | 009 | 010]
SOURCE FILENAME: [e.g. Product001 (1).jpeg]
OUTPUT FILENAME: [e.g. rego-racing-led-hero.jpg]
SHOT TYPE: [hero | detail pipes | detail fan | driver | box | gallery]

TASKS:
1. Background → pure white #FFFFFF; subtle contact shadow only.
2. Denoise, fix white balance, sharpen copper/fan/logo; no blown highlights on metal.
3. Center product, 10–15% padding; hero = full kit where possible.
4. Soft studio lighting; photorealistic listing quality.
5. Export 2000×2000 px minimum; JPG quality 90+ or WebP 85.

CONSTRAINTS: Same bulb/driver count as source. No invented wattage text on image.
```

---

## 8. Per-SKU prompt add-ons

- **001:** Rose-gold REGO, orange REGO RACING box optional behind product.
- **002:** Gold bulbs in foam, teal Mother box at angle.
- **003:** Show 8 copper pipes clearly in detail shots.
- **004:** Turbo fan + 6000K packaging visible where possible.
- **007:** Compact black box aesthetic.

---

## 9. Optional extras

- 16:9 category banner for `/shop` LED section (Hasnain Auto branding, no false specs).
- Comparison table: copper count, W, LM, fan, K, Canbus, warranty.

---

## 10. Checklist (AI + human)

- [ ] White-background heroes → `public/images/products/*-hero.jpg`
- [ ] Gallery shots → same folder; update `images` arrays in `products.ts`
- [ ] Confirm PKR prices in `products.ts`
- [ ] Run `npm run build` in website repo
- [ ] Identify SKUs for Product 005 / 011–014; add new entries to `products.ts`
- [ ] Compress images (Squoosh / TinyPNG) before deploy

---

## 11. One-shot prompt (paste to any AI)

```
I uploaded AI-MASTER-BRIEF.md from the hasnain-auto-accessories repo plus raw JPEGs from the WhatsApp folder.

Website: Next.js at hasnain-auto-accessories — edit public/images/products/ and src/data/products.ts (slugs in Section 0).

Do: (1) white-background edits per Section 7–8, save with output names in Section 6, (2) add gallery images to products.ts, (3) use Section 3 specs only. Preserve real products exactly.
```

---

## 12. One-shot prompt (Cursor / Antigravity on this repo)

```
Open hasnain-auto-accessories. Follow AI-MASTER-BRIEF.md: replace hero JPGs in public/images/products/ with white-background versions from Downloads WhatsApp folder, extend products.ts images[] for each LED SKU, fix prices if I specify PKR, npm run build.
```

---

*End of master brief — canonical copy lives in repo root next to package.json.*

---

## 13. Website E2E status (Novsight-inspired)

| Area | Status | Location |
|------|--------|----------|
| 8 LED SKUs live | Done | `src/data/products.ts` IDs 11–18 |
| Shop by Series (dark grid) | Done | `LedSeriesShowcase.tsx` + `ledSeries.ts` |
| Full LED grid on homepage | Done | `LedHeadlightsShowcase.tsx` |
| Socket finder → shop filter | Done | `SocketFinderBar` + `?socket=H4` on `/shop` |
| Novsight product cards (white img, spec chips) | Done | `ProductCard` + `productSpecs.ts` |
| Hero = real Rego/Mother/Golden SKUs | Done | `HeroSection.tsx` |
| FAQ block | Done | `LedFaqSection.tsx` |
| Hero JPGs on white canvas | Done | `public/images/products/*-hero.jpg` (batch script in repo history) |
| AI white-bg re-edit | Optional | Section 7 prompts |

**Run locally:** `npm run dev` → `/` homepage, `/shop?category=led-lights`, `/product/rego-racing-led-headlights`

**Deploy:** `npm run build` then host `.next` or Vercel with `hasnainauto.com`.

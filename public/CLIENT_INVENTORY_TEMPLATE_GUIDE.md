# Hasnain Auto — Client Inventory Excel Guide

Share this document + the Excel file with the client.

## Goal

Client fills **one Excel workbook**. When imported in Admin, it **replaces the entire inventory** (not merge).  
Typical workflow with ~20 products:

1. Export current inventory (or download blank template)
2. Client edits names, spellings, prices, images, brands, models, years
3. Re-import → system overwrites everything

---

## Download file

From Admin Portal → **Bulk Import**:

- **Download Excel Template** — starter file with sample rows + Instructions sheet  
- **Export Current Inventory** — best for edits (client changes existing 20 records and sends back)

File name example: `HasnainAuto_Inventory_TEMPLATE.xlsx`

---

## Excel sheets (do not rename)

| Sheet | Purpose |
|-------|---------|
| Instructions | Rules (read only) |
| Products | All SKUs / products |
| Categories | Website category cards |
| CarMakes | Brands (Toyota, Honda, …) |
| CarModels | Make + Model + price multiplier |
| Years | Year list for seat-cover config |
| SeatCoverQualities | LR9, ST8, ST27, NS3, … |
| CoverColors | Black, Grey, … + surcharge |

---

## Products sheet columns

| Column | Required | Example | Notes |
|--------|----------|---------|-------|
| id | Yes | 1 | Unique ID |
| slug | Yes | premium-leather-seat-covers | Lowercase, dashes, unique |
| name | Yes | Premium Leather Seat Covers | Product title |
| category | Yes | seat-covers | Must match Categories.slug |
| basePrice | Yes | 15000 | PKR number only |
| shortDescription | Yes | Custom-fit leather… | Short line |
| description | Yes | Long text… | Full description |
| badge | No | Hot | `Hot` / `Best Seller` / `Limited Stock` / blank |
| isSeatCover | Yes | TRUE | TRUE/FALSE — enables car config |
| isFeatured | Yes | TRUE | Show on homepage (keep exactly 8 TRUE if needed) |
| inStock | Yes | TRUE | TRUE/FALSE |
| image1 | Yes | https://...jpg | Main image URL |
| image2 | No | https://...jpg | Gallery image |
| image3 | No | https://...jpg | Gallery image |
| relatedSlugs | No | 7d-floor-mats-premium, ambient-led-lights | Comma-separated slugs |

### Images

- Put **full public URLs** in image1 / image2 / image3  
- Sources: ImgBB, Cloudinary, Google Drive direct link, CDN  
- Example: `https://images.unsplash.com/photo-xxxx?w=800&q=80`  
- At least **image1** is required for every product

---

## Categories sheet

| Column | Example |
|--------|---------|
| slug | seat-covers |
| name | Seat Covers |
| description | Custom-fit premium leather… |
| image | https://...jpg |
| isHero | TRUE |

---

## CarMakes sheet

| make |
|------|
| Toyota |
| Honda |
| Suzuki |

---

## CarModels sheet

| make | model | priceMultiplier |
|------|-------|-----------------|
| Toyota | Corolla | 1 |
| Toyota | Fortuner | 1.25 |
| Suzuki | Alto | 0.85 |

`priceMultiplier` adjusts seat-cover price for that model (1 = base).

---

## Years sheet

| year |
|------|
| 2024 |
| 2023 |
| 2022 |

---

## SeatCoverQualities sheet

| id | label | description | basePrice |
|----|-------|-------------|-----------|
| LR9 | LR9 | Economy Leather Rite | 12000 |
| ST8 | ST8 | Standard Leather Rite | 15000 |
| ST27 | ST27 | Premium Leather Rite | 18500 |

---

## CoverColors sheet

| color | surcharge |
|-------|-----------|
| Black | 0 |
| Mustard | 500 |

---

## Overwrite behaviour (important)

- Import = **full replace** of inventory  
- If Excel has 20 products, website will have **only those 20** after import  
- Products removed from Excel are removed from the store  
- Spelling / price / name edits in Excel become the new live data after import  

---

## Client checklist before sending Excel

- [ ] All product slugs unique  
- [ ] Every product has image1 URL that opens in browser  
- [ ] category values match Categories sheet  
- [ ] Prices are numbers (no Rs. or commas)  
- [ ] TRUE/FALSE used for boolean columns  
- [ ] CarModels.make values exist in CarMakes  

---

## After client sends file

Admin → Bulk Import → choose file → confirm overwrite → Import  
Then verify: Products page, Catalog page, storefront categories & product pages.

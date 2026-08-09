import * as XLSX from "xlsx";
import type { InventoryCatalog } from "@/types/admin";
import type { Product, ProductBadge, ProductCategory, CoverColor, SeatCoverQuality } from "@/types";

function sheetToRows(workbook: XLSX.WorkBook, name: string): Record<string, unknown>[] {
  const sheet = workbook.Sheets[name];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
}

function bool(v: unknown, fallback = false): boolean {
  if (typeof v === "boolean") return v;
  const s = String(v).trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(s)) return true;
  if (["0", "false", "no", "n", ""].includes(s)) return false;
  return fallback;
}

function num(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function str(v: unknown): string {
  return String(v ?? "").trim();
}

export function parseInventoryWorkbook(buffer: ArrayBuffer | Buffer): InventoryCatalog {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const productRows = sheetToRows(workbook, "Products");
  const categoryRows = sheetToRows(workbook, "Categories");
  const makeRows = sheetToRows(workbook, "CarMakes");
  const modelRows = sheetToRows(workbook, "CarModels");
  const yearRows = sheetToRows(workbook, "Years");
  const qualityRows = sheetToRows(workbook, "SeatCoverQualities");
  const colorRows = sheetToRows(workbook, "CoverColors");

  if (productRows.length === 0) {
    throw new Error("Products sheet is empty or missing. Import aborted — inventory was not changed.");
  }

  const products: Product[] = productRows.map((row, index) => {
    const slug = str(row.slug || row.Slug);
    if (!slug) throw new Error(`Products row ${index + 2}: slug is required`);
    const name = str(row.name || row.Name);
    if (!name) throw new Error(`Products row ${index + 2}: name is required`);

    const images = [row.image1, row.image2, row.image3, row.Image1, row.Image2, row.Image3]
      .map(str)
      .filter(Boolean);

    if (images.length === 0) {
      throw new Error(`Products row ${index + 2} (${slug}): at least image1 is required`);
    }

    const badgeRaw = str(row.badge || row.Badge);
    const badge = (badgeRaw || undefined) as ProductBadge | undefined;

    return {
      id: str(row.id || row.ID) || String(index + 1),
      slug,
      name,
      shortDescription: str(row.shortDescription || row.ShortDescription),
      description: str(row.description || row.Description),
      category: str(row.category || row.Category) as ProductCategory,
      basePrice: num(row.basePrice ?? row.BasePrice),
      images,
      badge: badge || undefined,
      isSeatCover: bool(row.isSeatCover ?? row.IsSeatCover),
      isFeatured: bool(row.isFeatured ?? row.IsFeatured),
      inStock: bool(row.inStock ?? row.InStock, true),
      relatedSlugs: str(row.relatedSlugs || row.RelatedSlugs)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
  });

  const categories = (categoryRows.length
    ? categoryRows
    : []
  ).map((row) => ({
    slug: str(row.slug || row.Slug) as ProductCategory,
    name: str(row.name || row.Name),
    description: str(row.description || row.Description),
    image: str(row.image || row.Image),
    isHero: bool(row.isHero ?? row.IsHero),
  }));

  const carMakes = makeRows.map((r) => str(r.make || r.Make)).filter(Boolean);
  const carModels = modelRows.map((r) => ({
    make: str(r.make || r.Make),
    model: str(r.model || r.Model),
    priceMultiplier: num(r.priceMultiplier ?? r.PriceMultiplier, 1),
  })).filter((r) => r.make && r.model);

  const years = yearRows.map((r) => str(r.year || r.Year)).filter(Boolean);

  const seatCoverQualities = qualityRows.map((r) => ({
    id: str(r.id || r.ID) as SeatCoverQuality,
    label: str(r.label || r.Label),
    description: str(r.description || r.Description),
    basePrice: num(r.basePrice ?? r.BasePrice),
  })).filter((r) => r.id);

  const coverColors = colorRows.map((r) => ({
    color: str(r.color || r.Color) as CoverColor,
    surcharge: num(r.surcharge ?? r.Surcharge),
  })).filter((r) => r.color);

  return {
    version: 0,
    updatedAt: new Date().toISOString(),
    products,
    categories,
    carMakes,
    carModels,
    years,
    seatCoverQualities,
    coverColors,
  };
}

export function buildInventoryWorkbook(catalog: InventoryCatalog): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();

  const instructions = [
    ["HASNAIN AUTO — INVENTORY TEMPLATE (FULL OVERWRITE)"],
    [""],
    ["IMPORTANT RULES"],
    ["1. Every import REPLACES the entire inventory. It does not merge with old data."],
    ["2. Keep sheet names exactly: Products, Categories, CarMakes, CarModels, Years, SeatCoverQualities, CoverColors, Instructions"],
    ["3. Do not rename column headers."],
    ["4. Products.slug must be unique (lowercase-with-dashes)."],
    ["5. image1 / image2 / image3 = full image URLs (https://...). At least image1 is required."],
    ["6. Boolean columns: TRUE/FALSE or 1/0 (isSeatCover, isFeatured, inStock, isHero)."],
    ["7. relatedSlugs = comma-separated product slugs."],
    ["8. badge = Hot | Best Seller | Limited Stock | (blank)."],
    ["9. category must match a Categories.slug value."],
    ["10. After editing names/prices/spelling, re-import the whole file to overwrite."],
    [""],
    ["IMAGE GUIDANCE"],
    ["Upload images to Google Drive (public link), ImgBB, Cloudinary, or your CDN."],
    ["Paste the direct image URL into image1/image2/image3 columns."],
    ["Example: https://images.unsplash.com/photo-xxxx?w=800&q=80"],
    [""],
    ["WORKFLOW FOR CLIENT"],
    ["Step A: Download this template (or Export Current Inventory from Admin)."],
    ["Step B: Fill/update all sheets (even if only 20 products)."],
    ["Step C: Send Excel to Hasnain Auto team OR upload in Admin → Bulk Import."],
    ["Step D: System overwrites ALL products/brands/models/years/qualities/colors."],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(instructions), "Instructions");

  const products = catalog.products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    basePrice: p.basePrice,
    shortDescription: p.shortDescription,
    description: p.description,
    badge: p.badge ?? "",
    isSeatCover: p.isSeatCover ? "TRUE" : "FALSE",
    isFeatured: p.isFeatured ? "TRUE" : "FALSE",
    inStock: p.inStock ? "TRUE" : "FALSE",
    image1: p.images[0] ?? "",
    image2: p.images[1] ?? "",
    image3: p.images[2] ?? "",
    relatedSlugs: p.relatedSlugs.join(", "),
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(products), "Products");

  const categories = catalog.categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
    isHero: c.isHero ? "TRUE" : "FALSE",
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(categories), "Categories");

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(catalog.carMakes.map((make) => ({ make }))),
    "CarMakes"
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(catalog.carModels), "CarModels");
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(catalog.years.map((year) => ({ year }))),
    "Years"
  );
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(catalog.seatCoverQualities),
    "SeatCoverQualities"
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(catalog.coverColors), "CoverColors");

  return wb;
}

export function workbookToBuffer(wb: XLSX.WorkBook): Buffer {
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

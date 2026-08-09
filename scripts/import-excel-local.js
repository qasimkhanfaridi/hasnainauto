const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const excelPath = "d:\\HasnainAuto_Inventory_TEMPLATE (Autosaved).xlsx";
const outPath = path.join(__dirname, "..", "data", "inventory.json");

function fixUrl(u) {
  let s = String(u || "").trim();
  if (!s) return "";
  while (s.startsWith("https://https://")) s = s.replace("https://https://", "https://");
  while (s.startsWith("http://http://")) s = s.replace("http://http://", "http://");
  return s;
}

function bool(v, fallback = false) {
  if (typeof v === "boolean") return v;
  const s = String(v).trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(s)) return true;
  if (["0", "false", "no", "n", ""].includes(s)) return false;
  return fallback;
}

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function str(v) {
  return String(v ?? "").trim();
}

const wb = XLSX.readFile(excelPath);
const productRows = XLSX.utils.sheet_to_json(wb.Sheets.Products, { defval: "" });
const categoryRows = XLSX.utils.sheet_to_json(wb.Sheets.Categories, { defval: "" });
const makeRows = XLSX.utils.sheet_to_json(wb.Sheets.CarMakes, { defval: "" });
const modelRows = XLSX.utils.sheet_to_json(wb.Sheets.CarModels, { defval: "" });
const yearRows = XLSX.utils.sheet_to_json(wb.Sheets.Years, { defval: "" });
const qualityRows = XLSX.utils.sheet_to_json(wb.Sheets.SeatCoverQualities, { defval: "" });
const colorRows = XLSX.utils.sheet_to_json(wb.Sheets.CoverColors, { defval: "" });

const products = productRows.map((row, index) => {
  const images = [row.image1, row.image2, row.image3]
    .map(fixUrl)
    .filter(Boolean);
  if (!images.length) {
    throw new Error(`Product row ${index + 2}: image1 required`);
  }
  const badge = str(row.badge);
  return {
    id: str(row.id) || String(index + 1),
    slug: str(row.slug),
    name: str(row.name),
    shortDescription: str(row.shortDescription),
    description: str(row.description),
    category: str(row.category),
    basePrice: num(row.basePrice),
    images,
    badge: badge || undefined,
    isSeatCover: bool(row.isSeatCover),
    isFeatured: bool(row.isFeatured),
    inStock: bool(row.inStock, true),
    relatedSlugs: str(row.relatedSlugs)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
});

const catalog = {
  version: 1,
  updatedAt: new Date().toISOString(),
  products,
  categories: categoryRows.map((row) => ({
    slug: str(row.slug),
    name: str(row.name),
    description: str(row.description),
    image: fixUrl(row.image),
    isHero: bool(row.isHero),
  })),
  carMakes: makeRows.map((r) => str(r.make)).filter(Boolean),
  carModels: modelRows
    .map((r) => ({
      make: str(r.make),
      model: str(r.model),
      priceMultiplier: num(r.priceMultiplier, 1),
    }))
    .filter((r) => r.make && r.model),
  years: yearRows.map((r) => str(r.year)).filter(Boolean),
  seatCoverQualities: qualityRows
    .map((r) => ({
      id: str(r.id),
      label: str(r.label),
      description: str(r.description),
      basePrice: num(r.basePrice),
    }))
    .filter((r) => r.id),
  coverColors: colorRows
    .map((r) => ({
      color: str(r.color),
      surcharge: num(r.surcharge),
    }))
    .filter((r) => r.color),
};

fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2), "utf-8");
console.log("Wrote", outPath);
console.log("Products:", catalog.products.length);
catalog.products.forEach((p) => {
  console.log("-", p.slug, "=>", p.images[0].slice(0, 80));
});

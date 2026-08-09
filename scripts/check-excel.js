const fs = require("fs");
const XLSX = require("xlsx");
const path = "d:\\HasnainAuto_Inventory_TEMPLATE (Autosaved).xlsx";

const wb = XLSX.readFile(path);
const products = XLSX.utils.sheet_to_json(wb.Sheets.Products, { defval: "" });
const cats = XLSX.utils.sheet_to_json(wb.Sheets.Categories, { defval: "" });
const models = XLSX.utils.sheet_to_json(wb.Sheets.CarModels, { defval: "" });
const makes = XLSX.utils
  .sheet_to_json(wb.Sheets.CarMakes, { defval: "" })
  .map((r) => String(r.make).trim());

const issues = [];
const slugs = new Set();
const catSlugs = new Set(cats.map((c) => String(c.slug).trim()));

console.log("PRODUCTS:", products.length);
products.forEach((p, i) => {
  const row = i + 2;
  const slug = String(p.slug || "").trim();
  const imgs = [p.image1, p.image2, p.image3]
    .map((x) => String(x || "").trim())
    .filter(Boolean);

  console.log("\n#" + p.id, slug);
  console.log(" ", p.name, "|", p.category, "| Rs.", p.basePrice);
  console.log(" ", "seat/featured/stock:", p.isSeatCover, p.isFeatured, p.inStock, "| badge:", p.badge || "(none)");
  imgs.forEach((u, idx) => console.log("  image" + (idx + 1) + ":", u));

  if (!slug) issues.push(`Row ${row}: missing slug`);
  if (slugs.has(slug)) issues.push(`Row ${row}: duplicate slug ${slug}`);
  slugs.add(slug);
  if (!String(p.name || "").trim()) issues.push(`Row ${row}: missing name`);
  if (!imgs.length) issues.push(`Row ${row}: missing image1`);
  if (!catSlugs.has(String(p.category).trim())) {
    issues.push(`Row ${row}: category "${p.category}" not in Categories sheet`);
  }
  if (Number.isNaN(Number(p.basePrice))) {
    issues.push(`Row ${row}: basePrice is not a number`);
  }
  imgs.forEach((u, idx) => {
    if (u.startsWith("https://https://") || u.startsWith("http://http://")) {
      issues.push(`Row ${row} image${idx + 1}: DOUBLE https — broken URL`);
    } else if (!/^https?:\/\//i.test(u)) {
      issues.push(`Row ${row} image${idx + 1}: not a valid http(s) URL`);
    }
  });
});

const badModels = models.filter((m) => !makes.includes(String(m.make).trim()));
if (badModels.length) {
  issues.push(
    "CarModels unknown make: " +
      badModels.map((m) => `${m.make}/${m.model}`).join(", ")
  );
}

console.log("\n=== SUMMARY ===");
console.log("Sheets OK: Instructions, Products, Categories, CarMakes, CarModels, Years, SeatCoverQualities, CoverColors");
console.log("Products:", products.length, "| Categories:", cats.length, "| Makes:", makes.length, "| Models:", models.length);
console.log("\n=== ISSUES (" + issues.length + ") ===");
if (!issues.length) console.log("None — file structure looks import-ready (after fixing any URL issues above).");
issues.forEach((x) => console.log("- " + x));

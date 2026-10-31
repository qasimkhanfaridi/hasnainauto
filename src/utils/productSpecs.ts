import { Product } from "@/data/products";

/** Novsight-style spec chips for product cards */
export function getProductSpecChips(product: Product, max = 3): string[] {
  const chips: string[] = [];
  const spec = product.specifications;

  if (spec["Power Rating"]) chips.push(String(spec["Power Rating"]).replace(" (system)", ""));
  if (spec["Luminous Flux"]) chips.push(String(spec["Luminous Flux"]).replace(" Lumens", " LM"));
  if (spec["Color Temperature"]) chips.push(String(spec["Color Temperature"]).split(" ")[0]);
  if (spec["Copper Pipes"] && chips.length < max) chips.push(String(spec["Copper Pipes"]));
  if (spec.Canbus === "Compatible" && chips.length < max) chips.push("Canbus");

  if (chips.length === 0 && product.category === "led-lights") {
    if (product.warranty?.includes("1 Year")) chips.push("1Y Warranty");
  }

  return chips.slice(0, max);
}

export function productMatchesSocket(product: Product, socket: string): boolean {
  const q = socket.toUpperCase();
  const haystack = [
    product.name,
    product.shortDescription,
    product.description,
    ...(product.variants?.flatMap((v) => v.options) ?? []),
    JSON.stringify(product.specifications),
  ]
    .join(" ")
    .toUpperCase();

  if (q === "H4") return haystack.includes("H4");
  if (q === "H11") return haystack.includes("H11");
  if (q === "9005") return haystack.includes("9005");
  return haystack.includes(q);
}

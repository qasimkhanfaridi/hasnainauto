import { readInventory } from "@/lib/store";
import type { Product } from "@/types";

export function getCatalog() {
  return readInventory();
}

export function getProducts(): Product[] {
  return readInventory().products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.isFeatured);
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter((p) => p.category === category);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => getProductBySlug(s)).filter(Boolean) as Product[];
}

/** @deprecated use getProducts() — kept for gradual migration */
export const PRODUCTS: Product[] = [];

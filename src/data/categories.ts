import { readInventory } from "@/lib/store";
import type { CategoryRow } from "@/types/admin";

export type Category = CategoryRow;

export function getCategories(): Category[] {
  return readInventory().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export const CATEGORIES: Category[] = [];

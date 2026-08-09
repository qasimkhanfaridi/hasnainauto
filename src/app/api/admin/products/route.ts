import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readInventory, writeInventory } from "@/lib/store";
import type { Product, ProductBadge, ProductCategory } from "@/types";

function normalizeProduct(existing: Product, body: Record<string, unknown>): Product {
  const images = Array.isArray(body.images)
    ? body.images.map((x) => String(x || "").trim()).filter(Boolean).slice(0, 3)
    : existing.images;

  const badgeRaw = String(body.badge ?? existing.badge ?? "").trim();
  const badge = (badgeRaw || undefined) as ProductBadge | undefined;

  return {
    ...existing,
    name: String(body.name ?? existing.name).trim() || existing.name,
    shortDescription: String(body.shortDescription ?? existing.shortDescription).trim(),
    description: String(body.description ?? existing.description).trim(),
    category: (String(body.category ?? existing.category).trim() || existing.category) as ProductCategory,
    basePrice: Number(body.basePrice ?? existing.basePrice) || existing.basePrice,
    images: images.length ? images : existing.images,
    badge,
    isSeatCover: body.isSeatCover !== undefined ? Boolean(body.isSeatCover) : existing.isSeatCover,
    isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : existing.isFeatured,
    inStock: body.inStock !== undefined ? Boolean(body.inStock) : existing.inStock,
    relatedSlugs: Array.isArray(body.relatedSlugs)
      ? body.relatedSlugs.map((x) => String(x).trim()).filter(Boolean)
      : typeof body.relatedSlugs === "string"
        ? String(body.relatedSlugs).split(",").map((s) => s.trim()).filter(Boolean)
        : existing.relatedSlugs,
  };
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = String(body.slug || "");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const inventory = readInventory();
  const idx = inventory.products.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  inventory.products[idx] = normalizeProduct(inventory.products[idx], body);

  try {
    writeInventory(inventory);
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not save product on this host. Use local admin or Excel import + git push for Vercel.",
        product: inventory.products[idx],
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, product: inventory.products[idx] });
}

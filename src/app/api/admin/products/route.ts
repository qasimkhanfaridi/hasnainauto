import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readInventory, writeInventory } from "@/lib/store";

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = String(body.slug || "");
  const images = Array.isArray(body.images)
    ? body.images.map((x: unknown) => String(x || "").trim()).filter(Boolean)
    : null;

  if (!slug || !images || images.length === 0) {
    return NextResponse.json(
      { error: "slug and at least one image URL required" },
      { status: 400 }
    );
  }

  const inventory = readInventory();
  const idx = inventory.products.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  inventory.products[idx] = {
    ...inventory.products[idx],
    images: images.slice(0, 3),
  };

  try {
    writeInventory(inventory);
  } catch {
    return NextResponse.json(
      {
        error:
          "Image uploaded to Cloudinary, but product file could not be saved on this host. Copy the URL and update via Excel import, or run locally.",
        url: images[0],
        images,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, product: inventory.products[idx] });
}

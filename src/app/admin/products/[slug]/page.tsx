"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductBadge, ProductCategory } from "@/types";

const BADGES: Array<ProductBadge | ""> = ["", "Hot", "Best Seller", "Limited Stock"];

export default function AdminEditProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/inventory");
    const data = await res.json();
    const found = (data.products || []).find((p: Product) => p.slug === slug);
    if (!found) {
      setError("Product not found");
      return;
    }
    setProduct({
      ...found,
      images: [...(found.images || []), "", "", ""].slice(0, 3),
    });
    setCategories(data.categories || []);
  };

  useEffect(() => {
    load();
  }, [slug]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSaving(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        category: product.category,
        basePrice: product.basePrice,
        badge: product.badge || "",
        isSeatCover: product.isSeatCover,
        isFeatured: product.isFeatured,
        inStock: product.inStock,
        relatedSlugs: product.relatedSlugs,
        images: product.images.filter(Boolean),
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }
    setMessage("Product saved successfully.");
    setProduct({
      ...data.product,
      images: [...(data.product.images || []), "", "", ""].slice(0, 3),
    });
  };

  const uploadSlot = async (slot: number, file: File | null) => {
    if (!file || !product) return;
    setUploading(slot);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const images = [...product.images];
      images[slot] = data.item.url;
      setProduct({ ...product, images });
      setMessage(`Image ${slot + 1} uploaded. Click Save Product to apply.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  if (!product && !error) {
    return <p className="text-grey-text">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <Link href="/admin/products" className="text-gold-dark font-semibold">← Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/products" className="text-sm text-gold-dark font-semibold">← All products</Link>
          <h2 className="text-2xl font-bold text-navy mt-1">Edit Product</h2>
          <p className="text-xs text-grey-text">Slug: {product.slug} (fixed)</p>
        </div>
        <Link href={`/products/${product.slug}`} target="_blank" className="text-sm font-semibold text-navy underline">
          View on store
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
      {message && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{message}</p>}

      <form onSubmit={save} className="card-premium p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Product Name</label>
          <input
            required
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-grey-mid"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Price (PKR)</label>
            <input
              required
              type="number"
              min={0}
              value={product.basePrice}
              onChange={(e) => setProduct({ ...product, basePrice: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-lg border border-grey-mid"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Category</label>
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value as ProductCategory })}
              className="w-full px-4 py-3 rounded-lg border border-grey-mid bg-white"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Short Description</label>
          <input
            value={product.shortDescription}
            onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-grey-mid"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Full Description</label>
          <textarea
            rows={5}
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-grey-mid resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Badge</label>
          <select
            value={product.badge || ""}
            onChange={(e) => setProduct({ ...product, badge: (e.target.value || undefined) as ProductBadge | undefined })}
            className="w-full px-4 py-3 rounded-lg border border-grey-mid bg-white"
          >
            {BADGES.map((b) => (
              <option key={b || "none"} value={b}>{b || "(none)"}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { key: "isFeatured", label: "Featured on Home" },
            { key: "isSeatCover", label: "Seat Cover (car config)" },
            { key: "inStock", label: "In Stock" },
          ].map((f) => (
            <label key={f.key} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(product[f.key as keyof Product])}
                onChange={(e) => setProduct({ ...product, [f.key]: e.target.checked })}
                className="accent-gold"
              />
              {f.label}
            </label>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-3">Images (upload or paste URL)</label>
          <div className="grid sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((slot) => (
              <div key={slot} className="space-y-2">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-grey-light">
                  {product.images[slot] ? (
                    <Image src={product.images[slot]} alt="" fill className="object-cover" sizes="200px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-grey-text">No image</div>
                  )}
                </div>
                <input
                  value={product.images[slot] || ""}
                  onChange={(e) => {
                    const images = [...product.images];
                    images[slot] = e.target.value;
                    setProduct({ ...product, images });
                  }}
                  placeholder="https://..."
                  className="w-full px-2 py-2 text-xs rounded-lg border border-grey-mid"
                />
                <label className={`block text-center text-xs font-semibold py-2 rounded cursor-pointer ${uploading === slot ? "bg-grey-mid" : "btn-navy"}`}>
                  {uploading === slot ? "Uploading..." : `Upload image ${slot + 1}`}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading !== null}
                    onChange={(e) => uploadSlot(slot, e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-grey-text mt-2">Cloudinary keys required for upload. Or paste image URL manually.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Related slugs (comma separated)</label>
          <input
            value={product.relatedSlugs.join(", ")}
            onChange={(e) =>
              setProduct({
                ...product,
                relatedSlugs: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-grey-mid"
          />
        </div>

        <button type="submit" disabled={saving} className="w-full py-3.5 btn-gold disabled:opacity-50">
          {saving ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}

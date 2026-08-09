"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [busySlug, setBusySlug] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/inventory");
    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadForProduct = async (slug: string, slot: number, file: File | null) => {
    if (!file) return;
    setError("");
    setMessage("");
    setBusySlug(slug);

    try {
      const form = new FormData();
      form.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: form });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      const product = products.find((p) => p.slug === slug);
      if (!product) throw new Error("Product not found");

      const images = [...product.images];
      while (images.length < 3) images.push(images[0] || "");
      images[slot] = uploadData.item.url;

      const patchRes = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, images: images.filter(Boolean).slice(0, 3) }),
      });
      const patchData = await patchRes.json();
      if (!patchRes.ok) throw new Error(patchData.error || "Failed to save product image");

      setMessage(`Updated image ${slot + 1} for ${product.name}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusySlug("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Products</h2>
          <p className="text-sm text-grey-text">
            {products.length} products · Upload images directly to Cloudinary from here
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/media" className="px-4 py-2 btn-gold text-sm">Media Library</Link>
          <a href="/api/admin/import" className="px-4 py-2 btn-navy text-sm">Export Excel</a>
          <Link href="/admin/import" className="px-4 py-2 border border-navy rounded-lg text-sm font-semibold text-navy">Import Excel</Link>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
      {message && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{message}</p>}

      <div className="space-y-4">
        {products.map((p) => (
          <article key={p.id} className="card-premium p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {[0, 1, 2].map((slot) => (
                  <div key={slot} className="w-28 flex-shrink-0 space-y-2">
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-grey-light">
                      {p.images[slot] ? (
                        <Image src={p.images[slot]} alt={`${p.name} ${slot + 1}`} fill className="object-cover" sizes="112px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-grey-text">Empty</div>
                      )}
                    </div>
                    <label className={`block text-center text-xs font-semibold py-1.5 rounded cursor-pointer ${busySlug === p.slug ? "bg-grey-mid text-grey-text" : "btn-navy"}`}>
                      {busySlug === p.slug ? "..." : `Upload ${slot + 1}`}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={busySlug === p.slug}
                        onChange={(e) => uploadForProduct(p.slug, slot, e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-navy">{p.name}</h3>
                <p className="text-xs text-grey-text">{p.slug}</p>
                <p className="text-sm mt-2">{p.category} · {formatPrice(p.basePrice)}</p>
                <p className="text-xs text-grey-text mt-1">
                  {[p.badge, p.isFeatured ? "Featured" : null, p.isSeatCover ? "SeatCover" : null, p.inStock ? "InStock" : "Out"]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

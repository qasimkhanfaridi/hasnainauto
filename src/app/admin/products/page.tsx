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

  useEffect(() => {
    fetch("/api/admin/inventory")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => router.replace("/admin"));
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Products</h2>
          <p className="text-sm text-grey-text">
            {products.length} products · Click <strong>Edit</strong> to change one product at a time
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/media" className="px-4 py-2 btn-gold text-sm">Media Library</Link>
          <a href="/api/admin/import" className="px-4 py-2 btn-navy text-sm">Export Excel</a>
          <Link href="/admin/import" className="px-4 py-2 border border-navy rounded-lg text-sm font-semibold text-navy">
            Bulk Import
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <article key={p.id} className="card-premium p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-grey-light flex-shrink-0">
              {p.images[0] && (
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="80px" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-navy truncate">{p.name}</h3>
              <p className="text-xs text-grey-text">{p.slug}</p>
              <p className="text-sm mt-1">
                {p.category} · {formatPrice(p.basePrice)}
                {p.badge ? ` · ${p.badge}` : ""}
              </p>
            </div>
            <Link
              href={`/admin/products/${p.slug}`}
              className="px-5 py-2.5 btn-gold text-sm whitespace-nowrap"
            >
              Edit
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

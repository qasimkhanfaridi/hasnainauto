"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductQuickViewModal } from "./ProductQuickViewModal";

/**
 * BEST SELLERS — the 5 hottest products, ranked by verified-review count.
 * Every one carries a HOT / POPULAR / BEST SELLER / Limited Stock badge and
 * a real sale price, so the red "Limited — On Sale" badge on each card is
 * truthful. Order is computed from the data, not hardcoded.
 */
const BEST_SELLERS: Product[] = [...ACTIVE_PRODUCTS_DATA]
  .filter((product) => product.reviewCount > 0 && Boolean(product.badge))
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 5);

export const HomeProductsShowcase: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section id="led-catalog" className="py-12 sm:py-16 bg-white dark:bg-carbon-900 text-carbon-900 dark:text-white border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-2">
              <Flame className="w-3.5 h-3.5" />
              Limited Stock · On Sale Now · COD Pakistan
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              Our most-loved upgrades — ranked by verified reviews. Every one is on sale while stock lasts.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-black text-red-brand uppercase tracking-wider hover:text-red-dark group shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {BEST_SELLERS.map((product) => (
            <div key={product.id} className="relative pt-3">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-600/40">
                Limited — On Sale
              </span>
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                variant={product.category === "led-lights" ? "novsight" : "default"}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-red-brand hover:bg-red-dark text-white font-black text-xs uppercase tracking-wider shadow-red-glow-sm transition-all min-h-[48px]"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {quickViewProduct && (
        <ProductQuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
};

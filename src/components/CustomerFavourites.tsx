"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface CustomerFavouritesProps {
  onQuickView?: (product: Product) => void;
}

export const CustomerFavourites: React.FC<CustomerFavouritesProps> = ({ onQuickView }) => {
  const favouriteProducts = ACTIVE_PRODUCTS_DATA.filter((p) => p.featured || p.bestSeller || p.badge === "Hot");

  return (
    <section className="py-16 sm:py-20 bg-carbon-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-widest mb-2 shadow-red-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-red-brand" />
              <span>Customer Favourites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              FEATURED & BEST SELLING UPGRADES
            </h2>
            <p className="text-xs sm:text-sm text-silver-300 mt-1 max-w-xl">
              Custom tailored leather seat covers, 7D floor mats, high-output LED headlights, and interior bundles.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-silver-300 hover:text-red-accent group self-start md:self-auto transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-red-brand" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

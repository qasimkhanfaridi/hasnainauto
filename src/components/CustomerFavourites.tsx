"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface CustomerFavouritesProps {
  onQuickView?: (product: Product) => void;
}

export const CustomerFavourites: React.FC<CustomerFavouritesProps> = ({ onQuickView }) => {
  const favouriteProducts = ACTIVE_PRODUCTS_DATA.filter((p) => p.featured || p.bestSeller || p.badge === "Hot");

  return (
    <section className="py-10 sm:py-14 bg-surface-200 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-carbon-900 uppercase tracking-tight">
              FEATURED PRODUCTS
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Best selling picks for Pakistani cars</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-red-brand hover:text-red-dark uppercase tracking-wider transition-colors group"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {favouriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-sm uppercase tracking-wider transition-all shadow-red-glow group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

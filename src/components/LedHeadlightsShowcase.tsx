"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface LedHeadlightsShowcaseProps {
  onQuickView?: (product: Product) => void;
}

export const LedHeadlightsShowcase: React.FC<LedHeadlightsShowcaseProps> = ({ onQuickView }) => {
  const ledProducts = ACTIVE_PRODUCTS_DATA.filter((p) => p.category === "led-lights").sort((a, b) => {
    const aCopper = a.specifications["Copper Pipes"] ? 1 : 0;
    const bCopper = b.specifications["Copper Pipes"] ? 1 : 0;
    if (aCopper !== bCopper) return bCopper - aCopper;
    return (b.salePrice || b.price) - (a.salePrice || a.price);
  });

  return (
    <section className="py-12 sm:py-16 bg-surface-100 dark:bg-carbon-950 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-brand/10 text-red-brand text-[10px] font-black uppercase tracking-widest mb-2">
              <Zap className="w-3.5 h-3.5 fill-red-brand" />
              Complete LED Lineup
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              Headlight &amp; Projector LEDs
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
              {ledProducts.length} kits in stock at Saddar — copper pipe cooling, Canbus drivers, H4 / H11 / 9005 variants.
            </p>
          </div>
          <Link
            href="/shop?category=led-lights"
            className="inline-flex items-center gap-2 text-xs font-black text-red-brand uppercase tracking-wider hover:text-red-dark"
          >
            Filter &amp; sort in shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {ledProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} variant="novsight" />
          ))}
        </div>
      </div>
    </section>
  );
};

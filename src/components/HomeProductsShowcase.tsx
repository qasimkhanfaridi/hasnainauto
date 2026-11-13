"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductQuickViewModal } from "./ProductQuickViewModal";

/**
 * BEST SELLERS — the 5 hottest products, ranked by verified-review count.
 * Carousel slider (scroll-snap + arrows + swipe): all cards share one
 * height in a single line, and the red "Limited — On Sale" pill now sits
 * INSIDE the product image instead of sticking out above the card.
 */
const BEST_SELLERS: Product[] = [...ACTIVE_PRODUCTS_DATA]
  .filter((product) => product.reviewCount > 0 && Boolean(product.badge))
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 5);

export const HomeProductsShowcase: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    const step = (card?.offsetWidth ?? 300) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {BEST_SELLERS.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-[270px] sm:w-[300px] lg:w-[320px]">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  variant={product.category === "led-lights" ? "novsight" : "default"}
                  limitedBadge
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous best sellers"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 transition-all hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next best sellers"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 transition-all hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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

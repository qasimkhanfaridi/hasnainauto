"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface HorizontalScrollSliderProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  gapClassName?: string;
}

export function HorizontalScrollSlider({
  children,
  className = "",
  itemClassName = "shrink-0 w-[72%] sm:w-[45%] lg:w-[23%]",
  gapClassName = "gap-3 sm:gap-4 lg:gap-5",
}: HorizontalScrollSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, children]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.85, 280) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const items = React.Children.toArray(children);

  return (
    <div className={`relative ${className}`}>
      {canPrev && (
        <button
          type="button"
          aria-label="Scroll previous"
          onClick={() => scrollByPage(-1)}
          className="hidden sm:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-card items-center justify-center text-carbon-900 hover:border-red-brand/40 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          aria-label="Scroll next"
          onClick={() => scrollByPage(1)}
          className="hidden sm:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-card items-center justify-center text-carbon-900 hover:border-red-brand/40 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={trackRef}
        className={`flex overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory ${gapClassName}`}
      >
        {items.map((child, i) => (
          <div key={i} className={`${itemClassName} snap-start`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

interface CustomerFavouritesProps {
  onQuickView?: (product: Product) => void;
}

export const CustomerFavourites: React.FC<CustomerFavouritesProps> = ({ onQuickView }) => {
  const favouriteProducts = ACTIVE_PRODUCTS_DATA.filter((p) => p.featured || p.bestSeller || p.badge === "Hot");

  return (
    <section className="py-10 sm:py-14 bg-surface-200 border-b border-gray-200 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
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

        <HorizontalScrollSlider
          itemClassName="shrink-0 w-[min(100%,280px)] sm:w-[48%] md:w-[38%] lg:w-[24%]"
        >
          {favouriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </HorizontalScrollSlider>

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

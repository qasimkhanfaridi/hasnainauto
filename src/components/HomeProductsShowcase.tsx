"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductQuickViewModal } from "./ProductQuickViewModal";
import { productMatchesSocket } from "@/utils/productSpecs";

const CATEGORY_TABS = [
  { id: "all", label: "All Featured" },
  { id: "led-lights", label: "LED Headlights" },
  { id: "seat-covers", label: "Seat Covers" },
  { id: "floor-mats", label: "7D Floor Mats" },
  { id: "exterior-accessories", label: "Accessories" },
];

const SOCKET_PILLS = ["All", "H4", "H11", "9005", "9006", "H7"];

export const HomeProductsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeSocket, setActiveSocket] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const displayedProducts = useMemo(() => {
    return ACTIVE_PRODUCTS_DATA.filter((product) => {
      // Filter by category tab
      if (activeTab !== "all") {
        if (activeTab === "floor-mats") {
          if (product.category !== "floor-mats" && product.slug !== "seat-cover-floor-mat-combo") {
            return false;
          }
        } else if (activeTab === "seat-covers") {
          if (product.category !== "seat-covers" && product.slug !== "seat-cover-floor-mat-combo") {
            return false;
          }
        } else if (product.category !== activeTab) {
          return false;
        }
      }

      // Filter by socket if LED tab or LED product
      if (activeSocket !== "All") {
        if (!productMatchesSocket(product, activeSocket)) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, activeSocket]);

  return (
    <section id="products-catalog" className="py-10 sm:py-14 bg-surface-100 dark:bg-carbon-950 border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-brand/10 text-red-brand text-[10px] font-black uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-red-brand" />
              Direct Store Inventory · Saddar Rawalpindi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              POPULAR PRODUCTS &amp; ACCESSORIES
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
              High-lumen copper LED kits, custom tailored bucket seat covers, and 7D molded floor mats ready for same-day dispatch nationwide.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-black text-red-brand uppercase tracking-wider hover:text-red-dark group shrink-0"
          >
            <span>Explore All in Shop</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-white/10">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== "led-lights" && tab.id !== "all") {
                  setActiveSocket("All");
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-red-brand text-white shadow-red-glow-sm"
                  : "bg-white dark:bg-carbon-900 text-gray-600 dark:text-gray-300 hover:text-carbon-900 dark:hover:text-white border border-gray-200 dark:border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* LED Socket Filter Pills (shown when All or LED tab is selected) */}
        {(activeTab === "all" || activeTab === "led-lights") && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Zap className="w-3 h-3 text-red-brand" />
              Bulb Socket:
            </span>
            {SOCKET_PILLS.map((sock) => (
              <button
                key={sock}
                type="button"
                onClick={() => setActiveSocket(sock)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSocket === sock
                    ? "bg-carbon-900 text-white dark:bg-white dark:text-carbon-900"
                    : "bg-gray-100 dark:bg-carbon-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-carbon-700"
                }`}
              >
                {sock === "All" ? "All Sockets" : sock}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {displayedProducts.slice(0, 12).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
              variant={product.category === "led-lights" ? "novsight" : "default"}
            />
          ))}
        </div>

        {/* View All CTA */}
        {displayedProducts.length > 12 && (
          <div className="mt-10 text-center">
            <Link
              href={activeTab === "all" ? "/shop" : `/shop?category=${activeTab}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-red-brand hover:bg-red-dark text-white font-black text-xs uppercase tracking-wider shadow-red-glow-sm transition-all"
            >
              <span>View All {displayedProducts.length} Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

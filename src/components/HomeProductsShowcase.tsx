"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductQuickViewModal } from "./ProductQuickViewModal";
import { productMatchesSocket } from "@/utils/productSpecs";

const CATEGORY_TABS = [
  { id: "led-lights", label: "LED Lights" },
  { id: "seat-covers", label: "Seat Covers" },
  { id: "floor-mats", label: "7D Mats" },
  { id: "exterior-accessories", label: "More" },
] as const;

const SOCKET_PILLS = ["All", "H4", "H11", "9005", "9006", "H7"];

const PK_SOCKET_PICKS = [
  { label: "Alto H4", socket: "H4" },
  { label: "Corolla H11", socket: "H11" },
  { label: "Civic 9005", socket: "9005" },
];

export const HomeProductsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("led-lights");
  const [activeSocket, setActiveSocket] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const displayedProducts = useMemo(() => {
    const list = ACTIVE_PRODUCTS_DATA.filter((product) => {
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

      if (activeTab === "led-lights" && activeSocket !== "All") {
        if (!productMatchesSocket(product, activeSocket)) {
          return false;
        }
      }

      return true;
    });

    if (activeTab === "led-lights") {
      const flagshipOrder = [
        "y6-projector-led-h4",
        "rego-racing-led-headlights",
        "mother-6-copper-led-headlights",
        "b-pro-8-copper-led-headlights",
        "wooden-box-zinc-alloy-led-headlights",
        "golden-box-rego-led-headlights",
        "tasa-h4-premium-led-headlights",
      ];
      return [...list].sort((a, b) => {
        const idxA = flagshipOrder.indexOf(a.slug);
        const idxB = flagshipOrder.indexOf(b.slug);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    return list;
  }, [activeTab, activeSocket]);

  const shopHref =
    activeTab === "led-lights" && activeSocket !== "All"
      ? `/shop?category=led-lights&socket=${encodeURIComponent(activeSocket)}`
      : `/shop?category=${activeTab}`;

  return (
    <section id="led-catalog" className="py-12 sm:py-16 bg-[#070b12] text-white border-b border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Verified Inventory · Saddar Showroom · COD Pakistan
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              PRO HIGH-INTENSITY LED HEADLIGHTS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Equipped with liquid copper conduits, external Canbus decoders, and 1-Year Direct Over-the-Counter Replacement Warranty.
            </p>
          </div>

          <Link
            href={shopHref}
            className="inline-flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider hover:text-cyan-300 group shrink-0"
          >
            <span>Full Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-gray-800">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== "led-lights") {
                  setActiveSocket("All");
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-black font-black shadow-lg shadow-cyan-950"
                  : "bg-[#0f1624] text-gray-300 hover:text-white border border-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "led-lights" && (
          <div className="space-y-3 mb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                Socket Filter:
              </span>
              {SOCKET_PILLS.map((sock) => (
                <button
                  key={sock}
                  type="button"
                  onClick={() => setActiveSocket(sock)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSocket === sock
                      ? "bg-white text-black font-black"
                      : "bg-[#111927] text-gray-400 hover:bg-[#1a253a] hover:text-white border border-gray-800"
                  }`}
                >
                  {sock === "All" ? "All Sockets" : sock}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {PK_SOCKET_PICKS.map((pick) => (
                <button
                  key={pick.label}
                  type="button"
                  onClick={() => setActiveSocket(pick.socket)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold border border-red-brand/30 text-red-brand bg-red-brand/5 hover:bg-red-brand/10 transition-colors"
                >
                  {pick.label}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Socket pata nahi?{" "}
              <Link href="/shop-by-car" className="text-red-brand font-bold hover:underline">
                Gari select karein
              </Link>
              {" · "}
              <Link href="/contact" className="text-red-brand font-bold hover:underline">
                WhatsApp Saddar
              </Link>
            </p>
          </div>
        )}

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

        {displayedProducts.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-10">
            Is socket ke liye abhi koi product nahi —{" "}
            <Link href="/contact" className="text-red-brand font-bold">
              WhatsApp par fitment poochein
            </Link>
          </p>
        )}

        {displayedProducts.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href={shopHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-red-brand hover:bg-red-dark text-white font-black text-xs uppercase tracking-wider shadow-red-glow-sm transition-all min-h-[48px]"
            >
              <span>View All {displayedProducts.length} Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <ProductQuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
};

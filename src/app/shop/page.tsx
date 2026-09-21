"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  SlidersHorizontal, 
  Car, 
  RotateCcw, 
  ArrowUpDown, 
  ShoppingBag, 
  Sparkles
} from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA, CATEGORIES_DATA } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { useVehicle } from "@/context/VehicleContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { selectedVehicle, clearVehicle, isCompatible } = useVehicle();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category param from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return ACTIVE_PRODUCTS_DATA.filter((product) => {
      // Category match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Vehicle compatibility filter
      if (onlyCompatible && selectedVehicle && !isCompatible(product)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: featured first, then bestsellers
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, inStockOnly, onlyCompatible, selectedVehicle, sortBy, isCompatible]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setInStockOnly(false);
    setOnlyCompatible(false);
  };

  return (
    <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 space-y-2">
          <div className="text-xs text-silver-400">
            <span>Home</span> <span className="text-silver-600">/</span>{" "}
            <span className="text-red-accent font-semibold">Store Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            AUTO DECORATION & ACCESSORIES
          </h1>
          <p className="text-xs sm:text-sm text-silver-300">
            Custom-tailored leather seat covers, 7D floor mats, high-output LED headlights, and premium automotive styling.
          </p>
        </div>

        {/* Active Vehicle Compatibility Banner */}
        {selectedVehicle && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-600/10 via-carbon-900 to-carbon-900 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-red-glow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600/20 text-red-brand">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-red-accent uppercase tracking-wider">
                  Vehicle Fitment Applied
                </div>
                <div className="text-sm font-black text-white">
                  Accessories For {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-silver-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="rounded text-red-brand focus:ring-red-brand bg-carbon-950 border-white/10"
                />
                <span>Guaranteed Fits Only</span>
              </label>

              <button
                type="button"
                onClick={clearVehicle}
                className="px-3 py-1.5 rounded-lg bg-carbon-800 text-silver-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Car</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === "all"
                ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                : "bg-carbon-900 text-silver-300 border-white/10 hover:text-white"
            }`}
          >
            All Products ({ACTIVE_PRODUCTS_DATA.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.slug
                  ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                  : "bg-carbon-900 text-silver-300 border-white/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar: Count, Mobile Filter Trigger, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="text-xs font-bold text-silver-400 uppercase tracking-wider">
            Showing <strong className="text-white font-black">{filteredProducts.length}</strong> Products
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-carbon-850 border border-white/10 text-xs font-bold text-silver-200"
            >
              <Filter className="w-4 h-4 text-red-brand" />
              <span>Filter Categories</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-silver-400" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "featured" | "price-asc" | "price-desc" | "rating"
                  )
                }
                className="h-10 px-3 bg-carbon-900 border border-white/10 rounded-xl text-xs font-semibold text-silver-200 focus:outline-none focus:border-red-500"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-carbon-900/70 p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-red-brand" />
                <span>Categories</span>
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-silver-400 hover:text-red-accent font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Category List */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-red-600 text-white font-bold shadow-sm shadow-red-950/40"
                    : "text-silver-300 hover:text-white hover:bg-carbon-800"
                }`}
              >
                All Departments ({ACTIVE_PRODUCTS_DATA.length})
              </button>
              {CATEGORIES_DATA.map((cat) => {
                const count = ACTIVE_PRODUCTS_DATA.filter((p) => p.category === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-red-600 text-white font-bold shadow-sm shadow-red-950/40"
                        : "text-silver-300 hover:text-white hover:bg-carbon-800"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* In Stock Toggle */}
            <div className="pt-3 border-t border-white/10">
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-silver-300">
                <span>In Stock at Saddar</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-red-brand focus:ring-red-brand bg-carbon-950 border-white/10 w-4 h-4"
                />
              </label>
            </div>

            {/* In-Store Fitting Promise Box */}
            <div className="p-4 rounded-xl bg-carbon-950 border border-red-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-accent">
                <Sparkles className="w-3.5 h-3.5 text-red-brand" />
                <span>Professional Installation</span>
              </div>
              <p className="text-[11px] text-silver-400 leading-relaxed">
                All seat covers, 7D mats, and LED projector lights can be professionally installed and calibrated at our 1st Floor, Kashmir Road Saddar workshop.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-carbon-800 flex items-center justify-center text-silver-400 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-white">No exact items found in this category</h3>
                <p className="text-xs text-silver-400 max-w-sm mx-auto">
                  We have extensive stock in our Saddar market showroom. Contact us on WhatsApp for custom orders or instant fitment confirmation!
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-carbon-800 text-white font-bold text-xs uppercase"
                  >
                    Reset Filters
                  </button>
                  <a
                    href="https://wa.me/923125127096?text=Assalam-o-Alaikum%20Hasnain%20Auto,%20I%20am%20looking%20for%20an%20accessory%20for%20my%20car."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-whatsapp text-carbon-950 font-black text-xs uppercase shadow-whatsapp-glow"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="w-full max-h-[80vh] overflow-y-auto rounded-t-3xl bg-carbon-900 border-t border-white/15 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                Filter By Category
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-xs font-bold text-red-accent"
              >
                Done
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setMobileFilterOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-semibold text-left border ${
                    selectedCategory === "all"
                      ? "bg-red-600 text-white border-red-500 font-bold"
                      : "bg-carbon-950 text-silver-300 border-white/10"
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border ${
                      selectedCategory === cat.slug
                        ? "bg-red-600 text-white border-red-500 font-bold"
                        : "bg-carbon-950 text-silver-300 border-white/10"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Close Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-xs uppercase tracking-wider shadow-red-glow"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-carbon-950 text-center py-20 text-silver-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

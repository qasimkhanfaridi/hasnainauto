"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Filter, 
  SlidersHorizontal, 
  Car, 
  RotateCcw, 
  ArrowUpDown, 
  ShoppingBag, 
  Sparkles,
  X,
  CheckCircle2
} from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA, CATEGORIES_DATA } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { useVehicle } from "@/context/VehicleContext";

const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-3k", label: "Under Rs. 3,000", min: 0, max: 3000 },
  { id: "3k-10k", label: "Rs. 3,000 – 10,000", min: 3000, max: 10000 },
  { id: "10k-20k", label: "Rs. 10,000 – 20,000", min: 10000, max: 20000 },
  { id: "above-20k", label: "Above Rs. 20,000", min: 20000, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { selectedVehicle, clearVehicle, isCompatible } = useVehicle();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
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

  // Extract unique brands from active products
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    ACTIVE_PRODUCTS_DATA.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return ACTIVE_PRODUCTS_DATA.filter((product) => {
      const price = product.salePrice || product.price;

      // Category match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Price range match
      if (selectedPriceRange !== "all") {
        const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
        if (range && (price < range.min || price > range.max)) {
          return false;
        }
      }
      // Brand match
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
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
  }, [selectedCategory, selectedPriceRange, selectedBrand, inStockOnly, onlyCompatible, selectedVehicle, sortBy, isCompatible]);

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0) +
    (selectedBrand !== "all" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onlyCompatible ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedBrand("all");
    setInStockOnly(false);
    setOnlyCompatible(false);
  };

  return (
    <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 space-y-2">
          <div className="text-xs text-silver-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-silver-600">/</span>
            <span className="text-red-accent font-semibold">Store Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            AUTO DECORATION & ACCESSORIES
          </h1>
          <p className="text-xs sm:text-sm text-silver-300">
            Custom-tailored leather seat covers, 7D floor mats, high-output LED headlights, and premium automotive styling with Cash on Delivery, Bank Transfer, & JazzCash.
          </p>
        </div>

        {/* Active Vehicle Compatibility Banner */}
        {selectedVehicle ? (
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
        ) : (
          <div className="mb-8 p-3.5 rounded-2xl bg-carbon-900/80 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-brand">
                <Car className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">Shopping for a specific car? </span>
                <span className="text-silver-400">Filter all products guaranteed to fit your vehicle model.</span>
              </div>
            </div>
            <Link
              href="/shop-by-car"
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-red-glow-sm transition-all"
            >
              Select Car
            </Link>
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

        {/* Toolbar: Count, Active Filter Chips, Mobile Filter Trigger, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-silver-400 uppercase tracking-wider">
              Showing <strong className="text-white font-black">{filteredProducts.length}</strong> Products
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-red-accent hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-carbon-850 border border-white/10 text-xs font-bold text-silver-200"
            >
              <Filter className="w-4 h-4 text-red-brand" />
              <span>Filter ({activeFiltersCount})</span>
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
                aria-label="Sort products by"
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
                <span>Faceted Filters</span>
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-silver-400 hover:text-red-accent font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Category Section */}
            <div>
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider mb-2">
                Categories
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === "all"
                      ? "bg-red-600 text-white font-bold shadow-sm shadow-red-950/40"
                      : "text-silver-300 hover:text-white hover:bg-carbon-800"
                  }`}
                >
                  All Categories ({ACTIVE_PRODUCTS_DATA.length})
                </button>
                {CATEGORIES_DATA.map((cat) => {
                  const count = ACTIVE_PRODUCTS_DATA.filter((p) => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
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
            </div>

            {/* 2. Price Range Section */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider mb-2">
                Price Range
              </div>
              <div className="space-y-1">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedPriceRange === range.id
                        ? "bg-red-600/20 text-red-accent border border-red-500/40 font-bold"
                        : "text-silver-300 hover:text-white hover:bg-carbon-800"
                    }`}
                  >
                    <span>{range.label}</span>
                    {selectedPriceRange === range.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-brand" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Brand Filter */}
            {availableBrands.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider mb-2">
                  Brand / Line
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setSelectedBrand("all")}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedBrand === "all"
                        ? "bg-red-600/20 text-red-accent border border-red-500/40 font-bold"
                        : "text-silver-300 hover:text-white hover:bg-carbon-800"
                    }`}
                  >
                    All Brands
                  </button>
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedBrand === brand
                          ? "bg-red-600/20 text-red-accent border border-red-500/40 font-bold"
                          : "text-silver-300 hover:text-white hover:bg-carbon-800"
                      }`}
                    >
                      <span>{brand}</span>
                      {selectedBrand === brand && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-brand" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. In Stock Toggle */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-silver-300">
                <span>In Stock at Saddar Showroom</span>
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
                <h3 className="text-lg font-black text-white">No products match your active filters</h3>
                <p className="text-xs text-silver-400 max-w-sm mx-auto">
                  Try adjusting the price range, brand, or category filters. Our Saddar market showroom carries complete stock for all Pakistani cars.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-carbon-800 text-white font-bold text-xs uppercase"
                  >
                    Reset All Filters
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
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-carbon-900 border-t border-white/15 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-brand" />
                <span>Filter Products</span>
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-silver-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-silver-400 uppercase tracking-wider">
                Category
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
                    selectedCategory === "all"
                      ? "bg-red-600 text-white border-red-500 font-bold"
                      : "bg-carbon-950 text-silver-300 border-white/10"
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
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

            {/* Price Range */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="text-xs font-bold text-silver-400 uppercase tracking-wider">
                Price Range
              </div>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
                      selectedPriceRange === range.id
                        ? "bg-red-600 text-white border-red-500 font-bold"
                        : "bg-carbon-950 text-silver-300 border-white/10"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Only */}
            <div className="pt-3 border-t border-white/10">
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-silver-300">
                <span>In Stock at Saddar Showroom</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-red-brand focus:ring-red-brand bg-carbon-950 border-white/10 w-4 h-4"
                />
              </label>
            </div>

            {/* Buttons: Reset & Apply */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="py-3 rounded-xl bg-carbon-800 text-silver-300 font-bold text-xs uppercase tracking-wider"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-xs uppercase tracking-wider shadow-red-glow"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
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

"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  Car,
  RotateCcw,
  ArrowUpDown,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";
import { Product, ACTIVE_PRODUCTS_DATA, COLLECTIONS_LIST, COLLECTION_PRODUCT_SLUGS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { useVehicle } from "@/context/VehicleContext";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "name-asc" | "name-desc";

const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "name-asc", label: "Alphabetically, A-Z" },
  { id: "name-desc", label: "Alphabetically, Z-A" },
  { id: "featured", label: "Featured & Best Sellers" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = searchParams.get("search");
  const sortParam = searchParams.get("sort");
  const categoryParam = searchParams.get("category");
  const makeParam = searchParams.get("make");
  const modelParam = searchParams.get("model");
  const yearParam = searchParams.get("year");
  const compatibleParam = searchParams.get("compatible");

  const { selectedVehicle, setSelectedVehicle, clearVehicle, isCompatible } = useVehicle();

  const [sortBy, setSortBy] = useState<SortKey>("name-asc");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [availIn, setAvailIn] = useState(true);
  const [availOut, setAvailOut] = useState(false);
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  // 2026-11-17 (sumair): filter sections stay CLOSED until the user opens them.
  const [availOpen, setAvailOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync parameters from URL. 2026-11-17 (sumair): /shop is "All Products" but
  // ?category= IS honoured now — a homepage TOP COLLECTIONS tile link lands here
  // filtered to that collection. Unknown/old category ids fall back to all products.
  // Vehicle fitment params from the homepage finder are still honoured.
  useEffect(() => {
    if (sortParam && ["featured", "price-asc", "price-desc", "rating", "name-asc", "name-desc"].includes(sortParam)) {
      setSortBy(sortParam as SortKey);
    }
    if (compatibleParam === "true" || (makeParam && modelParam)) {
      setOnlyCompatible(true);
    }
    if (makeParam && modelParam) {
      setSelectedVehicle({
        make: makeParam,
        model: modelParam,
        year: yearParam ? parseInt(yearParam, 10) : undefined,
      });
    }
  }, [sortParam, compatibleParam, makeParam, modelParam, yearParam, setSelectedVehicle]);

  // Active collection from ?category= (homepage TOP COLLECTIONS tiles link here).
  // The URL is the source of truth, so tile clicks and back/forward just work.
  const activeCategory = useMemo(
    () => COLLECTIONS_LIST.find((c) => c.id === categoryParam) ?? null,
    [categoryParam]
  );
  const categoryProducts = useMemo(() => {
    if (!activeCategory) return ACTIVE_PRODUCTS_DATA;
    const slugs = COLLECTION_PRODUCT_SLUGS[activeCategory.id] ?? [];
    return ACTIVE_PRODUCTS_DATA.filter((p) => slugs.includes(p.slug));
  }, [activeCategory]);

  // Clear only the category param, keeping search/sort/fitment params intact.
  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const inStockCount = useMemo(
    () => categoryProducts.filter((p) => p.inStock).length,
    [categoryProducts]
  );
  const outOfStockCount = categoryProducts.length - inStockCount;
  const maxPrice = useMemo(
    () => (categoryProducts.length === 0 ? 0 : Math.max(...categoryProducts.map((p) => p.salePrice || p.price))),
    [categoryProducts]
  );

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const price = product.salePrice || product.price;

      // Price From / To
      if (priceMin !== "" && price < Number(priceMin)) {
        return false;
      }
      if (priceMax !== "" && price > Number(priceMax)) {
        return false;
      }
      // Availability
      if (!((product.inStock && availIn) || (!product.inStock && availOut))) {
        return false;
      }
      // Vehicle compatibility filter
      if (onlyCompatible && selectedVehicle && !isCompatible(product)) {
        return false;
      }
      if (searchParam) {
        const q = searchParam.toLowerCase().trim();
        const tokenRegex = q.length <= 3 ? new RegExp(`\\b${q}\\b`, "i") : null;
        const corpus = `${product.name} ${product.category} ${product.subcategory || ""} ${product.description} ${product.shortDescription}`;
        if (tokenRegex ? !tokenRegex.test(corpus) : !corpus.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      // Default: featured first, then bestsellers
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [categoryProducts, priceMin, priceMax, availIn, availOut, onlyCompatible, selectedVehicle, sortBy, isCompatible, searchParam]);

  const activeFiltersCount =
    (priceMin !== "" || priceMax !== "" ? 1 : 0) +
    (!availIn || availOut ? 1 : 0) +
    (onlyCompatible ? 1 : 0) +
    (activeCategory ? 1 : 0);

  const resetFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setAvailIn(true);
    setAvailOut(false);
    setOnlyCompatible(false);
    if (activeCategory) clearCategory();
  };

  return (
    <div className="w-full bg-surface-100 dark:bg-carbon-950 min-h-screen text-carbon-900 dark:text-slate-100 transition-colors">
      {/* Red title bar — "All Products" (Novsight-style), same red as the top announcement bar — 2026-11-17 (sumair) */}
      <div className="w-full bg-red-brand border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {activeCategory ? activeCategory.name : "All Products"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Active Vehicle Compatibility Banner (only when a vehicle is selected) */}
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

        {/* Toolbar: count + reset, mobile filter trigger, sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600 dark:text-silver-300">
              <strong className="text-carbon-900 dark:text-white font-black">{filteredProducts.length}</strong> products
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-red-600 dark:text-red-accent hover:underline font-semibold flex items-center gap-1"
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
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-carbon-900 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-silver-200"
            >
              <Filter className="w-4 h-4 text-red-brand" />
              <span>Filter ({activeFiltersCount})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500 dark:text-silver-400" />
              <label htmlFor="shop-sort" className="text-sm text-gray-600 dark:text-silver-300">
                Sort by:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort products by"
                className="h-10 px-3 bg-white dark:bg-carbon-900 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-800 dark:text-silver-200 focus:outline-none focus:border-red-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Category — 2026-11-17 (sumair): a TOP COLLECTIONS tile lands here
            filtered to that collection; the chip shows it and clears it. */}
        {activeCategory && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-silver-300">Showing category:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-700 dark:text-red-accent text-xs font-bold">
              {activeCategory.name}
              <button
                type="button"
                onClick={clearCategory}
                aria-label={`Clear ${activeCategory.name} filter`}
                className="p-0.5 rounded-full hover:bg-red-600/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
            <span className="text-xs text-gray-500 dark:text-silver-400">
              {categoryProducts.length} product{categoryProducts.length === 1 ? "" : "s"} in this collection
            </span>
          </div>
        )}

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Panel (Novsight-style: Availability + Price only) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-white dark:bg-carbon-900 p-5 rounded-2xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
              <span className="text-sm font-semibold text-carbon-900 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-red-brand" />
                <span>Filter:</span>
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-gray-500 dark:text-silver-400 hover:text-red-600 dark:hover:text-red-accent font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Availability */}
            <div className="py-4 border-b border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setAvailOpen(!availOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-carbon-900 dark:text-white"
              >
                <span>Availability</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 dark:text-silver-400 transition-transform ${availOpen ? "rotate-180" : ""}`}
                />
              </button>
              {/* Availability — closed by default; opens with a smooth grid-rows transition. */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  availOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-silver-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availIn}
                        onChange={(e) => setAvailIn(e.target.checked)}
                        className="rounded accent-red-600 w-4 h-4"
                      />
                      <span>In stock ({inStockCount})</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-silver-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availOut}
                        onChange={(e) => setAvailOut(e.target.checked)}
                        className="rounded accent-red-600 w-4 h-4"
                      />
                      <span>Out of stock ({outOfStockCount})</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => setPriceOpen(!priceOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-carbon-900 dark:text-white"
              >
                <span>Price</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 dark:text-silver-400 transition-transform ${priceOpen ? "rotate-180" : ""}`}
                />
              </button>
              {/* Price — closed by default; opens with a smooth grid-rows transition. */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  priceOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-silver-300">
                      The highest price is Rs.{maxPrice.toLocaleString()}.00
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-silver-300">Rs</span>
                      <input
                        type="number"
                        min={0}
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        placeholder="From"
                        aria-label="Minimum price"
                        className="w-full px-3 py-2 bg-white dark:bg-carbon-950 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                      />
                      <input
                        type="number"
                        min={0}
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        placeholder="To"
                        aria-label="Maximum price"
                        className="w-full px-3 py-2 bg-white dark:bg-carbon-950 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-carbon-900 border border-gray-200 dark:border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-carbon-800 flex items-center justify-center text-gray-400 dark:text-silver-400 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-carbon-900 dark:text-white">No products match your active filters</h3>
                <p className="text-sm text-gray-600 dark:text-silver-400 max-w-sm mx-auto">
                  Try adjusting the price or availability filters. Our Saddar market showroom carries complete stock for all Pakistani cars.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-carbon-800 text-carbon-900 dark:text-white font-bold text-xs uppercase"
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
                    variant={product.category === "led-lights" ? "novsight" : "default"}
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
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white dark:bg-carbon-900 border-t border-gray-200 dark:border-white/15 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
              <h3 className="text-base font-black text-carbon-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-brand" />
                <span>Filter Products</span>
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-gray-500 dark:text-silver-400 hover:text-carbon-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Availability — closed by default, same as desktop. */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setAvailOpen(!availOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-500 dark:text-silver-400 uppercase tracking-wider"
              >
                <span>Availability</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${availOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  availOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-silver-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availIn}
                        onChange={(e) => setAvailIn(e.target.checked)}
                        className="rounded accent-red-600 w-4 h-4"
                      />
                      <span>In stock ({inStockCount})</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-silver-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availOut}
                        onChange={(e) => setAvailOut(e.target.checked)}
                        className="rounded accent-red-600 w-4 h-4"
                      />
                      <span>Out of stock ({outOfStockCount})</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price — closed by default, same as desktop. */}
            <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setPriceOpen(!priceOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-500 dark:text-silver-400 uppercase tracking-wider"
              >
                <span>Price</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${priceOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  priceOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 pt-1">
                    <p className="text-sm text-gray-600 dark:text-silver-300">
                      The highest price is Rs.{maxPrice.toLocaleString()}.00
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-silver-300">Rs</span>
                      <input
                        type="number"
                        min={0}
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        placeholder="From"
                        aria-label="Minimum price"
                        className="w-full px-3 py-2 bg-white dark:bg-carbon-950 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                      />
                      <input
                        type="number"
                        min={0}
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        placeholder="To"
                        aria-label="Maximum price"
                        className="w-full px-3 py-2 bg-white dark:bg-carbon-950 border border-gray-300 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons: Reset & Apply */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="py-3 rounded-xl bg-gray-100 dark:bg-carbon-800 text-gray-700 dark:text-silver-300 font-bold text-xs uppercase tracking-wider"
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

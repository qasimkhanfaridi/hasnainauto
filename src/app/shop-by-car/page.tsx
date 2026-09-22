"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Car, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle
} from "lucide-react";
import { VEHICLE_DATABASE, VehicleMake, VehicleModel } from "@/data/vehicles";
import { ACTIVE_PRODUCTS_DATA, CATEGORIES_DATA, Product } from "@/data/products";
import { useVehicle } from "@/context/VehicleContext";
import { BUSINESS_CONFIG } from "@/config/business";
import { ProductCard } from "@/components/ProductCard";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";

export default function ShopByCarPage() {
  const { selectedVehicle, setSelectedVehicle, clearVehicle, isCompatible } = useVehicle();

  // Local selection state for interactive flow
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(() => {
    if (selectedVehicle?.make) {
      return VEHICLE_DATABASE.find((m) => m.name.toLowerCase() === selectedVehicle.make.toLowerCase()) || null;
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleSelectMake = (make: VehicleMake) => {
    setSelectedMake(make);
  };

  const handleSelectModel = (model: VehicleModel) => {
    if (!selectedMake) return;
    setSelectedVehicle({
      make: selectedMake.name,
      model: model.name,
      year: model.years[0],
    });
  };

  const handleResetCar = () => {
    clearVehicle();
    setSelectedMake(null);
  };

  // Filter products compatible with the selected vehicle
  const compatibleProducts = useMemo(() => {
    if (!selectedVehicle) return [];
    return ACTIVE_PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      return isCompatible(product);
    });
  }, [selectedVehicle, selectedCategory, isCompatible]);

  return (
    <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 space-y-2">
          <div className="text-xs text-silver-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-silver-600">/</span>
            <span className="text-red-accent font-semibold">Shop By Car</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5 text-red-brand" />
            <span>Guaranteed Fitment Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SELECT YOUR CAR MODEL
          </h1>
          <p className="text-xs sm:text-sm text-silver-300 max-w-2xl">
            Browse laser-tailored seat covers, deep-dish 7D floor mats, and plug-and-play LED lighting precision-engineered for your specific Pakistani vehicle.
          </p>
        </div>

        {/* ACTIVE VEHICLE BANNER (If already chosen) */}
        {selectedVehicle ? (
          <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-red-600/20 via-carbon-900 to-carbon-900 border border-red-500/40 shadow-red-glow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-accent shadow-red-glow-sm">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-red-accent uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-brand" />
                  <span>Currently Active Vehicle Filter</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year ? `(${selectedVehicle.year})` : ""}
                </div>
                <div className="text-xs text-silver-400">
                  Showing {compatibleProducts.length} accessories guaranteed to fit your vehicle
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetCar}
                className="px-4 py-2.5 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-white border border-white/10 text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-accent" />
                <span>Change Car Model</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Hasnain Auto, I am looking for custom accessories for my ${selectedVehicle.make} ${selectedVehicle.model}. What packages do you recommend?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-whatsapp text-carbon-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-whatsapp-glow hover:bg-whatsapp-hover transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-carbon-950" />
                <span>WhatsApp Car Specialist</span>
              </a>
            </div>
          </div>
        ) : (
          /* STEPPING SELECTION WORKFLOW (Brand -> Model) */
          <div className="mb-12 space-y-8 bg-carbon-900/60 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            {/* Step 1: Select Brand */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    Select Your Vehicle Make (Brand)
                  </h2>
                </div>
                {selectedMake && (
                  <span className="text-xs text-red-accent font-bold">
                    Selected: {selectedMake.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {VEHICLE_DATABASE.map((make) => {
                  const isSelected = selectedMake?.slug === make.slug;
                  return (
                    <button
                      key={make.slug}
                      type="button"
                      onClick={() => handleSelectMake(make)}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                        isSelected
                          ? "bg-red-600/20 border-red-500 ring-2 ring-red-500 shadow-red-glow-sm"
                          : "bg-carbon-950/80 border-white/10 hover:border-red-500/40 hover:bg-carbon-900"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black uppercase transition-colors ${
                        isSelected ? "bg-red-600 text-white" : "bg-carbon-850 text-silver-300 group-hover:text-white"
                      }`}>
                        {make.name.slice(0, 2)}
                      </div>
                      <span className="text-xs font-black text-white tracking-wide">
                        {make.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Model (Visible if Brand Selected) */}
            {selectedMake && (
              <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                      Select {selectedMake.name} Model
                    </h2>
                  </div>
                  <span className="text-xs text-silver-400">
                    {selectedMake.models.length} popular models available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {selectedMake.models.map((model) => (
                    <button
                      key={model.name}
                      type="button"
                      onClick={() => handleSelectModel(model)}
                      className="p-4 rounded-2xl bg-carbon-950/90 hover:bg-carbon-850 border border-white/10 hover:border-red-500/50 text-left transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-silver-400 group-hover:text-red-accent transition-colors">
                          {selectedMake.name}
                        </div>
                        <div className="text-sm sm:text-base font-black text-white mt-0.5">
                          {model.name}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-silver-400">
                        <span>Guaranteed Fit</span>
                        <ChevronRight className="w-3.5 h-3.5 text-silver-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: COMPATIBLE PRODUCTS DISPLAY */}
        {selectedVehicle ? (
          <div>
            {/* Category Filter Pills for Selected Car */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    selectedCategory === "all"
                      ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                      : "bg-carbon-900 text-silver-300 border-white/10 hover:text-white"
                  }`}
                >
                  All Accessories ({compatibleProducts.length})
                </button>
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                      selectedCategory === cat.slug
                        ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                        : "bg-carbon-900 text-silver-300 border-white/10 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="hidden sm:block text-xs font-bold text-silver-400 shrink-0">
                Fitment Guaranteed at Kashmir Road Saddar Showroom
              </div>
            </div>

            {/* Product Grid */}
            {compatibleProducts.length === 0 ? (
              <div className="text-center py-16 bg-carbon-900/40 rounded-3xl border border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-carbon-800 flex items-center justify-center text-silver-400 mx-auto">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-white">
                  No items listed for {selectedVehicle.make} {selectedVehicle.model} in this category
                </h3>
                <p className="text-xs text-silver-400 max-w-md mx-auto">
                  We carry bespoke patterns for all {selectedVehicle.make} vehicles at our Saddar workshop. Contact our master craftsman directly.
                </p>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Hasnain Auto, do you have ${selectedCategory} for ${selectedVehicle.make} ${selectedVehicle.model}?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-whatsapp text-carbon-950 font-black text-xs uppercase tracking-wider shadow-whatsapp-glow hover:bg-whatsapp-hover transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-carbon-950" />
                  <span>Request Custom Fit on WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {compatibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Feature Callout before car selection */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-carbon-900/50 border border-white/10 space-y-2">
              <ShieldCheck className="w-8 h-8 text-red-brand" />
              <h3 className="text-base font-bold text-white">Laser-Measured Fitment</h3>
              <p className="text-xs text-silver-400 leading-relaxed">
                Every seat cover and 7D floor mat is tailored to the exact floorpan and bucket contour of your specific Pakistani vehicle.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-carbon-900/50 border border-white/10 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-brand" />
              <h3 className="text-base font-bold text-white">Plug-and-Play Headlights</h3>
              <p className="text-xs text-silver-400 leading-relaxed">
                Precision sockets matching H4, H11, 9005 & HB3 standards without wire cutting or invalidating your car warranty.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-carbon-900/50 border border-white/10 space-y-2">
              <Car className="w-8 h-8 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Showroom Installation</h3>
              <p className="text-xs text-silver-400 leading-relaxed">
                Visit our Saddar, Rawalpindi showroom for free fitment consultation and professional same-day upholstery installation.
              </p>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <ProductQuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Car,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Search,
  Wrench,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  VEHICLE_DATABASE as VEHICLE_MAKES,
  YEARS_LIST,
} from "@/data/vehicles";

interface VehicleSpec {
  make: string;
  model: string;
  years: string;
  headlight: string;
  fog: string;
  topRecommendedSku: string;
  heroProductSlug: string;
  heroProductName: string;
  heroProductImage: string;
  heroProductPrice: number;
  reason: string;
}

/* Existing fitment + recommended-product data (unchanged).
   The repo src/data/vehicles.ts only carries Make / Model / Year lists,
   so the socket/fitment data stays here as before. */
const FITMENT_DATABASE: VehicleSpec[] = [
  // Suzuki
  {
    make: "Suzuki",
    model: "Alto (660cc)",
    years: "2019 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "N/A (Standard Bumper)",
    topRecommendedSku: "008 Y6 Mini Projector",
    heroProductSlug: "y6-projector-led-h4",
    heroProductName: "Y6 H4 Laser Cut-Off Mini Projector Lens",
    heroProductImage: "/images/products/y6-projector-ai-hero.jpg",
    heroProductPrice: 4999,
    reason: "Gives a razor-sharp projector beam cutoff without opening the headlight seal. 0% glare to oncoming traffic!"
  },
  {
    make: "Suzuki",
    model: "Cultus (New Shape)",
    years: "2017 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11 / H8",
    topRecommendedSku: "002 Mother 6-Copper",
    heroProductSlug: "mother-6-copper-led-headlights",
    heroProductName: "Mother 6-Copper 35,000 LM Extreme Headlight",
    heroProductImage: "/images/products/mother-6-copper-ai-hero.jpg",
    heroProductPrice: 6499,
    reason: "Heavy-duty 6 copper liquid pipes with 12,000 RPM turbo fan for maximum highway penetration."
  },
  {
    make: "Suzuki",
    model: "Wagon R (PKDM)",
    years: "2014 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    topRecommendedSku: "001 Rego Racing 4-Copper",
    heroProductSlug: "rego-racing-led-headlights",
    heroProductName: "Rego Racing 4-Copper 260W German Tech",
    heroProductImage: "/images/products/rego-racing-ai-hero.jpg",
    heroProductPrice: 5899,
    reason: "German thermal dissipation with external Canbus driver and pure 6500K diamond white light."
  },
  {
    make: "Suzuki",
    model: "Swift (Old Shape)",
    years: "2010 – 2021",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    topRecommendedSku: "008 Y6 Mini Projector",
    heroProductSlug: "y6-projector-led-h4",
    heroProductName: "Y6 H4 Laser Cut-Off Mini Projector Lens",
    heroProductImage: "/images/products/y6-projector-ai-hero.jpg",
    heroProductPrice: 4999,
    reason: "Instant optical upgrade. Replaces dim stock reflectors with luxury laser-focused projector light."
  },
  {
    make: "Suzuki",
    model: "Mehran / Bolan / Ravi",
    years: "All Years",
    headlight: "H4 (Dual Beam)",
    fog: "N/A",
    topRecommendedSku: "007 Black Box Rego",
    heroProductSlug: "black-box-rego-led-headlights",
    heroProductName: "Black Box Rego 2-Copper 180W 25,000 LM",
    heroProductImage: "/images/products/black-box-rego-led-01.jpg",
    heroProductPrice: 4799,
    reason: "High efficiency, low electrical load, highly reliable for daily commute."
  },

  // Toyota
  {
    make: "Toyota",
    model: "Corolla GLi / XLi / Altis 1.6",
    years: "2014 – 2020",
    headlight: "Low: 9006 / H11 · High: 9005 (HB3)",
    fog: "H11",
    topRecommendedSku: "003 B-Pro 8-Copper",
    heroProductSlug: "b-pro-8-copper-led-headlights",
    heroProductName: "B-Pro 8-Copper Extreme Highway Beast",
    heroProductImage: "/images/products/b-pro-8-copper-ai-hero.jpg",
    heroProductPrice: 6800,
    reason: "8 vacuum copper liquid tubes. Engineered for Motorway & GT Road long-distance night travel."
  },
  {
    make: "Toyota",
    model: "Corolla Grande",
    years: "2014 – 2020",
    headlight: "High Beam: 9005 (HB3)",
    fog: "H11",
    topRecommendedSku: "010 Golden Box Rego",
    heroProductSlug: "golden-box-rego-led-headlights",
    heroProductName: "Golden Box Rego 4-Copper 230W 35,000 LM",
    heroProductImage: "/images/products/golden-box-rego-4k-master.jpg",
    heroProductPrice: 5799,
    reason: "Instant instant-flash response on high-beam pass button with 35,000 LM golden-grade diodes."
  },
  {
    make: "Toyota",
    model: "Yaris (Base / ATIV)",
    years: "2020 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    topRecommendedSku: "004 Mother 5-Copper",
    heroProductSlug: "mother-5-copper-led-headlights",
    heroProductName: "Mother 5-Copper 260W 6000K Pure White",
    heroProductImage: "/images/products/mother-6-copper-studio.jpg",
    heroProductPrice: 5999,
    reason: "Optimal 6000K color temperature matches modern vehicle electronics with full Canbus safety."
  },
  {
    make: "Toyota",
    model: "Hilux Revo / Fortuner",
    years: "2016 – Present",
    headlight: "Low: H11 · High: 9005 (HB3)",
    fog: "H11",
    topRecommendedSku: "011 Wooden Box Zinc Alloy",
    heroProductSlug: "wooden-box-zinc-alloy-led-headlights",
    heroProductName: "Wooden Box Zinc Alloy with External ATD Driver",
    heroProductImage: "/images/products/wooden-box-zinc-alloy-ai-hero.jpg",
    heroProductPrice: 7999,
    reason: "Executive Zinc-Alloy build with external ATD driver and heat-resistant braided wire harness."
  },

  // Honda
  {
    make: "Honda",
    model: "Civic X (10th Gen Oriel)",
    years: "2016 – 2021",
    headlight: "Low: H11 · High: 9005 (HB3)",
    fog: "H11",
    topRecommendedSku: "003 B-Pro 8-Copper",
    heroProductSlug: "b-pro-8-copper-led-headlights",
    heroProductName: "B-Pro 8-Copper Extreme Highway Beast",
    heroProductImage: "/images/products/b-pro-8-copper-ai-hero.jpg",
    heroProductPrice: 6800,
    reason: "Unrivalled light throw with zero dashboard bulb warnings or radio interference."
  },
  {
    make: "Honda",
    model: "Civic Rebirth (9th Gen)",
    years: "2012 – 2016",
    headlight: "Low: 9006 · High: 9005",
    fog: "H11",
    topRecommendedSku: "002 Mother 6-Copper",
    heroProductSlug: "mother-6-copper-led-headlights",
    heroProductName: "Mother 6-Copper 35,000 LM Extreme Headlight",
    heroProductImage: "/images/products/mother-6-copper-ai-hero.jpg",
    heroProductPrice: 6499,
    reason: "Immediate night vision upgrade with 12,000 RPM turbo cooling."
  },
  {
    make: "Honda",
    model: "City (i-DSI / i-VTEC 2009–2021)",
    years: "2009 – 2021",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    topRecommendedSku: "008 Y6 Mini Projector",
    heroProductSlug: "y6-projector-led-h4",
    heroProductName: "Y6 H4 Laser Cut-Off Mini Projector Lens",
    heroProductImage: "/images/products/y6-projector-ai-hero.jpg",
    heroProductPrice: 4999,
    reason: "Perfect horizontal beam cutoff. Replaces old City halogen light with luxury projector output."
  },
  {
    make: "Honda",
    model: "City (New Shape 6th Gen)",
    years: "2021 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    topRecommendedSku: "001 Rego Racing 4-Copper",
    heroProductSlug: "rego-racing-led-headlights",
    heroProductName: "Rego Racing 4-Copper 260W German Tech",
    heroProductImage: "/images/products/rego-racing-ai-hero.jpg",
    heroProductPrice: 5899,
    reason: "Preserves warranty with 100% plug & play fitment. No wire splicing required."
  },

  // Kia & Hyundai
  {
    make: "Kia & Hyundai",
    model: "Kia Sportage Alpha",
    years: "2019 – Present",
    headlight: "Low/High: 9005 (HB3)",
    fog: "H11",
    topRecommendedSku: "002 Mother 6-Copper",
    heroProductSlug: "mother-6-copper-led-headlights",
    heroProductName: "Mother 6-Copper 35,000 LM Extreme Headlight",
    heroProductImage: "/images/products/mother-6-copper-ai-hero.jpg",
    heroProductPrice: 6499,
    reason: "Replaces yellow halogen projection with blazing 35,000 LM pure diamond white light."
  },
  {
    make: "Kia & Hyundai",
    model: "Hyundai Tucson GL",
    years: "2020 – Present",
    headlight: "Low/High: 9005 (HB3)",
    fog: "N/A",
    topRecommendedSku: "003 B-Pro 8-Copper",
    heroProductSlug: "b-pro-8-copper-led-headlights",
    heroProductName: "B-Pro 8-Copper Extreme Highway Beast",
    heroProductImage: "/images/products/b-pro-8-copper-ai-hero.jpg",
    heroProductPrice: 6800,
    reason: "Ultra long throw beam designed for crossover SUV ride height."
  }
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Match a repo Make/Model pick to the fitment database (fuzzy: "Alto" matches "Alto (660cc)", "Fortuner" matches "Hilux Revo / Fortuner"). */
function findFitment(make: string, model: string): VehicleSpec | undefined {
  const m = norm(make);
  const mo = norm(model);
  return FITMENT_DATABASE.find(
    (v) => norm(v.make).includes(m) && norm(v.model).includes(mo)
  );
}

const selectClass =
  "w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-3 text-sm font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition";

export const VehicleSocketFinderHero: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [searched, setSearched] = useState(false);
  const [match, setMatch] = useState<VehicleSpec | undefined>(undefined);

  const makes = VEHICLE_MAKES.map((v) => v.name);
  const selectedMakeData = VEHICLE_MAKES.find((v) => v.name === selectedMake);
  const availableModels = selectedMakeData ? selectedMakeData.models : [];
  const selectedModelData = availableModels.find((v) => v.name === selectedModel);
  const availableYears = selectedModelData ? selectedModelData.years : YEARS_LIST;

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
    setSelectedModel("");
    setSelectedYear("");
    setSearched(false);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setSelectedYear("");
    setSearched(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setSearched(false);
  };

  const canSearch = Boolean(selectedMake && selectedModel && selectedYear);

  const handleSearch = () => {
    if (!canSearch) return;
    setMatch(findFitment(selectedMake, selectedModel));
    setSearched(true);
  };

  const vehicleLabel = `${selectedMake} ${selectedModel}${selectedYear ? ` (${selectedYear})` : ""}`;

  const whatsappOrderUrl = (vehicle: VehicleSpec) =>
    `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
      `Assalam-o-Alaikum Hasnain Auto! I want to order LED headlights for my car:\n` +
      `• Car: ${vehicle.make} ${vehicle.model} (${selectedYear || vehicle.years})\n` +
      `• Required Socket: ${vehicle.headlight}\n` +
      `• Recommended Product: ${vehicle.heroProductName} (Rs. ${vehicle.heroProductPrice.toLocaleString()})\n` +
      `• Please confirm 1-Year Warranty & Cash on Delivery!`
    )}`;

  const whatsappAskUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Assalam-o-Alaikum Hasnain Auto! Please confirm the LED headlight socket and best product for my car:\n` +
    `• Car: ${vehicleLabel}\n` +
    `• Please confirm 1-Year Warranty & Cash on Delivery!`
  )}`;

  return (
    <section className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ─── Compact "SELECT YOUR VEHICLE" box (AuxLEDs style) ─── */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg shadow-neutral-900/5 dark:shadow-black/40 p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-center gap-4 sm:gap-5">
            <Car
              className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 fill-neutral-900 text-neutral-900 dark:fill-white dark:text-white"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span aria-hidden="true" className="h-12 w-[2px] shrink-0 bg-red-600" />
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                Select Your Vehicle
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Provide vehicle details to confirm fitment
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label htmlFor="vehicle-make" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                Make
              </label>
              <select
                id="vehicle-make"
                value={selectedMake}
                onChange={handleMakeChange}
                className={selectClass}
              >
                <option value="">Select Make</option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="vehicle-model" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                Model
              </label>
              <select
                id="vehicle-model"
                value={selectedModel}
                onChange={handleModelChange}
                disabled={!selectedMake}
                className={`${selectClass} disabled:opacity-50`}
              >
                <option value="">Select Model</option>
                {availableModels.map((v) => (
                  <option key={v.name} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="vehicle-year" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                Year
              </label>
              <select
                id="vehicle-year"
                value={selectedYear}
                onChange={handleYearChange}
                disabled={!selectedModel}
                className={`${selectClass} disabled:opacity-50`}
              >
                <option value="">Select Year</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-900/60 disabled:cursor-not-allowed text-white text-sm font-black uppercase tracking-wider shadow-md shadow-red-600/25 transition"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {!canSearch && !searched && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-3 flex items-center justify-center gap-1.5">
              <Car className="w-3.5 h-3.5" />
              Select make, model and year, then press Search to see your exact socket match.
            </p>
          )}
        </div>

        {/* ─── Search result: fitment match ─── */}
        {searched && match && (
          <div className="max-w-4xl mx-auto mt-6 bg-white dark:bg-neutral-900 border border-red-600/30 dark:border-red-500/30 rounded-2xl shadow-lg shadow-neutral-900/5 dark:shadow-black/40 p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: fitment data */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
                    Verified Socket Match Found
                  </span>
                </div>

                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                  {match.make} {match.model}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Your Vehicle: <strong className="text-neutral-800 dark:text-neutral-200">{vehicleLabel}</strong>
                  {" · "}Model Range: <strong className="text-neutral-800 dark:text-neutral-200">{match.years}</strong>
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 p-3 rounded-xl">
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block font-semibold">
                      Headlight Socket
                    </span>
                    <span className="text-base font-black text-red-600 dark:text-red-400">
                      {match.headlight}
                    </span>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl">
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block font-semibold">
                      Fog Light Socket
                    </span>
                    <span className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                      {match.fog}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-xs text-red-800 dark:text-red-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{match.reason}</span>
                </div>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                  <span>
                    <strong>Rawalpindi / Islamabad Drivers:</strong> Free beam alignment at Hasnain Auto Saddar workshop!
                  </span>
                </div>
              </div>

              {/* Right: recommended product card */}
              <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <Image
                    src={match.heroProductImage}
                    alt={match.heroProductName}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-[10px] font-black uppercase tracking-wider mb-2">
                    Top Recommended Kit
                  </div>

                  <h4 className="text-lg font-black text-neutral-900 dark:text-white leading-snug">
                    {match.heroProductName}
                  </h4>

                  <div className="flex items-baseline justify-center sm:justify-start gap-2 my-2">
                    <span className="text-2xl font-black text-neutral-900 dark:text-white">
                      <span className="text-xs text-red-600 dark:text-red-400 mr-1">Rs.</span>
                      {match.heroProductPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Pair • 1-Year Warranty</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <a
                      href={whatsappOrderUrl(match)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Order for {match.model} on WhatsApp
                    </a>

                    <Link
                      href={`/product/${match.heroProductSlug}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs font-bold transition"
                    >
                      <span>Full Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Search result: no exact fitment record ─── */}
        {searched && !match && (
          <div className="max-w-4xl mx-auto mt-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg shadow-neutral-900/5 dark:shadow-black/40 p-5 sm:p-6 text-center">
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {vehicleLabel}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              We don&apos;t have an exact socket record saved for this model yet.
              Message us on WhatsApp and we will confirm the right LED kit for your car.
            </p>
            <a
              href={whatsappAskUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Confirm fitment on WhatsApp
            </a>
          </div>
        )}

        {/* Quick Sockets Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Quick Direct Sockets:</span>
          {["H4 Dual Beam", "H11 Low/Fog", "9005 High Beam", "9006 Low", "H7 Projector"].map((sock) => (
            <Link
              key={sock}
              href={`/shop?category=led-lights&socket=${sock.split(" ")[0]}`}
              className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-red-600/50 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition font-mono text-[11px]"
            >
              {sock} →
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

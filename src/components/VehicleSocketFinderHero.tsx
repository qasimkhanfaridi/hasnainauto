"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Car, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Wrench,
  Gauge
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

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

const VEHICLE_DATABASE: VehicleSpec[] = [
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

export const VehicleSocketFinderHero: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState<string>("Suzuki");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(VEHICLE_DATABASE[0]);

  const makes = Array.from(new Set(VEHICLE_DATABASE.map((v) => v.make)));
  const availableModels = VEHICLE_DATABASE.filter((v) => v.make === selectedMake);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMake = e.target.value;
    setSelectedMake(newMake);
    const firstModel = VEHICLE_DATABASE.find((v) => v.make === newMake);
    if (firstModel) setSelectedVehicle(firstModel);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicle = VEHICLE_DATABASE.find((v) => v.make === selectedMake && v.model === e.target.value);
    if (vehicle) setSelectedVehicle(vehicle);
  };

  const whatsappOrderUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Assalam-o-Alaikum Hasnain Auto! I want to order LED headlights for my car:\n` +
    `• Car: ${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.years})\n` +
    `• Required Socket: ${selectedVehicle.headlight}\n` +
    `• Recommended Product: ${selectedVehicle.heroProductName} (Rs. ${selectedVehicle.heroProductPrice.toLocaleString()})\n` +
    `• Please confirm 1-Year Warranty & Cash on Delivery!`
  )}`;

  return (
    <section className="relative py-12 sm:py-16 bg-[#070b12] text-white border-b border-gray-800/80 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Trust Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Pakistan Smart Vehicle Fitment Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            FIND THE EXACT LEDS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              ENGINEERED FOR YOUR CAR
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
            Select your vehicle below. Our system instantly matches your factory headlight socket, eliminates glare, and configures Canbus compatibility.
          </p>
        </div>

        {/* ─── Interactive Console Box ─── */}
        <div className="bg-gradient-to-b from-[#101726] to-[#0a0f1a] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80">
          
          {/* Dropdown Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-cyan-400" />
                Step 1: Select Car Make
              </label>
              <select
                value={selectedMake}
                onChange={handleMakeChange}
                className="w-full bg-[#080d16] border border-gray-700/80 rounded-xl px-4 py-3.5 text-sm font-semibold text-white focus:outline-none focus:border-cyan-400 transition"
              >
                {makes.map((m) => (
                  <option key={m} value={m} className="bg-[#080d16]">
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Step 2: Select Car Model & Shape
              </label>
              <select
                value={selectedVehicle.model}
                onChange={handleModelChange}
                className="w-full bg-[#080d16] border border-gray-700/80 rounded-xl px-4 py-3.5 text-sm font-semibold text-white focus:outline-none focus:border-cyan-400 transition"
              >
                {availableModels.map((v) => (
                  <option key={v.model} value={v.model} className="bg-[#080d16]">
                    {v.model} ({v.years})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ─── Result Diagnostic & Recommendation Card ─── */}
          <div className="mt-6 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Fitment Data */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Verified Socket Match Found
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">
                {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-xs text-gray-400">
                Model Range: <strong className="text-gray-200">{selectedVehicle.years}</strong>
              </p>

              {/* Socket Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#080c14] border border-cyan-500/30 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                    Headlight Socket
                  </span>
                  <span className="text-base font-black text-cyan-300">
                    {selectedVehicle.headlight}
                  </span>
                </div>
                <div className="bg-[#080c14] border border-gray-800 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                    Fog Light Socket
                  </span>
                  <span className="text-base font-bold text-gray-200">
                    {selectedVehicle.fog}
                  </span>
                </div>
              </div>

              {/* Why it matches */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{selectedVehicle.reason}</span>
              </div>

              {/* Workshop fitting note */}
              <div className="text-[11px] text-gray-400 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-amber-brand shrink-0" />
                <span>
                  <strong>Rawalpindi / Islamabad Drivers:</strong> Free beam alignment at Hasnain Auto Saddar workshop!
                </span>
              </div>
            </div>

            {/* Right: The Match Product Card */}
            <div className="lg:col-span-7 bg-[#0b101c] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
              
              {/* Product Photo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-[#131b2e] to-[#070b12] rounded-xl border border-gray-800 overflow-hidden shrink-0 flex items-center justify-center p-2">
                <Image
                  src={selectedVehicle.heroProductImage}
                  alt={selectedVehicle.heroProductName}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Details & WhatsApp Actions */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider mb-2">
                  Top Recommended Kit
                </div>
                
                <h4 className="text-lg font-black text-white leading-snug">
                  {selectedVehicle.heroProductName}
                </h4>

                <div className="flex items-baseline justify-center sm:justify-start gap-2 my-2">
                  <span className="text-2xl font-black text-white">
                    <span className="text-xs text-cyan-400 mr-1">Rs.</span>
                    {selectedVehicle.heroProductPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">Pair • 1-Year Warranty</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <a
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-green-950/40 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Order for {selectedVehicle.model} on WhatsApp
                  </a>

                  <Link
                    href={`/product/${selectedVehicle.heroProductSlug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition border border-gray-700"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Quick Sockets Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
          <span className="font-semibold text-gray-500 uppercase tracking-wider">Quick Direct Sockets:</span>
          {["H4 Dual Beam", "H11 Low/Fog", "9005 High Beam", "9006 Low", "H7 Projector"].map((sock) => (
            <Link
              key={sock}
              href={`/shop?category=led-lights&socket=${sock.split(" ")[0]}`}
              className="px-3 py-1 rounded-lg bg-[#0f1624] border border-gray-800 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-300 transition font-mono text-[11px]"
            >
              {sock} →
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

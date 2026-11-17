"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  ShieldCheck,
  Search,
  Wrench,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  VEHICLE_DATABASE as VEHICLE_MAKES,
  YEARS_LIST,
} from "@/data/vehicles";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface VehicleSpec {
  make: string;
  model: string;
  years: string;
  headlight: string;
  fog: string;
  reason: string;
}

/* Fitment data only — the old recommended-product fields were removed
   2026-11-16 when all products were taken off the site.
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
    reason: "Gives a razor-sharp projector beam cutoff without opening the headlight seal. 0% glare to oncoming traffic!"
  },
  {
    make: "Suzuki",
    model: "Cultus (New Shape)",
    years: "2017 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11 / H8",
    reason: "Heavy-duty 6 copper liquid pipes with 12,000 RPM turbo fan for maximum highway penetration."
  },
  {
    make: "Suzuki",
    model: "Wagon R (PKDM)",
    years: "2014 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    reason: "German thermal dissipation with external Canbus driver and pure 6500K diamond white light."
  },
  {
    make: "Suzuki",
    model: "Swift (Old Shape)",
    years: "2010 – 2021",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    reason: "Instant optical upgrade. Replaces dim stock reflectors with luxury laser-focused projector light."
  },
  {
    make: "Suzuki",
    model: "Mehran / Bolan / Ravi",
    years: "All Years",
    headlight: "H4 (Dual Beam)",
    fog: "N/A",
    reason: "High efficiency, low electrical load, highly reliable for daily commute."
  },

  // Toyota
  {
    make: "Toyota",
    model: "Corolla GLi / XLi / Altis 1.6",
    years: "2014 – 2020",
    headlight: "Low: 9006 / H11 · High: 9005 (HB3)",
    fog: "H11",
    reason: "8 vacuum copper liquid tubes. Engineered for Motorway & GT Road long-distance night travel."
  },
  {
    make: "Toyota",
    model: "Corolla Grande",
    years: "2014 – 2020",
    headlight: "High Beam: 9005 (HB3)",
    fog: "H11",
    reason: "Instant instant-flash response on high-beam pass button with 35,000 LM golden-grade diodes."
  },
  {
    make: "Toyota",
    model: "Yaris (Base / ATIV)",
    years: "2020 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    reason: "Optimal 6000K color temperature matches modern vehicle electronics with full Canbus safety."
  },
  {
    make: "Toyota",
    model: "Hilux Revo / Fortuner",
    years: "2016 – Present",
    headlight: "Low: H11 · High: 9005 (HB3)",
    fog: "H11",
    reason: "Executive Zinc-Alloy build with external ATD driver and heat-resistant braided wire harness."
  },

  // Honda
  {
    make: "Honda",
    model: "Civic X (10th Gen Oriel)",
    years: "2016 – 2021",
    headlight: "Low: H11 · High: 9005 (HB3)",
    fog: "H11",
    reason: "Unrivalled light throw with zero dashboard bulb warnings or radio interference."
  },
  {
    make: "Honda",
    model: "Civic Rebirth (9th Gen)",
    years: "2012 – 2016",
    headlight: "Low: 9006 · High: 9005",
    fog: "H11",
    reason: "Immediate night vision upgrade with 12,000 RPM turbo cooling."
  },
  {
    make: "Honda",
    model: "City (i-DSI / i-VTEC 2009–2021)",
    years: "2009 – 2021",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    reason: "Perfect horizontal beam cutoff. Replaces old City halogen light with luxury projector output."
  },
  {
    make: "Honda",
    model: "City (New Shape 6th Gen)",
    years: "2021 – Present",
    headlight: "H4 (Dual Beam)",
    fog: "H11",
    reason: "Preserves warranty with 100% plug & play fitment. No wire splicing required."
  },

  // Kia & Hyundai
  {
    make: "Kia & Hyundai",
    model: "Kia Sportage Alpha",
    years: "2019 – Present",
    headlight: "Low/High: 9005 (HB3)",
    fog: "H11",
    reason: "Replaces yellow halogen projection with blazing 35,000 LM pure diamond white light."
  },
  {
    make: "Kia & Hyundai",
    model: "Hyundai Tucson GL",
    years: "2020 – Present",
    headlight: "Low/High: 9005 (HB3)",
    fog: "N/A",
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
            <div className="grid grid-cols-1 gap-6 items-center">
              {/* Fitment data */}
              <div className="space-y-4">
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

                <a
                  href={whatsappAskUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                  Order for {match.model} on WhatsApp
                </a>
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
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

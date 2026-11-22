"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  VEHICLE_DATABASE as VEHICLE_MAKES,
  YEARS_LIST,
} from "@/data/vehicles";
import type { Product } from "@/data/products";
import {
  findFitment,
  type VehicleSpec,
} from "@/components/VehicleSocketFinderHero";

// Real WhatsApp logo (same glyph as the floating WhatsApp button).
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const HEADLIGHT_SOCKETS = ["H4", "H11", "9005", "9006", "H7"];
const ALL_SOCKETS = ["9005", "9006", "H11", "H4", "H7", "T10"];

/** Extract standard socket tokens (H4, H11, 9005...) from a spec string. */
function socketsOf(text?: string): string[] {
  if (!text) return [];
  const up = ` ${text.toUpperCase()} `;
  return ALL_SOCKETS.filter((t) => up.includes(` ${t}`) || up.includes(`${t} `) || up.includes(`/${t}`) || up.includes(`${t}/`));
}

type Verdict =
  | { kind: "fits"; universalNote?: string; match?: VehicleSpec }
  | { kind: "nofit"; match: VehicleSpec }
  | { kind: "norecord" };

const selectClass =
  "w-full bg-neutral-700 text-white text-xs font-semibold rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-red-600/50 disabled:opacity-50 appearance-none cursor-pointer";
const labelClass =
  "block text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-gray-400 mb-1";

/**
 * Small "Verify fitment with your vehicle" box for the product page —
 * AuxLEDs product-page structure (Make / Model / Year + VERIFY + Clear
 * filters, then a FITS YOUR / DOES NOT FIT YOUR result with a Change
 * vehicle link), running on Hasnain's own vehicle + fitment data (the
 * same data the homepage SELECT YOUR VEHICLE finder uses). Local state
 * only — it never touches the global vehicle context.
 * 2026-11-20 (sumair, client's request).
 */
export const ProductFitmentVerifier: React.FC<{ product: Product }> = ({
  product,
}) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const makes = VEHICLE_MAKES.map((v) => v.name);
  const makeData = VEHICLE_MAKES.find((v) => v.name === make);
  const models = makeData ? makeData.models : [];
  const modelData = models.find((v) => v.name === model);
  const years = modelData ? modelData.years : YEARS_LIST;

  const canVerify = Boolean(make && model && year);
  const vehicleLabel = `${make} ${model} ${year}`;

  const handleVerify = () => {
    if (!canVerify) return;
    const productSockets = socketsOf(product.specifications?.Socket);
    const isHeadlightProduct = productSockets.some((s) =>
      HEADLIGHT_SOCKETS.includes(s)
    );
    if (!isHeadlightProduct) {
      // No headlight socket (interior / parking bulbs, festoon, light
      // bars, dome kits) — universal fit, no vehicle socket needed.
      setVerdict({
        kind: "fits",
        universalNote: "Universal Fit — no headlight socket needed",
        match: findFitment(make, model),
      });
      return;
    }
    const match = findFitment(make, model);
    if (!match) {
      setVerdict({ kind: "norecord" });
      return;
    }
    const vehicleSockets = [
      ...socketsOf(match.headlight),
      ...socketsOf(match.fog),
    ];
    const fits = productSockets.some((s) => vehicleSockets.includes(s));
    setVerdict(fits ? { kind: "fits", match } : { kind: "nofit", match });
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    setYear("");
    setVerdict(null);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Assalam-o-Alaikum Hasnain Auto! Please confirm if this product fits my car:\n` +
      `• Product: ${product.name}\n` +
      `• Car: ${vehicleLabel}`
  )}`;

  return (
    <div className="rounded-xl bg-neutral-200/80 dark:bg-carbon-800 border border-neutral-300 dark:border-white/10 p-3.5">
      <h3 className="text-[13px] font-bold text-neutral-900 dark:text-white mb-2.5">
        Verify fitment with your vehicle
      </h3>

      {!verdict && (
        <div className="space-y-2">
          <div>
            <label htmlFor="pfv-make" className={labelClass}>
              Make
            </label>
            <select
              id="pfv-make"
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
                setYear("");
              }}
              className={selectClass}
            >
              <option value="">Select Make</option>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pfv-model" className={labelClass}>
              Model
            </label>
            <select
              id="pfv-model"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setYear("");
              }}
              disabled={!make}
              className={selectClass}
            >
              <option value="">Select Model</option>
              {models.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pfv-year" className={labelClass}>
              Year
            </label>
            <select
              id="pfv-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!model}
              className={selectClass}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleVerify}
              disabled={!canVerify}
              className="flex-1 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider transition"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 py-2 rounded-md bg-white dark:bg-carbon-900 border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-gray-200 text-xs font-bold transition hover:bg-neutral-50 dark:hover:bg-carbon-850"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {verdict?.kind === "fits" && (
        <div>
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 p-3">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">
                Fits your:
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
              {vehicleLabel}{" "}
              <button
                type="button"
                onClick={() => setVerdict(null)}
                className="text-xs font-semibold text-neutral-500 dark:text-gray-400 underline underline-offset-2 hover:text-red-600"
              >
                (Change vehicle)
              </button>
            </p>
            {verdict.universalNote && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                {verdict.universalNote}
              </p>
            )}
          </div>
        </div>
      )}

      {verdict?.kind === "nofit" && (
        <div>
          <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 p-3">
            <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
              <XCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">
                Does not fit your:
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
              {vehicleLabel}{" "}
              <button
                type="button"
                onClick={() => setVerdict(null)}
                className="text-xs font-semibold text-neutral-500 dark:text-gray-400 underline underline-offset-2 hover:text-red-600"
              >
                (Change vehicle)
              </button>
            </p>
            <p className="text-[11px] text-red-700 dark:text-red-400 font-semibold mt-1">
              This product is {product.specifications?.Socket} — your car
              needs {verdict.match.headlight}
            </p>
          </div>
        </div>
      )}

      {verdict?.kind === "norecord" && (
        <div className="rounded-lg bg-white dark:bg-carbon-900 border border-neutral-300 dark:border-white/10 p-3">
          <p className="text-xs font-bold text-gray-900 dark:text-white">{vehicleLabel}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            We don&apos;t have an exact socket record for this model yet.
            Confirm on WhatsApp and we will tell you the right fit.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d={WHATSAPP_PATH} />
              </svg>
              Confirm fitment
            </a>
            <button
              type="button"
              onClick={() => setVerdict(null)}
              className="text-xs font-semibold text-neutral-500 dark:text-gray-400 underline underline-offset-2 hover:text-red-600"
            >
              (Change vehicle)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

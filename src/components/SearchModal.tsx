"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ChevronRight, Car, CheckCircle2, ArrowRight } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";
import { VEHICLE_DATABASE } from "@/data/vehicles";

// Real WhatsApp logo glyph (same as the floating button / product page).
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedVehicle } = useVehicle();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Multi-token natural language search algorithm
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  // Detect vehicle mention in tokens
  const detectedVehicle = tokens.length > 0 ? VEHICLE_DATABASE.find((v) => {
    const makeMatch = tokens.includes(v.name.toLowerCase()) || tokens.includes(v.slug);
    const modelMatch = v.models.some((m) => tokens.includes(m.name.toLowerCase()));
    return makeMatch || modelMatch;
  }) : null;

  const filteredProducts: { product: Product; score: number }[] = [];

  if (tokens.length > 0) {
    ACTIVE_PRODUCTS_DATA.forEach((p) => {
      // Build searchable corpus for this product
      const corpusParts: string[] = [
        p.name.toLowerCase(),
        p.shortDescription.toLowerCase(),
        p.description.toLowerCase(),
        p.category.toLowerCase(),
        (p.subcategory || "").toLowerCase(),
        (p.brand || "").toLowerCase(),
        p.features.join(" ").toLowerCase(),
        Object.entries(p.specifications || {})
          .map(([k, v]) => `${k} ${v}`)
          .join(" ")
          .toLowerCase(),
        (p.vehicleCompatibility.note || "").toLowerCase(),
      ];

      if (p.vehicleCompatibility.makes) {
        corpusParts.push(...p.vehicleCompatibility.makes.map((m) => m.toLowerCase()));
      }
      if (p.vehicleCompatibility.models) {
        corpusParts.push(...p.vehicleCompatibility.models.map((m) => m.toLowerCase()));
      }

      const fullCorpus = corpusParts.join(" ");

      let matchCount = 0;
      let score = 0;

      for (const token of tokens) {
        let tokenMatched = false;
        const tokenRegex = token.length <= 3 ? new RegExp(`\\b${token}\\b`, "i") : null;

        // Direct token hit in corpus (word boundary for short words like led, h4, etc.)
        if (tokenRegex ? tokenRegex.test(fullCorpus) : fullCorpus.includes(token)) {
          tokenMatched = true;
          score += 10;
        }

        // Title hit gets extra boost
        if (tokenRegex ? tokenRegex.test(p.name) : p.name.toLowerCase().includes(token)) {
          score += 25;
        }

        // Category hit boost
        if (tokenRegex ? tokenRegex.test(p.category) : p.category.toLowerCase().includes(token)) {
          score += 15;
        }

        // If product is universal, it matches car tokens like corolla, civic, alto, etc.
        if (!tokenMatched && p.vehicleCompatibility.universal) {
          const isCarWord = VEHICLE_DATABASE.some(
            (v) =>
              v.name.toLowerCase() === token ||
              v.slug === token ||
              v.models.some((m) => m.name.toLowerCase() === token)
          );
          if (isCarWord) {
            tokenMatched = true;
            score += 8;
          }
        }

        if (tokenMatched) {
          matchCount++;
        }
      }

      // Require at least partial match or all tokens for multi-token queries
      if (matchCount > 0) {
        // Boost if all tokens matched
        if (matchCount === tokens.length) {
          score += 50;
        }
        filteredProducts.push({ product: p, score });
      }
    });

    // Sort by descending relevance score
    filteredProducts.sort((a, b) => b.score - a.score);
  }

  // 2026-11-17 (sumair): only products we actually carry — the old list had seat covers, floor mats, 7D mats, key covers and mounts we removed on 2026-11-16.
  const popularSearches = [
    "REGO Racing H4 LED",
    "Y6 H4 Mini Projector",
    "Mother 6 Copper LED",
    "KTM Ai LED Headlight",
    "LENSO LED Headlight",
    "SH Pro LED Headlight",
    "T10 LED Bulbs",
    "LED Off-Road Light Bar",
    "Interior LED Light Kit",
    "Festoon LED Bulbs",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-carbon-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* 2026-11-17 (sumair): background dark → white, like the product page / quick view. Backdrop stays dark. */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200 px-4 sm:px-6 py-4 bg-white">
          <Search className="w-5 h-5 text-red-brand shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search e.g. 'REGO Racing H4 LED' or 'T10 LED Bulbs'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-gray-400 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          {!query ? (
            <div className="space-y-4">
              {/* Quick Car Discovery Banner */}
              <Link
                href="/shop-by-car"
                onClick={onClose}
                className="p-3 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between group hover:border-red-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-600 text-white shadow-red-glow-sm">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 group-hover:text-red-600 transition-colors">
                      Shop By Your Specific Car Model
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Corolla, Civic, Alto, Sportage, Yaris & more
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Popular Car & Product Searches:
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:text-red-600 hover:border-red-500/40 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm text-gray-600">
                No exact catalogue items found for <span className="text-gray-900 font-bold">&quot;{query}&quot;</span>.
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We carry complete stock and custom fabrication at our Kashmir Road Saddar showroom. Message our master technicians on WhatsApp!
              </p>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Hasnain Auto, do you have ${query} available for my car?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-whatsapp text-carbon-950 font-bold text-xs uppercase tracking-wider shadow-whatsapp-glow mt-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d={WHATSAPP_PATH} />
                </svg>
                <span>Ask Saddar Showroom on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Matching Accessories ({filteredProducts.length})</span>
                {detectedVehicle && (
                  <span className="text-red-accent flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-red-brand" />
                    Fits {detectedVehicle.name} models
                  </span>
                )}
              </div>
              {filteredProducts.map(({ product: p }) => {
                const whatsappUrl = createSingleProductWhatsAppUrl(
                  p,
                  1,
                  undefined,
                  selectedVehicle
                );
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-gray-900 truncate hover:text-red-600 transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                          <span>{p.subcategory || p.category}</span>
                          <span>•</span>
                          <span className="text-red-accent font-semibold">
                            {BUSINESS_CONFIG.currency.symbol}{" "}
                            {(p.salePrice || p.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-whatsapp text-carbon-950 hover:bg-whatsapp-hover transition-colors"
                        title="Quick Order on WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path d={WHATSAPP_PATH} />
                        </svg>
                      </a>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:text-gray-900"
                        title="View Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

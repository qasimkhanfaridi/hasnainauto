"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MessageCircle, ChevronRight, Car, CheckCircle2, ArrowRight } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";
import { VEHICLE_DATABASE } from "@/data/vehicles";

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

        // Direct token hit in corpus
        if (fullCorpus.includes(token)) {
          tokenMatched = true;
          score += 10;
        }

        // Title hit gets extra boost
        if (p.name.toLowerCase().includes(token)) {
          score += 25;
        }

        // Category hit boost
        if (p.category.toLowerCase().includes(token)) {
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

  const popularSearches = [
    "Toyota Corolla Seat Covers",
    "Honda Civic LED",
    "Suzuki Alto Floor Mats",
    "Kia Sportage 7D Mats",
    "Novsight H11 LED",
    "TP Trunk Mats",
    "Leather Key Cover",
    "Universal Mobile Mount",
    "Laser Mini Driving Pods",
    "Ambient Symphony LED",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-carbon-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-carbon-900 border border-white/10 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 px-4 sm:px-6 py-4 bg-carbon-950">
          <Search className="w-5 h-5 text-red-brand shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search e.g. 'Toyota Corolla Seat Covers' or 'Honda Civic LED'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 text-sm sm:text-base text-white placeholder-silver-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-silver-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2.5 py-1 rounded-lg bg-carbon-850 text-xs font-semibold text-silver-300 hover:text-white border border-white/10"
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
                className="p-3 rounded-2xl bg-gradient-to-r from-red-600/15 via-carbon-850 to-carbon-850 border border-red-500/30 flex items-center justify-between group hover:border-red-500/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-600 text-white shadow-red-glow-sm">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-red-accent transition-colors">
                      Shop By Your Specific Car Model
                    </div>
                    <div className="text-[11px] text-silver-400">
                      Corolla, Civic, Alto, Sportage, Yaris & more
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-silver-400 group-hover:text-red-accent group-hover:translate-x-0.5 transition-all" />
              </Link>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider">
                  Popular Car & Product Searches:
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-carbon-850 border border-white/5 text-xs text-silver-300 hover:text-red-accent hover:border-red-500/40 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm text-silver-300">
                No exact catalogue items found for <span className="text-white font-bold">&quot;{query}&quot;</span>.
              </p>
              <p className="text-xs text-silver-400 max-w-sm mx-auto">
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
                <MessageCircle className="w-4 h-4 fill-carbon-950" />
                <span>Ask Saddar Showroom on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-silver-400 uppercase tracking-wider">
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
                    className="p-3 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/5 flex items-center justify-between gap-3 transition-colors"
                  >
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-carbon-950 shrink-0 border border-white/10">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate hover:text-red-accent transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-silver-400 mt-0.5">
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
                        <MessageCircle className="w-4 h-4 fill-carbon-950" />
                      </a>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="p-2 rounded-lg bg-carbon-750 text-silver-300 hover:text-white"
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

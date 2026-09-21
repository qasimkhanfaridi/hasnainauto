"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MessageCircle, ChevronRight } from "lucide-react";
import { ACTIVE_PRODUCTS_DATA } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";

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

  const filteredProducts = ACTIVE_PRODUCTS_DATA.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    const matchName = p.name.toLowerCase().includes(q);
    const matchCat = p.category.toLowerCase().includes(q) || (p.subcategory && p.subcategory.toLowerCase().includes(q));
    const matchBrand = p.brand && p.brand.toLowerCase().includes(q);
    const matchCar =
      p.vehicleCompatibility?.makes?.some((m) => m.toLowerCase().includes(q)) ||
      (p.vehicleCompatibility?.note && p.vehicleCompatibility.note.toLowerCase().includes(q));

    return matchName || matchCat || matchBrand || matchCar;
  });

  const popularSearches = [
    "Seat Covers",
    "7D Floor Mats",
    "LED Headlight",
    "TP Trunk Mats",
    "Ambient LED",
    "Mobile Holder",
    "Key Cover",
    "Combo Deal",
    "Mud Flaps",
    "Fog Lights",
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
            placeholder="Search seat covers, 7D mats, LED headlights, phone holders..."
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
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider">
                Popular Searches:
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm text-silver-300">
                No exact catalogue items found for <span className="text-white font-bold">&quot;{query}&quot;</span>.
              </p>
              <p className="text-xs text-silver-400 max-w-sm mx-auto">
                We have full stock in our Saddar Rawalpindi workshop! Message us on WhatsApp for instant confirmation.
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
                <span>Ask Availability on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider">
                Matching Accessories ({filteredProducts.length})
              </div>
              {filteredProducts.map((p) => {
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
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-carbon-950 shrink-0 border border-white/10">
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
                        title="Order on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-carbon-950" />
                      </a>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="p-2 rounded-lg bg-carbon-750 text-silver-300 hover:text-white"
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

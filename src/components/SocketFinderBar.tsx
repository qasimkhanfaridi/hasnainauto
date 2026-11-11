"use client";

import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

interface SocketOption {
  socket: string;
  name: string;
  popularCars: string;
  badge?: string;
  wattage: string;
  lumens: string;
}

const SOCKET_OPTIONS: SocketOption[] = [
  {
    socket: "H4",
    name: "H4 / 9003 Dual Beam",
    popularCars: "Alto, Cultus, WagonR, Hilux, Swift",
    badge: "Most Popular",
    wattage: "130W Pair",
    lumens: "20,000 LM",
  },
  {
    socket: "H11",
    name: "H11 / H8 / H9",
    popularCars: "Corolla, Civic, Sportage, Yaris Low/Fog",
    badge: "Top Seller",
    wattage: "130W Pair",
    lumens: "20,000 LM",
  },
  {
    socket: "9005",
    name: "9005 / HB3 High Beam",
    popularCars: "Civic X/11, Fortuner, Corolla, Revo",
    badge: "High Throw",
    wattage: "130W Pair",
    lumens: "20,000 LM",
  },
  {
    socket: "9006",
    name: "9006 / HB4",
    popularCars: "Honda Accord, Prado, Land Cruiser, City",
    wattage: "110W Pair",
    lumens: "16,000 LM",
  },
  {
    socket: "H7",
    name: "H7 Projector",
    popularCars: "Changan Alsvin, Sonata, Elantra, European",
    badge: "Precision Cutoff",
    wattage: "130W Pair",
    lumens: "20,000 LM",
  },
  {
    socket: "D-Series",
    name: "D1S / D2S / D4S",
    popularCars: "OEM HID Xenon to 100% Direct LED Upgrade",
    badge: "Zero Ballast Lag",
    wattage: "110W Pair",
    lumens: "18,000 LM",
  },
  {
    socket: "Bi-LED Fog",
    name: "3.0\" Bi-LED Fog Projectors",
    popularCars: "All-weather rain, winter fog & highway throw",
    badge: "Laser Cutoff",
    wattage: "80W Pair",
    lumens: "14,000 LM",
  },
  {
    socket: "T10",
    name: "T10 / T15 Park & Reverse",
    popularCars: "Number plate, cabin lights & reverse LEDs",
    wattage: "15W Canbus",
    lumens: "1,200 LM",
  },
];

export const SocketFinderBar: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-carbon-900 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-brand text-xs font-bold uppercase tracking-widest mb-2">
              <Zap className="w-3.5 h-3.5 fill-red-brand" />
              <span>H4 · H11 · 9005 · H7 Fitment Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              SHOP BY BULB SOCKET & SIZE
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-2xl">
              Select your exact headlight or fog light socket for 100% plug &amp; play fitment with zero wire cutting, razor-sharp anti-glare cutoff, and a 1-year replacement warranty.
            </p>
          </div>

          <Link
            href="/shop?category=led-lights"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-red-brand hover:text-red-dark uppercase tracking-wider transition-colors shrink-0"
          >
            <span>All LED Lights</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Socket Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SOCKET_OPTIONS.map((item) => (
            <Link
              key={item.socket}
              href={`/shop?category=led-lights&socket=${encodeURIComponent(item.socket === "H4" ? "H4" : item.socket === "H11" ? "H11" : item.socket === "9005" ? "9005" : item.socket)}`}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-surface-200 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 hover:border-red-brand dark:hover:border-red-brand transition-all hover:shadow-card hover:-translate-y-0.5"
            >
              {/* Badge if available */}
              {item.badge && (
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-red-brand/10 dark:bg-red-brand/20 text-red-brand text-[10px] font-black uppercase tracking-wider">
                  {item.badge}
                </span>
              )}

              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-red-brand/10 dark:bg-red-brand/20 text-red-brand flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-red-brand group-hover:text-white transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-carbon-900 dark:text-white uppercase tracking-tight group-hover:text-red-brand transition-colors">
                  {item.socket}
                </h3>
              </div>

              <div className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-tight">
                {item.name}
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 leading-snug">
                {item.popularCars}
              </p>

              <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-gray-200 dark:border-white/10 text-[10px] font-semibold text-gray-600 dark:text-gray-300">
                <span className="text-red-brand font-bold">{item.wattage}</span>
                <span>•</span>
                <span className="text-amber-brand font-bold">{item.lumens}</span>
                <span className="ml-auto text-[10px] font-bold text-carbon-900 dark:text-gray-300 group-hover:text-red-brand flex items-center gap-0.5">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Confidence & Fitment Help Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-brand/5 via-carbon-900/5 to-amber-brand/5 dark:from-red-brand/10 dark:to-carbon-900 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-brand text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-carbon-900 dark:text-white uppercase">
                Not sure which bulb fits your car?
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300">
                Send your car make &amp; model on WhatsApp. Our Saddar technicians will verify your factory socket in seconds.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
              "Assalam-o-Alaikum Hasnain Auto, I need help finding the correct LED bulb socket for my car."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Ask Socket Expert on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

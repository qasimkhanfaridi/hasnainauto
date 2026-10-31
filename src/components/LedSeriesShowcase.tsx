"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";
import { LED_SERIES_LINES } from "@/data/ledSeries";

const accentBorder: Record<string, string> = {
  orange: "group-hover:border-orange-500/60",
  gold: "group-hover:border-amber-brand/70",
  teal: "group-hover:border-teal-500/60",
  cyan: "group-hover:border-cyan-500/60",
};

export const LedSeriesShowcase: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 bg-carbon-950 text-white border-y border-white/10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-led-showroom-bg.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-950/90 via-carbon-950/85 to-carbon-950/95" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-brand/15 border border-amber-brand/30 text-amber-glow text-[10px] font-black uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-brand" />
              Inspired by Novsight Series Layout
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-balance">
              Shop by <span className="text-amber-brand">LED Series</span>
            </h2>
            <p className="text-sm text-silver-300 mt-2 max-w-2xl">
              Rego, Mother, B Pro, and projector lines — copper cooling, Canbus drivers, and Saddar workshop fitment. Select your series, then choose H4, H11, or 9005 on the product page.
            </p>
          </div>
          <Link
            href="/shop?category=led-lights"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider shadow-red-glow-sm transition-all shrink-0"
          >
            Full LED Catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {LED_SERIES_LINES.map((line) => (
            <Link
              key={line.id}
              href={line.href}
              className={`group relative flex flex-col rounded-2xl bg-carbon-900 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-red-glow-sm ${accentBorder[line.accent]}`}
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-carbon-950/90 text-[10px] font-black uppercase tracking-wider text-amber-brand border border-white/10">
                  {line.seriesLabel}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-red-accent transition-colors">
                  {line.name}
                </h3>
                <p className="text-[11px] text-silver-400 leading-relaxed line-clamp-2">{line.description}</p>
                <p className="text-xs font-bold text-amber-brand">{line.highlight}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {line.specs.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-carbon-950 border border-white/10 text-[9px] font-bold text-silver-300 uppercase"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-silver-400 group-hover:text-white">
                  <span>Shop series</span>
                  <ArrowRight className="w-4 h-4 text-red-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

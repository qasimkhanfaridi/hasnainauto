"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Truck, RefreshCw, ChevronRight, Star } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { VehicleSelector } from "./VehicleSelector";

interface HeroSectionProps {
  onOpenQuickOrder?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const trustPillars = [
    { icon: ShieldCheck, label: "Premium Quality", sub: "Top Notch Products" },
    { icon: Truck,       label: "Cash on Delivery", sub: "Delivery Available" },
    { icon: Truck,       label: "Fast & Secure", sub: "Delivery" },
    { icon: RefreshCw,   label: "Easy Returns", sub: "No Hassle Policy" },
  ];

  return (
    <section className="w-full overflow-hidden">
      {/* ─── Hero Banner ─── */}
      <div className="relative bg-white overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
        {/* Diagonal red background on the right */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white" />
          <div
            className="absolute right-0 top-0 bottom-0 w-[55%]"
            style={{
              background:
                "linear-gradient(135deg, #dc2626 0%, #dc2626 40%, #1a1a1a 40%)",
            }}
          />
          {/* Gold diagonal stripe */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[55%]"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 38%, #f59e0b 38%, #f59e0b 40%, transparent 40%)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-[55%]"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 42%, #f59e0b 42%, #f59e0b 44%, transparent 44%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
            {/* ─── Left Text Block ─── */}
            <div className="flex-1 z-10 max-w-lg">
              {/* Pre-headline */}
              <p className="text-red-brand font-black text-xs sm:text-sm uppercase tracking-widest mb-2">
                PREMIUM STYLE
              </p>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-carbon-900 leading-[1.0] uppercase tracking-tight mb-3">
                FOR YOUR
                <br />
                <span className="text-red-brand">RIDE</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium leading-relaxed">
                Seat Covers, LED Lights &amp; More – All in One Place!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-sm uppercase tracking-wide transition-all shadow-red-glow group"
                >
                  SHOP NOW
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to order accessories.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-sm uppercase tracking-wide transition-all shadow-whatsapp-glow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  WhatsApp
                </a>
              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-brand text-amber-brand" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">4.8</span>
                <span className="text-xs text-gray-500">• 108+ Trusted Reviews</span>
              </div>
            </div>

            {/* ─── Right Car Image ─── */}
            <div className="flex-1 relative flex items-end justify-center lg:justify-end min-h-[160px] sm:min-h-[200px] lg:min-h-[300px] z-10">
              <Image
                src="/images/products/seat-cover-floor-mat-combo.jpg"
                alt="Premium auto accessories — seat covers, LED lights at Hasnain Auto Saddar Rawalpindi"
                width={520}
                height={340}
                priority
                className="object-contain drop-shadow-2xl w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[520px] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Sliding banner dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0,1,2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-5 bg-red-brand" : "w-1.5 bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* ─── Trust Pillars Bar ─── */}
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {trustPillars.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <p.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-carbon-900 leading-tight">{p.label}</div>
                <div className="hidden sm:block text-[10px] text-gray-500">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Vehicle Selector ─── */}
      <div className="bg-surface-200 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <VehicleSelector />
        </div>
      </div>
    </section>
  );
};

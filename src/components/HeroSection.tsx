import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Zap, Sparkles, ChevronRight, Wrench } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { VehicleSelector } from "./VehicleSelector";

interface HeroSectionProps {
  onOpenQuickOrder?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuickOrder }) => {
  return (
    <section className="relative w-full overflow-hidden bg-carbon-950 pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-white/5">
      {/* Performance Red & Carbon Ambient Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-hero-glow pointer-events-none opacity-80" />
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-red-brand/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-red-600/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-carbon-850 border border-red-500/30 text-red-accent text-xs font-bold tracking-widest uppercase shadow-red-glow-sm">
              <span className="w-2 h-2 rounded-full bg-red-brand animate-ping" />
              <span>Saddar, Rawalpindi • Premium Car Customization</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-[1.05]">
                ELEVATE <br className="hidden sm:inline" />
                <span className="red-gradient-text">YOUR DRIVE.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold text-silver-200 tracking-wide">
                Custom Leather Seat Covers • 7D Mats • High-Lumen LED Lighting
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-silver-300 max-w-2xl leading-relaxed">
              Transform your vehicle with bespoke tailored leather seat covers (LR9 to Scratchless Premium), 
              heavy-duty 7D diamond floor mats, razor-sharp LED projector headlights, and all-weather accessories. 
              Master craftsmanship and professional fitting at Kashmir Road Saddar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/shop"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-red-glow flex items-center gap-2 group"
              >
                <span>EXPLORE PRODUCTS</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  "Assalam-o-Alaikum Hasnain Auto, I want to inquire about custom accessories and seat covers for my car."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-whatsapp-glow flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-carbon-950" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              {onOpenQuickOrder && (
                <button
                  type="button"
                  onClick={onOpenQuickOrder}
                  className="px-5 py-4 rounded-xl bg-carbon-850 hover:bg-carbon-800 text-silver-300 hover:text-white border border-white/10 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-red-brand" />
                  <span>Custom Quote</span>
                </button>
              )}
            </div>

            {/* Key Micro-Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-carbon-850 text-red-brand">
                  <Zap className="w-4 h-4 fill-red-brand" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Custom Fit</div>
                  <div className="text-[10px] text-silver-400">All Pakistani Cars</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-carbon-850 text-red-brand">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Saddar Fitting</div>
                  <div className="text-[10px] text-silver-400">Master Craftsmen</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-carbon-850 text-whatsapp">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">1 Year Warranty</div>
                  <div className="text-[10px] text-silver-400">Guaranteed Quality</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Original Luxury Car Interior Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-red-500/20 shadow-2xl bg-gradient-to-tr from-carbon-900 via-carbon-850 to-carbon-800 group shadow-red-950/30">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                <Image
                  src="/images/products/seat-cover-floor-mat-combo.jpg"
                  alt="Custom leather seat covers and 7D floor mats installation by Hasnain Auto Saddar Rawalpindi"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-carbon-950/40 via-transparent to-carbon-950/30" />
              </div>

              {/* Floating Overlays */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-carbon-900/95 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-red-accent">
                    Featured Installation
                  </div>
                  <div className="text-sm font-black text-white">
                    Diamond Quilted Seats & 7D Mats Combo
                  </div>
                  <div className="text-[11px] text-silver-400">
                    Bespoke red stitching • Custom bucket fitment
                  </div>
                </div>
                <Link
                  href="/product/seat-cover-floor-mat-combo"
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  View Bundle
                </Link>
              </div>

              {/* Top Accent Strip */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-carbon-950/90 border border-red-500/30 text-[11px] font-bold text-red-accent flex items-center gap-1">
                <span>🔥 Hot Selling Bundle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Vehicle Matcher Bar */}
        <div className="mt-12 lg:mt-16">
          <VehicleSelector />
        </div>
      </div>
    </section>
  );
};

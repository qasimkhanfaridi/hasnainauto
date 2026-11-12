"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Truck, RefreshCw, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

interface HeroSectionProps {
  onOpenQuickOrder?: () => void;
}

const HERO_SLIDES = [
  {
    eyebrow: "Y6 MINI PROJECTOR · LASER CUTOFF",
    title: (
      <>
        ZERO GLARE
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
          LASER PROJECTOR
        </span>
      </>
    ),
    subtitle: "Built-in optical convex lens with razor-sharp horizontal cutoff. 100% plug & play for Alto, Cultus, City & WagonR without unsealing the headlight housing.",
    pills: ["German Laser Cutoff", "Anti-Glare Optics", "Direct H4 Socket", "1-Year Warranty"],
    image: "/images/products/y6-projector-ai-hero.jpg",
    imageAlt: "Y6 Projector LED headlights at Hasnain Auto Saddar Rawalpindi",
    ctaLink: "/product/y6-projector-led-h4",
    ctaText: "EXPLORE Y6 PROJECTOR",
  },
  {
    eyebrow: "MOTHER · 6 COPPER SERIES",
    title: (
      <>
        35,000 LM
        <br />
        <span className="text-amber-brand">HIGHWAY BEAST</span>
      </>
    ),
    subtitle: "Six vacuum copper liquid conduits and 12,000 RPM turbo fan for sustained highway night visibility. Heavy Canbus decoders ensure zero dashboard error warnings.",
    pills: ["280W System", "6 Copper Tubes", "12K RPM Fan", "Canbus Error-Free"],
    image: "/images/products/mother-6-copper-ai-hero.jpg",
    imageAlt: "Mother 6 copper tube LED headlight kit",
    ctaLink: "/product/mother-6-copper-led-headlights",
    ctaText: "SHOP MOTHER 6",
  },
  {
    eyebrow: "B-PRO · 8 COPPER EXTREME",
    title: (
      <>
        30,000 LM
        <br />
        <span className="text-cyan-400">8-COPPER CORE</span>
      </>
    ),
    subtitle: "Industry-leading 8 copper heat pipes engineered for extreme heat endurance and relentless Motorway illumination across Pakistan.",
    pills: ["240W Rated", "8 Copper Pipes", "Aviation 6063 Alloy", "1Y Direct Warranty"],
    image: "/images/products/b-pro-8-copper-ai-hero.jpg",
    imageAlt: "B Pro 8 copper tube LED headlights",
    ctaLink: "/product/b-pro-8-copper-led-headlights",
    ctaText: "VIEW B-PRO 8",
  },
  {
    eyebrow: "REGO RACING · GERMAN TECH",
    title: (
      <>
        260W POWER
        <br />
        <span className="text-red-brand">GERMAN RACING</span>
      </>
    ),
    subtitle: "Four copper heat pipes, Canbus-compatible drivers, and aluminium fan cooling. H4, H11, and 9005 with over-the-counter replacement at Saddar Rawalpindi.",
    pills: ["260W System", "4 Copper Pipes", "Canbus Ready", "6500K Class White"],
    image: "/images/products/rego-racing-ai-hero.jpg",
    imageAlt: "Rego Racing 4 copper pipe LED headlights at Hasnain Auto",
    ctaLink: "/product/rego-racing-led-headlights",
    ctaText: "VIEW REGO RACING",
  },
] as const;

function HeroCarousel({
  slideCount,
  className = "",
  children,
}: {
  slideCount: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (slideCount <= 0) return;
      setIndex(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || paused) return;
    const id = window.setInterval(goNext, 6000);
    return () => window.clearInterval(id);
  }, [goNext, paused, slideCount]);

  const slides = React.Children.toArray(children).slice(0, slideCount);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden touch-pan-y">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-card items-center justify-center text-carbon-900 hover:border-red-brand/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-card items-center justify-center text-carbon-900 hover:border-red-brand/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 rounded-full bg-white/95 border border-gray-200 shadow-card backdrop-blur-sm">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={goPrev}
                className="lg:hidden flex w-8 h-8 rounded-full items-center justify-center text-carbon-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 px-0.5">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all ${
                      i === index ? "w-6 h-2 bg-red-brand" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next slide"
                onClick={goNext}
                className="lg:hidden flex w-8 h-8 rounded-full items-center justify-center text-carbon-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const trustPillars = [
    { icon: ShieldCheck, label: "1-Year Warranty", sub: "Direct Replacement Guarantee" },
    { icon: ShieldCheck, label: "Canbus Error-Free", sub: "100% Plug & Play (Zero Wire Cut)" },
    { icon: Truck, label: "Cash on Delivery", sub: "Nationwide Express Shipping" },
    { icon: RefreshCw, label: "Free Saddar Fitting", sub: "Beam Calibration at Workshop" },
  ];

  return (
    <section className="w-full overflow-hidden bg-[#070b12]">
      <HeroCarousel slideCount={HERO_SLIDES.length} className="bg-[#070b12]">
        {HERO_SLIDES.map((slide, slideIndex) => {
          const SlideHeading = slideIndex === 0 ? "h1" : "h2";
          return (
          <div
            key={slide.eyebrow}
            className="relative overflow-hidden bg-gradient-to-b from-[#0b101c] to-[#070b12] lg:min-h-[500px]"
          >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-[4.5rem] sm:pt-8 sm:pb-20 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
                <div className="relative z-10 w-full min-w-0 lg:max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-black text-xs uppercase tracking-widest mb-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{slide.eyebrow}</span>
                  </div>
                  <SlideHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] uppercase tracking-tight mb-3">
                    {slide.title}
                  </SlideHeading>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* High-Tech Spec Pills (Novsight & Auxleds Style) */}
                  {"pills" in slide && slide.pills && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {slide.pills.map((pill: string, pIdx: number) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#141d2e] border border-cyan-500/20 text-cyan-200 text-[11px] sm:text-xs font-bold"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Link
                      href={"ctaLink" in slide ? slide.ctaLink : "/shop"}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-wide transition-all shadow-lg shadow-cyan-950/50 group w-full sm:w-auto"
                    >
                      {"ctaText" in slide ? slide.ctaText : "SHOP NOW"}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to order automotive lights & accessories.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm uppercase tracking-wide transition-all shadow-lg shadow-green-950/40 w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      WhatsApp Order
                    </a>
                  </div>
                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-brand text-amber-brand" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-200">4.9 / 5.0</span>
                    <span className="text-xs text-gray-400">• 240+ Verified Drivers Across Pakistan</span>
                  </div>
                </div>

                <div className="relative z-0 w-full min-w-0 -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-center lg:justify-end">
                  <div className="relative w-full aspect-[16/11] min-h-[260px] sm:min-h-[320px] md:min-h-[360px] lg:aspect-[4/3] lg:min-h-[400px] xl:min-h-[440px] max-w-none lg:max-w-full bg-gradient-to-b from-[#131b2e] to-[#070b12] rounded-xl sm:rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
                      className="object-contain p-3 sm:p-5 lg:p-7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        })}
      </HeroCarousel>

      {/* Clean Compact Trust Bar */}
      <div className="bg-[#0a0e17] border-y border-gray-800 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {trustPillars.map((p) => (
              <div key={p.label} className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
                <div className="w-7 h-7 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <p.icon className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{p.label}</div>
                  <div className="text-[10px] text-gray-400 hidden sm:block">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

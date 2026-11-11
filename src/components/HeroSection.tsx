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
    eyebrow: "REGO RACING · 001 SERIES",
    title: (
      <>
        30,000 LM
        <br />
        <span className="text-red-brand">COPPER LED</span>
      </>
    ),
    subtitle: "Four copper heat pipes, Canbus-compatible drivers, and aluminium fan cooling. H4, H11, and 9005 — German technology with 1-year replacement warranty at Saddar.",
    pills: ["260W System", "4 Copper Pipes", "Canbus Ready", "6500K Class White"],
    image: "/images/products/rego-racing-led-01.jpg",
    imageAlt: "Rego Racing 4 copper pipe LED headlights at Hasnain Auto",
    ctaLink: "/product/rego-racing-led-headlights",
    ctaText: "VIEW REGO RACING",
  },
  {
    eyebrow: "MOTHER · 6 COPPER SERIES",
    title: (
      <>
        TURBO FAN
        <br />
        <span className="text-red-brand">35,000 LM</span>
      </>
    ),
    subtitle: "Six copper tubes and 12,000 RPM turbo fan for sustained brightness. Gold-anodized kit with Canbus decoders — a highway favourite in Pakistan.",
    pills: ["280W System", "6 Copper Pipes", "12K RPM Fan", "Canbus"],
    image: "/images/products/mother-6-copper-led-01.jpg",
    imageAlt: "Mother 6 copper tube LED headlight kit",
    ctaLink: "/product/mother-6-copper-led-headlights",
    ctaText: "SHOP MOTHER 6",
  },
  {
    eyebrow: "GOLDEN BOX REGO · 010",
    title: (
      <>
        PREMIUM
        <br />
        <span className="text-amber-brand">REGO LINE</span>
      </>
    ),
    subtitle: "230W / 35,000 lumens at 6500K with four copper tubes and Canbus technology — the golden tier Rego upgrade.",
    pills: ["230W · 35K LM", "6500K", "4 Copper", "1Y Warranty"],
    image: "/images/products/golden-box-rego-led-01.jpg",
    imageAlt: "Golden Box Rego 4 copper LED headlights",
    ctaLink: "/product/golden-box-rego-led-headlights",
    ctaText: "GOLDEN BOX REGO",
  },
  {
    eyebrow: "FULL CATALOGUE",
    title: (
      <>
        SHOP ALL
        <br />
        <span className="text-red-brand">LED SERIES</span>
      </>
    ),
    subtitle: "Rego, Mother, B Pro, Golden Box, Y6 projector — 14 kits in stock at Saddar. H4, H11, 9005 sockets with Canbus & 1-year warranty.",
    pills: ["14 LED Kits Live", "H4 · H11 · 9005", "COD Pakistan", "Free Beam Check"],
    image: "/images/products/b-pro-8-copper-led-01.jpg",
    imageAlt: "B Pro 8 copper tube LED headlights",
    ctaLink: "/shop?category=led-lights",
    ctaText: "ALL LED LIGHTS",
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
    <section className="w-full overflow-hidden">
      <HeroCarousel slideCount={HERO_SLIDES.length} className="bg-white dark:bg-carbon-900">
        {HERO_SLIDES.map((slide, slideIndex) => {
          const SlideHeading = slideIndex === 0 ? "h1" : "h2";
          return (
          <div
            key={slide.eyebrow}
            className="relative overflow-hidden bg-surface-100 dark:bg-carbon-950 lg:bg-white lg:dark:bg-carbon-900 lg:min-h-[500px]"
          >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-[4.5rem] sm:pt-8 sm:pb-20 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
                <div className="relative z-10 w-full min-w-0 lg:max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-brand/10 dark:bg-red-brand/20 border border-red-brand/20 text-red-brand font-black text-xs sm:text-xs uppercase tracking-widest mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-brand animate-pulse" />
                    <span>{slide.eyebrow}</span>
                  </div>
                  <SlideHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-carbon-900 dark:text-white leading-[1.05] uppercase tracking-tight mb-3">
                    {slide.title}
                  </SlideHeading>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* High-Tech Spec Pills (Novsight & Auxleds Style) */}
                  {"pills" in slide && slide.pills && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {slide.pills.map((pill: string, pIdx: number) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-lg bg-surface-200 dark:bg-carbon-800 border border-gray-200 dark:border-white/10 text-carbon-900 dark:text-gray-200 text-[11px] sm:text-xs font-bold"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Link
                      href={"ctaLink" in slide ? slide.ctaLink : "/shop"}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-sm uppercase tracking-wide transition-all shadow-red-glow group w-full sm:w-auto"
                    >
                      {"ctaText" in slide ? slide.ctaText : "SHOP NOW"}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to order automotive lights & accessories.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-sm uppercase tracking-wide transition-all shadow-whatsapp-glow w-full sm:w-auto"
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
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">4.9 / 5.0</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">• 240+ Verified Drivers Across Pakistan</span>
                  </div>
                </div>

                <div className="relative z-0 w-full min-w-0 -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-center lg:justify-end">
                  <div className="relative w-full aspect-[16/11] min-h-[260px] sm:min-h-[320px] md:min-h-[360px] lg:aspect-[4/3] lg:min-h-[400px] xl:min-h-[440px] max-w-none lg:max-w-full bg-white dark:bg-carbon-950 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
                      className="object-contain p-2 sm:p-4 lg:p-6"
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
      <div className="bg-white dark:bg-carbon-900 border-y border-gray-200 dark:border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {trustPillars.map((p) => (
              <div key={p.label} className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
                <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center shrink-0">
                  <p.icon className="w-3.5 h-3.5 text-red-brand" />
                </div>
                <div>
                  <div className="text-xs font-bold text-carbon-900 dark:text-white leading-tight">{p.label}</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

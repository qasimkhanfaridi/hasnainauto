"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Truck, RefreshCw, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { VehicleSelector } from "./VehicleSelector";

interface HeroSectionProps {
  onOpenQuickOrder?: () => void;
}

const HERO_SLIDES = [
  {
    eyebrow: "PREMIUM STYLE",
    title: (
      <>
        FOR YOUR
        <br />
        <span className="text-red-brand">RIDE</span>
      </>
    ),
    subtitle: "Seat Covers, LED Lights & More – All in One Place!",
    image: "/images/products/seat-cover-floor-mat-combo.jpg",
    imageAlt: "Premium auto accessories — seat covers and floor mats at Hasnain Auto Saddar",
  },
  {
    eyebrow: "HYPERBEAM LED",
    title: (
      <>
        LIGHT UP
        <br />
        <span className="text-red-brand">THE ROAD</span>
      </>
    ),
    subtitle: "20,000 LM projectors with razor-sharp cutoff — installed in Saddar.",
    image: "/images/products/f5-pro-h4-led.jpg",
    imageAlt: "F5 Pro H4 LED headlights at Hasnain Auto Rawalpindi",
  },
  {
    eyebrow: "INTERIOR UPGRADE",
    title: (
      <>
        LUXURY
        <br />
        <span className="text-red-brand">CABIN FIT</span>
      </>
    ),
    subtitle: "Custom leatherette seat covers & 7D floor mats for Pakistani cars.",
    image: "/images/products/premium-leather-seat-covers.jpg",
    imageAlt: "Premium leather seat covers by Hasnain Auto",
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
    { icon: ShieldCheck, label: "Premium Quality", sub: "Top Notch Products" },
    { icon: Truck, label: "Cash on Delivery", sub: "Delivery Available" },
    { icon: Truck, label: "Fast & Secure", sub: "Delivery" },
    { icon: RefreshCw, label: "Easy Returns", sub: "No Hassle Policy" },
  ];

  return (
    <section className="w-full overflow-hidden">
      <HeroCarousel slideCount={HERO_SLIDES.length} className="bg-white">
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.eyebrow}
            className="relative overflow-hidden bg-surface-100 lg:bg-white lg:min-h-[480px]"
          >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-[4.5rem] sm:pt-8 sm:pb-20 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
                <div className="relative z-10 w-full min-w-0 lg:max-w-xl">
                  <p className="text-red-brand font-black text-xs sm:text-sm uppercase tracking-widest mb-2">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-carbon-900 leading-[1.05] uppercase tracking-tight mb-3">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Link
                      href="/shop"
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-sm uppercase tracking-wide transition-all shadow-red-glow group w-full sm:w-auto"
                    >
                      SHOP NOW
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to order accessories.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-sm uppercase tracking-wide transition-all shadow-whatsapp-glow w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      WhatsApp
                    </a>
                  </div>
                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-brand text-amber-brand" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-700">4.8</span>
                    <span className="text-xs text-gray-500">• 108+ Trusted Reviews</span>
                  </div>
                </div>

                <div className="relative z-0 w-full min-w-0 -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-center lg:justify-end">
                  <div className="relative w-full aspect-[16/11] min-h-[240px] sm:min-h-[300px] md:min-h-[340px] lg:aspect-[4/3] lg:min-h-[380px] xl:min-h-[420px] max-w-none lg:max-w-full bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
                      className="object-contain p-2 sm:p-3 lg:p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </HeroCarousel>

      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {trustPillars.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1.5 text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <p.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-carbon-900 leading-tight">{p.label}</div>
                <div className="hidden sm:block text-[10px] text-gray-500">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-200 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <VehicleSelector />
        </div>
      </div>
    </section>
  );
};

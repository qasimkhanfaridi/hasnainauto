"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, RefreshCw, ChevronRight, Flame, Tag } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";

interface HeroSectionProps {
  onOpenQuickOrder?: () => void;
}

/* Full-bleed photo/video slides only (AuxLEDs style). Product slides removed. */
const HERO_SLIDES = [
  {
    eyebrow: "LED HEADLIGHTS · BRIGHTER NIGHTS",
    title: (
      <>
        SEE FARTHER
        <br />
        <span className="text-red-500">DRIVE SAFER</span>
      </>
    ),
    subtitle: "Powerful LED headlights — brighter road, sharper cutoff, zero glare. Fitted free at our Saddar Rawalpindi workshop.",
    image: "/images/hero-sedan.jpg",
    imageAlt: "White sedan with bright LED headlights at Hasnain Auto",
    ctaLink: "/shop",
    ctaText: "SHOP LED LIGHTS",
  },
  {
    eyebrow: "NIGHT DRIVING · UPGRADED",
    title: (
      <>
        OWN THE NIGHT
        <br />
        <span className="text-red-500">WITH LED POWER</span>
      </>
    ),
    subtitle: "Fog-proof beams, Canbus-ready drivers and crisp 6500K white light — built for Pakistani highways, city streets and winter fog.",
    image: "/images/hero-night-cars.jpg",
    imageAlt: "Two cars driving at night with bright LED headlights on",
    ctaLink: "/shop",
    ctaText: "EXPLORE LIGHTS",
  },
] as const;

/* Hot Deals: real products, prices and images from src/data/products.ts */
const HOT_DEAL_SLUGS = [
  "led-headlight-projector",
  "7d-floor-mats-premium",
  "seat-cover-floor-mat-combo",
  "rego-racing-led-headlights",
] as const;

const HOT_DEALS = HOT_DEAL_SLUGS.map((slug) => PRODUCTS_DATA.find((p) => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

/* Compressed Hot Deals card (JS Auto size): image, badge, name, prices, View Deal, dots. Same 5s rotation. */
function HotDealsCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (HOT_DEALS.length <= 0) return;
      setIndex(((next % HOT_DEALS.length) + HOT_DEALS.length) % HOT_DEALS.length);
    },
    []
  );

  useEffect(() => {
    if (HOT_DEALS.length <= 1 || paused) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % HOT_DEALS.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  if (HOT_DEALS.length === 0) return null;
  const deal = HOT_DEALS[index];
  const discount =
    deal.originalPrice && deal.originalPrice > deal.price
      ? Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
      : 0;

  return (
    <aside
      aria-label="Hot deals"
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-red-600/20 bg-white dark:bg-gray-900 shadow-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between bg-red-600 px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-white">
          <Flame className="w-4 h-4 fill-white" />
          Hot Deals
        </span>
        <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-gray-900">
          Limited-Time Offers
        </span>
      </div>

      <div className="relative w-full flex-1 min-h-[180px] bg-gray-50 dark:bg-gray-800">
        <Image
          src={deal.images[0]}
          alt={deal.name}
          fill
          sizes="(max-width: 1024px) 100vw, 340px"
          className="object-contain p-4"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow">
            <Tag className="w-3 h-3" />
            {discount}% OFF
          </span>
        )}
        {deal.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-gray-900/85 px-2.5 py-1 text-[11px] font-bold text-white">
            {deal.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col px-4 pb-4 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {deal.subcategory || deal.category.replace(/-/g, " ")}
        </span>
        <h3 className="mt-1 line-clamp-1 text-base font-black leading-snug text-gray-900 dark:text-white">
          {deal.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          {deal.originalPrice && deal.originalPrice > deal.price && (
            <span className="text-sm font-bold text-gray-400 line-through">
              {formatPrice(deal.originalPrice)}
            </span>
          )}
          <span className="text-xl font-black text-amber-500">{formatPrice(deal.price)}</span>
        </div>
        <Link
          href={`/product/${deal.slug}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-red-700"
        >
          View Deal
          <ChevronRight className="w-4 h-4" />
        </Link>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {HOT_DEALS.map((d, i) => (
            <button
              key={d.slug}
              type="button"
              aria-label={`Show deal ${i + 1}: ${d.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === index ? "h-2 w-6 bg-red-600" : "h-2 w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

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
      <div className="h-full overflow-hidden touch-pan-y">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="h-full w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === index ? "h-2 w-6 bg-white" : "h-2 w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
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
    <section className="w-full bg-white dark:bg-gray-950">
      {/* Full-bleed photo/video box + compressed Hot Deals on the right */}
      <div className="flex flex-col lg:flex-row items-stretch">
        <div className="relative min-w-0 w-full lg:flex-1">
          <HeroCarousel slideCount={HERO_SLIDES.length} className="h-[420px] sm:h-[480px] lg:h-[560px]">
            {HERO_SLIDES.map((slide, slideIndex) => {
              const SlideHeading = slideIndex === 0 ? "h1" : "h2";
              return (
                <div key={slide.eyebrow} className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    priority={slideIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
                    <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white">
                      {slide.eyebrow}
                    </span>
                    <SlideHeading className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight text-white">
                      {slide.title}
                    </SlideHeading>
                    <p className="mt-3 max-w-lg text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                      {slide.subtitle}
                    </p>
                    <div className="mt-5">
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700"
                      >
                        {slide.ctaText}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </HeroCarousel>
        </div>

        <div className="w-full shrink-0 bg-white p-3 dark:bg-gray-950 sm:p-4 lg:w-[320px] lg:p-4 xl:w-[340px]">
          <HotDealsCard />
        </div>
      </div>

      {/* Clean Compact Trust Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {trustPillars.map((p) => (
              <div key={p.label} className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
                <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
                  <p.icon className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{p.label}</div>
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

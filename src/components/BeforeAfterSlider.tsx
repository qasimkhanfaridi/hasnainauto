"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Night Visibility Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-carbon-900 uppercase tracking-tight">
            STOCK HALOGEN <span className="text-amber-brand">VS</span> HASNAIN AUTO LED
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Slide horizontally to compare factory yellowish halogens with Hasnain Auto&apos;s 20,000 LM HyperBeam F5 Pro LEDs and 3.0&quot; Bi-LED projectors on a dark highway.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-5xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl bg-carbon-900"
        >
          {/* 1. AFTER Image (Full background layer: 20,000 LM Crystal White Cutoff) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/products/laser-headlight-beam.jpg"
              alt="After Hasnain Auto 20,000 LM LED Headlight Road Illumination"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-cyan-500/90 backdrop-blur-md text-carbon-950 font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              AFTER • Hasnain Auto 20,000 LM LED
            </div>

            {/* Feature Callouts on the 'After' Side */}
            <div className="hidden sm:flex absolute bottom-5 right-5 z-10 flex-col gap-2 items-end">
              <span className="px-3 py-1 rounded-lg bg-carbon-950/85 backdrop-blur-md border border-white/10 text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 350+ Meters Daylight Throw
              </span>
              <span className="px-3 py-1 rounded-lg bg-carbon-950/85 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Razor-Sharp Low-Beam Cutoff
              </span>
              <span className="px-3 py-1 rounded-lg bg-carbon-950/85 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Anti-Glare to Oncoming Traffic
              </span>
            </div>
          </div>

          {/* 2. BEFORE Image (Clipped overlay: Dim yellow halogen tint) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
              <Image
                src="/images/products/laser-headlight-beam.jpg"
                alt="Before standard yellowish dim factory halogen headlights"
                fill
                className="object-cover sepia contrast-75 brightness-50 hue-rotate-15"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Before Tag */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-carbon-950/90 backdrop-blur-md text-amber-500 border border-amber-500/30 font-black text-xs uppercase tracking-widest">
              BEFORE • Weak Stock Halogen
            </div>
          </div>

          {/* 3. Slider Handle Divider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-amber-brand shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-carbon-950 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-center justify-center pointer-events-auto">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-brand hover:bg-red-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-red-glow-sm"
          >
            <span>Upgrade Your Headlights Today</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-brand" />
          </Link>
        </div>
      </div>
    </section>
  );
};

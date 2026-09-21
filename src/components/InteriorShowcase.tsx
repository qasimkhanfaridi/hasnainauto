import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

export const InteriorShowcase: React.FC = () => {
  const highlights = [
    { title: "Ultra-Thin Acrylic Light Bars", desc: "Rigid optical acrylic light tubes that tuck completely concealed into dash and door seams" },
    { title: "Dynamic Chasing & Rainbow Modes", desc: "Flowing multi-color chasing animations plus static monochrome luxury themes" },
    { title: "Smartphone Bluetooth App Control", desc: "Change colors, adjust brightness, and sync with music rhythm via iOS & Android" },
    { title: "Full Cabin Integration", desc: "Doors, dashboard, front & rear footwells, and interior handle pockets" },
    { title: "Concealed Factory-Style Fitment", desc: "Installed cleanly with hidden wiring by experienced auto electricians in Saddar" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-carbon-900 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Visual: Original Symphony Ambient Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-red-500/20 shadow-2xl bg-carbon-950 group shadow-red-950/20">
              <Image
                src="/images/products/symphony-ambient-led.jpg"
                alt="Symphony 64-color acrylic interior ambient lighting by Hasnain Auto Saddar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-carbon-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-red-accent uppercase tracking-widest">
                    Cockpit Transformation
                  </div>
                  <div className="text-sm font-black text-white">
                    Symphony 64-Color Smart Ambience
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-accent text-xs font-bold">
                  Saddar Workshop
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-widest shadow-red-glow-sm">
                <Sparkles className="w-3.5 h-3.5 text-red-brand" />
                <span>Interior Lighting Excellence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                SYMPHONY 64-COLOR <br />
                <span className="red-gradient-text">CABIN AMBIENCE.</span>
              </h2>
              <p className="text-base sm:text-lg font-bold text-silver-200 tracking-wide">
                Mercedes S-Class Luxury Lighting For Your Car
              </p>
            </div>

            <p className="text-sm text-silver-300 leading-relaxed">
              Elevate your daily night drive. Our Symphony system utilizes razor-thin, concealed acrylic light channels that eliminate ugly bulging neon strips. Custom installed specifically for Corolla, Civic, Yaris, Sportage, Tucson, Swift, and Alto at our Saddar workshop.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-red-600/10 text-red-brand mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-red-brand" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {item.title}:
                    </span>{" "}
                    <span className="text-xs text-silver-300">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                href="/product/ambient-led-lights"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-red-glow"
              >
                <span>EXPLORE AMBIENT LIGHTING</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

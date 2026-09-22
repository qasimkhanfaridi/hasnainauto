import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const LightingShowcase: React.FC = () => {
  const lightingFeatures = [
    { title: "20,000 LM LED Headlight Projector Kits", desc: "Dual vacuum copper heatpipe cooling with high-velocity turbo fan" },
    { title: "High-Intensity Sealed LED Fog Lights", desc: "Razor-sharp optical cut-off with dual white and golden amber beam options" },
    { title: "Precision Socket Compatibility", desc: "H4, H11, 9005, 9006, and H7 sockets for all Pakistani car models" },
    { title: "Canbus Anti-Flicker Architecture", desc: "100% plug & play compatibility with zero dashboard bulb-out warnings" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-surface-200 border-b border-gray-200 relative overflow-hidden">
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-red-brand/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-widest shadow-red-glow-sm">
                <Zap className="w-3.5 h-3.5 fill-red-brand text-red-brand" />
                <span>Optic Precision Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-carbon-900 uppercase tracking-tight">
                LIGHT UP <br />
                <span className="red-gradient-text">
                  THE ROAD.
                </span>
              </h2>
              <p className="text-base sm:text-lg font-bold text-gray-700 tracking-wide">
                Maximum Night Visibility & Precision Razor Cut-Off
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Drive with total confidence across GT Road, Islamabad Expressway, and the Murree Expressway. Our high-grade LED headlights and projector fog lamps deliver extreme luminous reach without dazzling oncoming vehicles, backed by a 1-year replacement warranty.
            </p>

            <div className="space-y-3 pt-2">
              {lightingFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-red-600/10 text-red-brand mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-red-brand" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-carbon-900 uppercase tracking-wide">
                      {item.title}:
                    </span>{" "}
                    <span className="text-xs text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/shop?category=led-lights"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-red-glow"
              >
                <span>EXPLORE ALL LED LIGHTS</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Original Bi-LED Fog Projector Photography */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 shadow-card bg-white group">
              <Image
                src="/images/products/biled-fog-projectors.jpg"
                alt="High performance LED fog lamps by Hasnain Auto Saddar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[10px] font-bold text-red-brand uppercase tracking-widest">
                    Precision Optical Cut-Off
                  </div>
                  <div className="text-sm font-black text-carbon-900">
                    Headlight & Fog Light Calibration
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-accent text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-red-brand" />
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, ChevronRight, CheckCircle2 } from "lucide-react";

export const MultimediaShowcase: React.FC = () => {
  const mediaFeatures = [
    { title: "Octa-Core IPS / QLED Touch Panels", desc: "4GB RAM + 64GB storage for zero lag navigation & split-screen video" },
    { title: "Wireless Apple CarPlay & Android Auto", desc: "Instant phone pairing for Google Maps, WhatsApp messages & Spotify" },
    { title: "Sony Starlight 1080P Night Cameras", desc: "Ultra-wide 170° view with dynamic parking gridlines in total darkness" },
    { title: "Dual 4K Front & Rear Dash Cameras", desc: "24-hour parked surveillance with collision emergency auto-recording" },
    { title: "Factory Steering Wheel Controls", desc: "100% plug & play CANBUS harness preserving all OEM dashboard controls" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-carbon-900 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-carbon-950 group">
              <Image
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop"
                alt="Modern Android panel CarPlay dashboard installation in Saddar Rawalpindi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-carbon-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-amber-brand uppercase tracking-widest">
                    Vehicle-Specific Fascia Frame
                  </div>
                  <div className="text-sm font-black text-white">
                    OEM Dashboard Integration
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  Zero Wire Splicing
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest">
                <Cpu className="w-3.5 h-3.5" />
                <span>Next-Gen Smart Infotainment</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                CONNECTED. <br />
                <span className="gold-gradient-text">SMART. ENTERTAINING.</span>
              </h2>
              <p className="text-base sm:text-lg font-bold text-silver-200 tracking-wide">
                Touch Navigation, Wireless CarPlay & Crisp Audio
              </p>
            </div>

            <p className="text-sm text-silver-400 leading-relaxed">
              Ditch the outdated factory stereo. We install vehicle-specific Android IPS touch panels engineered specifically for Corolla, Civic, Alto, Swift, Sportage, and Tucson with custom frame housings that match your car&apos;s factory dashboard texture perfectly.
            </p>

            <div className="space-y-3 pt-2">
              {mediaFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-brand/10 text-amber-brand mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {item.title}:
                    </span>{" "}
                    <span className="text-xs text-silver-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                href="/shop?category=multimedia"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-brand to-amber-glow hover:brightness-110 text-carbon-950 font-black text-xs uppercase tracking-wider transition-all shadow-amber-glow"
              >
                <span>EXPLORE MULTIMEDIA COLLECTION</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

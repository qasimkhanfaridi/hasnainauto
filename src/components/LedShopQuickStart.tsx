"use client";

import React from "react";
import Link from "next/link";
import { Car, Zap, ChevronRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const SOCKET_SHORTCUTS = [
  {
    socket: "H4",
    title: "H4 / 9003",
    cars: "Alto · Cultus · Swift · WagonR",
    href: "/shop?category=led-lights&socket=H4",
  },
  {
    socket: "H11",
    title: "H11",
    cars: "Corolla · Civic · Yaris · Sportage",
    href: "/shop?category=led-lights&socket=H11",
  },
  {
    socket: "9005",
    title: "9005 High",
    cars: "Civic X · Fortuner · Revo · City",
    href: "/shop?category=led-lights&socket=9005",
  },
];

export const LedShopQuickStart: React.FC = () => {
  const whatsappLed = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    "Assalam-o-Alaikum Hasnain Auto, mujhe LED headlights chahiye. Meri gari: (make/model). Please correct socket (H4/H11/9005) bata dein aur price + COD confirm kar dein."
  )}`;

  return (
    <section className="bg-gradient-to-b from-carbon-900 to-carbon-950 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="max-w-xl">
            <p className="text-amber-brand text-[11px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-amber-brand" />
              Pakistan&apos;s LED Headlight Specialist · Saddar
            </p>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
              Lights pehle — <span className="text-red-brand">3 simple steps</span>
            </h2>
            <p className="text-sm text-silver-300 mt-2 leading-relaxed">
              Pehle socket ya gari choose karein, phir series dekhein. COD all Pakistan — fitting Saddar workshop par free beam check.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full lg:w-auto">
            <Link
              href="/shop-by-car"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-colors"
            >
              <Car className="w-4 h-4" />
              Meri Gari Select Karein
            </Link>
            <a
              href={whatsappLed}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm shadow-whatsapp-glow"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
              LED WhatsApp Order
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {SOCKET_SHORTCUTS.map((item, step) => (
            <Link
              key={item.socket}
              href={item.href}
              className="group flex flex-col gap-2 p-4 sm:p-5 rounded-2xl bg-carbon-950/80 border border-white/10 hover:border-red-brand/50 hover:bg-carbon-900 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black text-silver-400 uppercase tracking-wider">
                  Step {step + 1} · Socket
                </span>
                <ChevronRight className="w-4 h-4 text-red-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-black text-amber-brand">{item.title}</span>
              <span className="text-xs text-silver-300 font-medium">{item.cars}</span>
              <span className="text-[11px] font-bold text-red-brand uppercase mt-1">Dekhein {item.socket} LEDs →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

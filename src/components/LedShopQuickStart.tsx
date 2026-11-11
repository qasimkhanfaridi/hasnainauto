"use client";

import React from "react";
import Link from "next/link";
import { Car, MessageCircle, Zap, ChevronRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

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
              <MessageCircle className="w-4 h-4 fill-white" />
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

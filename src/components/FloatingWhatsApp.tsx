"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, BadgeCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

// Sample social-proof purchases using real Hasnain Auto product names +
// their real product photos, AuxLEDs style: the card slides in, stays
// ~6s, slides out, and the next purchase appears after a short gap.
const RECENT_PURCHASES = [
  { name: "Ahmed", city: "Rawalpindi", product: "Rego Racing LED Headlights (4 Copper Pipes)", minutesAgo: 70, image: "/images/products/rego-racing-ai-hero.jpg" },
  { name: "Bilal", city: "Islamabad", product: "7D Floor Mats Premium Set", minutesAgo: 52, image: "/images/products/7d-floor-mats-premium.jpg" },
  { name: "Usman", city: "Lahore", product: "Premium Leather Seat Covers", minutesAgo: 59, image: "/images/products/premium-leather-seat-covers.jpg" },
  { name: "Hassan", city: "Karachi", product: "Mother 6 Copper Tube LED Headlights", minutesAgo: 83, image: "/images/products/mother-6-copper-ai-hero.jpg" },
  { name: "Ali", city: "Faisalabad", product: "Ambient Interior LED Lights", minutesAgo: 47, image: "/images/products/symphony-ambient-led.jpg" },
  { name: "Hamza", city: "Multan", product: "LED Headlight Projector Kit", minutesAgo: 63, image: "/images/products/f5-pro-h4-led.jpg" },
  { name: "Zain", city: "Peshawar", product: "Seat Cover + Floor Mat Combo", minutesAgo: 55, image: "/images/products/seat-cover-floor-mat-combo.jpg" },
  { name: "Fahad", city: "Saddar, Rawalpindi", product: "LED Fog Lights Pair", minutesAgo: 68, image: "/images/products/biled-fog-projectors.jpg" },
  { name: "Danish", city: "Rawalpindi", product: "Golden Box Rego LED Headlights (4 Copper Tubes)", minutesAgo: 74, image: "/images/products/golden-box-rego-ai-hero.jpg" },
  { name: "Saad", city: "Islamabad", product: "Leather Key Cover Set", minutesAgo: 79, image: "/images/products/leather-key-cover-set.jpg" },
];

const SHOW_MS = 6000;
const HIDE_MS = 3000;

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [footerOrderVisible, setFooterOrderVisible] = useState(false);

  // Smart-hide (JS Auto rule): hide the floating button while the footer's
  // WhatsApp Now order button is on screen, so two WhatsApp buttons never
  // show at once.
  useEffect(() => {
    const target = document.getElementById("footer-whatsapp-now");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterOrderVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // AuxLEDs rhythm: show ~6s, slide out, ~3s gap, next purchase slides in.
  useEffect(() => {
    if (dismissed) {
      const t = setTimeout(() => {
        setPurchaseIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setDismissed(false);
        setVisible(true);
      }, SHOW_MS + HIDE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (visible) {
        setVisible(false);
      } else {
        setPurchaseIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setVisible(true);
      }
    }, visible ? SHOW_MS : HIDE_MS);
    return () => clearTimeout(t);
  }, [visible, dismissed]);

  const purchase = RECENT_PURCHASES[purchaseIndex];

  return (
    <>
      {/* Social-proof pop-up (bottom-left, never covers the WhatsApp button) */}
      <div
        className={`fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-40 flex items-start gap-3 max-w-[calc(100vw-2rem)] sm:max-w-sm p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-2xl text-xs text-gray-900 dark:text-white transition-all duration-500 ${
          visible && !dismissed
            ? "translate-x-0 opacity-100"
            : "-translate-x-[120%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0">
          <Image
            src={purchase.image}
            alt={purchase.product}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="space-y-0.5 min-w-0">
          <div className="text-[13px] leading-tight text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">{purchase.name}</span>,{" "}
            {purchase.city} purchased
          </div>
          <div className="font-bold text-[13px] leading-tight line-clamp-2">{purchase.product}</div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <span>{purchase.minutesAgo} minutes ago</span>
            <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400 font-semibold">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setDismissed(true);
          }}
          className="p-1 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white shrink-0"
          aria-label="Dismiss purchase notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        className={`fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3 transition-all duration-300 ${
          footerOrderVisible ? "translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Interactive Tooltip Card (Desktop & Tablet) */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-carbon-900 border border-white/10 shadow-2xl text-xs text-white animate-in slide-in-from-right duration-300">
            <div className="space-y-0.5">
              <div className="font-bold text-amber-brand text-[11px] uppercase tracking-wider">
                LED order / fitment?
              </div>
              <div className="text-[11px] text-silver-300">
                Saddar team — H4, H11, 9005 confirm karein
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="p-1 rounded text-silver-400 hover:text-white"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Action Button — WhatsApp logo, like JS Auto */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
            "Assalam-o-Alaikum Hasnain Auto, mujhe LED headlights chahiye. Meri gari: ___ Socket maloom nahi / H4 / H11 / 9005"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-whatsapp-glow transition-all hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </>
  );
};

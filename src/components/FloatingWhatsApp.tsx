"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, X } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

/**
 * Social-proof pop-up (AuxLEDs style, bottom-left) + floating WhatsApp button.
 * Pop-up: "[Name], [City] purchased [product], [X] minutes ago, Verified" with
 * the product's real photo. Cycle: show 6s → slide out → 3s gap → next entry.
 * Sample buyer names/cities (same as the first version) — real product names
 * and photos from the new 26 products (2026-11-16).
 * Paused 2026-11-16 while all products were removed; restored 2026-11-16
 * with the new products (sumair: "ye pehly version me bhi tha").
 */
interface RecentPurchase {
  name: string;
  city: string;
  product: string;
  image: string;
  minutesAgo: number;
}

const RECENT_PURCHASES: RecentPurchase[] = [
  { name: "Ahmed", city: "Rawalpindi", product: "Mother 6 Copper LED Headlights", image: "/images/products/mother-6-copper-led-headlights-1.jpg", minutesAgo: 52 },
  { name: "Bilal", city: "Islamabad", product: "REGO Racing H4 LED Headlights", image: "/images/products/rego-racing-h4-led-headlights-1.jpg", minutesAgo: 68 },
  { name: "Usman", city: "Lahore", product: "Y6 H4 LED Mini Projector Lens", image: "/images/products/y6-h4-mini-projector-lens-1.jpg", minutesAgo: 47 },
  { name: "Hassan", city: "Karachi", product: "KTM Ai LED Headlight", image: "/images/products/ktm-ai-led-headlight-1.jpg", minutesAgo: 74 },
  { name: "Ali", city: "Faisalabad", product: "SH Pro Two-Colour LED Headlight", image: "/images/products/sh-pro-two-colour-led-headlight-1.jpg", minutesAgo: 59 },
  { name: "Hamza", city: "Multan", product: "B PRO 8 Copper LED Headlights", image: "/images/products/b-pro-8-copper-led-headlights-1.jpg", minutesAgo: 63 },
  { name: "Zain", city: "Peshawar", product: "Golden Box REGO LED Headlights", image: "/images/products/rego-4-copper-h4-golden-box-1.jpg", minutesAgo: 55 },
  { name: "Fahad", city: "Saddar Rawalpindi", product: "LED Off-Road Light Bar (5-Lens)", image: "/images/products/led-off-road-light-bar-5-lens-1.jpg", minutesAgo: 71 },
  { name: "Danish", city: "Rawalpindi", product: "Super Bright T10 LED Bulbs", image: "/images/products/super-bright-t10-led-bulbs-1.jpg", minutesAgo: 44 },
  { name: "Saad", city: "Islamabad", product: "Premium Auto LED Interior Light Kit", image: "/images/products/premium-auto-led-interior-light-kit-1.jpg", minutesAgo: 79 },
];

export const FloatingWhatsApp: React.FC = () => {
  const [footerOrderVisible, setFooterOrderVisible] = useState(false);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [purchaseVisible, setPurchaseVisible] = useState(true);
  const [purchaseDismissed, setPurchaseDismissed] = useState(false);

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

  // Pop-up cycle: each entry shows 6s, slides out, 3s gap, next entry.
  useEffect(() => {
    if (purchaseDismissed) return;
    let hideId = 0;
    const cycleId = window.setInterval(() => {
      setPurchaseIndex((i) => (i + 1) % RECENT_PURCHASES.length);
      setPurchaseVisible(true);
      window.clearTimeout(hideId);
      hideId = window.setTimeout(() => setPurchaseVisible(false), 6000);
    }, 9000);
    hideId = window.setTimeout(() => setPurchaseVisible(false), 6000);
    return () => {
      window.clearInterval(cycleId);
      window.clearTimeout(hideId);
    };
  }, [purchaseDismissed]);

  const purchase = RECENT_PURCHASES[purchaseIndex];

  return (
    <>
      {/* Social-proof pop-up — bottom-left, never covers the WhatsApp button */}
      {!purchaseDismissed && (
        <div
          className={`fixed bottom-20 lg:bottom-6 left-4 z-40 transition-all duration-500 ${
            purchaseVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
          aria-live="polite"
        >
          <div className="relative flex items-start gap-3 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-3">
            <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={purchase.image}
                alt={purchase.product}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 pr-5">
              <p className="text-xs text-gray-600 leading-snug">
                <span className="font-bold text-gray-900">{purchase.name}</span>, {purchase.city} purchased
              </p>
              <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 mt-0.5">
                {purchase.product}
              </p>
              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                {purchase.minutesAgo} minutes ago
                <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss purchase notification"
              onClick={() => setPurchaseDismissed(true)}
              className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3 transition-all duration-300 ${
          footerOrderVisible ? "translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Floating Action Button — WhatsApp logo, like JS Auto */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
            "Assalam-o-Alaikum Hasnain Auto, mujhe LED headlights chahiye. Meri gari: ___ Socket maloom nahi / H4 / H11 / 9005"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-whatsapp-glow transition-all hover:scale-110 animate-in zoom-in duration-500"
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

"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, X, BadgeCheck, ShoppingBag } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

// Sample social-proof purchases using real Hasnain Auto product names.
const RECENT_PURCHASES = [
  { name: "Ahmed", city: "Rawalpindi", product: "Rego Racing LED Headlights (4 Copper Pipes)" },
  { name: "Bilal", city: "Islamabad", product: "7D Floor Mats Premium Set" },
  { name: "Usman", city: "Lahore", product: "Premium Leather Seat Covers" },
  { name: "Hassan", city: "Karachi", product: "Mother 6 Copper Tube LED Headlights" },
  { name: "Ali", city: "Faisalabad", product: "Ambient Interior LED Lights" },
  { name: "Hamza", city: "Multan", product: "LED Headlight Projector Kit" },
  { name: "Zain", city: "Peshawar", product: "Seat Cover + Floor Mat Combo" },
  { name: "Fahad", city: "Saddar, Rawalpindi", product: "LED Fog Lights Pair" },
  { name: "Danish", city: "Rawalpindi", product: "Golden Box Rego LED Headlights (4 Copper Tubes)" },
  { name: "Saad", city: "Islamabad", product: "Leather Key Cover Set" },
];

const MINUTES_AGO = [2, 4, 6, 9, 12, 15, 18, 23, 27, 34];

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [showProof, setShowProof] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Rotate to a new recent purchase every 30 seconds and show the card again.
  useEffect(() => {
    const timer = setInterval(() => {
      setPurchaseIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
      setDismissed(false);
      setShowProof(true);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const purchase = RECENT_PURCHASES[purchaseIndex];
  const minutesAgo = MINUTES_AGO[purchaseIndex % MINUTES_AGO.length];

  return (
    <>
      {/* Social-proof pop-up (bottom-left, never covers the WhatsApp button) */}
      {showProof && !dismissed && (
        <div className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-40 flex items-start gap-2.5 max-w-[calc(100vw-2rem)] sm:max-w-sm p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-2xl text-xs text-gray-900 dark:text-white animate-in slide-in-from-left duration-300">
          <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="font-bold text-[13px] leading-tight">
              {purchase.name}, {purchase.city} purchased {purchase.product}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <span>{minutesAgo} minutes ago</span>
              <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400 font-semibold">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowProof(false);
              setDismissed(true);
            }}
            className="p-1 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white shrink-0"
            aria-label="Dismiss purchase notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3">
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

        {/* Floating Action Button */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
            "Assalam-o-Alaikum Hasnain Auto, mujhe LED headlights chahiye. Meri gari: ___ Socket maloom nahi / H4 / H11 / 9005"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 shadow-whatsapp-glow transition-all hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-carbon-950 text-carbon-950" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-brand animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-brand border-2 border-carbon-950" />
        </a>
      </div>
    </>
  );
};

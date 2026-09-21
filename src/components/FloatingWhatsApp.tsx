"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3">
      {/* Interactive Tooltip Card (Desktop & Tablet) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-carbon-900 border border-white/10 shadow-2xl text-xs text-white animate-in slide-in-from-right duration-300">
          <div className="space-y-0.5">
            <div className="font-bold text-amber-brand text-[11px] uppercase tracking-wider">
              Need Help or Quick Order?
            </div>
            <div className="text-[11px] text-silver-300">
              Chat live with Hasnain Auto Saddar
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
          "Assalam-o-Alaikum Hasnain Auto, I would like to inquire about accessories for my car."
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
  );
};

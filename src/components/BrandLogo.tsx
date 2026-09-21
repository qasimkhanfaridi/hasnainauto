import React from "react";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/config/business";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", size = "md" }) => {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label={BUSINESS_CONFIG.name}
    >
      {/* Precision Automotive Emblem Badge */}
      <div className="relative flex items-center justify-center">
        <div
          className={`relative z-10 flex items-center justify-center rounded-xl bg-gradient-to-b from-carbon-750 to-carbon-900 border border-red-500/40 shadow-card-dark ${
            isSm ? "h-9 w-9" : isLg ? "h-14 w-14" : "h-11 w-11"
          }`}
        >
          {/* Subtle metallic sheen */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-red-500/20 via-transparent to-white/15" />
          
          {/* Stylized 'H' Automotive Monogram with Performance Red Accent */}
          <div className="relative flex items-center justify-center font-black tracking-tighter text-white">
            <span className={`${isSm ? "text-base" : isLg ? "text-2xl" : "text-xl"} font-black text-white`}>
              H
            </span>
            <div className="absolute -bottom-1 h-[2.5px] w-4/5 bg-red-brand shadow-red-glow rounded-full" />
          </div>
        </div>

        {/* Ambient glow underneath */}
        <div className="absolute -inset-1 rounded-xl bg-red-brand/25 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-widest text-silver-100 uppercase ${
              isSm ? "text-base" : isLg ? "text-2xl" : "text-xl"
            }`}
          >
            HASNAIN
          </span>
          <span
            className={`font-extrabold tracking-widest text-red-brand uppercase ${
              isSm ? "text-base" : isLg ? "text-2xl" : "text-xl"
            }`}
          >
            AUTO
          </span>
        </div>
        <span
          className={`tracking-[0.2em] text-silver-400 font-medium uppercase ${
            isSm ? "text-[8px]" : isLg ? "text-xs" : "text-[10px]"
          }`}
        >
          Decoration & Accessories • Saddar
        </span>
      </div>
    </Link>
  );
};

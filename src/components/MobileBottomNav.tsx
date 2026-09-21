"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Layers, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_CONFIG } from "@/config/business";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden bg-carbon-950/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            pathname === "/" ? "text-red-accent font-bold" : "text-silver-400 hover:text-white"
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            pathname === "/shop" ? "text-red-accent font-bold" : "text-silver-400 hover:text-white"
          }`}
          aria-label="Shop"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Shop</span>
        </Link>

        {/* 3. Floating Centerpiece: WhatsApp Order */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
            "Assalam-o-Alaikum Hasnain Auto, I want to order accessories for my vehicle."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-whatsapp relative group"
          aria-label="Order on WhatsApp"
        >
          <div className="relative -top-2 flex items-center justify-center w-11 h-11 rounded-full bg-whatsapp text-carbon-950 shadow-whatsapp-glow group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 fill-carbon-950 text-carbon-950" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-brand animate-ping" />
          </div>
          <span className="text-[9px] font-bold tracking-wider text-whatsapp uppercase -mt-1">
            WhatsApp
          </span>
        </a>

        {/* 4. Categories */}
        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            pathname === "/categories" ? "text-red-accent font-bold" : "text-silver-400 hover:text-white"
          }`}
          aria-label="Categories"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Categories</span>
        </Link>

        {/* 5. Cart */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-silver-400 hover:text-white transition-colors"
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[17px] h-4 px-1 rounded-full bg-red-600 text-white font-black text-[10px] shadow-red-glow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase">Cart</span>
        </button>
      </div>
    </div>
  );
};

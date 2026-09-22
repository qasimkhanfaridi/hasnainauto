"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageCircle, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_CONFIG } from "@/config/business";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.10)] pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors ${
            pathname === "/" ? "text-red-brand" : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${pathname === "/" ? "fill-red-brand" : ""}`} />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${pathname === "/" ? "text-red-brand" : "text-gray-400"}`}>
            Home
          </span>
        </Link>

        {/* 2. Categories */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors ${
            pathname === "/shop" ? "text-red-brand" : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="Categories"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${pathname === "/shop" ? "text-red-brand" : "text-gray-400"}`}>
            Categories
          </span>
        </Link>

        {/* 3. Center: WhatsApp floating button */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
            "Assalam-o-Alaikum Hasnain Auto, I want to order accessories for my vehicle."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 group"
          aria-label="Order on WhatsApp"
        >
          <div className="relative -top-2 flex items-center justify-center w-12 h-12 rounded-full bg-whatsapp text-white shadow-whatsapp-glow group-hover:scale-105 transition-transform border-4 border-white">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-brand animate-ping border-2 border-white" />
          </div>
          <span className="text-[10px] font-bold tracking-wider text-whatsapp uppercase -mt-1.5">
            WhatsApp
          </span>
        </a>

        {/* 4. Cart */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-red-brand text-white font-black text-[10px] shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase">Cart</span>
        </button>

        {/* 5. Account / Orders */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors ${
            pathname === "/contact" ? "text-red-brand" : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="Account"
        >
          <User className="w-5 h-5" />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${pathname === "/contact" ? "text-red-brand" : "text-gray-400"}`}>
            Contact
          </span>
        </Link>
      </div>
    </div>
  );
};

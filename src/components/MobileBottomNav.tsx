"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, LayoutGrid, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.10)] pb-safe">
      <div className="grid grid-cols-4 h-16 items-center px-1">
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

        {/* 2. All Products — 2026-11-20 (sumair): replaces the WhatsApp tab
            in this bottom bar. The floating WhatsApp button on the page
            stays as it is. */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors ${
            pathname === "/shop" ? "text-red-brand" : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="All Products"
        >
          <LayoutGrid className={`w-5 h-5 ${pathname === "/shop" ? "fill-red-brand" : ""}`} />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${pathname === "/shop" ? "text-red-brand" : "text-gray-400"}`}>
            All Products
          </span>
        </Link>

        {/* 3. Cart */}
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

        {/* 4. About Us — 2026-11-20 (sumair): renamed from "Saddar"; goes
            to /contact, the same place as the hamburger menu's About Us. */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center h-full min-h-[44px] gap-0.5 transition-colors ${
            pathname === "/contact" ? "text-red-brand" : "text-gray-400 hover:text-gray-700"
          }`}
          aria-label="About Us"
        >
          <Info className="w-5 h-5" />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${pathname === "/contact" ? "text-red-brand" : "text-gray-400"}`}>
            About Us
          </span>
        </Link>
      </div>
    </div>
  );
};

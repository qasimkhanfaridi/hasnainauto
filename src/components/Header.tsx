"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  Menu, 
  X, 
  Phone, 
  Car, 
  Home
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenQuickOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { selectedVehicle } = useVehicle();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navCategories = [
    { name: "Seat Covers", href: "/shop?category=seat-covers" },
    { name: "Floor Mats", href: "/shop?category=floor-mats" },
    { name: "LED Lights", href: "/shop?category=led-lights" },
    { name: "Holders & Keys", href: "/shop?category=mobile-holders" },
    { name: "Combo Deals", href: "/shop?category=combo-deals" },
    { name: "Shop by Car", href: "/shop-by-car" },
  ];

  return (
    <>
      {/* ─── Top Info Bar ─── */}
      <div className="hidden md:block bg-carbon-900 text-white py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 text-gray-300">
            <span>📍 1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi</span>
            <span>🕒 10:30 AM – 10:00 PM (Daily)</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-whatsapp hover:text-white transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-whatsapp" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-accent" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
          isScrolled ? "shadow-header" : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* ─── Hamburger (Mobile) ─── */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-carbon-900 hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* ─── Logo ─── */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-black text-carbon-900 tracking-tighter uppercase">
                  HASNAIN
                  <span className="text-red-brand">AUTO</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-[0.15em] font-medium -mt-0.5">
                  DECORATION ACCESSORIES
                </span>
              </div>
            </Link>

            {/* ─── Desktop Search Bar ─── */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-red-brand/30 text-gray-400 hover:text-gray-600 transition-all text-sm text-left"
              >
                <Search className="w-4 h-4 text-red-brand shrink-0" />
                <span>Search seat covers, LED lights, floor mats...</span>
              </button>
            </div>

            {/* ─── Right Actions ─── */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile Search */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-red-brand hover:bg-red-light transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* WhatsApp CTA (desktop) */}
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to inquire about accessories for my car.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs transition-all shadow-whatsapp-glow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Call Now */}
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-brand hover:bg-red-dark text-white font-bold text-xs transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              {/* Vehicle Indicator */}
              {selectedVehicle && (
                <Link
                  href="/shop-by-car"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-light border border-red-soft text-red-brand text-[11px] font-semibold"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{selectedVehicle.make} {selectedVehicle.model}</span>
                </Link>
              )}

              {/* Cart */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Shopping Cart"
                className="relative p-2 rounded-xl bg-red-brand hover:bg-red-dark text-white transition-all shadow-red-glow-sm"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-brand text-carbon-900 font-black text-[10px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Desktop Category Navigation Bar ─── */}
        <nav className="hidden lg:block bg-carbon-900 border-t border-carbon-800">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center gap-0">
              {/* Home */}
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === "/"
                    ? "text-white border-red-brand bg-red-brand/10"
                    : "text-gray-300 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>

              {/* All Products */}
              <Link
                href="/shop"
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === "/shop"
                    ? "text-white border-red-brand bg-red-brand/10"
                    : "text-gray-300 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                All Products
              </Link>

              {navCategories.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    pathname === item.href
                      ? "text-white border-red-brand bg-red-brand/10"
                      : "text-gray-300 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Saddar Shop */}
              <Link
                href="/contact"
                className="ml-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-brand hover:text-amber-glow border-b-2 border-transparent hover:border-amber-brand transition-colors whitespace-nowrap"
              >
                📍 Visit Saddar Shop
              </Link>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Slide-Down Menu ─── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-slide-up">
            {selectedVehicle && (
              <div className="px-4 py-3 bg-red-light border-b border-red-soft">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-red-brand font-semibold">
                    <Car className="w-4 h-4" />
                    <span>My Car: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
                  </div>
                  <Link href="/shop-by-car" className="text-[11px] text-red-brand underline font-bold">
                    Shop Fits
                  </Link>
                </div>
              </div>
            )}

            <div className="px-4 py-4 space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "All Products", href: "/shop" },
                { name: "Shop by Car", href: "/shop-by-car" },
                ...navCategories.filter((n) => n.href !== "/shop-by-car"),
                { name: "Visit Saddar Showroom", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-red-brand text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-red-brand"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-whatsapp text-white font-bold text-sm shadow-whatsapp-glow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-brand text-white font-bold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

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
  MapPin, 
  Phone, 
  Car, 
  Clock,
  Sparkles
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenQuickOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenQuickOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { selectedVehicle } = useVehicle();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/shop" },
    { name: "Shop by Car", href: "/shop-by-car" },
    { name: "Seat Covers", href: "/shop?category=seat-covers" },
    { name: "LED Lights", href: "/shop?category=led-lights" },
    { name: "7D & TP Mats", href: "/shop?category=floor-mats" },
    { name: "Holders & Keys", href: "/shop?category=mobile-holders" },
    { name: "Combo Deals", href: "/shop?category=combo-deals" },
    { name: "Saddar Shop", href: "/contact" },
  ];

  return (
    <>
      {/* Top Racing Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-red-glow-sm" />

      {/* Top Utility Bar (Desktop) */}
      <div className="hidden lg:block bg-carbon-950 border-b border-white/5 py-1.5 px-4 sm:px-8 text-xs text-silver-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-silver-300">
              <MapPin className="w-3.5 h-3.5 text-red-brand" />
              <span>1st Floor, Azhar Shaheed Auto Market, Kashmir Rd, Saddar, Rawalpindi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-brand" />
              <span>10:30 AM – 10:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {selectedVehicle ? (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-[11px] font-semibold">
                <Car className="w-3 h-3 text-red-brand" />
                <span>Car: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
              </div>
            ) : null}

            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-silver-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-brand" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Assalam-o-Alaikum Hasnain Auto, I want to inquire about accessories for my car.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-whatsapp hover:text-whatsapp-light transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-whatsapp" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-carbon-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
            : "bg-carbon-950/85 backdrop-blur-md border-b border-white/5 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <BrandLogo />

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "text-white bg-red-600 shadow-sm shadow-red-900/40"
                        : "text-silver-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-red-500/30 text-silver-400 hover:text-white transition-all text-xs"
                title="Search accessories"
                aria-label="Search accessories"
              >
                <Search className="w-4 h-4 text-red-brand" />
                <span className="hidden md:inline pr-2">Search Seats, LEDs, Mats...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] rounded bg-carbon-750 text-silver-400 border border-white/10">
                  /
                </kbd>
              </button>

              {/* Quick Quote / Fitment Button */}
              {onOpenQuickOrder && (
                <button
                  type="button"
                  onClick={onOpenQuickOrder}
                  className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/40 text-red-accent hover:text-white hover:bg-red-600 transition-all text-xs font-bold tracking-wide shadow-red-glow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-brand" />
                  <span>Custom Quote</span>
                </button>
              )}

              {/* WhatsApp Direct CTA Button */}
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  "Assalam-o-Alaikum Hasnain Auto, I want to order accessories for my car."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-bold text-xs tracking-wide transition-all shadow-whatsapp-glow"
              >
                <MessageCircle className="w-4 h-4 fill-carbon-950" />
                <span>WhatsApp</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 rounded-xl bg-carbon-850 hover:bg-carbon-800 border border-white/10 text-silver-200 hover:text-white transition-all"
                title="View shopping cart"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-white font-black text-[11px] shadow-red-glow animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-xl bg-carbon-850 text-silver-200 hover:text-white border border-white/10"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-carbon-950/98 backdrop-blur-2xl px-4 pt-4 pb-6 animate-in slide-in-from-top duration-200">
            {/* Selected vehicle in mobile menu */}
            {selectedVehicle && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-xs text-red-accent">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-red-brand" />
                  <span className="font-semibold">My Vehicle: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
                </div>
                <Link href="/shop" className="underline font-bold text-[11px] text-white">View Fits</Link>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2.5 rounded-xl bg-carbon-850 text-xs font-semibold text-silver-300 hover:text-white hover:bg-carbon-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-bold text-sm shadow-whatsapp-glow"
              >
                <MessageCircle className="w-5 h-5 fill-carbon-950" />
                <span>Order Directly on WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-carbon-800 text-silver-200 font-semibold text-xs border border-white/10"
              >
                <Phone className="w-4 h-4 text-red-brand" />
                <span>Call Store: {BUSINESS_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

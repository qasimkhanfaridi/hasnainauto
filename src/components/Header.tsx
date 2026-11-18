"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  Car, 
  Home,
  Sun,
  Moon,
  Zap
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { useTheme } from "@/context/ThemeContext";
import { Oswald } from "next/font/google";

// Wordmark font (2026-11-18, sumair): the plain system-sans "HASNAIN AUTO"
// looked basic — Oswald is a tall condensed display face, the automotive
// poster look. Loaded weights 600/700 only; use font-semibold/font-bold.
const oswald = Oswald({ subsets: ["latin"], weight: ["600", "700"] });

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Rebuild (2026-11-13): only LED Lights stayed in the nav — Shop by Car,
  // Seat Covers, Floor Mats and Combo Deals were removed by the client.
  // 2026-11-16 (sumair): LED Lights tab removed too — it duplicated All LEDs
  // (same /shop?category=led-lights destination) and served no purpose.
  // 2026-11-17 (sumair): Low Beam / High Beam / Parking Lights added — the
  // three biggest collections, linking to their filtered /shop pages. (Note:
  // these links use the standard style; the red active highlight stays on
  // All Products while browsing a category, since it is still the shop page.)
  const navCategories: { name: string; href: string; ledNav?: boolean }[] = [
    { name: "Low Beam", href: "/shop?category=low-beam" },
    { name: "High Beam", href: "/shop?category=high-beam" },
    { name: "Parking Lights", href: "/shop?category=parking-lights" },
  ];

  return (
    <>
      {/* ─── Top Info Bar (Novsight & Auxleds High-Converting Style) ─── */}
      <div className="bg-red-brand text-white py-2 px-4 border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4">
          <div className="flex items-center gap-3 sm:gap-6 text-white text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>1-Year Replacement Warranty</span>
            </span>
            <span className="hidden sm:inline text-white/70">•</span>
            <span className="hidden sm:inline">🚚 COD — Poora Pakistan</span>
            <span className="hidden lg:inline text-white/70">•</span>
            <span className="hidden lg:inline">📍 Azhar Shaheed Market, Saddar Rawalpindi</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-white transition-colors font-bold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
              <span>WhatsApp: 0312-5127096</span>
            </a>
            <span className="text-white/50">|</span>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1 text-white hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-white" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <header
        className={`sticky top-0 z-50 bg-white dark:bg-carbon-900 transition-all duration-200 ${
          isScrolled ? "shadow-header" : "border-b border-gray-200 dark:border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* ─── Hamburger (Mobile) ─── */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-carbon-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-carbon-800 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* ─── Logo ─── */}
            {/* 2026-11-18 (sumair): NEW logo — car mark cropped from the new lockup (full lockup's text would be unreadable at header size; same lesson as 2026-11-17 Round 3). Oswald wordmark + tagline kept. */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/images/hasnain-auto-logo-mark-v2.jpg"
                alt="Hasnain Auto — Decoration Accessories"
                width={1360}
                height={540}
                className="h-10 sm:h-12 w-auto rounded-lg shrink-0"
                priority
              />
              <div className="flex flex-col leading-tight">
                <span className={`${oswald.className} text-xl sm:text-2xl font-bold text-carbon-900 dark:text-white uppercase tracking-wide`}>
                  HASNAIN{" "}
                  <span className="text-red-brand">AUTO</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-amber-brand dark:text-amber-glow uppercase tracking-[0.12em] font-bold -mt-0.5">
                  Decoration Accessories
                </span>
              </div>
            </Link>

            {/* ─── Desktop Search Bar ─── */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-carbon-800 hover:bg-gray-200 dark:hover:bg-carbon-700 border border-gray-200 dark:border-white/10 hover:border-red-brand/30 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all text-sm text-left"
              >
                <Search className="w-4 h-4 text-red-brand shrink-0" />
                <span>Search LED — H4, H11, 9005, Rego, Mother…</span>
              </button>
            </div>

            {/* ─── Right Actions ─── */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile Search */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-brand hover:bg-red-light dark:hover:bg-carbon-800 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Light and Dark Theme"
                className="p-2 rounded-xl bg-gray-100 dark:bg-carbon-800 hover:bg-gray-200 dark:hover:bg-carbon-700 text-carbon-900 dark:text-amber-brand border border-gray-200 dark:border-white/10 transition-colors"
                title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-brand animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Vehicle Indicator (no link — Shop by Car nav was removed) */}
              {selectedVehicle && (
                <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-light dark:bg-red-950/40 border border-red-soft dark:border-red-900/40 text-red-brand text-[11px] font-semibold">
                  <Car className="w-3.5 h-3.5" />
                  <span>{selectedVehicle.make} {selectedVehicle.model}</span>
                </span>
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
        <nav className="hidden lg:block bg-white dark:bg-carbon-900 border-t border-gray-200 dark:border-carbon-800">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center gap-0">
              {/* Home */}
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === "/"
                    ? "text-gray-900 dark:text-white border-red-brand bg-red-brand/10"
                    : "text-gray-600 dark:text-gray-300 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>

              {/* All Products — 2026-11-17 (sumair): renamed from "All LEDs"; /shop is now the All Products page (Novsight-style rebuild). */}
              <Link
                href="/shop"
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === "/shop"
                    ? "text-gray-900 dark:text-white border-red-brand bg-red-brand/10"
                    : "text-gray-600 dark:text-gray-300 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                All Products
              </Link>

              {navCategories.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                    "ledNav" in item && item.ledNav
                      ? "text-amber-600 dark:text-amber-brand border-amber-brand bg-amber-brand/15 hover:bg-amber-brand/25 shadow-[inset_0_-2px_0_#f59e0b]"
                      : pathname === item.href
                        ? "text-gray-900 dark:text-white border-red-brand bg-red-brand/10"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* About Us — 2026-11-17 (sumair): renamed from "About Hasnain Auto". */}
              <Link
                href="/contact"
                className="ml-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-brand hover:text-amber-500 dark:hover:text-amber-glow border-b-2 border-transparent hover:border-amber-brand transition-colors whitespace-nowrap"
              >
                About Us
              </Link>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Slide-Down Menu ─── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-carbon-900 border-t border-gray-200 dark:border-white/10 shadow-lg animate-slide-up">
            {selectedVehicle && (
              <div className="px-4 py-3 bg-red-light dark:bg-red-950/40 border-b border-red-soft dark:border-red-900/30">
                <div className="flex items-center text-xs">
                  <div className="flex items-center gap-2 text-red-brand font-semibold">
                    <Car className="w-4 h-4" />
                    <span>My Car: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="px-4 py-4 space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "Low Beam", href: "/shop?category=low-beam" },
                { name: "High Beam", href: "/shop?category=high-beam" },
                { name: "Parking Lights", href: "/shop?category=parking-lights" },
                { name: "About Us", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-red-brand text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-carbon-800 hover:text-red-brand"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2 border-t border-gray-100 dark:border-white/10 pt-3">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-whatsapp text-white font-bold text-sm shadow-whatsapp-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
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

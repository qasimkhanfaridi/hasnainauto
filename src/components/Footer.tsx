import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { Oswald } from "next/font/google";
import { BUSINESS_CONFIG } from "@/config/business";
import { CATEGORIES_DATA } from "@/data/products";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

// Wordmark font — same Oswald as the header (2026-11-20, sumair: footer heading must match the header heading).
const oswald = Oswald({ subsets: ["latin"], weight: ["600", "700"] });

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-carbon-900 text-gray-600 dark:text-gray-300 pt-5 pb-20 lg:pb-6 border-t border-gray-200 dark:border-carbon-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 pb-5 border-b border-gray-200 dark:border-carbon-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-1.5">
            {/* Logo */}
            {/* 2026-11-18 (sumair): COMPLETE new logo — same marked circular lockup as the header. */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/hasnain-auto-logo-lockup.jpg"
                alt="Hasnain Auto — Decoration Accessories"
                width={1260}
                height={1260}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className={`${oswald.className} text-xl sm:text-2xl font-bold text-carbon-900 dark:text-white uppercase tracking-wide`}>
                  HASNAIN{" "}<span className="text-red-brand">AUTO</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-amber-brand dark:text-amber-glow uppercase tracking-[0.12em] font-bold -mt-0.5">
                  Decoration Accessories
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Premier automotive accessories showroom in Saddar, Rawalpindi.
              LED headlights, laser fog projectors, and expert workshop installation.
            </p>

            {/* Payment icons */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">PAYMENT METHODS</p>
              <div className="flex items-center gap-2 flex-wrap">
                {["COD", "Meezan Bank", "JazzCash"].map((pm) => (
                  <span key={pm} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-carbon-800 border border-gray-200 dark:border-carbon-750 text-[10px] text-gray-700 dark:text-gray-300 font-semibold">
                    {pm}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-1.5">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES_DATA.filter((cat) => !["seat-covers", "floor-mats", "combo-deals"].includes(cat.id)).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.id}`}
                    className="hover:text-red-brand transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-red-brand/60" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Links */}
          <div className="lg:col-span-3 space-y-1.5">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              Vehicle Upgrades
            </h4>
            <ul className="space-y-1.5 text-xs">
              {[
                { label: "Toyota Corolla & Yaris Accessories", href: "/shop?make=Toyota&compatible=true" },
                { label: "Honda Civic & City Upgrades", href: "/shop?make=Honda&compatible=true" },
                { label: "Suzuki Alto, Cultus & Swift Styling", href: "/shop?make=Suzuki&compatible=true" },
                { label: "KIA Sportage & Stonic Multimedia", href: "/shop?make=Kia&compatible=true" },
                { label: "Hyundai Tucson & Elantra Fitments", href: "/shop?make=Hyundai&compatible=true" },
                { label: "Universal LED & Ambient Lighting", href: "/shop?category=led-lights" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-red-brand transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div className="lg:col-span-3 space-y-1.5">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              Visit Our Store
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-brand shrink-0 mt-0.5" />
                <span className="leading-snug">
                  1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-brand shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-gray-900 dark:hover:text-white font-medium">
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-whatsapp shrink-0" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whatsapp hover:underline font-bold"
                >
                  WhatsApp: {BUSINESS_CONFIG.whatsapp}
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                id="footer-whatsapp-now"
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-1.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                WhatsApp Now
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-1.5 rounded-xl bg-red-brand hover:bg-red-dark text-white font-bold text-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* SEO Text */}
        <div className="py-2 border-b border-gray-200 dark:border-carbon-800 text-[11px] text-gray-500 dark:text-gray-600 leading-relaxed">
          <p>
            Hasnain Auto Decoration & Accessories is your local trusted car modification and auto parts provider in Saddar, Rawalpindi.
            Serving drivers across Rawalpindi, Islamabad, Bahria Town, DHA, Westridge, and Chaklala with premium automotive seat covers,
            LED headlights, laser fog projectors, 7D floor mats, Android panels, Apple CarPlay setups, and expert workshop installation.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <div>&copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Saddar Rawalpindi</span>
            <span>•</span>
            <span>Cash on Delivery & Store Pickup</span>
            <span>•</span>
            <span>WhatsApp Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

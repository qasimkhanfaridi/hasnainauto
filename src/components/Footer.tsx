import React from "react";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, ChevronRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { CATEGORIES_DATA } from "@/data/products";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-carbon-900 text-gray-600 dark:text-gray-300 pt-8 pb-20 lg:pb-8 border-t border-gray-200 dark:border-carbon-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-6 border-b border-gray-200 dark:border-carbon-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-3">
            {/* Logo */}
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                HASNAIN<span className="text-red-brand">AUTO</span>
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] font-medium">
                DECORATION ACCESSORIES
              </span>
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

            {/* Social & WhatsApp */}
            <div className="flex items-center gap-2">
              <a
                href={BUSINESS_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-carbon-800 border border-gray-200 dark:border-carbon-750 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-red-brand/40 transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Salam Hasnain Auto! I want to inquire about car accessories.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-carbon-800 border border-gray-200 dark:border-carbon-750 text-xs font-semibold text-whatsapp hover:border-whatsapp/40 transition-colors"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-2">
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
          <div className="lg:col-span-3 space-y-2">
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
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              Visit Our Store
            </h4>
            <div className="space-y-2 text-xs">
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
                <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whatsapp hover:underline font-bold"
                >
                  WhatsApp: {BUSINESS_CONFIG.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-brand shrink-0" />
                <div className="flex flex-col"><span>Mon – Sat: 10:30 AM – 10:00 PM</span><span className="text-gray-400 dark:text-silver-400">Sunday: 1:00 PM – 8:00 PM</span></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                id="footer-whatsapp-now"
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp Now
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-red-brand hover:bg-red-dark text-white font-bold text-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* SEO Text */}
        <div className="py-3 border-b border-gray-200 dark:border-carbon-800 text-[11px] text-gray-500 dark:text-gray-600 leading-relaxed">
          <p>
            Hasnain Auto Decoration & Accessories is your local trusted car modification and auto parts provider in Saddar, Rawalpindi.
            Serving drivers across Rawalpindi, Islamabad, Bahria Town, DHA, Westridge, and Chaklala with premium automotive seat covers,
            LED headlights, laser fog projectors, 7D floor mats, Android panels, Apple CarPlay setups, and expert workshop installation.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
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

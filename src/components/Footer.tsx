import React from "react";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, ChevronRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BUSINESS_CONFIG } from "@/config/business";
import { CATEGORIES_DATA } from "@/data/products";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-carbon-950 border-t border-white/10 text-silver-400 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-xs sm:text-sm text-silver-400 leading-relaxed max-w-sm pt-2">
              Premier automotive styling and accessories showroom in Saddar, Rawalpindi. 
              Specializing in bespoke leatherette upholstery, high-performance LED headlights, 
              Android infotainment, and 7D floor protection.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={BUSINESS_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-carbon-900 border border-white/10 text-xs font-semibold text-silver-300 hover:text-white hover:border-amber-brand/40 transition-colors"
              >
                Facebook
              </a>
              <a
                href={BUSINESS_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-carbon-900 border border-white/10 text-xs font-semibold text-silver-300 hover:text-white hover:border-amber-brand/40 transition-colors"
              >
                TikTok
              </a>
              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-carbon-900 border border-white/10 text-xs font-semibold text-silver-300 hover:text-white hover:border-amber-brand/40 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.id}`}
                    className="hover:text-amber-brand transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-brand/60" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Vehicle Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Vehicle Upgrades
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  Toyota Corolla & Yaris Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  Honda Civic & City Upgrades
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  Suzuki Alto, Cultus & Swift Styling
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  KIA Sportage & Stonic Multimedia
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  Hyundai Tucson & Elantra Fitments
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-brand transition-colors">
                  Universal LED & Ambient Lighting
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom Location Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Saddar Showroom
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-brand shrink-0 mt-0.5" />
                <span className="leading-snug">
                  1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-brand shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-white font-medium">
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
                <Clock className="w-4 h-4 text-amber-brand shrink-0" />
                <span>Mon – Sat: 10:30 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Local SEO Natural Content Strip */}
        <div className="py-6 border-b border-white/5 text-[11px] text-silver-500 leading-relaxed">
          <p>
            Hasnain Auto Decoration & Accessories is your local trusted car modification and auto parts provider in Saddar, Rawalpindi. 
            Serving drivers across Rawalpindi, Islamabad, Bahria Town, DHA, Westridge, and Chaklala with premium automotive seat covers, 
            LED headlights, laser fog projectors, 7D floor mats, Android panels, Apple CarPlay setups, dash cameras, and expert workshop installation.
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-silver-400">
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

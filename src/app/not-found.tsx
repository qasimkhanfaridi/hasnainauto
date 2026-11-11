import React from "react";
import Link from "next/link";
import { ShoppingBag, MessageCircle, Home, Wrench } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata = {
  title: "404 - Page Not Found | Hasnain Auto Saddar",
  description: "The page or automotive accessory you are looking for does not exist. Browse our complete catalog of LED headlights, seat covers, and 7D floor mats.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-surface-100 dark:bg-carbon-950 text-carbon-900 dark:text-slate-100">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex p-4 rounded-3xl bg-red-brand/10 text-red-brand border border-red-brand/20">
          <Wrench className="w-12 h-12 stroke-[1.5]" />
        </div>

        <div>
          <div className="text-6xl font-black text-red-brand tracking-tighter">404</div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-carbon-900 dark:text-white mt-2">
            PAGE NOT FOUND
          </h1>
          <p className="text-sm text-gray-600 dark:text-silver-400 mt-2">
            The page or auto accessory you are looking for might have been moved, renamed, or is temporarily out of stock.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-red-glow-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-carbon-900 hover:bg-gray-100 dark:hover:bg-carbon-800 text-carbon-900 dark:text-white border border-gray-300 dark:border-white/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-silver-400 mb-2">Looking for a specific car part or fitment?</p>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent("Salam Hasnain Auto! I'm looking for an accessory for my car.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-whatsapp hover:underline"
          >
            <MessageCircle className="w-4 h-4 fill-whatsapp" />
            <span>Ask Hasnain Auto on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

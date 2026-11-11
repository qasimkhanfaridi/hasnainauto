"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Which LED socket fits my car?",
    a: "Most Pakistani cars use H4 (dual beam) on Alto, Cultus, Swift, or H11 + 9005 on Corolla, Civic, Yaris, and Sportage. Use our Shop by Socket bar above, or WhatsApp your make/model — Saddar technicians confirm fitment in minutes.",
  },
  {
    q: "What is Canbus compatible?",
    a: "Canbus-ready drivers reduce dashboard bulb-out warnings and flicker on many modern vehicles. It is not guaranteed on every ECU — we verify fitment at our Kashmir Road workshop before installation.",
  },
  {
    q: "Do you install headlights at the shop?",
    a: "Yes. Hasnain Auto offers professional installation and beam alignment at 1st Floor, Azhar Shaheed Auto Market, Saddar Rawalpindi — ideal for projector and high-output LED kits.",
  },
  {
    q: "Website wattage vs box marketing numbers?",
    a: "We list supplier specifications on each product page. Retail boxes sometimes show promotional figures — trust the specs on hasnainauto.com and our WhatsApp quotes.",
  },
  {
    q: "Payment and delivery across Pakistan?",
    a: "Cash on Delivery nationwide, Meezan Bank / Raast transfer, and JazzCash. Free pickup at Saddar showroom or courier dispatch with order verification call.",
  },
];

export const LedFaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-carbon-900 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-red-brand text-xs font-black uppercase tracking-widest mb-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
            LED Headlight Help
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            LED kharidne se pehle ye sawal — Saddar workshop &amp; COD customers ke liye.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-gray-200 dark:border-white/10 bg-surface-100 dark:bg-carbon-950 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-carbon-900 dark:text-white">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-red-brand transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          Still unsure?{" "}
          <Link href="/contact" className="text-red-brand font-bold hover:underline">
            Visit Saddar showroom
          </Link>{" "}
          or order via WhatsApp from any product page.
        </p>
      </div>
    </section>
  );
};

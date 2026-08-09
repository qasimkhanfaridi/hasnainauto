"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ADVANCE_DISCOUNT_PERCENT } from "@/lib/constants";

function getTimeLeft() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function PromotionSection() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="section-padding bg-navy">
      <div className="max-w-4xl mx-auto text-center px-4">
        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Limited Time Offer</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {ADVANCE_DISCOUNT_PERCENT}% OFF on Full Advance Payment
        </h2>
        <p className="text-white/70 mb-8 max-w-lg mx-auto">
          Pay in advance and save instantly on eligible products.
        </p>
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          {(mounted
            ? [
                { value: time.hours, label: "Hours" },
                { value: time.minutes, label: "Minutes" },
                { value: time.seconds, label: "Seconds" },
              ]
            : [
                { value: 0, label: "Hours" },
                { value: 0, label: "Minutes" },
                { value: 0, label: "Seconds" },
              ]
          ).map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-gold">
                  {mounted ? pad(value) : "--"}
                </span>
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        <Link href="/category/combo-deals" className="inline-flex px-8 py-3.5 btn-gold text-base">
          Shop &amp; Save Now
        </Link>
      </div>
    </section>
  );
}

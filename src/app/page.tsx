import type { Metadata } from "next";
import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { VehicleSocketFinderHero } from "@/components/VehicleSocketFinderHero";
import { LedSeriesShowcase } from "@/components/LedSeriesShowcase";
import { HomeProductsShowcase } from "@/components/HomeProductsShowcase";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CustomerReviews } from "@/components/CustomerReviews";
import { LedFaqSection } from "@/components/LedFaqSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "LED Headlights & Car Lights | Hasnain Auto Saddar Rawalpindi",
  description:
    "Rego, Mother & copper LED headlights in Saddar — H4, H11, 9005. Cash on Delivery Pakistan, Canbus, 1-year warranty, WhatsApp order & workshop fitting.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="w-full bg-white dark:bg-[#070b12] text-gray-900 dark:text-gray-100">
      <HeroSection />

      {/* Smart Vehicle Fitment & Socket Diagnostic */}
      <VehicleSocketFinderHero />

      <LedSeriesShowcase />

      <HomeProductsShowcase />

      <LedFaqSection />
      <CustomerReviews />

      {/* Seat covers & mats — secondary to LED */}
      <CategoryShowcase />

      <ContactSection />
    </div>
  );
}

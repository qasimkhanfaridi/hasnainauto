import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { LocationTrustBar } from "@/components/LocationTrustBar";
import { SocketFinderBar } from "@/components/SocketFinderBar";
import { LedHeadlightsShowcase } from "@/components/LedHeadlightsShowcase";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CustomerReviews } from "@/components/CustomerReviews";
import { LedFaqSection } from "@/components/LedFaqSection";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero with car selector & direct WhatsApp CTA */}
      <HeroSection />

      {/* 2. Trust Bar (Saddar Rawalpindi workshop + COD nationwide) */}
      <LocationTrustBar />

      {/* 3. Fast Bulb Socket Filter (H4 / H11 / 9005) */}
      <SocketFinderBar />

      {/* 4. Complete LED Headlights Catalog with direct ordering */}
      <LedHeadlightsShowcase />

      {/* 5. Shop Other Categories (Seat Covers, 7D Mats, Accessories) */}
      <CategoryShowcase />

      {/* 6. Customer Reviews & Social Proof */}
      <CustomerReviews />

      {/* 7. LED & Warranty FAQ */}
      <LedFaqSection />

      {/* 8. Workshop Location & Contact */}
      <ContactSection />
    </div>
  );
}

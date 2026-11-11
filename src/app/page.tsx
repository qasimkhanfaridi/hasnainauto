import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { HomeProductsShowcase } from "@/components/HomeProductsShowcase";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CustomerReviews } from "@/components/CustomerReviews";
import { LedFaqSection } from "@/components/LedFaqSection";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Carousel + slim trust strip */}
      <HeroSection />

      {/* 2. Immediate Products Catalog right below banner with category tabs & socket filters */}
      <HomeProductsShowcase />

      {/* 3. Shop by Category Visual Grid */}
      <CategoryShowcase />

      {/* 4. Customer Reviews & Social Proof */}
      <CustomerReviews />

      {/* 5. LED & Warranty FAQ */}
      <LedFaqSection />

      {/* 6. Workshop Location & Contact */}
      <ContactSection />
    </div>
  );
}

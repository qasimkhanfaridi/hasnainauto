import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { LocationTrustBar } from "@/components/LocationTrustBar";
import { SocketFinderBar } from "@/components/SocketFinderBar";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { CustomerFavourites } from "@/components/CustomerFavourites";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LightingShowcase } from "@/components/LightingShowcase";
import { InteriorShowcase } from "@/components/InteriorShowcase";
import { InstallationTrust } from "@/components/InstallationTrust";
import { WhyHasnainAuto } from "@/components/WhyHasnainAuto";
import { OurWorkGallery } from "@/components/OurWorkGallery";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ContactSection } from "@/components/ContactSection";
import { LedSeriesShowcase } from "@/components/LedSeriesShowcase";
import { LedHeadlightsShowcase } from "@/components/LedHeadlightsShowcase";
import { LedFaqSection } from "@/components/LedFaqSection";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />

      <LocationTrustBar />

      <SocketFinderBar />

      <LedSeriesShowcase />

      <LedHeadlightsShowcase />

      <CategoryShowcase />

      <CustomerFavourites />

      <BeforeAfterSlider />

      <LightingShowcase />

      <InteriorShowcase />

      <InstallationTrust />

      <WhyHasnainAuto />

      <OurWorkGallery />

      <CustomerReviews />

      <LedFaqSection />

      <ContactSection />
    </div>
  );
}

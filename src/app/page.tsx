import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { LocationTrustBar } from "@/components/LocationTrustBar";
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

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Cinematic Hero with Original LED Road Projection */}
      <HeroSection />

      {/* 2. Location Trust Bar */}
      <LocationTrustBar />

      {/* 3. Original Automotive LED Optical Departments */}
      <CategoryShowcase />

      {/* 4. Most Wanted LED Lighting Products */}
      <CustomerFavourites />

      {/* 5. Interactive Halogen vs LED Highway Comparison Slider */}
      <BeforeAfterSlider />

      {/* 6. Precision Lighting & Bi-LED Fog Projector Feature */}
      <LightingShowcase />

      {/* 7. Symphony 64-Color Smart Cabin Ambience Feature */}
      <InteriorShowcase />

      {/* 8. Saddar Workshop Installation & Beam Calibration Guarantee */}
      <InstallationTrust />

      {/* 9. Why Hasnain Auto Trust Pillars */}
      <WhyHasnainAuto />

      {/* 10. Original LED Hardware Portfolio Gallery */}
      <OurWorkGallery />

      {/* 11. Local Verified Customer Reviews */}
      <CustomerReviews />

      {/* 12. Saddar Kashmir Road Store & Contact */}
      <ContactSection />
    </div>
  );
}

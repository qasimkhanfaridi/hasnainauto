export const dynamic = "force-dynamic";

import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PromotionSection from "@/components/home/PromotionSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <PromotionSection />
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}

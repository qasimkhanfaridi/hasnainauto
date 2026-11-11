import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Accessories by Car Make & Model",
  description:
    "Select Toyota, Honda, Suzuki, KIA, or Hyundai to see compatible seat covers, 7D floor mats, and plug-and-play LED headlights for Pakistani models.",
  alternates: { canonical: "/shop-by-car" },
};

export default function ShopByCarLayout({ children }: { children: React.ReactNode }) {
  return children;
}

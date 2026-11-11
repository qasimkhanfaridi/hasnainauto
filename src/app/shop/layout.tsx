import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Auto Accessories & LED Headlights",
  description:
    "Browse 21+ in-stock items at Hasnain Auto Saddar: Rego & Mother LED kits, seat covers, 7D mats, and combos. Filter by H4, H11, 9005, vehicle fitment, and price.",
  alternates: { canonical: "/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}

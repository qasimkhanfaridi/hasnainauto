import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata: Metadata = {
  title: "Contact & Visit Saddar Showroom",
  description: `Visit ${BUSINESS_CONFIG.address.full} or message on WhatsApp ${BUSINESS_CONFIG.whatsapp} for LED fitment, seat covers, and workshop installation.`,
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import React from "react";
import { ContactSection } from "@/components/ContactSection";
import { InstallationTrust } from "@/components/InstallationTrust";

export const metadata = {
  title: "Contact & Location | Hasnain Auto Saddar Rawalpindi",
  description: "Visit Hasnain Auto Decoration & Accessories at 1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi. Call +92 312 5127096 or message on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-carbon-950 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-xs text-silver-400 mb-2">
          <span>Home</span> <span className="text-silver-600">/</span>{" "}
          <span className="text-amber-brand font-semibold">Store Location</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          VISIT HASNAIN AUTO IN SADDAR
        </h1>
        <p className="text-xs sm:text-sm text-silver-400 mt-1">
          Rawalpindi showroom, customer consultations, and professional accessory installation.
        </p>
      </div>

      <ContactSection />
      <InstallationTrust />
    </div>
  );
}

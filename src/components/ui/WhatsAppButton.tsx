"use client";

import { MessageCircle, Phone } from "lucide-react";
import { BRAND, whatsappOrderLink } from "@/lib/constants";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  message = "Hi Hasnain Auto, I'd like to place an order.",
  className = "",
  label,
}: WhatsAppButtonProps) {
  if (label) {
    return (
      <a
        href={whatsappOrderLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:opacity-90 transition-opacity ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        {label}
      </a>
    );
  }

  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href={whatsappOrderLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg items-center justify-center hover:scale-105 transition-transform ${className}`}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Mobile sticky WhatsApp + Call (mockup style) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-0 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <a
          href={whatsappOrderLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-extrabold text-sm uppercase"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a
          href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-extrabold text-sm uppercase"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>
    </>
  );
}

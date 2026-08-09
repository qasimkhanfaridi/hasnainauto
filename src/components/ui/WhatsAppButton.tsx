"use client";

import { MessageCircle } from "lucide-react";
import { whatsappOrderLink } from "@/lib/constants";

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
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={whatsappOrderLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform ${className}`}
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}

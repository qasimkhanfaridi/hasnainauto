"use client";

import React, { useState } from "react";
import { X, Sparkles, Car } from "lucide-react";
import { createQuickOrderWhatsAppUrl } from "@/utils/whatsapp";
import { useVehicle } from "@/context/VehicleContext";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({ isOpen, onClose }) => {
  const { selectedVehicle } = useVehicle();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carMake, setCarMake] = useState(selectedVehicle?.make || "");
  const [carModel, setCarModel] = useState(selectedVehicle?.model || "");
  const [carYear, setCarYear] = useState(selectedVehicle?.year ? String(selectedVehicle.year) : "");
  const [requirement, setRequirement] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !requirement) return;

    const url = createQuickOrderWhatsAppUrl({
      name,
      phone,
      carMake,
      carModel,
      carYear,
      requirement,
      message,
    });

    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-carbon-900 border border-white/10 shadow-2xl p-6 sm:p-8 text-silver-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-carbon-800 text-silver-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Consultation & Order</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            QUICK WHATSAPP ORDER
          </h2>
          <p className="text-xs text-silver-400">
            Tell us what you need for your vehicle. We will respond directly with available designs, prices, and fitment details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-silver-300 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ali Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-silver-300 uppercase tracking-wider mb-1">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="0312 XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3.5 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
              />
            </div>
          </div>

          {/* Car details */}
          <div className="p-3.5 rounded-xl bg-carbon-950 border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-brand uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Vehicle Details</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Make (e.g. Toyota)"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                className="h-9 px-2.5 bg-carbon-900 border border-white/10 rounded-lg text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
              />
              <input
                type="text"
                placeholder="Model (e.g. Corolla)"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="h-9 px-2.5 bg-carbon-900 border border-white/10 rounded-lg text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
              />
              <input
                type="text"
                placeholder="Year (e.g. 2018)"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                className="h-9 px-2.5 bg-carbon-900 border border-white/10 rounded-lg text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-silver-300 uppercase tracking-wider mb-1">
              Product / Requirement *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Leatherette Seat Covers, 9-inch Android Panel, LED Headlights"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full h-11 px-3.5 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-silver-300 uppercase tracking-wider mb-1">
              Additional Details / Color Preference
            </label>
            <textarea
              rows={2}
              placeholder="Specific design, installation at Saddar store, or home delivery..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-500 focus:outline-none focus:border-amber-brand resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
            <span>SEND REQUEST ON WHATSAPP</span>
          </button>
        </form>
      </div>
    </div>
  );
};

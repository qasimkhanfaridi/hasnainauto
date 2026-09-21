"use client";

import React, { useState } from "react";
import { X, MessageCircle, Sparkles, Car } from "lucide-react";
import { createQuickOrderWhatsAppUrl } from "@/utils/whatsapp";
import { useVehicle } from "@/context/VehicleContext";

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
            <MessageCircle className="w-5 h-5 fill-carbon-950" />
            <span>SEND REQUEST ON WHATSAPP</span>
          </button>
        </form>
      </div>
    </div>
  );
};

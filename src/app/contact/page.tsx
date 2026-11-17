"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { ContactSection } from "@/components/ContactSection";
import { InstallationTrust } from "@/components/InstallationTrust";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("LED Headlights & Fog Lights");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const inquiryText = [
      "Assalam-o-Alaikum Hasnain Auto,",
      "I would like to make an inquiry via your website:",
      `• Name: ${name}`,
      `• Phone/WhatsApp: ${phone}`,
      vehicle ? `• Vehicle: ${vehicle}` : null,
      `• Interest: ${service}`,
      message ? `• Message: ${message}` : null,
      "Please let me know availability and pricing. Thank you!"
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(inquiryText)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-surface-100 dark:bg-carbon-950 min-h-screen py-8 sm:py-12 transition-colors">
      {/* Card entrance (2026-11-18, sumair): same fade-up as the install boxes
          below — own keyframe name so it never clashes with InstallationTrust's
          install-fade-up on this same page. Fill mode "backwards" so the
          animation's final transform does not override the hover lift. */}
      <style>{`@keyframes contact-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-xs text-gray-500 dark:text-silver-400 mb-2">
          <Link href="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>{" "}
          <span className="text-red-brand font-semibold">Contact & Location</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
          GET IN TOUCH WITH HASNAIN AUTO
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-silver-400 mt-1 max-w-2xl">
          Visit our workshop in Saddar, Rawalpindi for professional fitting or send us an inquiry directly for nationwide delivery and product guidance.
        </p>

        {/* Contact Form & Quick Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Inquiry Form — transitions 2026-11-18 (sumair): fade-up entrance + hover lift/shadow. */}
          <div
            style={{
              animation: "contact-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards",
              animationDelay: "0ms",
            }}
            className="lg:col-span-7 bg-white dark:bg-carbon-900 rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-brand/40"
          >
            <div className="flex items-center gap-2 mb-2 text-red-brand text-xs font-bold uppercase tracking-wider">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
              <span>Direct Customer Inquiry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              SEND US A MESSAGE
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-6">
              Fill out the details below. Our team in Saddar responds within minutes during business hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-black text-emerald-900 dark:text-emerald-200">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                  Thank you, {name}! Your inquiry has been routed to our WhatsApp desk (+92 312 5127096). We will review your vehicle details and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Usman Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gray-50 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 text-xs text-carbon-900 dark:text-white focus:outline-none focus:border-red-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gray-50 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 text-xs text-carbon-900 dark:text-white focus:outline-none focus:border-red-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Car Make &amp; Model (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Corolla 2021, Civic X, Alto"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gray-50 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 text-xs text-carbon-900 dark:text-white focus:outline-none focus:border-red-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                      Accessory / Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gray-50 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 text-xs text-carbon-900 dark:text-white focus:outline-none focus:border-red-brand"
                    >
                      <option value="LED Headlights & Fog Lights">LED Headlights &amp; Fog Lights</option>
                      <option value="Custom Leather Seat Covers">Custom Leather Seat Covers</option>
                      <option value="7D Luxury Floor Mats">7D Luxury Floor Mats</option>
                      <option value="Multimedia Android Panel & Camera">Multimedia Android Panel &amp; Camera</option>
                      <option value="Exterior Styling & Mud Flaps">Exterior Styling &amp; Mud Flaps</option>
                      <option value="General Consultation & Fitting">General Consultation &amp; Fitting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Message / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are looking for (e.g. best LED bulb for high throw on highway, color preference for seat covers, workshop fitting appointment)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-carbon-950 border border-gray-200 dark:border-white/10 text-xs text-carbon-900 dark:text-white focus:outline-none focus:border-red-brand resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Info Card — transitions 2026-11-18 (sumair): fade-up entrance (90ms after the form card) + hover lift/shadow. */}
          <div className="lg:col-span-5 space-y-4">
            <div
              style={{
                animation: "contact-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards",
                animationDelay: "90ms",
              }}
              className="p-6 rounded-3xl bg-white dark:bg-carbon-900 border border-gray-200 dark:border-white/10 shadow-sm space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-brand/40"
            >
              <h3 className="text-sm font-black text-carbon-900 dark:text-white uppercase tracking-wider pb-3 border-b border-gray-100 dark:border-white/10">
                Direct Contact Lines
              </h3>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-brand shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Call Store Directly</div>
                  <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="text-xs font-black text-carbon-900 dark:text-white hover:text-red-brand">
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-whatsapp shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">WhatsApp Orders &amp; Fitting</div>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-whatsapp hover:underline"
                  >
                    {BUSINESS_CONFIG.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-carbon-800 text-gray-600 dark:text-gray-300 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Opening Hours</div>
                  <div className="text-xs font-semibold text-carbon-900 dark:text-white">{BUSINESS_CONFIG.openingHours.weekdays}</div>
                  <div className="text-xs text-gray-500 dark:text-silver-400">{BUSINESS_CONFIG.openingHours.sunday}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-brand shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Store Location</div>
                  <div className="text-xs text-gray-700 dark:text-silver-300 leading-snug">{BUSINESS_CONFIG.address.full}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
      <InstallationTrust />
    </div>
  );
}

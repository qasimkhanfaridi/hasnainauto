import React from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 relative">
      {/* Details-card entrance (2026-11-18, sumair): same fade-up as the other
          cards — own keyframe name so it never clashes with the contact page's
          contact-fade-up. Fill mode "backwards" so the animation's final
          transform does not override the hover lift. */}
      <style>{`@keyframes walkin-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Rawalpindi Showroom</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                Walk in Today
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                Drop by our showroom at Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi and upgrade your headlights to Hasnain Auto LEDs!
              </p>
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline"
              >
                <Navigation className="w-4 h-4" />
                <span>Find us on Google Map and get direction</span>
              </a>
            </div>

            {/* Store details card — transitions 2026-11-18 (sumair): fade-up entrance + hover lift/shadow. */}
            <div
              style={{
                animation: "walkin-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards",
                animationDelay: "0ms",
              }}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 space-y-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-600/40"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400 border border-gray-200 dark:border-neutral-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Store Address
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.address.full}
                  </p>
                  <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 font-semibold">
                    (Landmark: Kashmir Road Auto Market, Saddar)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400 border border-gray-200 dark:border-neutral-700">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Call Store</div>
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="text-xs font-bold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {BUSINESS_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-whatsapp border border-gray-200 dark:border-neutral-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">WhatsApp Line</div>
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-whatsapp hover:underline"
                    >
                      {BUSINESS_CONFIG.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Opening Hours</div>
                  <div className="text-xs text-gray-700 dark:text-gray-200 mt-0.5">
                    {BUSINESS_CONFIG.openingHours.weekdays}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {BUSINESS_CONFIG.openingHours.sunday}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="py-3 px-4 rounded-xl bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                  "Assalam-o-Alaikum Hasnain Auto, I want to visit your shop in Saddar. Please share location."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
                <span>WhatsApp</span>
              </a>

              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 h-full">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-neutral-900">
              <Image
                src="/images/walk-in-today-civic-x.jpg"
                alt="White Honda Civic X with Hasnain Auto LED headlights on, parked outside the Hasnain Auto shop at night in Saddar, Rawalpindi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-200 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-sm">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    Saddar Rawalpindi Store
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    1st Floor, Azhar Shaheed Auto Market
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    Kashmir Road, Saddar
                  </div>
                </div>

                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shrink-0 hover:bg-red-700 transition-all flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clickable map — opens Google Maps for the shop */}
        <div className="mt-10">
          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full h-[300px] sm:h-[360px] rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-neutral-900"
            aria-label="View Hasnain Auto on Google Maps"
          >
            <iframe
              title="Hasnain Auto Saddar Location Map"
              src={BUSINESS_CONFIG.googleMapsEmbed}
              className="w-full h-full border-0 opacity-95 group-hover:opacity-100 transition-opacity pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg group-hover:bg-red-700 transition-all whitespace-nowrap">
              <MapPin className="w-4 h-4" />
              View on Google Maps
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

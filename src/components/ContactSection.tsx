import React from "react";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 relative">
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

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 space-y-4 shadow-sm">
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
                    <MessageCircle className="w-4 h-4 fill-whatsapp" />
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
                <MessageCircle className="w-4 h-4 fill-white" />
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

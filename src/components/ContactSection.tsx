import React from "react";
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-surface-200 border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Rawalpindi Showroom</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-carbon-900 uppercase tracking-tight">
                VISIT OR CONTACT US
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Located centrally in the premier automotive market of Rawalpindi. Drive in for vehicle fitment, product trials, or expert advice.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-surface-200 text-amber-brand border border-gray-200 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-carbon-900 uppercase tracking-wider">
                    Store Address
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.address.full}
                  </p>
                  <p className="text-[11px] text-amber-brand mt-1 font-semibold">
                    (Landmark: Kashmir Road Auto Market, Saddar)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface-200 text-amber-brand border border-gray-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Call Store</div>
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="text-xs font-bold text-carbon-900 hover:text-red-brand transition-colors"
                    >
                      {BUSINESS_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface-200 text-whatsapp border border-gray-200">
                    <MessageCircle className="w-4 h-4 fill-whatsapp" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">WhatsApp Line</div>
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

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div className="p-2.5 rounded-xl bg-surface-200 text-gray-600 border border-gray-200 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Opening Hours</div>
                  <div className="text-xs text-gray-700 mt-0.5">
                    {BUSINESS_CONFIG.openingHours.weekdays}
                  </div>
                  <div className="text-xs text-gray-500">
                    {BUSINESS_CONFIG.openingHours.sunday}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="py-3 px-4 rounded-xl bg-white hover:bg-gray-50 text-carbon-900 border border-gray-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-brand" />
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
                className="py-3 px-4 rounded-xl bg-amber-brand hover:brightness-110 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 h-full">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-gray-200 shadow-card bg-white">
              <iframe
                title="Hasnain Auto Saddar Location Map"
                src={BUSINESS_CONFIG.googleMapsEmbed}
                className="w-full h-full border-0 opacity-95 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200 flex items-center justify-between gap-3 shadow-sm">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-amber-brand uppercase tracking-wider">
                    Saddar Rawalpindi Store
                  </div>
                  <div className="text-xs font-bold text-carbon-900 truncate">
                    1st Floor, Azhar Shaheed Auto Market
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Kashmir Road, Saddar
                  </div>
                </div>

                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-red-brand text-white font-black text-xs uppercase tracking-wider shrink-0 hover:bg-red-dark transition-all flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

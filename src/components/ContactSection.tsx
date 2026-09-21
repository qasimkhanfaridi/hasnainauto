import React from "react";
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-carbon-950 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Rawalpindi Showroom</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                VISIT OR CONTACT US
              </h2>
              <p className="text-xs sm:text-sm text-silver-400 mt-2 leading-relaxed">
                Located centrally in the premier automotive market of Rawalpindi. Drive in for vehicle fitment, product trials, or expert advice.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-carbon-900 border border-white/10 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-carbon-950 text-amber-brand border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Store Address
                  </h3>
                  <p className="text-xs text-silver-300 mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.address.full}
                  </p>
                  <p className="text-[11px] text-amber-brand mt-1 font-semibold">
                    (Landmark: Kashmir Road Auto Market, Saddar)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-carbon-950 text-amber-brand border border-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-silver-400 uppercase font-semibold">Call Store</div>
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="text-xs font-bold text-white hover:text-amber-brand transition-colors"
                    >
                      {BUSINESS_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-carbon-950 text-whatsapp border border-white/10">
                    <MessageCircle className="w-4 h-4 fill-whatsapp" />
                  </div>
                  <div>
                    <div className="text-[10px] text-silver-400 uppercase font-semibold">WhatsApp Line</div>
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

              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="p-2.5 rounded-xl bg-carbon-950 text-silver-300 border border-white/10 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-silver-400 uppercase font-semibold">Opening Hours</div>
                  <div className="text-xs text-silver-200 mt-0.5">
                    {BUSINESS_CONFIG.openingHours.weekdays}
                  </div>
                  <div className="text-xs text-silver-400">
                    {BUSINESS_CONFIG.openingHours.sunday}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs: Call Now / WhatsApp / Directions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="py-3 px-4 rounded-xl bg-carbon-850 hover:bg-carbon-800 text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
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
                className="py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-carbon-950" />
                <span>WhatsApp</span>
              </a>

              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-brand to-amber-glow hover:brightness-110 text-carbon-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-amber-glow transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed / Visual Card */}
          <div className="lg:col-span-6 h-full">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-carbon-900">
              <iframe
                title="Hasnain Auto Saddar Location Map"
                src={BUSINESS_CONFIG.googleMapsEmbed}
                className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Address Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-carbon-950/95 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-amber-brand uppercase tracking-wider">
                    Saddar Rawalpindi Store
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    1st Floor, Azhar Shaheed Auto Market
                  </div>
                  <div className="text-[10px] text-silver-400">
                    Kashmir Road, Saddar
                  </div>
                </div>

                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-brand text-carbon-950 font-black text-xs uppercase tracking-wider shrink-0 hover:brightness-110 transition-all shadow-amber-glow flex items-center gap-1.5"
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

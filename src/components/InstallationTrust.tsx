import React from "react";
import { Wrench, CheckCircle2, MapPin } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

export const InstallationTrust: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Clean Installation",
      desc: "Concealed wiring routed strictly along factory vehicle harnesses with zero messy loose cables.",
    },
    {
      step: "02",
      title: "Vehicle-Specific Fitment",
      desc: "OEM connectors, tailored brackets, and custom frame housings built specifically for your make & model.",
    },
    {
      step: "03",
      title: "Professional Handling",
      desc: "Experienced auto electricians who respect your vehicle's interior clips, trim, and electronic ECUs.",
    },
    {
      step: "04",
      title: "Accessory Testing",
      desc: "Comprehensive headlight beam level calibration, camera angle alignment, and sound tuning before handover.",
    },
    {
      step: "05",
      title: "Customer Guidance",
      desc: "Complete walkthrough of Android panel settings, ambient light app controls, and maintenance care tips.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-surface-200 border-b border-gray-200 relative">
      {/* 2026-11-17 (sumair): staggered fade-up entrance for the 5 step boxes. Fill mode "backwards" so the hover lift still works after the animation ends. */}
      <style>{`@keyframes install-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5" />
            <span>Saddar Workshop Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-carbon-900 uppercase tracking-tight">
            PROFESSIONAL INSTALLATION
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Enjoy peace of mind with clean, warranty-safe installation by specialist technicians at our Saddar, Rawalpindi workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              style={{
                animation: "install-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards",
                animationDelay: `${idx * 90}ms`,
              }}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-brand/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-brand/40 group-hover:text-amber-brand transition-colors">
                  {s.step}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-90 transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-carbon-900 uppercase tracking-wide group-hover:text-amber-brand transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-amber-brand uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Location: Azhar Shaheed Auto Market, Saddar</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-carbon-900">
              Visiting From Rawalpindi or Islamabad?
            </h3>
            <p className="text-xs text-gray-600">
              Book your installation slot in advance to avoid weekend waiting times.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                "Assalam-o-Alaikum Hasnain Auto, I want to book an installation appointment at your Saddar workshop."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-whatsapp-glow transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
              <span>Book on WhatsApp</span>
            </a>

            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-carbon-900 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-gray-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-brand" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

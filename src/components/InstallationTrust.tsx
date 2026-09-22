import React from "react";
import { Wrench, CheckCircle2, MessageCircle, MapPin } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

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
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-brand/40 transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-brand/40 group-hover:text-amber-brand transition-colors">
                  {s.step}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-90" />
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
              <MessageCircle className="w-4 h-4 fill-white" />
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

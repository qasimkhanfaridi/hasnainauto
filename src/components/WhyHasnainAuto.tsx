import React from "react";
import { ShieldCheck, Compass, CheckCircle2, MapPin, Award } from "lucide-react";

export const WhyHasnainAuto: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "QUALITY PRODUCTS",
      desc: "Carefully selected automotive accessories tested for thermal endurance, electrical reliability, and weather resistance.",
    },
    {
      icon: Compass,
      title: "EXPERT GUIDANCE",
      desc: "Helping customers choose suitable products that match their driving habits, vehicle electronics, and aesthetic taste.",
    },
    {
      icon: CheckCircle2,
      title: "VEHICLE COMPATIBILITY",
      desc: "Products organized around exact vehicle fitment so you receive parts that install cleanly without unexpected surprises.",
    },
    {
      icon: MapPin,
      title: "LOCAL SUPPORT",
      desc: "Serving Rawalpindi, Islamabad, and nearby Twin Cities drivers with physical showroom support and verified after-sales help.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-carbon-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>The Hasnain Auto Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            WHY CHOOSE HASNAIN AUTO
          </h2>
          <p className="text-xs sm:text-sm text-silver-400">
            A trustworthy, client-first automotive destination in the heart of Rawalpindi&apos;s historic Saddar auto market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-carbon-850 border border-white/5 hover:border-amber-brand/40 transition-all flex flex-col justify-between space-y-4 shadow-card-dark"
              >
                <div className="w-12 h-12 rounded-xl bg-carbon-950 border border-white/10 flex items-center justify-center text-amber-brand">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-xs text-silver-400 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="w-8 h-0.5 bg-amber-brand/40 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

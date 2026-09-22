import React from "react";
import { ShieldCheck, Compass, CheckCircle2, MapPin } from "lucide-react";

export const WhyHasnainAuto: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      desc: "Carefully selected accessories tested for durability and reliability for all Pakistani roads.",
    },
    {
      icon: Compass,
      title: "Best Prices",
      desc: "Competitive market prices with no hidden charges. Quality you can afford.",
    },
    {
      icon: CheckCircle2,
      title: "COD Available",
      desc: "Order now, pay when delivered. Cash on delivery available across Rawalpindi & Islamabad.",
    },
    {
      icon: MapPin,
      title: "Happy Customers",
      desc: "5000+ satisfied customers from Rawalpindi, Islamabad & Twin Cities trust Hasnain Auto.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-carbon-900 uppercase tracking-tight">
            WHY CHOOSE US?
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-surface-200 border border-gray-200 hover:border-red-brand/30 hover:bg-red-light/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-brand mb-3 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-carbon-900 uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: "Hamza Tariq",
      location: "Bahria Town, Rawalpindi",
      car: "Honda Civic X (2019)",
      product: "HyperBeam F5 LEDs & Symphony Ambient Kit",
      rating: 5,
      date: "2 weeks ago",
      text: "Got the F5 LEDs installed along with the 18-piece symphony ambient light in my Civic. The cut-off line on the LEDs is razor sharp, absolutely no glare to other drivers on Islamabad Highway. Very clean wiring work done by Hasnain Auto's electrician in Saddar.",
    },
    {
      name: "Usman Abbasi",
      location: "Saddar, Rawalpindi",
      car: "Toyota Corolla Grande (2021)",
      product: "Custom Tailored Nappa Leatherette Covers",
      rating: 5,
      date: "1 month ago",
      text: "The bucket fitment on these seat covers is OEM level. They took around 1.5 hours to install it carefully without damaging any factory clips. Excellent stitch quality and very breathable in hot weather.",
    },
    {
      name: "Brig. (R) Salman Malik",
      location: "Chaklala Scheme III, Rawalpindi",
      car: "KIA Sportage FWD",
      product: "10-inch QLED Android Panel & Starlight Camera",
      rating: 5,
      date: "3 weeks ago",
      text: "Wireless CarPlay connects immediately when I turn on the ignition. The Sony Starlight reverse camera is remarkably clear at night in our unlit street. Highly professional behaviour and fair pricing.",
    },
    {
      name: "Zain Ul Abideen",
      location: "Westridge, Rawalpindi",
      car: "Suzuki Alto VXL (2022)",
      product: "7D Deep Dish Floor Mats & Push Start Keyless",
      rating: 5,
      date: "2 months ago",
      text: "Ordered through WhatsApp and picked up from their Azhar Shaheed Market store. The 7D mats fit wall-to-wall in my Alto, protecting the carpet from rain mud. Recommended for everyone in Twin Cities!",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-carbon-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-brand/10 border border-amber-brand/30 text-amber-brand text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Customer Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              COMMUNITY FEEDBACK
            </h2>
            <p className="text-xs sm:text-sm text-silver-400 mt-1">
              Real reviews from car enthusiasts and everyday drivers across Rawalpindi & Islamabad.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-carbon-950 border border-white/10 self-start md:self-auto">
            <div className="text-2xl font-black text-white">4.9</div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-brand">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-brand" />
                ))}
              </div>
              <div className="text-[10px] text-silver-400 mt-0.5">
                Based on verified Saddar store customers
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-carbon-850 border border-white/5 hover:border-amber-brand/30 transition-all flex flex-col justify-between space-y-4 shadow-card-dark"
            >
              <div className="space-y-3">
                {/* User Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-silver-400 mt-0.5">
                      {rev.location} • <span className="text-silver-300 font-medium">{rev.car}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-brand shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-brand" />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-silver-300 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Product Tag */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-silver-400">
                  Purchased: <strong className="text-amber-brand">{rev.product}</strong>
                </span>
                <span className="text-silver-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: "Hamza Tariq",
      location: "Bahria Town, Rawalpindi",
      car: "Honda Civic X (2019)",
      product: "LED Headlights & Ambient Kit",
      rating: 5,
      date: "2 weeks ago",
      text: "Got the F5 LEDs installed along with the 18-piece symphony ambient light in my Civic. The cut-off line on the LEDs is razor sharp, absolutely no glare to other drivers. Very clean wiring work done by Hasnain Auto's electrician in Saddar.",
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
      product: "10-inch QLED Android Panel & Camera",
      rating: 5,
      date: "3 weeks ago",
      text: "Wireless CarPlay connects immediately when I turn on the ignition. The reverse camera is remarkably clear at night. Highly professional behaviour and fair pricing from Hasnain Auto.",
    },
    {
      name: "Zain Ul Abideen",
      location: "Westridge, Rawalpindi",
      car: "Suzuki Alto VXL (2022)",
      product: "7D Floor Mats & Push Start Keyless",
      rating: 5,
      date: "2 months ago",
      text: "Ordered through WhatsApp and picked up from their Saddar store. The 7D mats fit wall-to-wall in my Alto. Recommended for everyone in Twin Cities!",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-surface-200 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-carbon-900 uppercase tracking-tight">
              CUSTOMER REVIEWS
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Real feedback from Rawalpindi & Islamabad drivers</p>
          </div>

          {/* Rating Pill */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm self-start">
            <div className="text-2xl font-black text-carbon-900">4.8</div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-brand text-amber-brand" />
                ))}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">108+ Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-red-brand/30 transition-all flex flex-col justify-between gap-3 shadow-sm"
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-carbon-900">{rev.name}</h4>
                      <span className="flex items-center gap-1 text-[10px] text-whatsapp font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {rev.location} • <span className="text-gray-700 font-medium">{rev.car}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-brand text-amber-brand" />
                    ))}
                  </div>
                </div>

                {/* Body */}
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">
                  Purchased: <strong className="text-red-brand">{rev.product}</strong>
                </span>
                <span className="text-gray-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

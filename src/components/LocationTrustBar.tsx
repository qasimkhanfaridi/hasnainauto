import React from "react";
import { MapPin, Wrench, MessageCircle, Headphones } from "lucide-react";

export const LocationTrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: MapPin,
      title: "SADDAR, RAWALPINDI",
      subtitle: "Azhar Shaheed Market, Kashmir Rd",
      accent: "text-amber-brand",
    },
    {
      icon: Wrench,
      title: "CAR ACCESSORIES & INSTALLATION",
      subtitle: "Interior, Exterior & Multimedia Fitting",
      accent: "text-red-brand",
    },
    {
      icon: MessageCircle,
      title: "WHATSAPP ORDERS AVAILABLE",
      subtitle: "Instant confirmation & delivery dispatch",
      accent: "text-whatsapp",
    },
    {
      icon: Headphones,
      title: "LOCAL CUSTOMER SUPPORT",
      subtitle: "Serving Rawalpindi & Islamabad drivers",
      accent: "text-red-brand",
    },
  ];

  return (
    <div className="w-full bg-white border-y border-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-200 border border-gray-200 hover:border-red-brand/25 transition-all"
              >
                <div className={`p-2.5 rounded-xl bg-white border border-gray-200 ${item.accent} shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-carbon-900 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

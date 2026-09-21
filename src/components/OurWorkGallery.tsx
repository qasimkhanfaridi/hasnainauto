"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "all" | "seats" | "mats" | "lighting" | "gadgets";
  title: string;
  car: string;
  image: string;
}

export const OurWorkGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      category: "seats",
      title: "Bespoke Leather Seat Covers with Red Diamond Stitching",
      car: "Custom Bucket Fitment for Toyota Corolla & Civic",
      image: "/images/products/premium-leather-seat-covers.jpg",
    },
    {
      id: "g2",
      category: "mats",
      title: "7D Deep-Dish Floor Mats with Red Accent Binding",
      car: "Full Coverage for KIA Sportage & Hyundai Tucson",
      image: "/images/products/7d-floor-mats-premium.jpg",
    },
    {
      id: "g3",
      category: "seats",
      title: "Complete Interior Transformation Bundle",
      car: "Matched Diamond Leather Seats + 7D Floor Mats",
      image: "/images/products/seat-cover-floor-mat-combo.jpg",
    },
    {
      id: "g4",
      category: "lighting",
      title: "HyperBeam F5 Pro 130W Dual-Beam H4 (20,000 LM)",
      car: "Suzuki Alto 660cc & Toyota Corolla Fitment",
      image: "/images/products/f5-pro-h4-led.jpg",
    },
    {
      id: "g5",
      category: "lighting",
      title: "High-Intensity Sealed LED Fog Light Projectors",
      car: "Blue AR Optic Glass Lens with Sharp Cutoff",
      image: "/images/products/biled-fog-projectors.jpg",
    },
    {
      id: "g6",
      category: "lighting",
      title: "Symphony 64-Color Smart Acrylic Interior Ambient Kit",
      car: "Concealed 18-in-1 Multi-Zone Cockpit Illumination",
      image: "/images/products/symphony-ambient-led.jpg",
    },
  ];

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  const tabs = [
    { id: "all", label: "All Upgrades" },
    { id: "seats", label: "Leather Seat Covers" },
    { id: "mats", label: "7D Floor Mats" },
    { id: "lighting", label: "LED Lighting" },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-carbon-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-widest mb-2 shadow-red-glow-sm">
              <Camera className="w-3.5 h-3.5 text-red-brand" />
              <span>Workshop Showcase Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              OUR RECENT WORK & PRODUCTS
            </h2>
            <p className="text-xs sm:text-sm text-silver-300 mt-1 max-w-lg">
              Tailored seat covers, 7D mats, and precision LED lighting crafted and installed at Hasnain Auto Saddar.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-carbon-900 border border-white/10 self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-sm shadow-red-950/40"
                    : "text-silver-400 hover:text-white hover:bg-carbon-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-carbon-900 border border-white/10 hover:border-red-500/50 shadow-card-dark hover:shadow-red-glow transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-carbon-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/30 to-transparent" />
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-red-accent transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-silver-400 line-clamp-1">
                  {item.car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

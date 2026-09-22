"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { HorizontalScrollSlider } from "./CustomerFavourites";

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
    <section id="gallery" className="py-16 sm:py-20 bg-white border-b border-gray-200 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-light border border-red-soft text-red-brand text-xs font-bold uppercase tracking-widest mb-2">
              <Camera className="w-3.5 h-3.5 text-red-brand" />
              <span>Workshop Showcase Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-carbon-900 uppercase tracking-tight">
              OUR RECENT WORK & PRODUCTS
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-lg">
              Tailored seat covers, 7D mats, and precision LED lighting crafted and installed at Hasnain Auto Saddar.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-200 border border-gray-200 self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-red-brand text-white shadow-sm"
                    : "text-gray-600 hover:text-carbon-900 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <HorizontalScrollSlider itemClassName="shrink-0 w-[85%] sm:w-[55%] lg:w-[32%]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-red-brand/40 shadow-sm hover:shadow-card-hover transition-all duration-300 h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-carbon-900 group-hover:text-red-brand transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.car}
                </p>
              </div>
            </div>
          ))}
        </HorizontalScrollSlider>
      </div>
    </section>
  );
};

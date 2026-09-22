import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CATEGORIES_DATA } from "@/data/products";

export const CategoryShowcase: React.FC = () => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-carbon-900 uppercase tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold text-red-brand hover:text-red-dark uppercase tracking-wider transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible sm:pb-0">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2.5 shrink-0 sm:shrink"
            >
              {/* Circle Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-gray-100 border-2 border-transparent group-hover:border-red-brand transition-all shadow-sm group-hover:shadow-red-glow-sm">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="96px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Label */}
              <span className="text-[11px] sm:text-xs font-bold text-carbon-900 group-hover:text-red-brand transition-colors text-center leading-tight whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}

          {/* More dot */}
          <Link
            href="/shop"
            className="group flex flex-col items-center gap-2.5 shrink-0"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 group-hover:border-red-brand flex items-center justify-center transition-all">
              <span className="text-xl font-black text-gray-400 group-hover:text-red-brand">•••</span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-gray-500 group-hover:text-red-brand transition-colors">More</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

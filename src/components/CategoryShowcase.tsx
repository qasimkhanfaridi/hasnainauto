import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CATEGORIES_DATA } from "@/data/products";

export const CategoryShowcase: React.FC = () => {
  const sortedCategories = [...CATEGORIES_DATA].sort((a, b) =>
    a.id === "led-lights" ? -1 : b.id === "led-lights" ? 1 : 0
  );

  return (
    <section id="categories" className="py-10 sm:py-14 bg-white dark:bg-carbon-900 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              More accessories
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Seat covers &amp; mats bhi available — LED hamari specialty hai.
            </p>
          </div>
          <Link
            href="/shop?category=led-lights"
            className="text-xs sm:text-sm font-bold text-red-brand hover:text-red-dark uppercase tracking-wider transition-colors"
          >
            Back to LEDs
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {sortedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2.5 sm:gap-3 w-full min-w-0"
            >
              <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-red-brand transition-all shadow-sm group-hover:shadow-card-hover">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>

              <span className="text-xs sm:text-sm font-bold text-carbon-900 group-hover:text-red-brand transition-colors text-center leading-snug px-1 w-full">
                {cat.name}
              </span>
            </Link>
          ))}

          <Link
            href="/shop"
            className="group flex flex-col items-center gap-2.5 sm:gap-3 w-full min-w-0"
          >
            <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 group-hover:border-red-brand flex items-center justify-center transition-all">
              <span className="text-2xl sm:text-3xl font-black text-gray-400 group-hover:text-red-brand">•••</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-500 group-hover:text-red-brand transition-colors">
              More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

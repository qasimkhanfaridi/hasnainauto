import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { CATEGORIES_DATA } from "@/data/products";

export const CategoryShowcase: React.FC = () => {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-carbon-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-accent text-xs font-bold uppercase tracking-widest mb-2 shadow-red-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-red-brand" />
              <span>Core Departments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              EXPLORE OUR PRODUCT CATEGORIES
            </h2>
            <p className="text-xs sm:text-sm text-silver-300 mt-2 max-w-xl">
              Precision tailored seat covers, 7D floor mats, high-output LED headlights, and daily driving accessories.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-silver-300 hover:text-red-accent group self-start md:self-auto transition-colors"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-red-brand" />
          </Link>
        </div>

        {/* Categories Grid (6 Departments) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-carbon-850 border border-white/10 hover:border-red-500/60 transition-all duration-500 shadow-card-dark hover:shadow-red-glow h-[380px]"
            >
              {/* Background Photo */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Multi-stage High-Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/70 to-transparent" />
                <div className="absolute inset-0 bg-carbon-950/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Tag / Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-lg bg-carbon-900/90 backdrop-blur-md border border-red-500/30 text-red-accent font-bold text-xs tracking-wider uppercase shadow-sm">
                  {cat.itemCount}
                </span>
              </div>

              {/* Card Bottom Details */}
              <div className="relative z-10 p-6 space-y-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-accent transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-silver-300 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-carbon-900/80 border border-white/10 text-[10px] text-silver-300 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Arrow Action */}
                <div className="flex items-center gap-2 text-xs font-bold text-red-accent group-hover:text-white pt-2 transition-colors">
                  <span>Browse Category</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-red-brand" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

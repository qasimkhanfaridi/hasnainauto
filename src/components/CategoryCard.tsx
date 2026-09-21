import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CategoryInfo } from "@/data/products";

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/shop?category=${category.id}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-carbon-850 border border-white/10 hover:border-amber-brand/50 transition-all duration-500 shadow-card-dark hover:shadow-card-hover h-[360px] sm:h-[390px]"
    >
      {/* Background Image with Zoom & Dark Automotive Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-85"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-950/40 via-transparent to-carbon-950/90" />
      </div>

      {/* Top Header Elements */}
      <div className="relative z-10 p-5 flex items-center justify-between mb-auto">
        <span className="px-3 py-1 rounded-full bg-carbon-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-amber-brand uppercase">
          {category.itemCount}
        </span>
        <div className="w-8 h-8 rounded-full bg-carbon-950/70 border border-white/10 flex items-center justify-center text-silver-300 group-hover:text-amber-brand group-hover:border-amber-brand/40 group-hover:bg-amber-brand/10 transition-all">
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 p-5 sm:p-6 space-y-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-amber-brand transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-silver-400 mt-1 line-clamp-2 leading-relaxed">
            {category.shortDesc}
          </p>
        </div>

        {/* Subcategories tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {category.subcategories.slice(0, 4).map((sub, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-carbon-900/90 text-silver-300 border border-white/5 text-[10px] font-medium"
            >
              {sub}
            </span>
          ))}
          {category.subcategories.length > 4 && (
            <span className="px-1.5 py-0.5 rounded bg-carbon-900/90 text-amber-brand/90 border border-white/5 text-[10px] font-bold">
              +{category.subcategories.length - 4} more
            </span>
          )}
        </div>

        <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-brand tracking-wider uppercase group-hover:translate-x-1 transition-transform">
          <span>Explore Collection</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Bottom metallic indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

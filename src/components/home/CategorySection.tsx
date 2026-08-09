import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/data/categories";

export default function CategorySection() {
  const categories = getCategories();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Browse Collections</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group relative overflow-hidden rounded-xl card-premium">
              <div className={`relative ${category.isHero ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[4/3]"}`}>
                <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  {category.isHero && (
                    <span className="inline-block px-2 py-0.5 bg-gold text-navy text-xs font-bold rounded mb-2">Hero Category</span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{category.description}</p>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

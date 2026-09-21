import React from "react";
import Link from "next/link";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { ACTIVE_CATEGORIES_DATA } from "@/data/products";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Auto Accessories & Decoration Departments | Hasnain Auto Saddar Rawalpindi",
  description: "Explore all car decoration departments: Custom Leather Seat Covers, 7D Floor Mats, LED Headlights, Mobile Holders, and Combo Bundles.",
};

export default function CategoriesPage() {
  return (
    <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="text-xs text-silver-400 mb-2">
          <span>Home</span> <span className="text-silver-600">/</span>{" "}
          <span className="text-red-accent font-semibold">Product Departments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          ACCESSORY & DECORATION DEPARTMENTS
        </h1>
        <p className="text-xs sm:text-sm text-silver-300 mt-1">
          Explore our complete collection of bespoke tailored automotive accessories.
        </p>
      </div>

      <CategoryShowcase />

      {/* Subcategories Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-carbon-900 border border-white/10 space-y-6">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">
            All Product Lines & Specialties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACTIVE_CATEGORIES_DATA.map((cat) => (
              <div key={cat.id} className="p-5 rounded-2xl bg-carbon-950 border border-white/10 space-y-3">
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="text-base font-bold text-white hover:text-red-accent flex items-center justify-between transition-colors"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-red-brand" />
                </Link>
                <div className="flex flex-wrap gap-2">
                  {cat.subcategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={`/shop?category=${cat.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-carbon-900 text-silver-300 hover:text-white hover:border-red-500/30 border border-white/5 text-xs transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

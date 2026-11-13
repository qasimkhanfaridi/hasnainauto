import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ACTIVE_PRODUCTS_DATA, Product } from "@/data/products";

/**
 * TOP COLLECTIONS — the 15 light-type collections customers shop by.
 * Counts are computed from live product data (never invented) and every
 * tile links through a shop filter the shop page actually supports
 * (category / socket / search), so each tile lands on real results.
 * Collections with no matching product yet link to the LED catalogue and
 * show "Coming soon" instead of a fake count.
 */
interface TopCollection {
  id: string;
  name: string;
  image: string;
  href: string;
  /** Null = no matching product in the catalogue yet. */
  count: number | null;
}

const hasSocketOption = (product: Product, socket: string): boolean =>
  product.category === "led-lights" &&
  (product.variants ?? []).some((variant) =>
    variant.options.some((option) => option.includes(socket))
  );

const textMatches = (product: Product, query: string): boolean => {
  const corpus =
    `${product.name} ${product.category} ${product.subcategory ?? ""} ${product.description} ${product.shortDescription}`.toLowerCase();
  return corpus.includes(query.toLowerCase());
};

const countWhere = (predicate: (product: Product) => boolean): number =>
  ACTIVE_PRODUCTS_DATA.filter(predicate).length;

const TOP_COLLECTIONS: TopCollection[] = [
  {
    id: "welcome-lights",
    name: "Welcome Lights",
    image: "/images/products/mini-projector-lens-real-studio.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "ambient-lights",
    name: "Ambient Lights",
    image: "/images/products/symphony-ambient-led.jpg",
    href: "/shop?category=led-lights&search=ambient",
    count: countWhere((p) => textMatches(p, "ambient")),
  },
  {
    id: "auxpods",
    name: "AuxPods - Auxiliary Lighting",
    image: "/images/products/ultra-bright-4-lens-fog-ai-hero.jpg",
    href: "/shop?category=led-lights&search=auxiliary",
    count: countWhere((p) => textMatches(p, "auxiliary")),
  },
  {
    id: "low-beam",
    name: "Low Beam",
    image: "/images/products/mother-6-copper-ai-hero.jpg",
    href: "/shop?category=led-lights&socket=H11",
    count: countWhere((p) => hasSocketOption(p, "H11")),
  },
  {
    id: "high-beam",
    name: "High Beam",
    image: "/images/products/rego-racing-ai-hero.jpg",
    href: "/shop?category=led-lights&socket=9005",
    count: countWhere((p) => hasSocketOption(p, "9005")),
  },
  {
    id: "fog-lights",
    name: "Fog Lights",
    image: "/images/products/biled-fog-projectors.jpg",
    href: "/shop?category=led-lights&search=fog",
    count: countWhere((p) => p.subcategory === "Fog Lights"),
  },
  {
    id: "parking-lights",
    name: "Parking Lights",
    image: "/images/products/y6-projector-ai-hero.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "cabin-lights",
    name: "Cabin Lights",
    image: "/images/products/f5-pro-h4-led.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "turn-signal",
    name: "Turn Signal",
    image: "/images/products/laser-mini-driving-pod.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "dynamic-side-mirrors",
    name: "Dynamic Side Mirrors",
    image: "/images/products/golden-box-rego-ai-hero.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "license-plate",
    name: "License Plate",
    image: "/images/products/black-box-rego-real-studio.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "brake-lights",
    name: "Brake Lights",
    image: "/images/products/b-pro-8-copper-ai-hero.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "fender-lights",
    name: "Fender Lights",
    image: "/images/products/wooden-box-zinc-alloy-ai-hero.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "reverse-lights",
    name: "Reverse Lights",
    image: "/images/products/tasa-h4-ai-hero.jpg",
    href: "/shop?category=led-lights",
    count: null,
  },
  {
    id: "motorcycle-leds",
    name: "Motorcycle Leds",
    image: "/images/products/ultra-bright-4-lens-fog-01.jpg",
    href: "/shop?category=led-lights&search=motorcycle",
    count: countWhere((p) => textMatches(p, "motorcycle")),
  },
];

export const CategoryShowcase: React.FC = () => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white dark:bg-carbon-900 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-carbon-900 dark:text-white uppercase tracking-tight">
              Top Collections
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Shop by light type — headlights, fog lights, interior glow &amp; more.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-red-brand hover:text-red-dark uppercase tracking-wider transition-colors"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {TOP_COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group flex flex-col items-center gap-2.5 sm:gap-3 w-full min-w-0"
            >
              <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 group-hover:border-red-brand transition-all shadow-sm group-hover:shadow-card-hover">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>

              <span className="text-xs sm:text-sm font-bold text-carbon-900 dark:text-white group-hover:text-red-brand transition-colors text-center leading-snug px-1 w-full">
                {collection.name}
              </span>
              {collection.count !== null ? (
                <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 -mt-1.5">
                  {collection.count} {collection.count === 1 ? "product" : "products"}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-red-brand uppercase tracking-wider -mt-1.5">
                  Coming soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

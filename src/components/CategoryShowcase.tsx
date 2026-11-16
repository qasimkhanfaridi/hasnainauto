import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ACTIVE_PRODUCTS_DATA, COLLECTION_PRODUCT_SLUGS } from "@/data/products";

/**
 * TOP COLLECTIONS — the 15 light-type collections customers shop by.
 * Counts come from the explicit slug map in src/data/products.ts
 * (COLLECTION_PRODUCT_SLUGS) — never invented. Every tile with products
 * links to the shop filtered to that collection; empty collections link
 * to the full catalogue and show "Coming soon" instead of a fake count.
 */
interface TopCollection {
  id: string;
  name: string;
  image: string;
  href: string;
  /** Null = no matching product in the catalogue yet. */
  count: number | null;
}

// Zero products means "Coming soon" (never a fake "0 products" label).
const countWhere = (collectionId: string): number | null => {
  const count = ACTIVE_PRODUCTS_DATA.filter((p) =>
    (COLLECTION_PRODUCT_SLUGS[collectionId] ?? []).includes(p.slug)
  ).length;
  return count === 0 ? null : count;
};

const collectionHref = (collectionId: string): string =>
  countWhere(collectionId) === null ? "/shop" : `/shop?category=${collectionId}`;

const TOP_COLLECTIONS: TopCollection[] = [
  {
    id: "welcome-lights",
    name: "Welcome Lights",
    image: "/images/products/mini-projector-lens-real-studio.jpg",
    href: collectionHref("welcome-lights"),
    count: countWhere("welcome-lights"),
  },
  {
    id: "ambient-lights",
    name: "Ambient Lights",
    image: "/images/products/symphony-ambient-led.jpg",
    href: collectionHref("ambient-lights"),
    count: countWhere("ambient-lights"),
  },
  {
    id: "auxpods",
    name: "Pods - Auxiliary Lighting",
    image: "/images/products/ultra-bright-4-lens-fog-ai-hero.jpg",
    href: collectionHref("auxpods"),
    count: countWhere("auxpods"),
  },
  {
    id: "low-beam",
    name: "Low Beam",
    image: "/images/products/mother-6-copper-ai-hero.jpg",
    href: collectionHref("low-beam"),
    count: countWhere("low-beam"),
  },
  {
    id: "high-beam",
    name: "High Beam",
    image: "/images/products/rego-racing-ai-hero.jpg",
    href: collectionHref("high-beam"),
    count: countWhere("high-beam"),
  },
  {
    id: "fog-lights",
    name: "Fog Lights",
    image: "/images/products/biled-fog-projectors.jpg",
    href: collectionHref("fog-lights"),
    count: countWhere("fog-lights"),
  },
  {
    id: "parking-lights",
    name: "Parking Lights",
    image: "/images/products/y6-projector-ai-hero.jpg",
    href: collectionHref("parking-lights"),
    count: countWhere("parking-lights"),
  },
  {
    id: "cabin-lights",
    name: "Cabin Lights",
    image: "/images/products/f5-pro-h4-led.jpg",
    href: collectionHref("cabin-lights"),
    count: countWhere("cabin-lights"),
  },
  {
    id: "turn-signal",
    name: "Turn Signal",
    image: "/images/products/laser-mini-driving-pod.jpg",
    href: collectionHref("turn-signal"),
    count: countWhere("turn-signal"),
  },
  {
    id: "dynamic-side-mirrors",
    name: "Dynamic Side Mirrors",
    image: "/images/products/golden-box-rego-ai-hero.jpg",
    href: collectionHref("dynamic-side-mirrors"),
    count: countWhere("dynamic-side-mirrors"),
  },
  {
    id: "license-plate",
    name: "License Plate",
    image: "/images/products/black-box-rego-real-studio.jpg",
    href: collectionHref("license-plate"),
    count: countWhere("license-plate"),
  },
  {
    id: "brake-lights",
    name: "Brake Lights",
    image: "/images/products/b-pro-8-copper-ai-hero.jpg",
    href: collectionHref("brake-lights"),
    count: countWhere("brake-lights"),
  },
  {
    id: "fender-lights",
    name: "Fender Lights",
    image: "/images/products/wooden-box-zinc-alloy-ai-hero.jpg",
    href: collectionHref("fender-lights"),
    count: countWhere("fender-lights"),
  },
  {
    id: "reverse-lights",
    name: "Reverse Lights",
    image: "/images/products/tasa-h4-ai-hero.jpg",
    href: collectionHref("reverse-lights"),
    count: countWhere("reverse-lights"),
  },
  {
    id: "motorcycle-leds",
    name: "Motorcycle Leds",
    image: "/images/products/ultra-bright-4-lens-fog-01.jpg",
    href: collectionHref("motorcycle-leds"),
    count: countWhere("motorcycle-leds"),
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

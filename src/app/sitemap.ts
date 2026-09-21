import { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { ACTIVE_PRODUCTS_DATA, ACTIVE_CATEGORIES_DATA } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_CONFIG.meta.siteUrl;

  const staticRoutes = [
    "",
    "/shop",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = ACTIVE_CATEGORIES_DATA.map((c) => ({
    url: `${baseUrl}/shop?category=${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = ACTIVE_PRODUCTS_DATA.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

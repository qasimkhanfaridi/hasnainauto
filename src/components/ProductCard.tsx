"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircle, ShoppingBag, CheckCircle2, Eye, Flame } from "lucide-react";
import { Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { selectedVehicle, getCompatibilityBadge } = useVehicle();

  const fitBadge = getCompatibilityBadge(product);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - (product.salePrice || product.price)) / product.originalPrice) * 100)
    : 0;

  const currentPrice = product.salePrice || product.price;

  const whatsappUrl = createSingleProductWhatsAppUrl(
    product,
    1,
    product.variants?.[0]?.options?.[0],
    selectedVehicle
  );

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-carbon-900 border border-white/10 hover:border-red-500/50 shadow-card-dark hover:shadow-red-glow transition-all duration-300 overflow-hidden">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-carbon-950">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-transparent to-black/20 pointer-events-none" />

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 shadow-red-900/40">
              <Flame className="w-3 h-3 fill-white" />
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-md bg-carbon-950/90 backdrop-blur border border-red-500/30 text-red-accent text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-carbon-950/80 backdrop-blur-md border border-white/15 text-silver-300 hover:text-white hover:bg-red-600 hover:border-red-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0"
            title="Quick view product"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Fitment Compatibility Bar over image bottom */}
        <div className="absolute bottom-2 left-2 right-2 z-10">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md border ${
              fitBadge.status === "perfect-fit"
                ? "bg-emerald-950/85 text-emerald-400 border-emerald-500/40"
                : fitBadge.status === "universal"
                ? "bg-carbon-950/85 text-red-accent border-red-500/30"
                : "bg-carbon-950/85 text-silver-300 border-white/10"
            }`}
          >
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{fitBadge.label}</span>
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-bold text-red-accent uppercase tracking-wider truncate">
              {product.subcategory || product.category.replace("-", " ")}
            </span>
            <div className="flex items-center gap-1 text-amber-brand shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-brand" />
              <span className="text-[11px] font-black text-silver-200">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-silver-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group/title">
            <h3 className="text-sm sm:text-base font-black text-white group-hover/title:text-red-accent transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-silver-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Stock Status */}
        <div className="pt-2 border-t border-white/5 flex items-baseline justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-white">
                {BUSINESS_CONFIG.currency.symbol} {currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-silver-400 line-through">
                  {BUSINESS_CONFIG.currency.symbol} {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>In Stock • Rawalpindi Store</span>
            </div>
          </div>
        </div>

        {/* Dual Conversion CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Add To Cart */}
          <button
            type="button"
            onClick={() => addToCart(product, 1, product.variants?.[0]?.options?.[0])}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-carbon-800 hover:bg-red-600 text-silver-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            title="Add product to shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>

          {/* Direct WhatsApp Order CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 text-xs font-black uppercase tracking-wider shadow-whatsapp-glow transition-all truncate"
            title="Order directly via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-carbon-950 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

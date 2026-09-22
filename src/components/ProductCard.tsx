"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircle, ShoppingCart, Eye } from "lucide-react";
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
  const { selectedVehicle } = useVehicle();

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
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-red-brand/40 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* ─── Image ─── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-red-brand text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-amber-brand text-white text-[10px] font-black uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-red-brand hover:border-red-brand/40 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Wishlist heart (static display) */}
        <button
          type="button"
          className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 border border-gray-200 text-gray-400 hover:text-red-brand transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Save to wishlist"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ─── Card Body ─── */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 gap-2">
        {/* Category */}
        <span className="text-[10px] font-bold text-red-brand uppercase tracking-wider">
          {product.subcategory || product.category.replace(/-/g, " ")}
        </span>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-black text-carbon-900 group-hover:text-red-brand transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.round(product.rating) ? "fill-amber-brand text-amber-brand" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-carbon-900">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price + Cart row */}
        <div className="flex items-center justify-between gap-2 pt-1 mt-auto border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-red-brand">
                {BUSINESS_CONFIG.currency.symbol} {currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {BUSINESS_CONFIG.currency.symbol} {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, 1, product.variants?.[0]?.options?.[0])}
            className="p-2 rounded-xl bg-red-brand hover:bg-red-dark text-white transition-all shadow-red-glow-sm"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-whatsapp-glow"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          WhatsApp Order
        </a>
      </div>
    </div>
  );
};

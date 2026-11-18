"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";
import { getProductSpecChips } from "@/utils/productSpecs";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  variant?: "default" | "novsight";
  /** Red "Limited — On Sale" pill, rendered INSIDE the product image. */
  limitedBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, variant = "default", limitedBadge = false }) => {
  const { addToCart, openCart } = useCart();
  const { selectedVehicle } = useVehicle();

  const handleDirectOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const unitPrice = product.salePrice || product.price;
    addToCart(product, 1, product.variants?.[0]?.options?.[0], unitPrice);
    openCart();
  };

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

  const isLed = product.category === "led-lights";
  const specChips = isLed ? getProductSpecChips(product) : [];
  const cardShell =
    variant === "novsight" || isLed
      ? "bg-white dark:bg-[#0d131f] border-gray-200 dark:border-gray-800/80 hover:border-red-600/40 dark:hover:border-cyan-500/50 hover:shadow-red-600/10 dark:hover:shadow-cyan-950/40"
      : "bg-white dark:bg-[#0d131f] border-gray-200 dark:border-gray-800 hover:border-red-600/40 dark:hover:border-cyan-500/40";

  return (
    <div
      className={`group relative flex h-full flex-col ${cardShell} rounded-2xl border shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      {/* ─── Image ─── */}
      <div
        className={`relative aspect-square w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#131b2e] dark:to-[#0c121e] border-b border-gray-200 dark:border-gray-800/60`}
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {/* Product number — 2026-11-18 (sumair): #01 to #26 on every card, catalog order */}
          {typeof product.productNumber === "number" && (
            <span className="px-2 py-0.5 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[10px] font-black tracking-wider shadow-sm">
              #{String(product.productNumber).padStart(2, "0")}
            </span>
          )}
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
            className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-red-brand hover:border-red-brand/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 focus:opacity-100 transition-all shadow-sm z-10"
            title="Quick view"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Limited — On Sale pill, INSIDE the product image (bottom-center) */}
        {limitedBadge && (
          <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-600/40 animate-in zoom-in duration-300">
            Limited — On Sale
          </span>
        )}
      </div>

      {/* ─── Card Body ─── */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 gap-2 bg-white dark:bg-[#0e1422]">
        {/* Category & Sockets */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-bold text-red-600 dark:text-cyan-400 uppercase tracking-wider">
            {product.subcategory || product.category.replace(/-/g, " ")}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-black/40 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-800">
            {product.variants?.[0]?.options?.slice(0, 3).map(o => o.split(' ')[0]).join('/') || "H4/H11"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.round(product.rating) ? "fill-amber-brand text-amber-brand" : "fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700"}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-gray-900 dark:text-gray-200">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-gray-400">({product.reviewCount} verified)</span>
        </div>

        {specChips.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {specChips.map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded bg-red-50 dark:bg-[#162032] border border-red-200 dark:border-cyan-500/20 text-[9px] font-bold text-red-600 dark:text-cyan-300 uppercase tracking-tight"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Price + Direct Order row */}
        <div className="flex items-center justify-between gap-2 pt-2.5 mt-auto border-t border-gray-200 dark:border-gray-800/80">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-gray-900 dark:text-white">
                <span className="text-xs text-red-600 dark:text-cyan-400 mr-0.5">Rs.</span>
                {currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-gray-500 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              COD Free Delivery
            </span>
          </div>
          {/* Order + WhatsApp icon — 2026-11-17 (sumair): like the JS Auto card — compact green WhatsApp icon button next to Order. */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleDirectOrder}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all shadow-md shadow-red-600/25"
              aria-label="Order now"
              title="Add to cart & Checkout"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Order</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:scale-110 hover:shadow-md transition-all duration-300 shadow-sm"
              aria-label="Order on WhatsApp"
              title="Order on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d={WHATSAPP_PATH} />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

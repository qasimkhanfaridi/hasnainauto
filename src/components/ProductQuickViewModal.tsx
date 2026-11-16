"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Check, ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, openCart } = useCart();
  const { selectedVehicle, getCompatibilityBadge } = useVehicle();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // 2026-11-17 (sumair): quantity lives only in the cart now — the modal always adds 1.
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0]?.options?.[0] || ""
  );

  // 2026-11-17 (sumair): close the modal with the Escape key, same as the cart + search. This hook MUST stay before the early return below, or the build fails.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentPrice = product.salePrice || product.price;
  const fitBadge = getCompatibilityBadge(product);

  const whatsappUrl = createSingleProductWhatsAppUrl(
    product,
    1,
    selectedVariant,
    selectedVehicle
  );

  const handleAddToCart = () => {
    const unitPrice = product.salePrice || product.price;
    addToCart(product, 1, selectedVariant, unitPrice);
    onClose();
    openCart();
  };

  // 2026-11-17 (sumair): image carousel — arrows + dots, like the JS Auto quick view.
  const imageCount = product.images.length;
  const goPrevImage = () =>
    setSelectedImageIndex((i) => (i - 1 + imageCount) % imageCount);
  const goNextImage = () =>
    setSelectedImageIndex((i) => (i + 1) % imageCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card — 2026-11-17 (sumair): background dark → white, like the JS Auto quick view. */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 text-gray-900">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left: Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                key={selectedImageIndex}
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover animate-in fade-in duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {imageCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 text-gray-700 hover:text-red-600 shadow-md transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 text-gray-700 hover:text-red-600 shadow-md transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Carousel dots */}
            {imageCount > 1 && (
              <div className="flex items-center justify-center gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedImageIndex === i
                        ? "bg-red-600 scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                      selectedImageIndex === i
                        ? "border-amber-brand ring-1 ring-amber-brand scale-105"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle Compatibility Banner */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Fitment Status: {fitBadge.label}</span>
              </div>
              {product.vehicleCompatibility.note && (
                <p className="text-[11px] text-gray-500">
                  {product.vehicleCompatibility.note}
                </p>
              )}
            </div>
          </div>

          {/* Right: Details & Order */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-brand">
                {product.brand} • {product.subcategory}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-brand">
                  <Star className="w-4 h-4 fill-amber-brand" />
                  <span className="text-xs font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">• {product.reviewCount} customer reviews</span>
                <span className="text-xs text-emerald-600 font-semibold">• In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-baseline justify-between transition-all duration-300 hover:shadow-md hover:border-gray-300">
              <div>
                <span className="text-xl font-black text-gray-900">
                  {BUSINESS_CONFIG.currency.symbol} {currentPrice.toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {BUSINESS_CONFIG.currency.symbol} {(product.price).toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                Saddar, Rawalpindi Store
              </span>
            </div>

            {/* Variants if any */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  {product.variants[0].name}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants[0].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedVariant(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        selectedVariant === opt
                          ? "bg-amber-brand text-carbon-950 border-amber-brand font-bold"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:text-gray-900"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions — 2026-11-17 (sumair): like the JS Auto quick view — red Add to cart + compact green WhatsApp icon button. */}
            <div className="flex items-stretch gap-2 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white flex items-center justify-center shadow-whatsapp-glow hover:scale-110 hover:shadow-md transition-all duration-300"
                aria-label="Order on WhatsApp"
                title="Order on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d={WHATSAPP_PATH} />
                </svg>
              </a>
            </div>

            {/* Key Features */}
            <div className="pt-3 border-t border-gray-200 space-y-1.5">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Highlights:
              </div>
              <ul className="space-y-1 text-xs text-gray-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-brand mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-amber-brand hover:underline font-bold flex items-center gap-1"
              >
                <span>View Full Product Specifications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

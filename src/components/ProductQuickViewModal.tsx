"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Check, MessageCircle, ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, openCart } = useCart();
  const { selectedVehicle, getCompatibilityBadge } = useVehicle();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0]?.options?.[0] || ""
  );

  if (!product) return null;

  const currentPrice = (product.salePrice || product.price) * quantity;
  const fitBadge = getCompatibilityBadge(product);

  const whatsappUrl = createSingleProductWhatsAppUrl(
    product,
    quantity,
    selectedVariant,
    selectedVehicle
  );

  const handleAddToCart = () => {
    const unitPrice = product.salePrice || product.price;
    addToCart(product, quantity, selectedVariant, unitPrice);
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
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-gray-900">
                  {BUSINESS_CONFIG.currency.symbol} {currentPrice.toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {BUSINESS_CONFIG.currency.symbol} {(product.price * quantity).toLocaleString()}
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

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Quantity:
              </label>
              <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

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
                className="w-12 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white flex items-center justify-center shadow-whatsapp-glow transition-all"
                aria-label="Order on WhatsApp"
                title="Order on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
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

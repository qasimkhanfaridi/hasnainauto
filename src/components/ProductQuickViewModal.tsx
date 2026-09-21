"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Check, MessageCircle, ShoppingBag, ChevronRight } from "lucide-react";
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
  const { addToCart } = useCart();
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
    addToCart(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-carbon-900 border border-white/10 shadow-2xl p-6 sm:p-8 text-silver-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-carbon-800 text-silver-300 hover:text-white hover:bg-carbon-700 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left: Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-carbon-950 border border-white/10">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

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
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle Compatibility Banner */}
            <div className="p-3.5 rounded-xl bg-carbon-850 border border-white/5 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Fitment Status: {fitBadge.label}</span>
              </div>
              {product.vehicleCompatibility.note && (
                <p className="text-[11px] text-silver-400">
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
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-brand">
                  <Star className="w-4 h-4 fill-amber-brand" />
                  <span className="text-xs font-bold text-white">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-silver-400">• {product.reviewCount} customer reviews</span>
                <span className="text-xs text-emerald-400 font-semibold">• In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-carbon-950 border border-white/5 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-white">
                  {BUSINESS_CONFIG.currency.symbol} {currentPrice.toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-silver-400 line-through ml-2">
                    {BUSINESS_CONFIG.currency.symbol} {(product.price * quantity).toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-silver-400 font-medium">
                Saddar, Rawalpindi Store
              </span>
            </div>

            {/* Variants if any */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-silver-300 uppercase tracking-wider">
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
                          : "bg-carbon-850 text-silver-300 border-white/10 hover:text-white"
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
              <label className="text-xs font-bold text-silver-300 uppercase tracking-wider">
                Quantity:
              </label>
              <div className="flex items-center rounded-xl bg-carbon-850 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-silver-300 hover:text-white rounded-lg hover:bg-carbon-700"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-silver-300 hover:text-white rounded-lg hover:bg-carbon-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-carbon-950" />
                <span>ORDER ON WHATSAPP NOW</span>
              </a>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded-xl bg-carbon-800 hover:bg-carbon-750 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>
            </div>

            {/* Key Features */}
            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <div className="text-xs font-bold text-silver-300 uppercase tracking-wider">
                Highlights:
              </div>
              <ul className="space-y-1 text-xs text-silver-300">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-brand mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-silver-400">
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

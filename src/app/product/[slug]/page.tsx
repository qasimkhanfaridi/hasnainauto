"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Car, 
  ChevronRight,
  Flame,
  Sparkles,
  Layers,
  Palette
} from "lucide-react";
import { 
  PRODUCTS_DATA, 
  SEAT_COVER_QUALITIES, 
  COVER_COLORS, 
  SeatCoverQuality, 
  CoverColor 
} from "@/data/products";
import { getModelMultiplier } from "@/data/vehicles";
import { BUSINESS_CONFIG } from "@/config/business";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { createSingleProductWhatsAppUrl } from "@/utils/whatsapp";
import { ProductCard } from "@/components/ProductCard";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { selectedVehicle, getCompatibilityBadge } = useVehicle();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.options?.[0] || ""
  );

  // Seat Cover specific configurator state
  const [selectedQuality, setSelectedQuality] = useState<SeatCoverQuality>(
    SEAT_COVER_QUALITIES.find((q) => q.id === "ST8") || SEAT_COVER_QUALITIES[0]
  );
  const [selectedColor, setSelectedColor] = useState<CoverColor>(COVER_COLORS[0]);

  const fitBadge = getCompatibilityBadge(product);

  // Dynamic price calculation with vehicle multiplier
  const vehicleMultiplier = product.isSeatCover
    ? getModelMultiplier(selectedVehicle?.make, selectedVehicle?.model)
    : 1;

  const baseUnitPrice = product.isSeatCover
    ? Math.round(selectedQuality.basePrice * vehicleMultiplier) + selectedColor.surcharge
    : product.salePrice || product.price;

  const currentTotalPrice = baseUnitPrice * quantity;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - (product.salePrice || product.price)) / product.originalPrice) * 100)
    : 0;

  const whatsappUrl = createSingleProductWhatsAppUrl(
    product,
    quantity,
    product.isSeatCover
      ? `${selectedQuality.label} Grade | ${selectedColor.color} Color`
      : selectedVariant,
    selectedVehicle,
    baseUnitPrice,
    product.isSeatCover
      ? {
          quality: `${selectedQuality.label} (${selectedQuality.description})`,
          color: selectedColor.color,
          colorSurcharge: selectedColor.surcharge,
          multiplier: vehicleMultiplier,
        }
      : undefined
  );

  // Related products from the same category or recommendations
  const relatedProducts = PRODUCTS_DATA.filter((p) => {
    if (p.id === product.id) return false;
    if (product.relatedSlugs?.includes(p.slug)) return true;
    return p.category === product.category;
  }).slice(0, 4);

  // Product JSON-LD Structured Data
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": product.brand || BUSINESS_CONFIG.name,
    },
    "offers": {
      "@type": "Offer",
      "url": `${BUSINESS_CONFIG.meta.siteUrl}/product/${product.slug}`,
      "priceCurrency": "PKR",
      "price": baseUnitPrice,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 pb-28 lg:pb-16 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-silver-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver-400" />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver-400" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-white capitalize transition-colors">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver-400" />
            <span className="text-red-accent font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Main Product Showcase Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden bg-carbon-900 border border-white/10 shadow-2xl">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 shadow-red-900/40">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-lg bg-carbon-900/90 backdrop-blur border border-red-500/30 text-red-accent font-bold text-xs uppercase tracking-wider shadow-sm">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? "border-red-500 ring-2 ring-red-500/50 scale-105"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fitment Status Notification */}
              <div className="p-4 rounded-2xl bg-carbon-900 border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-red-brand" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Vehicle Compatibility Guide
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {fitBadge.label}
                  </span>
                  {selectedVehicle && (
                    <span className="text-silver-400">
                      ({selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""})
                    </span>
                  )}
                </div>
                {product.vehicleCompatibility?.note && (
                  <p className="text-xs text-silver-400">
                    {product.vehicleCompatibility.note}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Order Details & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-red-accent flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-brand" />
                  <span>{product.brand || "Hasnain Auto"} • {product.subcategory || product.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-amber-brand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-brand" />
                    ))}
                    <span className="text-xs font-black text-white ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-silver-400">
                    ({product.reviewCount} verified reviews)
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">• In Stock</span>
                </div>
              </div>

              {/* Price Block with Breakdown */}
              <div className="p-5 rounded-2xl bg-carbon-900 border border-red-500/20 shadow-lg shadow-red-950/20">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">
                        {BUSINESS_CONFIG.currency.symbol} {currentTotalPrice.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-silver-400 line-through">
                          {BUSINESS_CONFIG.currency.symbol}{" "}
                          {(product.originalPrice * quantity).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-silver-400 mt-1">
                      {product.isSeatCover
                        ? `Unit Price: ${BUSINESS_CONFIG.currency.symbol} ${baseUnitPrice.toLocaleString()} (Tailored for ${selectedVehicle ? selectedVehicle.model : "Standard Car"})`
                        : "Includes standard fitting hardware"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-bold block">
                      Direct WhatsApp Dispatch
                    </span>
                    <span className="text-[10px] text-silver-400">Saddar, Rawalpindi</span>
                  </div>
                </div>

                {/* Seat cover pricing formula indicator */}
                {product.isSeatCover && (
                  <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-silver-400 space-y-1 bg-carbon-950/60 p-2.5 rounded-xl">
                    <div className="flex justify-between">
                      <span>Quality Grade Base ({selectedQuality.label}):</span>
                      <span className="text-white font-semibold">Rs. {selectedQuality.basePrice.toLocaleString()}</span>
                    </div>
                    {vehicleMultiplier !== 1 && (
                      <div className="flex justify-between text-amber-brand">
                        <span>Vehicle Size Factor ({selectedVehicle?.model}):</span>
                        <span className="font-semibold">{vehicleMultiplier}x</span>
                      </div>
                    )}
                    {selectedColor.surcharge > 0 && (
                      <div className="flex justify-between text-red-accent">
                        <span>Color Premium ({selectedColor.color}):</span>
                        <span className="font-semibold">+Rs. {selectedColor.surcharge.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SEAT COVER CONFIGURATOR (Quality & Colors) */}
              {product.isSeatCover && (
                <div className="space-y-4 p-4 rounded-2xl bg-carbon-900 border border-white/10">
                  {/* Quality Grades */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-silver-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-red-brand" />
                        <span>Select Material Grade:</span>
                      </label>
                      <span className="text-xs font-semibold text-red-accent">
                        {selectedQuality.label} - {selectedQuality.description}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SEAT_COVER_QUALITIES.map((grade) => (
                        <button
                          key={grade.id}
                          type="button"
                          onClick={() => setSelectedQuality(grade)}
                          className={`p-2.5 rounded-xl text-left border transition-all ${
                            selectedQuality.id === grade.id
                              ? "bg-red-600/20 border-red-500 ring-1 ring-red-500/50"
                              : "bg-carbon-950 border-white/10 hover:border-white/25"
                          }`}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>{grade.label}</span>
                            {selectedQuality.id === grade.id && (
                              <CheckCircle2 className="w-3 h-3 text-red-brand" />
                            )}
                          </div>
                          <div className="text-[10px] text-silver-400 truncate mt-0.5">
                            {grade.description}
                          </div>
                          <div className="text-[11px] font-black text-red-accent mt-1">
                            Rs. {grade.basePrice.toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Swatches */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-silver-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-red-brand" />
                        <span>Select Leather Color:</span>
                      </label>
                      <span className="text-xs font-semibold text-white">
                        {selectedColor.color}
                        {selectedColor.surcharge > 0 && ` (+Rs. ${selectedColor.surcharge})`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {COVER_COLORS.map((c) => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                            selectedColor.color === c.color
                              ? "bg-red-600/20 border-red-500 text-white shadow-sm"
                              : "bg-carbon-950 border-white/10 text-silver-300 hover:text-white"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.color}</span>
                          {c.surcharge > 0 && (
                            <span className="text-[10px] text-red-accent">+500</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Variant Selector (for non-seat covers) */}
              {!product.isSeatCover && product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-silver-300 uppercase tracking-wider block">
                    Choose {product.variants[0].name}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedVariant === opt
                            ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                            : "bg-carbon-900 text-silver-300 border-white/10 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-silver-300 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center rounded-xl bg-carbon-900 border border-white/10 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-silver-300 hover:text-white rounded-lg hover:bg-carbon-800"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-silver-300 hover:text-white rounded-lg hover:bg-carbon-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp & Add To Cart CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-carbon-950" />
                  <span>ORDER ON WHATSAPP NOW</span>
                </a>

                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-red-950/30 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add To Shopping Cart</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-[11px] text-silver-400">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-carbon-900 border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-red-brand mb-1" />
                  <span className="font-bold text-white">{product.warranty || "Warranty Backed"}</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-carbon-900 border border-white/5">
                  <Wrench className="w-4 h-4 text-red-brand mb-1" />
                  <span className="font-bold text-white">Saddar Fitting</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-carbon-900 border border-white/5">
                  <Truck className="w-4 h-4 text-whatsapp mb-1" />
                  <span className="font-bold text-white">COD Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs / Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            {/* Description & Features */}
            <div className="md:col-span-8 space-y-6 p-6 sm:p-8 rounded-3xl bg-carbon-900 border border-white/10">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3">
                  Product Overview
                </h3>
                <p className="text-sm text-silver-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-base font-black text-white uppercase tracking-wider mb-3">
                  Key Specifications & Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-silver-300">
                      <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation Notice */}
              <div className="pt-4 border-t border-white/5 p-4 rounded-2xl bg-carbon-950 border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-red-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-red-brand" />
                  <span>Workshop Installation Available</span>
                </h4>
                <p className="text-xs text-silver-400 leading-relaxed">
                  Professional fitting available at our shop: <strong>{BUSINESS_CONFIG.address.full}</strong>. 
                  Experienced master craftsmen for seats, mats, lighting & accessories.
                </p>
              </div>
            </div>

            {/* Right Quick Summary */}
            <div className="md:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Order Through WhatsApp
                </h3>
                <p className="text-xs text-silver-400">
                  Prefer discussing before placing an order? Send a WhatsApp message to confirm stock, custom fitment for your vehicle, and workshop appointment.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-carbon-950" />
                  <span>Chat With Showroom</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                COMPATIBLE & RELATED ACCESSORIES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Fixed Bottom Sticky Bar */}
        <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden p-3 bg-carbon-950/95 backdrop-blur-xl border-t border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, quantity, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant)}
            className="flex-1 py-3 px-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider border border-red-500/50 flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Add ({BUSINESS_CONFIG.currency.symbol} {currentTotalPrice.toLocaleString()})</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3 rounded-xl bg-whatsapp text-carbon-950 font-black text-xs uppercase tracking-wider shadow-whatsapp-glow flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-carbon-950" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}

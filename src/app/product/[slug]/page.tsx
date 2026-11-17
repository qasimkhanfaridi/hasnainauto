"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { 
  Star, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Car, 
  ChevronRight,
  ChevronLeft,
  Flame,
  Sparkles,
  Layers,
  Palette,
  Phone,
  Zap,
  CreditCard
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

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

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

  const router = useRouter();
  const { addToCart } = useCart();
  const { selectedVehicle, getCompatibilityBadge } = useVehicle();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // 2026-11-17 (sumair): quantity lives only in the cart now — the product page always adds 1.
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.options?.[0] || ""
  );

  const handleBuyNow = () => {
    const variantStr = product.isSeatCover
      ? `${selectedQuality.label} | ${selectedColor.color}`
      : selectedVariant;
    addToCart(product, 1, variantStr, baseUnitPrice);
    router.push("/checkout");
  };

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

  const currentTotalPrice = baseUnitPrice; // quantity is always 1 here (cart only)

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - (product.salePrice || product.price)) / product.originalPrice) * 100)
    : 0;

  const whatsappUrl = createSingleProductWhatsAppUrl(
    product,
    1,
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

  // 2026-11-17 (sumair): image carousel — arrows + dots, like the JS Auto quick view.
  const imageCount = product.images.length;
  const goPrevImage = () =>
    setActiveImageIndex((i) => (i - 1 + imageCount) % imageCount);
  const goNextImage = () =>
    setActiveImageIndex((i) => (i + 1) % imageCount);

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

      {/* 2026-11-17 (sumair): product page background dark → white, like the JS Auto product view. */}
      <div className="w-full bg-white min-h-screen py-8 sm:py-12 pb-28 lg:pb-16 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-gray-900 capitalize transition-colors">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-red-accent font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Main Product Showcase Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 shadow-xl">
                <Image
                  key={activeImageIndex}
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover animate-in fade-in duration-300"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Carousel arrows */}
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

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 shadow-red-900/40">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur border border-red-500/30 text-red-600 font-bold text-xs uppercase tracking-wider shadow-sm">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Carousel dots */}
              {imageCount > 1 && (
                <div className="flex items-center justify-center gap-1.5">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIndex === idx
                          ? "bg-red-600 scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

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
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fitment Status Notification */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-red-brand" />
                  <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
                    Vehicle Compatibility Guide
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {fitBadge.label}
                  </span>
                  {selectedVehicle && (
                    <span className="text-gray-500">
                      ({selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""})
                    </span>
                  )}
                </div>
                {product.vehicleCompatibility?.note && (
                  <p className="text-xs text-gray-500">
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
                <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1 text-amber-brand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-brand" />
                    ))}
                    <span className="text-xs font-black text-gray-900 ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount} verified reviews)
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">• In Stock</span>
                </div>
              </div>

              {/* Price Block with Breakdown — 2026-11-17 (sumair): made smaller + hover transition. */}
              <div className="p-3 rounded-xl bg-gray-50 border border-red-500/20 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-500/40 hover:-translate-y-0.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-900">
                        {BUSINESS_CONFIG.currency.symbol} {currentTotalPrice.toLocaleString()}
                      </span>
                      {product.originalPrice && (product.originalPrice > currentTotalPrice) && (
                        <span className="text-sm text-gray-500 line-through">
                          {BUSINESS_CONFIG.currency.symbol}{" "}
                          {(product.originalPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">
                      {product.isSeatCover
                        ? `Unit Price: ${BUSINESS_CONFIG.currency.symbol} ${baseUnitPrice.toLocaleString()} (Tailored for ${selectedVehicle ? selectedVehicle.model : "Standard Car"})`
                        : "Includes standard fitting hardware"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-600 font-bold block">
                      Direct WhatsApp Dispatch
                    </span>
                    <span className="text-[10px] text-gray-500">Saddar, Rawalpindi</span>
                  </div>
                </div>

                {/* Seat cover pricing formula indicator */}
                {product.isSeatCover && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-[11px] text-gray-500 space-y-1 bg-white p-2.5 rounded-xl">
                    <div className="flex justify-between">
                      <span>Quality Grade Base ({selectedQuality.label}):</span>
                      <span className="text-gray-900 font-semibold">Rs. {selectedQuality.basePrice.toLocaleString()}</span>
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
                <div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  {/* Quality Grades */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-xs font-bold text-gray-900 flex items-center justify-between">
                            <span>{grade.label}</span>
                            {selectedQuality.id === grade.id && (
                              <CheckCircle2 className="w-3 h-3 text-red-brand" />
                            )}
                          </div>
                          <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
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
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-red-brand" />
                        <span>Select Leather Color:</span>
                      </label>
                      <span className="text-xs font-semibold text-gray-900">
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
                              ? "bg-red-600/20 border-red-500 text-gray-900 shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-gray-300"
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
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
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
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:text-gray-900"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons — 2026-11-17 (sumair): WhatsApp is now a compact icon button like the grid card ("bahir"), next to Add to Cart / Buy Now. */}
              <div className="space-y-2.5 pt-2">
                {/* Add to Cart + Buy Now + WhatsApp icon — one row on desktop; on mobile Buy Now drops to its own full-width row. */}
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant, baseUnitPrice)}
                    className="col-start-1 row-start-1 w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-red-brand" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="col-span-2 row-start-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-red-glow transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>BUY NOW (CHECKOUT)</span>
                  </button>

                  {/* WhatsApp icon — real WhatsApp logo, hover transition (scale + shadow). */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-2 row-start-1 sm:col-start-3 w-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:scale-110 hover:shadow-md flex items-center justify-center transition-all duration-300 shadow-sm"
                    aria-label="Order on WhatsApp"
                    title="Order on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path d={WHATSAPP_PATH} />
                    </svg>
                  </a>
                </div>

                {/* Call Showroom Button */}
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-gray-900 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-red-brand" />
                  <span>CALL SADDAR SHOWROOM: {BUSINESS_CONFIG.phone}</span>
                </a>
              </div>

              {/* Pakistani Payment & Trust Badges — 2026-11-17 (sumair): hover transitions on the 4 boxes. */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-200 text-[10px] text-gray-500">
                <div className="group flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-red-brand/40 hover:shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-red-brand mb-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-900">{product.warranty ? "Warranty" : "100% Fit"}</span>
                </div>
                <div className="group flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-red-brand/40 hover:shadow-lg">
                  <Wrench className="w-4 h-4 text-amber-brand mb-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-900">Saddar Fitting</span>
                </div>
                <div className="group flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-red-brand/40 hover:shadow-lg">
                  <Truck className="w-4 h-4 text-emerald-500 mb-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-900">COD Available</span>
                </div>
                <div className="group flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-red-brand/40 hover:shadow-lg">
                  <CreditCard className="w-4 h-4 text-cyan-500 mb-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-bold text-gray-900">Raast / JazzCash</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs / Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            {/* Description & Features — 2026-11-17 (sumair): the "Order Through WhatsApp" sidebar box is removed; the WhatsApp icon button next to Add to Cart already covers it, so the box is redundant on every product page. */}
            <div className="md:col-span-12 space-y-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              {/* Product Overview — 2026-11-17 (sumair): hover transition on this box. */}
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider mb-3">
                  Product Overview
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Specifications & Features — 2026-11-17 (sumair): hover transition on this box + each feature row. */}
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                <h3 className="text-base font-black text-gray-900 uppercase tracking-wider mb-3">
                  Key Specifications & Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 rounded-lg p-2 transition-all duration-300 hover:bg-white hover:shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation Notice */}
              <div className="pt-4 border-t border-gray-200 p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <h4 className="text-xs font-bold text-red-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-red-brand" />
                  <span>Workshop Installation Available</span>
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Professional fitting available at our shop: <strong>{BUSINESS_CONFIG.address.full}</strong>. 
                  Experienced master craftsmen for seats, mats, lighting & accessories.
                </p>
              </div>
            </div>

          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
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
        <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden p-3 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, 1, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant)}
            className="flex-1 py-3 px-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider border border-red-500/50 flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-lg"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Add ({BUSINESS_CONFIG.currency.symbol} {currentTotalPrice.toLocaleString()})</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3 rounded-xl bg-whatsapp text-carbon-950 font-black text-xs uppercase tracking-wider shadow-whatsapp-glow flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d={WHATSAPP_PATH} />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Archivo_Black } from "next/font/google";
import { 
  Star, 
  ShoppingBag, 
  CheckCircle2,  
  Wrench,  
  Car, 
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Flame,
  Sparkles,
  Layers,
  Palette,
  Zap,
  Maximize2,
  Play,
  Minus,
  Plus,
  X
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
import { ProductFitmentVerifier } from "@/components/ProductFitmentVerifier";

// Headings display font — the heavy AuxLEDs-style face from sumair's
// recording (2026-11-20): product title + section headings + sticky bar name.
const archivo = Archivo_Black({ subsets: ["latin"], weight: ["400"] });

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

// The 14-point warranty policy — AuxLEDs list minus points 7 & 13, brand
// swapped to Hasnain Auto (sumair's decision, 2026-11-20).
const WARRANTY_POINTS = [
  "All products are in original packaging and the warranty seal is intact.",
  "No alteration or work has been performed on the product for the purpose of fitment.",
  "Water damage is not covered under the warranty.",
  "Accident or theft is not covered under the warranty claim.",
  "Warranty starts from the date the item is purchased.",
  "For items delivered to an address, the warranty period starts from the delivery date.",
  "All warranty claims will be processed upon inspection, which will be accepted or rejected under the provided conditions.",
  "In case of a claim, the warranty will remain under the original warranty period; no new warranty will be issued for the replacement.",
  "Installation charges are not refundable or transferable.",
  "Items that are faulty will be replaced or repaired to their original functionality as purchased.",
  "Replacement is only issued for items that are faulty.",
  "Refunds will take up to 5 working days from the date they have been accepted.",
  "Returns are at the expense of the customer; Hasnain Auto is not liable for any shipping charges.",
  "Hasnain Auto is not liable for damage due to improper installation or alteration to the vehicle or item.",
];

const RETURN_POINTS = [
  "Replacement or repair is issued only for items that are faulty, after inspection.",
  "Items must be returned in their original packaging with the warranty seal intact.",
  "Returns are at the expense of the customer; Hasnain Auto is not liable for any shipping charges.",
  "Refunds will take up to 5 working days from the date they have been accepted.",
  "Installation charges are not refundable or transferable.",
];

// Renders a product description in the AuxLEDs style: short bold
// sub-headings, paragraphs and bullet lists. Understands the plain-text
// structure of the descriptions sumair supplied (2026-11-20): lines ending
// in ":" or "?" and ALL-CAPS lines are headings, "- "/"• "/"✔" lines are
// bullets, "Label | Value" lines are spec rows, "---" is a separator.
function DescriptionBlock({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let rows: [string, string][] = [];
  let k = 0;
  const flush = () => {
    if (bullets.length) {
      const items = bullets;
      blocks.push(
        <ul key={k++} className="space-y-1.5">
          {items.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
              <span className="text-red-brand font-black mt-0.5">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      );
      bullets = [];
    }
    if (rows.length) {
      const rs = rows;
      blocks.push(
        <div key={k++} className="rounded-xl border border-gray-200 overflow-hidden">
          {rs.map(([label, value], i) => (
            <div key={i} className={`flex items-start justify-between gap-3 px-3 py-2 text-xs ${i % 2 ? "bg-white" : "bg-gray-50"}`}>
              <span className="font-bold text-gray-700">{label}</span>
              <span className="text-gray-600 text-right">{value}</span>
            </div>
          ))}
        </div>
      );
      rows = [];
    }
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || /^-{3,}$/.test(line)) { flush(); continue; }
    if (line === "Specification | Details") continue;
    if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("✔️") || line.startsWith("✔")) {
      if (rows.length) flush();
      bullets.push(line.replace(/^(- |• |✔️ ?|✔ ?)/, "").replace(/\*\*/g, ""));
      continue;
    }
    if ((line.match(/ \| /g) || []).length === 1) {
      if (bullets.length) flush();
      const [a, b] = line.split(" | ");
      rows.push([a.replace(/\*\*/g, ""), b.replace(/\*\*/g, "")]);
      continue;
    }
    flush();
    const clean = line.replace(/\*\*/g, "");
    const isHeading =
      clean.endsWith(":") ||
      clean.endsWith("?") ||
      (clean.length <= 90 && /[A-Z]/.test(clean) && clean === clean.toUpperCase());
    if (isHeading) {
      blocks.push(<h4 key={k++} className="text-sm font-black text-gray-900 pt-1.5">{clean}</h4>);
    } else {
      blocks.push(<p key={k++} className="text-sm text-gray-600 leading-relaxed">{clean}</p>);
    }
  }
  flush();
  return <div className="space-y-2.5">{blocks}</div>;
}

function PolicyAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-black uppercase tracking-widest text-gray-900">{title}</span>
        <Plus className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

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

  // Beam position + direct socket — 2026-11-20 (sumair): two extra order
  // options on socket (headlight) products. Beam: Low Beam / High Beam /
  // Fog. Socket: picked directly (H4 / H11 / 9005 / 9006 / H7), defaulting
  // to this product's own socket. Both ride into the cart item and the
  // WhatsApp order message.
  const productSocketSpec = product.specifications?.Socket || "";
  const SOCKET_OPTIONS = ["H4", "H11", "9005", "9006", "H7"];
  const defaultSocket =
    SOCKET_OPTIONS.find((sk) => productSocketSpec.toUpperCase().includes(sk)) || "";
  const [selectedBeam, setSelectedBeam] = useState<string>("");
  const [selectedSocket, setSelectedSocket] = useState<string>(defaultSocket);
  // Only headlight-socket products (H4/H11/9005/9006/H7) get the beam +
  // socket selectors — T10/festoon/interior products have a Socket spec
  // too, but beam position and H-sockets do not apply to them.
  const fitment = defaultSocket
    ? { beam: selectedBeam || undefined, socket: selectedSocket || undefined }
    : undefined;

  // AuxLEDs product-page rebuild (2026-11-20, sumair): quantity stepper,
  // policy accordions, sticky buy bar, recently viewed.
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [recentProducts, setRecentProducts] = useState<typeof PRODUCTS_DATA>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem("hasnain_recently_viewed") || "[]");
      setRecentProducts(
        list
          .filter((x) => x !== product.slug)
          .map((x) => PRODUCTS_DATA.find((p) => p.slug === x))
          .filter(Boolean)
          .slice(0, 4) as typeof PRODUCTS_DATA
      );
      localStorage.setItem(
        "hasnain_recently_viewed",
        JSON.stringify([product.slug, ...list.filter((x) => x !== product.slug)].slice(0, 8))
      );
    } catch {}
  }, [product.slug]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reviewWhatsAppUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    `Assalam-o-Alaikum ${BUSINESS_CONFIG.name},\n\nI want to write a review for *${product.name}*:\n\n*Rating:* ${"★".repeat(reviewRating)}${"☆".repeat(5 - reviewRating)}\n*Name:* ${reviewName || "Customer"}\n*Review:* ${reviewText}`
  )}`;

  const handleBuyNow = () => {
    const variantStr = product.isSeatCover
      ? `${selectedQuality.label} | ${selectedColor.color}`
      : selectedVariant;
    addToCart(product, quantity, variantStr, baseUnitPrice, fitment);
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
      : undefined,
    fitment
  );

  // 2026-11-17 (sumair): image carousel — arrows + dots, like the JS Auto quick view.
  const imageCount = product.images.length;
  // Product video (2026-11-22, sumair): when a product has a video it is
  // slide 0 of the gallery, before the photos; the zoom viewer stays
  // photo-only and keeps its own index (lightboxIndex below).
  const hasVideo = !!product.video;
  const slideOffset = hasVideo ? 1 : 0;
  const slideCount = imageCount + slideOffset;
  const goPrevImage = () =>
    setActiveImageIndex((i) => (i - 1 + slideCount) % slideCount);
  const goNextImage = () =>
    setActiveImageIndex((i) => (i + 1) % slideCount);

  // 2026-11-20 (sumair): AuxLEDs-style fullscreen zoom viewer — expand
  // button on the gallery opens it; click the image to zoom, move the
  // mouse to pan, arrows / keyboard switch photos, ESC closes.
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (imgIdx: number) => {
    setLightboxIndex(imgIdx);
    setLightboxZoomed(false);
    setLightboxOpen(true);
  };
  // Zoom v2 (2026-11-20, sumair: "the zoom one feature isnt right") — the
  // zoomed view is a background-image pan (AuxLEDs style): the photo is
  // shown at 220% and the mouse / touch position pans across it smoothly.
  const [zoomPan, setZoomPan] = useState({ x: 50, y: 50 });
  const fittedImgRef = useRef<HTMLImageElement | null>(null);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoomed(false);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        setLightboxZoomed(false);
        setLightboxIndex((i) => (i + 1) % imageCount);
      }
      if (e.key === "ArrowLeft") {
        setLightboxZoomed(false);
        setLightboxIndex((i) => (i - 1 + imageCount) % imageCount);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, imageCount]);

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
            <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-[128px]">
              <div className="group relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 shadow-xl">
                {/* Smart carousel slider — AuxLEDs style (2026-11-20, sumair):
                    a real sliding track, not a fade swap. */}
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                >
                  {hasVideo && (
                    <div className="relative w-full h-full shrink-0 bg-black">
                      <video
                        src={product.video}
                        poster={product.images[0]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {product.images.map((img, idx) => (
                    <div key={idx} className="relative w-full h-full shrink-0">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        priority={idx === 0}
                        className="object-cover cursor-zoom-in"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        onClick={() => openLightbox(idx)}
                      />
                    </div>
                  ))}
                </div>

                {/* Carousel arrows */}
                {slideCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 text-gray-700 hover:bg-neutral-900 hover:text-white shadow-md transition-all duration-300 z-10 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 text-gray-700 hover:bg-neutral-900 hover:text-white shadow-md transition-all duration-300 z-10 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Expand / fullscreen zoom — AuxLEDs style (2026-11-20, sumair) */}
                {!(hasVideo && activeImageIndex === 0) && (
                  <button
                    type="button"
                    onClick={() => openLightbox(Math.max(0, activeImageIndex - slideOffset))}
                    className="absolute right-3 top-3 p-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 text-gray-700 hover:text-red-600 shadow-md transition-all z-10"
                    aria-label="View image fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
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

              {/* Thumbnails */}
              {slideCount > 1 && (
                <div className="flex flex-wrap gap-3">
                  {hasVideo && (
                    <button
                      type="button"
                      onClick={() => setActiveImageIndex(0)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all ${
                        activeImageIndex === 0
                          ? "border-red-500 ring-2 ring-red-500/50 scale-105"
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </span>
                    </button>
                  )}
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx + slideOffset)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all ${
                        activeImageIndex === idx + slideOffset
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
                <h1 className={`${archivo.className} text-lg sm:text-xl text-gray-900 leading-tight uppercase`}>
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

              {/* Beam position + direct socket selectors — 2026-11-20 (sumair) */}
              {defaultSocket && (
                <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50/60 p-3.5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                      Beam Position:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Low Beam", "High Beam", "Fog"].map((beam) => (
                        <button
                          key={beam}
                          type="button"
                          onClick={() => setSelectedBeam((b) => (b === beam ? "" : beam))}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedBeam === beam
                              ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                              : "bg-white text-gray-700 border-gray-200 hover:text-gray-900"
                          }`}
                        >
                          {beam}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                      Socket — Select Directly:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SOCKET_OPTIONS.map((sk) => (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => setSelectedSocket(sk)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedSocket === sk
                              ? "bg-red-600 text-white border-red-500 shadow-red-glow-sm"
                              : "bg-white text-gray-700 border-gray-200 hover:text-gray-900"
                          }`}
                        >
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons — AuxLEDs layout (2026-11-20 rebuild, sumair):
                  ONE row (2026-11-22, sumair): quantity stepper + LIME Add to Cart + outlined BUY IT NOW + WhatsApp icon button. */}
              <div className="pt-2">
                <div className="flex items-stretch gap-2 sm:gap-2.5">
                  {/* Quantity stepper */}
                  <div className="flex items-center rounded-xl border border-gray-300 bg-white overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 sm:w-9 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-40"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-black text-gray-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      className="w-7 sm:w-9 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant, baseUnitPrice, fitment)}
                    className="flex-1 min-w-0 py-2.5 px-2 sm:px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-neutral-900 font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 border border-lime-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 hidden sm:block" />
                    <span className="whitespace-nowrap">Add To Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 min-w-0 py-2.5 px-2 sm:px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Zap className="w-4 h-4 hidden sm:block" />
                    <span className="whitespace-nowrap">Buy It Now</span>
                  </button>

                  {/* WhatsApp icon — real WhatsApp logo, hover transition (scale + shadow). */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 sm:w-12 shrink-0 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:scale-110 hover:shadow-md flex items-center justify-center transition-all duration-300 shadow-sm"
                    aria-label="Order on WhatsApp"
                    title="Order on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path d={WHATSAPP_PATH} />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Verify fitment box — AuxLEDs structure, Hasnain data (2026-11-20, sumair) */}
              <ProductFitmentVerifier product={product} />

              {/* DESCRIPTION — AuxLEDs position: in the right column, under
                  the fitment box (2026-11-20 rebuild, sumair). */}
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">
                  Description
                </h2>
                <DescriptionBlock text={product.description} />
              </div>

              {/* Warranty / Return accordions — AuxLEDs (2026-11-20 rebuild) */}
              <div className="border-t border-gray-200">
                <PolicyAccordion
                  title="Warranty Policy"
                  open={openAccordion === "warranty"}
                  onToggle={() => setOpenAccordion((a) => (a === "warranty" ? null : "warranty"))}
                >
                  <ol className="list-decimal pl-5 space-y-1.5">
                    {WARRANTY_POINTS.map((point, i) => (
                      <li key={i} className="text-xs text-gray-600 leading-relaxed">{point}</li>
                    ))}
                  </ol>
                </PolicyAccordion>
                <PolicyAccordion
                  title="Return Policies"
                  open={openAccordion === "returns"}
                  onToggle={() => setOpenAccordion((a) => (a === "returns" ? null : "returns"))}
                >
                  <ul className="space-y-1.5">
                    {RETURN_POINTS.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="text-red-brand font-black mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </PolicyAccordion>
              </div>
            </div>
          </div>

          {/* Detailed Tabs / Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            {/* Description & Features — 2026-11-17 (sumair): the "Order Through WhatsApp" sidebar box is removed; the WhatsApp icon button next to Add to Cart already covers it, so the box is redundant on every product page. */}
            <div className="md:col-span-12 space-y-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              {/* Key Specifications & Features — 2026-11-17 (sumair): hover transition on this box + each feature row. */}
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:-translate-y-1">
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

              {/* Installation Notice — 2026-11-17 (sumair): hover transition on this box. */}
              <div className="pt-4 border-t border-gray-200 p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300">
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

          {/* CUSTOMER REVIEWS — AuxLEDs block (2026-11-20 rebuild, sumair):
              centred, 5 lime outline stars, WRITE A REVIEW opens a small
              form that sends the review to the shop on WhatsApp. */}
          <div className="space-y-4 mb-16 text-center">
            <h2 className={`${archivo.className} text-2xl text-gray-900 uppercase tracking-tight`}>
              Customer Reviews
            </h2>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 text-lime-500 ${product.rating > i ? "fill-lime-400" : ""}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {product.reviewCount > 0
                ? `${product.reviewCount} verified review${product.reviewCount === 1 ? "" : "s"} — ${product.rating.toFixed(1)} out of 5`
                : "Be the first to write a review"}
            </p>
            <button
              type="button"
              onClick={() => setReviewOpen((o) => !o)}
              className="px-6 py-2.5 rounded-xl bg-white border border-gray-900 text-gray-900 font-black text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Write A Review
            </button>
            {reviewOpen && (
              <div className="max-w-md mx-auto text-left space-y-3 rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-600 mr-1">Your rating:</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setReviewRating(n)} aria-label={`${n} star${n === 1 ? "" : "s"}`}>
                      <Star className={`w-6 h-6 text-lime-500 ${reviewRating >= n ? "fill-lime-400" : ""}`} />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-red-500"
                />
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How is this product? Brightness, fitting, quality..."
                  rows={3}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-red-500"
                />
                <a
                  href={reviewWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    reviewText.trim()
                      ? "bg-lime-400 hover:bg-lime-300 text-neutral-900 border border-lime-400"
                      : "bg-gray-200 text-gray-400 border border-gray-200 pointer-events-none"
                  }`}
                >
                  Send Review on WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* PEOPLE ALSO BOUGHT (related products) */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className={`${archivo.className} text-2xl text-gray-900 uppercase tracking-tight`}>
                PEOPLE ALSO BOUGHT
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}

          {/* RECENTLY VIEWED — this browser's history (2026-11-20 rebuild) */}
          {recentProducts.length > 0 && (
            <div className="space-y-6 mt-16">
              <h2 className={`${archivo.className} text-2xl text-gray-900 uppercase tracking-tight`}>
                RECENTLY VIEWED
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen zoom viewer — copy-paste of sumair's AuxLEDs
            example scene (2026-11-20): white fullscreen viewer, photo
            fitted in the centre, bottom-centre pill (< 1 / 11 >), round
            close button. CLICK the photo = zoom in at that exact point
            (full-bleed), moving the mouse pans, CLICK again = back to
            fitted, and clicking the white margin closes the viewer. */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[80] bg-white"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} image viewer`}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 p-2.5 rounded-full bg-white text-neutral-700 border border-neutral-200 shadow-md hover:text-red-600 transition-all z-20"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className={`absolute inset-0 overflow-hidden ${lightboxZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoomPan({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              onTouchMove={(e) => {
                const t = e.touches[0];
                if (!t) return;
                const r = e.currentTarget.getBoundingClientRect();
                setZoomPan({
                  x: ((t.clientX - r.left) / r.width) * 100,
                  y: ((t.clientY - r.top) / r.height) * 100,
                });
              }}
              onClick={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                // Is the click on the photo itself or on the white margin?
                // (the fitted photo is object-contain centred in the frame)
                const img = fittedImgRef.current;
                let onPhoto = true;
                if (img && img.naturalWidth > 0) {
                  const scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
                  const cw = img.naturalWidth * scale;
                  const ch = img.naturalHeight * scale;
                  const cx = r.left + (r.width - cw) / 2;
                  const cy = r.top + (r.height - ch) / 2;
                  onPhoto =
                    e.clientX >= cx && e.clientX <= cx + cw &&
                    e.clientY >= cy && e.clientY <= cy + ch;
                }
                if (!onPhoto) {
                  closeLightbox();
                  return;
                }
                if (!lightboxZoomed) {
                  setZoomPan({
                    x: ((e.clientX - r.left) / r.width) * 100,
                    y: ((e.clientY - r.top) / r.height) * 100,
                  });
                }
                setLightboxZoomed((z) => !z);
              }}
            >
              <Image
                ref={fittedImgRef}
                src={product.images[lightboxIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-contain pointer-events-none"
                sizes="100vw"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[lightboxIndex] || product.images[0]}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{
                  transform: `scale(${lightboxZoomed ? 2 : 1})`,
                  transformOrigin: `${zoomPan.x}% ${zoomPan.y}%`,
                  opacity: lightboxZoomed ? 1 : 0,
                  transition: "transform 250ms ease, opacity 150ms ease",
                }}
              />
            </div>

            {imageCount > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 rounded-full bg-white border border-neutral-200 shadow-lg px-1.5 py-1">
                <button
                  type="button"
                  onClick={() => { setLightboxZoomed(false); setLightboxIndex((i) => (i - 1 + imageCount) % imageCount); }}
                  className="p-1.5 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-neutral-700 min-w-[44px] text-center">
                  {lightboxIndex + 1} / {imageCount}
                </span>
                <button
                  type="button"
                  onClick={() => { setLightboxZoomed(false); setLightboxIndex((i) => (i + 1) % imageCount); }}
                  className="p-1.5 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sticky buy bar — AuxLEDs style (2026-11-20 rebuild, sumair):
            appears on scroll on every viewport: thumbnail + name, price,
            quantity stepper, lime ADD TO CART. Sits above the mobile
            bottom nav (bottom-16) and at the very bottom on desktop. */}
        {showSticky && !lightboxOpen && (
          <>
          {/* Round back-to-top — sits above the bar, hides with it at the footer. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed right-4 bottom-[152px] lg:bottom-[96px] z-40 w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-neutral-700 ${
              footerVisible ? "translate-y-4 opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <div className={`fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ${
            footerVisible ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          }`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 hidden sm:block shadow-sm">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0 flex-1 hidden md:block">
                <p className={`${archivo.className} text-xs text-gray-900 truncate uppercase`}>{product.name}</p>
                <p className="text-[10px] text-gray-500">{product.brand || "Hasnain Auto"}</p>
              </div>
              <span className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-black text-gray-900 shrink-0 shadow-sm">
                {BUSINESS_CONFIG.currency.symbol} {currentTotalPrice.toLocaleString()}
              </span>
              <div className="hidden sm:flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-black text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="w-8 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product, quantity, product.isSeatCover ? `${selectedQuality.label} | ${selectedColor.color}` : selectedVariant, baseUnitPrice, fitment)}
                className="py-2.5 px-4 sm:px-6 rounded-xl bg-lime-400 hover:bg-lime-300 text-neutral-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-lime-400 transition-all duration-300 hover:shadow-md shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
}

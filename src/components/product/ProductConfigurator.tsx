"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap, MessageCircle, Shield, Truck, Clock, Users, AlertTriangle } from "lucide-react";
import type { Product, PaymentMethod, SeatCoverQuality, CoverColor } from "@/types";
import type { CarModelRow, SeatCoverQualityRow, CoverColorRow } from "@/types/admin";
import { ADVANCE_DISCOUNT_PERCENT, SEAT_COVER_ADVANCE_PERCENT, whatsappOrderLink } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export interface CatalogOptions {
  carMakes: string[];
  carModels: CarModelRow[];
  years: string[];
  qualities: SeatCoverQualityRow[];
  colors: CoverColorRow[];
}

function calcPrice(
  product: Product,
  quality: SeatCoverQuality,
  model: string,
  color: CoverColor,
  options: CatalogOptions
) {
  if (!product.isSeatCover || !model) return product.basePrice;
  const qualityData = options.qualities.find((q) => q.id === quality);
  if (!qualityData) return product.basePrice;
  const multiplier = options.carModels.find((m) => m.model === model)?.priceMultiplier ?? 1;
  const colorExtra = options.colors.find((c) => c.color === color)?.surcharge ?? 0;
  return Math.round(qualityData.basePrice * multiplier + colorExtra);
}

export default function ProductConfigurator({
  product,
  catalog,
}: {
  product: Product;
  catalog: CatalogOptions;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [quality, setQuality] = useState<SeatCoverQuality>(
    (catalog.qualities[1]?.id as SeatCoverQuality) || "ST8"
  );
  const [color, setColor] = useState<CoverColor>(
    (catalog.colors[0]?.color as CoverColor) || "Black"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [viewers, setViewers] = useState(5);

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 8) + 3);
  }, []);

  const models = catalog.carModels.filter((m) => m.make === make).map((m) => m.model);

  const price = useMemo(
    () => calcPrice(product, quality, model, color, catalog),
    [product, quality, model, color, catalog]
  );

  const discountedPrice = useMemo(() => {
    if (paymentMethod === "advance" && !product.isSeatCover) {
      return Math.round(price * (1 - ADVANCE_DISCOUNT_PERCENT / 100));
    }
    return price;
  }, [price, paymentMethod, product.isSeatCover]);

  const advanceAmount = product.isSeatCover
    ? Math.round(price * (SEAT_COVER_ADVANCE_PERCENT / 100))
    : 0;

  const isConfigured = !product.isSeatCover || (make && model && year);

  const buildConfig = () => ({
    make: make || undefined,
    model: model || undefined,
    year: year || undefined,
    quality: product.isSeatCover ? quality : undefined,
    color: product.isSeatCover ? color : undefined,
  });

  const buildWhatsAppMessage = () => {
    let msg = `Hi Hasnain Auto, I want to order:\n\n*${product.name}*\nPrice: ${formatPrice(discountedPrice)}`;
    if (make) msg += `\nCar: ${make} ${model} ${year}`;
    if (product.isSeatCover) msg += `\nQuality: ${quality}\nColor: ${color}`;
    msg += `\nPayment: ${paymentMethod === "cod" ? "Cash on Delivery" : "Advance Payment"}`;
    return msg;
  };

  const pushItem = (path: string) => {
    if (!isConfigured) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: discountedPrice,
      quantity: 1,
      configuration: buildConfig(),
      paymentMethod,
      isSeatCover: product.isSeatCover,
    });
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
          <AlertTriangle className="w-3.5 h-3.5" /> Limited Stock Available
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/5 text-navy text-xs font-semibold rounded-full">
          <Users className="w-3.5 h-3.5" /> {viewers} people viewing this product
        </span>
      </div>

      <div>
        <span className="text-3xl font-bold text-navy">{formatPrice(discountedPrice)}</span>
        {product.isSeatCover && (
          <p className="text-sm text-grey-text mt-1">Price updates based on car &amp; quality selection</p>
        )}
      </div>

      {product.isSeatCover && (
        <div className="space-y-4 p-5 bg-grey-light rounded-xl">
          <h3 className="font-semibold text-navy">Car Selection</h3>
          <select value={make} onChange={(e) => { setMake(e.target.value); setModel(""); }} className="w-full px-4 py-3 rounded-lg border border-grey-mid bg-white">
            <option value="">Select Make</option>
            {catalog.carMakes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} className="w-full px-4 py-3 rounded-lg border border-grey-mid bg-white disabled:opacity-50">
            <option value="">Select Model</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-grey-mid bg-white">
            <option value="">Select Year</option>
            {catalog.years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <a href={whatsappOrderLink("Hi Hasnain Auto, I can't find my car model. Can you help?")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gold-dark font-semibold hover:underline">
            <MessageCircle className="w-4 h-4" /> Can&apos;t Find Your Car?
          </a>
        </div>
      )}

      {product.isSeatCover && (
        <div>
          <h3 className="font-semibold text-navy mb-3">Seat Cover Quality</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {catalog.qualities.map((q) => (
              <button key={q.id} onClick={() => setQuality(q.id)} className={`p-3 rounded-lg border-2 text-left ${quality === q.id ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
                <span className="block font-bold text-sm text-navy">{q.label}</span>
                <span className="block text-xs text-grey-text">{q.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {product.isSeatCover && (
        <div>
          <h3 className="font-semibold text-navy mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {catalog.colors.map((c) => (
              <button key={c.color} onClick={() => setColor(c.color)} className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${color === c.color ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
                {c.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-navy mb-3">Payment Option</h3>
        <div className="space-y-2">
          <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${paymentMethod === "cod" ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
            <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mt-1 accent-gold" />
            <div>
              <span className="font-semibold text-navy">Cash on Delivery (COD)</span>
              <p className="text-xs text-grey-text mt-0.5">
                {product.isSeatCover
                  ? `30% advance (${formatPrice(advanceAmount)}) required. Remaining on delivery.`
                  : "Pay when you receive your order"}
              </p>
            </div>
          </label>
          {!product.isSeatCover && (
            <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${paymentMethod === "advance" ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
              <input type="radio" checked={paymentMethod === "advance"} onChange={() => setPaymentMethod("advance")} className="mt-1 accent-gold" />
              <div>
                <span className="font-semibold text-navy">Advance Payment ({ADVANCE_DISCOUNT_PERCENT}% OFF)</span>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Shield, text: "Secure Checkout" },
          { icon: Clock, text: "2–5 Days Delivery" },
          { icon: Truck, text: "COD Available" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex flex-col items-center text-center p-3 bg-grey-light rounded-lg">
            <Icon className="w-5 h-5 text-gold mb-1" />
            <span className="text-xs font-medium text-navy">{text}</span>
          </div>
        ))}
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <button onClick={() => pushItem("/cart")} disabled={!isConfigured} className="w-full flex items-center justify-center gap-2 py-3.5 btn-gold disabled:opacity-50">
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>
        <button onClick={() => pushItem("/checkout")} disabled={!isConfigured} className="w-full flex items-center justify-center gap-2 py-3.5 btn-navy disabled:opacity-50">
          <Zap className="w-5 h-5" /> Buy Now
        </button>
        <a href={whatsappOrderLink(buildWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-semibold rounded-lg">
          <MessageCircle className="w-5 h-5" /> WhatsApp Order
        </a>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-grey-mid p-3 flex gap-2">
        <button onClick={() => pushItem("/cart")} disabled={!isConfigured} className="flex-1 py-3 btn-gold text-sm disabled:opacity-50">Add to Cart</button>
        <button onClick={() => pushItem("/checkout")} disabled={!isConfigured} className="flex-1 py-3 btn-navy text-sm disabled:opacity-50">Buy Now</button>
      </div>
    </div>
  );
}

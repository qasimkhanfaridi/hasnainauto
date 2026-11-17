"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Car, 
  ShoppingBag, 
  ArrowRight,
  Banknote,
  CreditCard,
  Smartphone
} from "lucide-react";
import { Order } from "@/types/order";
import { getOrderById } from "@/utils/orderStorage";
import { BUSINESS_CONFIG } from "@/config/business";
import { createOrderConfirmationWhatsAppUrl } from "@/utils/whatsapp";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      setOrder(found);
    }
    setLoaded(true);
  }, [orderId]);

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-silver-400">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-carbon-800 text-silver-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Order Details Not Found</h1>
        <p className="text-xs text-silver-400">
          We couldn&apos;t find this specific order on your device. It may have already been dispatched or placed on another device.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const whatsappUrl = createOrderConfirmationWhatsAppUrl(order);

  return (
    <div className="w-full bg-carbon-950 min-h-screen py-10 sm:py-16 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Success Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-carbon-900 to-carbon-900/80 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-in zoom-in">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Order Confirmed & Received!
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs sm:text-sm text-silver-300 mt-2 max-w-lg mx-auto">
              Your order <strong className="text-white font-mono">#{order.orderId}</strong> has been registered. Our Saddar showroom team is preparing your package.
            </p>
          </div>

          {/* Dual Action CTAs: Send to WhatsApp & Call */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
              <span>Send Order Copy to WhatsApp</span>
            </a>

            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-carbon-800 hover:bg-carbon-750 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-red-brand" />
              <span>Call Showroom: {BUSINESS_CONFIG.phone}</span>
            </a>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="mt-8 space-y-6">
          {/* Payment & Delivery Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Payment Details */}
            <div className="p-5 rounded-2xl bg-carbon-900 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider flex items-center gap-1.5">
                {order.payment.method === "cod" && <Banknote className="w-4 h-4 text-red-brand" />}
                {order.payment.method === "bank" && <CreditCard className="w-4 h-4 text-red-brand" />}
                {order.payment.method === "jazzcash" && <Smartphone className="w-4 h-4 text-red-brand" />}
                <span>Payment Method</span>
              </div>
              <div className="text-sm font-black text-white">{order.payment.methodTitle}</div>
              {order.payment.transactionId && (
                <div className="text-xs text-silver-300 font-mono bg-carbon-950 p-2 rounded-lg border border-white/5">
                  TID / Reference: <strong className="text-emerald-400">{order.payment.transactionId}</strong>
                </div>
              )}
              <div className="text-[11px] text-silver-400 pt-1">
                {order.payment.method === "cod"
                  ? "Pay cash directly to the courier agent upon arrival."
                  : "Payment verified by our Saddar accounts team before dispatch."}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="p-5 rounded-2xl bg-carbon-900 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-brand" />
                <span>Delivery Option</span>
              </div>
              <div className="text-sm font-black text-white">
                {order.customer.deliveryType === "pickup" ? "Saddar Store Pickup (FREE)" : `Courier Delivery to ${order.customer.city}`}
              </div>
              <div className="text-xs text-silver-300 leading-relaxed">
                {order.customer.address}
              </div>
              <div className="text-[11px] text-silver-400">
                Contact: {order.customer.fullName} ({order.customer.phone})
              </div>
            </div>
          </div>

          {/* Attached Car Model */}
          {order.vehicle && (
            <div className="p-4 rounded-2xl bg-carbon-900 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/20 text-red-brand">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-silver-400 uppercase tracking-wider">
                    Vehicle Model Fitment
                  </div>
                  <div className="text-sm font-black text-white">
                    {order.vehicle.make} {order.vehicle.model} {order.vehicle.year || ""}
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold">100% Tailored Fit</span>
            </div>
          )}

          {/* Items Breakdown */}
          <div className="p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Purchased Items ({order.items.length})
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0 text-xs">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative w-12 h-12 rounded-lg bg-carbon-950 border border-white/5 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white truncate">{item.name}</div>
                      {item.variant && <div className="text-[10px] text-amber-brand">{item.variant}</div>}
                      <div className="text-silver-400 text-[11px]">
                        Qty: {item.quantity} × Rs. {item.unitPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-white shrink-0">
                    Rs. {item.totalPrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-silver-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">Rs. {order.pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-silver-400">
                <span>Delivery Charges</span>
                <span className="font-semibold text-white">
                  {order.pricing.deliveryFee === 0 ? "FREE" : `Rs. ${order.pricing.deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm">
                <span className="font-black text-white uppercase">Total Amount</span>
                <span className="text-xl font-black text-red-accent">
                  Rs. {order.pricing.grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Showroom Info Box */}
          <div className="p-5 rounded-2xl bg-carbon-900/60 border border-white/5 text-center space-y-3">
            <div className="text-xs text-silver-400">
              Need immediate changes or same-day installation in Saddar Rawalpindi?
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
              <span className="text-white">📍 1st Floor, Azhar Shaheed Auto Market, Kashmir Rd, Saddar</span>
              <span className="text-silver-500">•</span>
              <span className="text-emerald-400">🕒 10:30 AM – 10:00 PM (Daily)</span>
            </div>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-accent hover:text-red-400 transition-colors"
              >
                <span>Continue Shopping for More Accessories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-carbon-950 text-center py-20 text-silver-400">Loading order...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

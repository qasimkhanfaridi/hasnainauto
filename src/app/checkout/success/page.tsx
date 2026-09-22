"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  MessageCircle, 
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
              <MessageCircle className="w-4 h-4 fill-carbon-950" />
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

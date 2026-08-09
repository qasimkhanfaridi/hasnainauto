"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, MessageCircle, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import {
  BRAND,
  DELIVERY_CHARGE,
  FREE_DELIVERY_THRESHOLD,
  whatsappOrderLink,
} from "@/lib/constants";
import type { OrderForm } from "@/types";

export default function CheckoutPage() {
  const { items, subtotal, deliveryCharge, discount, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy mb-4">No Items to Checkout</h1>
        <Link href="/" className="inline-flex px-8 py-3 btn-gold">Continue Shopping</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        paymentMethod: form.paymentMethod,
        items: items.map((i) => ({
          productId: i.productId,
          slug: i.slug,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          configuration: i.configuration,
          paymentMethod: i.paymentMethod,
          isSeatCover: i.isSeatCover,
        })),
        subtotal,
        discount,
        deliveryCharge,
        total,
      }),
    });

    const order = await res.json();
    setSaving(false);
    if (!res.ok) return;

    setOrderId(order.id);

    const orderDetails = items
      .map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
      .join("\n");

    const message = `*New Order — ${BRAND.name}*\n\nOrder ID: ${order.id}\n\n*Customer:*\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nCity: ${form.city}\n\n*Items:*\n${orderDetails}\n\n*Total: ${formatPrice(total)}*\nPayment: ${form.paymentMethod === "cod" ? "COD" : "Advance"}\n\nPlease confirm my order.`;

    window.open(whatsappOrderLink(message), "_blank");
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-navy mb-2">Order Placed Successfully!</h1>
        <p className="text-grey-text mb-2">
          Order ID: <span className="font-bold text-navy">{orderId}</span>
        </p>
        <p className="text-grey-text mb-8">
          Saved in admin portal. Track anytime with Order ID + phone. WhatsApp confirmation opened.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/track-order?order=${orderId}`} className="px-8 py-3 btn-navy">Track Order</Link>
          <Link href="/" className="px-8 py-3 btn-gold">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="card-premium p-6">
            <h2 className="font-bold text-navy mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-grey-mid" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Phone Number</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-grey-mid" placeholder="03040200070" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">City</label>
                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-grey-mid" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy mb-1.5">Complete Address</label>
                <textarea required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-grey-mid resize-none" />
              </div>
            </div>
          </div>

          <div className="card-premium p-6">
            <h2 className="font-bold text-navy mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${form.paymentMethod === "cod" ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
                <input type="radio" checked={form.paymentMethod === "cod"} onChange={() => setForm({ ...form, paymentMethod: "cod" })} className="mt-1 accent-gold" />
                <div>
                  <span className="font-semibold text-navy">Cash on Delivery (Default)</span>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer ${form.paymentMethod === "advance" ? "border-gold bg-gold/5" : "border-grey-mid"}`}>
                <input type="radio" checked={form.paymentMethod === "advance"} onChange={() => setForm({ ...form, paymentMethod: "advance" })} className="mt-1 accent-gold" />
                <div>
                  <span className="font-semibold text-navy">Advance Payment (10% OFF)</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Order is saved for admin tracking. WhatsApp opens for confirmation. Track anytime on Track Order.
            </p>
          </div>

          <button type="submit" disabled={saving} className="w-full py-3.5 btn-gold text-base font-semibold disabled:opacity-50">
            {saving ? "Saving Order..." : "Place Order & Confirm on WhatsApp"}
          </button>
        </form>

        <div className="lg:col-span-2">
          <div className="card-premium p-6 sticky top-24">
            <h2 className="font-bold text-navy text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-grey-text">{item.name} x{item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-grey-mid pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-grey-text">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-grey-text">Delivery</span><span>{deliveryCharge === 0 ? "FREE" : formatPrice(DELIVERY_CHARGE)}</span></div>
              {subtotal - discount < FREE_DELIVERY_THRESHOLD && (
                <p className="text-xs text-grey-text">Free delivery above Rs. {FREE_DELIVERY_THRESHOLD.toLocaleString()} (coming soon)</p>
              )}
              <div className="flex justify-between text-base font-bold pt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-grey-text">
              <Shield className="w-4 h-4 text-gold" /> Secure checkout · 2–5 days delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

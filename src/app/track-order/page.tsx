"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Package, MessageCircle } from "lucide-react";
import { whatsappOrderLink } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/types/admin";

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("order") ?? "");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    const res = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`);
    setLoading(false);
    if (!res.ok) {
      setError("Order not found. Check Order ID and phone number.");
      return;
    }
    setOrder(await res.json());
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-8">
        <Package className="w-12 h-12 text-gold mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-navy mb-2">Track Your Order</h1>
        <p className="text-grey-text">Enter Order ID and the phone used at checkout.</p>
      </div>

      <form onSubmit={handleSearch} className="card-premium p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Order ID</label>
          <input required value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-grey-mid" placeholder="e.g. HA-ABC123" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Phone Number</label>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-grey-mid" placeholder="03XX XXXXXXX" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-3.5 btn-gold disabled:opacity-50">
          {loading ? "Searching..." : "Track Order"}
        </button>
      </form>

      {order && (
        <div className="mt-6 card-premium p-6 space-y-4">
          <div className="flex justify-between items-start gap-3">
            <div>
              <p className="font-bold text-navy text-lg">{order.id}</p>
              <p className="text-sm text-grey-text">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-bold">
              {order.status}
            </span>
          </div>
          <div className="text-sm space-y-1">
            <p><span className="text-grey-text">Customer:</span> {order.customer.name}</p>
            <p><span className="text-grey-text">City:</span> {order.customer.city}</p>
            <p><span className="text-grey-text">Payment:</span> {order.paymentMethod.toUpperCase()}</p>
            <p><span className="text-grey-text">Total:</span> <strong>{formatPrice(order.total)}</strong></p>
          </div>
          <ul className="text-sm border-t border-grey-mid pt-3 space-y-1">
            {order.items.map((item, i) => (
              <li key={i}>{item.name} x{item.quantity}</li>
            ))}
          </ul>
          <a
            href={whatsappOrderLink(`Hi Hasnain Auto, I need an update on order ${order.id}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg"
          >
            <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-grey-text">Loading...</div>}>
      <TrackOrderForm />
    </Suspense>
  );
}

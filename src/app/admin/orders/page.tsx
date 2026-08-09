"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import type { Order, OrderStatus } from "@/types/admin";
import { ORDER_STATUSES } from "@/types/admin";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setError("");
    const res = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Failed to update status");
      return;
    }
    await load();
  };

  if (loading) return <p className="text-grey-text">Loading orders...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy">Orders</h2>
        <p className="text-sm text-grey-text">Update status so customers can track their order.</p>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {orders.length === 0 ? (
        <div className="card-premium p-8 text-center text-grey-text">No orders placed yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="card-premium p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-navy text-lg">{order.id}</p>
                  <p className="text-sm text-grey-text">
                    {new Date(order.createdAt).toLocaleString()} · {order.paymentMethod.toUpperCase()}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">{order.customer.name}</span> · {order.customer.phone}
                  </p>
                  <p className="text-sm text-grey-text">{order.customer.address}, {order.customer.city}</p>
                  <ul className="mt-3 text-sm space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x{item.quantity} — {formatPrice(item.price * item.quantity)}
                        {item.configuration && (
                          <span className="text-grey-text">
                            {" "}({[item.configuration.make, item.configuration.model, item.configuration.year, item.configuration.quality, item.configuration.color].filter(Boolean).join(" · ")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:text-right space-y-3">
                  <p className="text-xl font-bold text-navy">{formatPrice(order.total)}</p>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                    className="w-full lg:w-56 px-3 py-2 rounded-lg border border-grey-mid bg-white text-sm"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

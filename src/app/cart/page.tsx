"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";

export default function CartPage() {
  const { items, subtotal, deliveryCharge, discount, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-grey-mid mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-navy mb-2">Your Cart is Empty</h1>
        <p className="text-grey-text mb-8">Browse our premium car accessories and add items to your cart.</p>
        <Link href="/" className="inline-flex px-8 py-3 btn-gold">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card-premium p-4 sm:p-5 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-grey-light">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy truncate">{item.name}</h3>
                {item.configuration && (
                  <p className="text-xs text-grey-text mt-1">
                    {[item.configuration.make, item.configuration.model, item.configuration.year, item.configuration.quality, item.configuration.color].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="font-bold text-navy mt-2">{formatPrice(item.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-grey-text hover:text-red-500" aria-label="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 border border-grey-mid rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2" disabled={item.quantity <= 1}>
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="card-premium p-6 sticky top-24">
            <h2 className="font-bold text-navy text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-grey-text">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-grey-text">Delivery</span><span className="font-medium">{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span></div>
              {subtotal - discount < FREE_DELIVERY_THRESHOLD && (
                <p className="text-xs text-grey-text">Free delivery on orders above Rs. {FREE_DELIVERY_THRESHOLD.toLocaleString()}</p>
              )}
              <div className="border-t border-grey-mid pt-3 flex justify-between text-base">
                <span className="font-bold text-navy">Total</span>
                <span className="font-bold text-navy">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-6 w-full flex items-center justify-center py-3.5 btn-gold text-base">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

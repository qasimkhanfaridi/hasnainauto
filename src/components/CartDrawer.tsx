"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingCart, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { BUSINESS_CONFIG } from "@/config/business";
import { createCartWhatsAppUrl } from "@/utils/whatsapp";

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, cartSubtotal, isCartOpen, closeCart } = useCart();
  const { selectedVehicle } = useVehicle();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [city, setCity] = useState("Rawalpindi");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const url = createCartWhatsAppUrl({
      items,
      customerName: customerName || "Valued Customer",
      customerPhone,
      city,
      address: deliveryMethod === "pickup" ? "Store Pickup: Saddar Auto Market" : address,
      deliveryMethod,
      selectedVehicle,
      notes,
    });

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-brand" />
              <h2 className="text-base sm:text-lg font-black text-carbon-900 uppercase tracking-tight">
                My Cart ({items.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 rounded-lg text-gray-500 hover:text-carbon-900 hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-surface-200">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-carbon-900">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Browse our premium auto accessories and add items to your cart.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-red-brand text-white font-black text-xs uppercase tracking-wider hover:bg-red-dark transition-all shadow-red-glow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const price = (item.product.salePrice || item.product.price) * item.quantity;
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant || ""}-${idx}`}
                        className="p-3 rounded-xl bg-white border border-gray-200 flex gap-3 items-start shadow-sm"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-carbon-900 truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedVariant && (
                            <p className="text-[10px] text-amber-vibrant font-medium">
                              Variant: {item.selectedVariant}
                            </p>
                          )}
                          <div className="text-xs font-black text-red-brand">
                            {BUSINESS_CONFIG.currency.symbol} {price.toLocaleString()}
                          </div>

                          {/* Stepper & Delete */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center rounded-lg bg-gray-100 border border-gray-200 p-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedVariant
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-brand rounded transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-carbon-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.selectedVariant
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-brand rounded transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.product.id, item.selectedVariant)
                              }
                              className="text-gray-400 hover:text-red-brand p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Form */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="text-xs font-black text-carbon-900 uppercase tracking-wider">
                    WhatsApp Order Details
                  </div>

                  {/* Delivery Choice */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`p-2.5 rounded-xl border text-center transition-all font-semibold ${
                        deliveryMethod === "pickup"
                          ? "bg-red-light border-red-brand text-red-brand"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      🏬 Saddar Pickup (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`p-2.5 rounded-xl border text-center transition-all font-semibold ${
                        deliveryMethod === "delivery"
                          ? "bg-red-light border-red-brand text-red-brand"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      🚚 Courier Delivery
                    </button>
                  </div>

                  {/* Customer Name */}
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-carbon-900 placeholder-gray-400 focus:outline-none focus:border-red-brand transition-colors"
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-carbon-900 placeholder-gray-400 focus:outline-none focus:border-red-brand transition-colors"
                  />

                  {/* Address (if delivery) */}
                  {deliveryMethod === "delivery" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-10 px-2.5 bg-white border border-gray-200 rounded-xl text-xs text-carbon-900 focus:outline-none focus:border-red-brand"
                        >
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Wah Cantt">Wah Cantt</option>
                          <option value="Other City">Other City</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Sector / Area"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-carbon-900 placeholder-gray-400 focus:outline-none focus:border-red-brand"
                        />
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <textarea
                    rows={2}
                    placeholder="Order notes (vehicle model, fitting request, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs text-carbon-900 placeholder-gray-400 focus:outline-none focus:border-red-brand resize-none transition-colors"
                  />

                  {selectedVehicle && (
                    <div className="p-2 rounded-lg bg-red-light border border-red-soft text-[11px] text-red-brand font-medium flex items-center justify-between">
                      <span>Vehicle: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
                      <span className="font-bold">✓ Attached</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-white space-y-3">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total:</span>
                <span className="text-xl font-black text-red-brand">
                  {BUSINESS_CONFIG.currency.symbol} {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {/* Checkout */}
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/checkout");
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-red-brand hover:bg-red-dark text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-red-glow transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <div className="text-center text-[10px] text-gray-400">
                Cash on Delivery • Meezan Bank IBFT • JazzCash
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-gray-700 uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

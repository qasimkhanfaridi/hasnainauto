"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
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
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-carbon-900 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-carbon-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-brand" />
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                Your Shopping Cart ({items.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 rounded-lg text-silver-400 hover:text-white hover:bg-carbon-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-carbon-800 flex items-center justify-center text-silver-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-silver-400 mt-1 max-w-xs">
                    Explore our premium accessories for interior, exterior, lighting & multimedia.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-amber-brand text-carbon-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-amber-glow"
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
                        className="p-3 rounded-xl bg-carbon-850 border border-white/5 flex gap-3 items-start"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-carbon-950 shrink-0 border border-white/5">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedVariant && (
                            <p className="text-[10px] text-amber-brand font-medium">
                              Variant: {item.selectedVariant}
                            </p>
                          )}
                          <div className="text-xs font-black text-silver-200">
                            {BUSINESS_CONFIG.currency.symbol} {price.toLocaleString()}
                          </div>

                          {/* Stepper & Delete */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center rounded-lg bg-carbon-900 border border-white/10 p-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedVariant
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center text-silver-300 hover:text-white rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-white">
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
                                className="w-6 h-6 flex items-center justify-center text-silver-300 hover:text-white rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.product.id, item.selectedVariant)
                              }
                              className="text-silver-400 hover:text-red-400 p-1 text-xs"
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

                {/* Checkout Details Form */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-xs font-black text-white uppercase tracking-wider">
                    WhatsApp Order Information
                  </div>

                  {/* Delivery Choice */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`p-2.5 rounded-xl border text-center transition-all font-semibold ${
                        deliveryMethod === "pickup"
                          ? "bg-amber-brand/15 border-amber-brand text-amber-brand"
                          : "bg-carbon-950 border-white/10 text-silver-400 hover:text-white"
                      }`}
                    >
                      🏬 Saddar Pickup (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`p-2.5 rounded-xl border text-center transition-all font-semibold ${
                        deliveryMethod === "delivery"
                          ? "bg-amber-brand/15 border-amber-brand text-amber-brand"
                          : "bg-carbon-950 border-white/10 text-silver-400 hover:text-white"
                      }`}
                    >
                      🚚 Courier Delivery
                    </button>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-10 px-3 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-400 focus:outline-none focus:border-amber-brand"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full h-10 px-3 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-400 focus:outline-none focus:border-amber-brand"
                    />
                  </div>

                  {/* Delivery Address (if courier) */}
                  {deliveryMethod === "delivery" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-10 px-2.5 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-brand"
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
                          className="h-10 px-3 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-400 focus:outline-none focus:border-amber-brand"
                        />
                      </div>
                    </div>
                  )}

                  {/* Special Notes */}
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Order notes (vehicle color, fitting request, etc.)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 bg-carbon-950 border border-white/10 rounded-xl text-xs text-white placeholder-silver-400 focus:outline-none focus:border-amber-brand resize-none"
                    />
                  </div>

                  {/* Car info confirmation */}
                  {selectedVehicle && (
                    <div className="p-2 rounded-lg bg-carbon-950 border border-white/5 text-[11px] text-silver-300 flex items-center justify-between">
                      <span>Vehicle: {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.year || ""}</span>
                      <span className="text-amber-brand font-bold">Attached</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bottom Action Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-carbon-950 space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-silver-400 uppercase tracking-wider">
                  Order Total:
                </span>
                <span className="text-xl font-black text-white">
                  {BUSINESS_CONFIG.currency.symbol} {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {/* Direct Checkout Button */}
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/checkout");
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-red-glow transition-all"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span>PROCEED TO ONLINE CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Direct WhatsApp CTA Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-carbon-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-whatsapp-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-carbon-950" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <div className="text-center text-[10px] text-silver-400">
                Cash on Delivery • Meezan Bank IBFT • JazzCash
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-center text-xs font-bold text-silver-400 hover:text-white uppercase tracking-wider transition-colors"
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

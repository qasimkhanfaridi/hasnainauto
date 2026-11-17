"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { BUSINESS_CONFIG } from "@/config/business";
import { createCartWhatsAppUrl } from "@/utils/whatsapp";

// Real WhatsApp logo (same glyph as the floating WhatsApp button) — 2026-11-17 (sumair): the generic MessageCircle bubble is NOT the WhatsApp logo.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

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

  // 2026-11-17 (sumair): close the cart with the Escape key. Guard AFTER all hooks (never before).
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Slide in/out (2026-11-18, sumair — AuxLEDs-style rebuild): the drawer stays
  // mounted while it slides, so it animates BOTH ways. `visible` keeps it in
  // the DOM for the 300ms close slide, then unmounts it; `slidIn` flips a
  // frame after mount so the browser paints the off-screen state first and
  // the transform actually transitions. (No slide without that frame.)
  const [visible, setVisible] = useState(false);
  const [slidIn, setSlidIn] = useState(false);
  useEffect(() => {
    if (isCartOpen) {
      setVisible(true);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setSlidIn(true))
      );
      return () => cancelAnimationFrame(raf);
    }
    setSlidIn(false);
    const t = setTimeout(() => setVisible(false), 300);
    return () => clearTimeout(t);
  }, [isCartOpen]);

  if (!visible) return null;

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
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop — fades in/out with the drawer slide */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          slidIn ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer — slides in from the right (AuxLEDs-style) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            slidIn ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header — AuxLEDs-style: plain bold "SHOPPING CART (N)" + close X */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <h2 className="text-base sm:text-lg font-black text-carbon-900 uppercase tracking-tight">
              Shopping Cart ({items.length})
            </h2>
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
              <div className="flex flex-col items-center justify-center h-full min-h-96 text-center px-6 py-10 space-y-5">
                {/* Thin line-art bag, AuxLEDs-style — no circle behind it */}
                <ShoppingBag className="w-20 h-20 text-gray-300" strokeWidth={1} />
                <div>
                  <h3 className="text-base font-black text-carbon-900 uppercase tracking-tight">
                    Your cart is currently empty!
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                    You may check out all the available products and buy some in the shop.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-8 py-3 rounded-xl bg-red-brand text-white font-black text-xs uppercase tracking-wider hover:bg-red-dark transition-all shadow-red-glow"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const itemUnitPrice = item.unitPrice ?? (item.product.salePrice || item.product.price);
                    const price = itemUnitPrice * item.quantity;
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant || ""}-${idx}`}
                        className="p-3 rounded-xl bg-white border border-gray-200 flex gap-3 items-start shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
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
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d={WHATSAPP_PATH} /></svg>
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

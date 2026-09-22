"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Car, 
  ArrowLeft,
  Lock,
  AlertCircle
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useVehicle } from "@/context/VehicleContext";
import { BUSINESS_CONFIG } from "@/config/business";
import { Order, OrderItem, PaymentMethod } from "@/types/order";
import { saveOrder } from "@/utils/orderStorage";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartSubtotal, clearCart } = useCart();
  const { selectedVehicle } = useVehicle();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Rawalpindi");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [notes, setNotes] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculations
  const deliveryFee = deliveryType === "pickup" 
    ? 0 
    : cartSubtotal >= BUSINESS_CONFIG.delivery.freeDeliveryThreshold 
      ? 0 
      : BUSINESS_CONFIG.delivery.standardFee;

  const grandTotal = cartSubtotal + deliveryFee;

  // Copy helper
  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add products before checking out.");
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMessage("Please enter a valid Pakistani phone or WhatsApp number (e.g. 0312-5127096).");
      return;
    }

    if (deliveryType === "delivery" && !address.trim()) {
      setErrorMessage("Please provide your delivery address.");
      return;
    }

    if ((paymentMethod === "bank" || paymentMethod === "jazzcash") && !transactionId.trim()) {
      setErrorMessage("Please enter your Transaction ID (TID) or Transfer Reference Number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate Order ID (e.g. HA-83921)
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const orderId = `HA-${randomSuffix}`;

      const orderItems: OrderItem[] = items.map((item) => {
        const unit = item.product.salePrice || item.product.price;
        return {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          image: item.product.images[0],
          quantity: item.quantity,
          unitPrice: unit,
          totalPrice: unit * item.quantity,
          variant: item.selectedVariant,
        };
      });

      const orderData: Order = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          city: deliveryType === "pickup" ? "Rawalpindi" : city,
          address: deliveryType === "pickup" 
            ? "1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi" 
            : address.trim(),
          deliveryType,
          notes: notes.trim() || undefined,
        },
        vehicle: selectedVehicle ? {
          make: selectedVehicle.make,
          model: selectedVehicle.model,
          year: selectedVehicle.year,
        } : null,
        items: orderItems,
        payment: {
          method: paymentMethod,
          methodTitle: 
            paymentMethod === "cod" 
              ? BUSINESS_CONFIG.payments.cod.title 
              : paymentMethod === "bank" 
                ? BUSINESS_CONFIG.payments.bankTransfer.title 
                : BUSINESS_CONFIG.payments.jazzCash.title,
          transactionId: transactionId.trim() || undefined,
          status: paymentMethod === "cod" ? "cod_confirmed" : "pending_verification",
        },
        pricing: {
          subtotal: cartSubtotal,
          deliveryFee,
          grandTotal,
        },
      };

      // Save order
      saveOrder(orderData);

      // Clear the active cart
      clearCart();

      // Route to confirmation page
      router.push(`/checkout/success?id=${orderId}`);
    } catch (err) {
      console.error("Order placement failed:", err);
      setErrorMessage("Something went wrong while placing your order. Please try again or order directly via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full bg-carbon-950 min-h-screen py-16 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-carbon-900 border border-white/10 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-carbon-800 text-silver-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-xs text-silver-400">
            Please add your favorite car accessories to the cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider shadow-red-glow transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-carbon-950 min-h-screen py-8 sm:py-12 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-silver-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-silver-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-silver-300 font-semibold">256-Bit Secure Pakistan Checkout</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
          CHECKOUT & ORDER DETAILS
        </h1>
        <p className="text-xs sm:text-sm text-silver-400 mb-8">
          Complete your order with Cash on Delivery (COD), Meezan Bank Transfer, or JazzCash.
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-600/15 border border-red-500/50 text-red-accent text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customer Info, Delivery, and Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Contact Info */}
            <div className="p-5 sm:p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-silver-300">
                    Full Name <span className="text-red-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-silver-300">
                    Phone / WhatsApp Number <span className="text-red-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0312-5127096"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-silver-300">
                  Email Address <span className="text-silver-500 text-[11px] font-normal">(Optional, for receipt)</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Step 2: Delivery Option */}
            <div className="p-5 sm:p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Delivery Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    deliveryType === "delivery"
                      ? "bg-red-600/15 border-red-500 ring-1 ring-red-500/50"
                      : "bg-carbon-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Truck className={`w-5 h-5 shrink-0 mt-0.5 ${deliveryType === "delivery" ? "text-red-brand" : "text-silver-400"}`} />
                  <div>
                    <div className="text-xs font-black text-white">Courier Doorstep Delivery</div>
                    <div className="text-[11px] text-silver-400 mt-0.5">
                      {cartSubtotal >= BUSINESS_CONFIG.delivery.freeDeliveryThreshold
                        ? "FREE Delivery (Over Rs. 5,000)"
                        : `Standard Flat Rate: Rs. ${BUSINESS_CONFIG.delivery.standardFee}`}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    deliveryType === "pickup"
                      ? "bg-red-600/15 border-red-500 ring-1 ring-red-500/50"
                      : "bg-carbon-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${deliveryType === "pickup" ? "text-red-brand" : "text-silver-400"}`} />
                  <div>
                    <div className="text-xs font-black text-white">Store Pickup (FREE)</div>
                    <div className="text-[11px] text-silver-400 mt-0.5">
                      Saddar Auto Market, Kashmir Rd
                    </div>
                  </div>
                </button>
              </div>

              {deliveryType === "delivery" ? (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-silver-300">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Wah Cantt">Wah Cantt</option>
                        <option value="Other City">Other City (Pakistan)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-silver-300">
                        Sector / Area <span className="text-red-accent">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Saddar / Bahria Town / F-10"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required={deliveryType === "delivery"}
                        className="w-full h-11 px-3.5 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-silver-300">
                      Street Address & House / Plaza Number
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Street number, house/apartment number, landmarks..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 rounded-xl bg-carbon-950 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500 resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-carbon-950 border border-white/5 space-y-1 text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-brand" />
                    <span>Pickup Location:</span>
                  </div>
                  <div className="text-silver-400">
                    {BUSINESS_CONFIG.delivery.storePickupAddress}
                  </div>
                  <div className="text-[11px] text-amber-brand font-semibold pt-1">
                    Free installation and fitting assistance available when picking up at our showroom!
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method (Dynamic Accordion / Selector) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    paymentMethod === "cod"
                      ? "bg-red-600/15 border-red-500 ring-1 ring-red-500"
                      : "bg-carbon-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Banknote className={`w-5 h-5 mb-1.5 ${paymentMethod === "cod" ? "text-red-brand" : "text-silver-400"}`} />
                  <div className="text-xs font-black text-white">Cash on Delivery</div>
                  <div className="text-[10px] text-silver-400">Pay cash upon receipt</div>
                </button>

                {/* Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    paymentMethod === "bank"
                      ? "bg-red-600/15 border-red-500 ring-1 ring-red-500"
                      : "bg-carbon-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mb-1.5 ${paymentMethod === "bank" ? "text-red-brand" : "text-silver-400"}`} />
                  <div className="text-xs font-black text-white">Bank Account / IBFT</div>
                  <div className="text-[10px] text-silver-400">Meezan Bank Raast / IBFT</div>
                </button>

                {/* JazzCash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("jazzcash")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    paymentMethod === "jazzcash"
                      ? "bg-red-600/15 border-red-500 ring-1 ring-red-500"
                      : "bg-carbon-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Smartphone className={`w-5 h-5 mb-1.5 ${paymentMethod === "jazzcash" ? "text-red-brand" : "text-silver-400"}`} />
                  <div className="text-xs font-black text-white">JazzCash</div>
                  <div className="text-[10px] text-silver-400">Instant mobile wallet</div>
                </button>
              </div>

              {/* DYNAMIC INSTRUCTIONS PER METHOD */}
              {paymentMethod === "cod" && (
                <div className="p-4 rounded-2xl bg-carbon-950 border border-white/5 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-black text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Cash on Delivery is Active</span>
                  </div>
                  <p className="text-xs text-silver-400 leading-relaxed">
                    {BUSINESS_CONFIG.payments.cod.notice}
                  </p>
                  <div className="text-[11px] text-silver-400 pt-1">
                    • Total payable at delivery: <strong className="text-white">Rs. {grandTotal.toLocaleString()}</strong>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="p-4 rounded-2xl bg-carbon-950 border border-white/5 space-y-4 animate-in fade-in">
                  <div className="text-xs font-black text-white flex items-center justify-between">
                    <span>Meezan Bank Account Details</span>
                    <span className="text-[11px] text-emerald-400 font-bold">Raast / IBFT Ready</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Bank Name */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">Bank Name:</span>
                      <span className="font-bold text-white">{BUSINESS_CONFIG.payments.bankTransfer.bankName}</span>
                    </div>

                    {/* Account Title */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">Account Title:</span>
                      <span className="font-bold text-white">{BUSINESS_CONFIG.payments.bankTransfer.accountTitle}</span>
                    </div>

                    {/* Account Number with Copy */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-accent">{BUSINESS_CONFIG.payments.bankTransfer.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(BUSINESS_CONFIG.payments.bankTransfer.accountNumber, "accNum")}
                          className="p-1 rounded bg-carbon-800 hover:bg-carbon-750 text-silver-300"
                          title="Copy Account Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedField === "accNum" && <span className="text-[10px] text-emerald-400">Copied!</span>}
                      </div>
                    </div>

                    {/* IBAN with Copy */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">IBAN:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-white">{BUSINESS_CONFIG.payments.bankTransfer.iban}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(BUSINESS_CONFIG.payments.bankTransfer.iban, "iban")}
                          className="p-1 rounded bg-carbon-800 hover:bg-carbon-750 text-silver-300"
                          title="Copy IBAN"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedField === "iban" && <span className="text-[10px] text-emerald-400">Copied!</span>}
                      </div>
                    </div>

                    {/* Branch */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">Branch:</span>
                      <span className="text-silver-300">{BUSINESS_CONFIG.payments.bankTransfer.branch}</span>
                    </div>
                  </div>

                  {/* TID Input */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <label className="text-xs font-bold text-silver-300">
                      Transaction ID (TID) / Transfer Reference <span className="text-red-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === "bank"}
                      placeholder="Enter 6-12 digit TID from your banking receipt..."
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-carbon-900 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                    />
                    <p className="text-[11px] text-silver-400">
                      Transfer exact Rs. {grandTotal.toLocaleString()} and paste the transaction reference ID above.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "jazzcash" && (
                <div className="p-4 rounded-2xl bg-carbon-950 border border-white/5 space-y-4 animate-in fade-in">
                  <div className="text-xs font-black text-white flex items-center justify-between">
                    <span>JazzCash Mobile Account</span>
                    <span className="text-[11px] text-amber-brand font-bold">Instant Transfer</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Title */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">Account Title:</span>
                      <span className="font-bold text-white">{BUSINESS_CONFIG.payments.jazzCash.accountTitle}</span>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-carbon-900 border border-white/5">
                      <span className="text-silver-400">JazzCash Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-brand text-sm">{BUSINESS_CONFIG.payments.jazzCash.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(BUSINESS_CONFIG.payments.jazzCash.accountNumber, "jcNum")}
                          className="p-1 rounded bg-carbon-800 hover:bg-carbon-750 text-silver-300"
                          title="Copy JazzCash Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedField === "jcNum" && <span className="text-[10px] text-emerald-400">Copied!</span>}
                      </div>
                    </div>
                  </div>

                  {/* TID Input */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <label className="text-xs font-bold text-silver-300">
                      JazzCash TID / Reference <span className="text-red-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === "jazzcash"}
                      placeholder="e.g. 1234567890 (TID received in JazzCash SMS)"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-carbon-900 border border-white/10 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-red-500"
                    />
                    <p className="text-[11px] text-silver-400">
                      Send Rs. {grandTotal.toLocaleString()} to {BUSINESS_CONFIG.payments.jazzCash.accountNumber} via JazzCash app or *786# and enter the TID above.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Place Order Button */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="p-5 sm:p-6 rounded-3xl bg-carbon-900 border border-white/10 space-y-4">
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs text-silver-400 font-normal">({items.length} items)</span>
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item, idx) => {
                  const unitPrice = item.product.salePrice || item.product.price;
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <div key={`${item.product.id}-${idx}`} className="flex items-center gap-3 text-xs">
                      <div className="relative w-12 h-12 rounded-lg bg-carbon-950 border border-white/5 overflow-hidden shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white truncate">{item.product.name}</div>
                        {item.selectedVariant && (
                          <div className="text-[10px] text-amber-brand">{item.selectedVariant}</div>
                        )}
                        <div className="text-silver-400 text-[11px]">
                          {item.quantity} × Rs. {unitPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-black text-white shrink-0">
                        Rs. {itemTotal.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Attached Vehicle */}
              {selectedVehicle && (
                <div className="p-3 rounded-xl bg-carbon-950 border border-white/5 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-silver-300">
                    <Car className="w-4 h-4 text-red-brand" />
                    <span>Fitment: <strong>{selectedVehicle.make} {selectedVehicle.model}</strong></span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Attached</span>
                </div>
              )}

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-silver-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-silver-300">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-black text-white uppercase tracking-wider">Grand Total</span>
                  <span className="text-2xl font-black text-red-accent">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider shadow-red-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? "PROCESSING ORDER..." : "PLACE YOUR ORDER NOW"}</span>
              </button>

              <div className="text-center text-[11px] text-silver-400 space-y-1">
                <div>✓ 100% Guaranteed Fitment & Warranty</div>
                <div>✓ Same-day verification from Saddar showroom</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

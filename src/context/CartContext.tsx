"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  unitPrice?: number;
  // 2026-11-20 (sumair): beam position (Low Beam / High Beam / Fog) and the
  // directly-selected socket (H4 / H11 / 9005...) chosen on the product page.
  // Both ride into the cart and the WhatsApp order message.
  beam?: string;
  socket?: string;
  // 2026-11-18 (sumair): epoch ms when this item was FIRST added to the cart.
  // Drives the Hot Deal sale countdown in the cart drawer (24h window).
  // Carts saved before this field existed have no addedAt — treated as just added.
  addedAt?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string, unitPrice?: number, fitment?: { beam?: string; socket?: string }) => void;
  removeFromCart: (productId: string, selectedVariant?: string, beam?: string, socket?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string, beam?: string, socket?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hasnain_cart_items");
      if (saved) {
        const parsed = JSON.parse(saved);
        // 2026-11-18: carts saved before `addedAt` existed get stamped as
        // just added, so the Hot Deal countdown starts from now, not forever.
        const normalized = Array.isArray(parsed)
          ? parsed.map((it) =>
              it && typeof it === "object" && it.addedAt === undefined
                ? { ...it, addedAt: Date.now() }
                : it
            )
          : parsed;
        setItems(normalized);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("hasnain_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: string, unitPrice?: number, fitment?: { beam?: string; socket?: string }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant &&
          (item.beam || undefined) === (fitment?.beam || undefined) &&
          (item.socket || undefined) === (fitment?.socket || undefined)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (unitPrice !== undefined) {
          updated[existingIndex].unitPrice = unitPrice;
        }
        // addedAt is deliberately NOT touched here — the 24h Hot Deal window
        // runs from the FIRST add, not from a quantity increase.
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant, unitPrice, beam: fitment?.beam, socket: fitment?.socket, addedAt: Date.now() }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedVariant?: string, beam?: string, socket?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === selectedVariant &&
            (beam === undefined || (item.beam || undefined) === beam) &&
            (socket === undefined || (item.socket || undefined) === socket)
          )
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedVariant?: string, beam?: string, socket?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant, beam, socket);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant === selectedVariant &&
          (beam === undefined || (item.beam || undefined) === beam) &&
          (socket === undefined || (item.socket || undefined) === socket)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = items.reduce((sum, item) => {
    const itemPrice = item.unitPrice ?? (item.product.salePrice || item.product.price);
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

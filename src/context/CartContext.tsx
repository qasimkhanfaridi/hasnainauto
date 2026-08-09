"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/types";
import { ADVANCE_DISCOUNT_PERCENT, DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD } from "@/lib/constants";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hasnainauto-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${JSON.stringify(item.configuration ?? {})}-${item.paymentMethod}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const discount = useMemo(() => {
    return items.reduce((sum, i) => {
      if (i.paymentMethod === "advance") {
        return sum + Math.round(i.price * i.quantity * (ADVANCE_DISCOUNT_PERCENT / 100));
      }
      return sum;
    }, 0);
  }, [items]);

  const deliveryCharge = useMemo(() => {
    if (subtotal - discount >= FREE_DELIVERY_THRESHOLD) return 0;
    return items.length > 0 ? DELIVERY_CHARGE : 0;
  }, [subtotal, discount, items.length]);

  const total = subtotal - discount + deliveryCharge;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = useMemo(
    () => ({
      items, itemCount, subtotal, deliveryCharge, discount, total,
      addItem, removeItem, updateQuantity, clearCart,
    }),
    [items, itemCount, subtotal, deliveryCharge, discount, total, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

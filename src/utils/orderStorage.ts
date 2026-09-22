import { Order } from "@/types/order";

const STORAGE_KEY = "hasnain_auto_orders";

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getOrders();
    existing.unshift(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
    localStorage.setItem("hasnain_auto_latest_order", JSON.stringify(order));
  } catch (err) {
    console.error("Failed to save order to localStorage:", err);
  }
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load orders from localStorage:", err);
    return [];
  }
}

export function getOrderById(orderId: string): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const latest = localStorage.getItem("hasnain_auto_latest_order");
    if (latest) {
      const parsed: Order = JSON.parse(latest);
      if (parsed.orderId === orderId) return parsed;
    }
    const all = getOrders();
    return all.find((o) => o.orderId === orderId) || null;
  } catch (err) {
    console.error("Failed to find order by ID:", err);
    return null;
  }
}

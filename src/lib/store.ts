import path from "path";
import fs from "fs";
import type { InventoryCatalog, Order } from "@/types/admin";
import { seedInventory } from "@/lib/seedInventory";

const DATA_DIR = path.join(process.cwd(), "data");
const INVENTORY_PATH = path.join(DATA_DIR, "inventory.json");
const ORDERS_PATH = path.join(DATA_DIR, "orders.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readInventory(): InventoryCatalog {
  ensureDataDir();
  if (!fs.existsSync(INVENTORY_PATH)) {
    const seed = seedInventory();
    writeInventory(seed);
    return seed;
  }
  const raw = fs.readFileSync(INVENTORY_PATH, "utf-8");
  return JSON.parse(raw) as InventoryCatalog;
}

export function writeInventory(catalog: InventoryCatalog) {
  ensureDataDir();
  catalog.version = (catalog.version ?? 0) + 1;
  catalog.updatedAt = new Date().toISOString();
  fs.writeFileSync(INVENTORY_PATH, JSON.stringify(catalog, null, 2), "utf-8");
}

/** Full overwrite — replaces entire inventory on every import */
export function overwriteInventory(catalog: Omit<InventoryCatalog, "version" | "updatedAt">) {
  const next: InventoryCatalog = {
    ...catalog,
    version: 0,
    updatedAt: new Date().toISOString(),
  };
  writeInventory(next);
  return readInventory();
}

export function readOrders(): Order[] {
  ensureDataDir();
  if (!fs.existsSync(ORDERS_PATH)) {
    fs.writeFileSync(ORDERS_PATH, "[]", "utf-8");
    return [];
  }
  return JSON.parse(fs.readFileSync(ORDERS_PATH, "utf-8")) as Order[];
}

export function writeOrders(orders: Order[]) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf-8");
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  return order;
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };
  writeOrders(orders);
  return orders[idx];
}

export function findOrder(id: string, phone?: string) {
  const orders = readOrders();
  const order = orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
  if (!order) return null;
  if (phone) {
    const normalized = phone.replace(/\D/g, "");
    const orderPhone = order.customer.phone.replace(/\D/g, "");
    if (!orderPhone.endsWith(normalized.slice(-10)) && !normalized.endsWith(orderPhone.slice(-10))) {
      return null;
    }
  }
  return order;
}

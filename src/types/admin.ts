import type { Product, ProductBadge, ProductCategory, CoverColor, SeatCoverQuality } from "@/types";

export type OrderStatus =
  | "Pending Confirmation"
  | "Confirmed"
  | "Processing"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export interface CarModelRow {
  make: string;
  model: string;
  priceMultiplier: number;
}

export interface SeatCoverQualityRow {
  id: SeatCoverQuality;
  label: string;
  description: string;
  basePrice: number;
}

export interface CoverColorRow {
  color: CoverColor;
  surcharge: number;
}

export interface CategoryRow {
  slug: ProductCategory;
  name: string;
  description: string;
  image: string;
  isHero: boolean;
}

export interface InventoryCatalog {
  version: number;
  updatedAt: string;
  products: Product[];
  categories: CategoryRow[];
  carMakes: string[];
  carModels: CarModelRow[];
  years: string[];
  seatCoverQualities: SeatCoverQualityRow[];
  coverColors: CoverColorRow[];
}

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  configuration?: {
    make?: string;
    model?: string;
    year?: string;
    quality?: string;
    color?: string;
  };
  paymentMethod: "cod" | "advance";
  isSeatCover: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: "cod" | "advance";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  notes?: string;
}

export const ORDER_STATUSES: OrderStatus[] = [
  "Pending Confirmation",
  "Confirmed",
  "Processing",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

export const PRODUCT_BADGES: Array<ProductBadge | ""> = [
  "",
  "Hot",
  "Best Seller",
  "Limited Stock",
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "seat-covers",
  "led-lights",
  "floor-mats",
  "exterior-accessories",
  "mobile-holders",
  "combo-deals",
];

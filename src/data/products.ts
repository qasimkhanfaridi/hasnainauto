export type ProductCategory =
  | "seat-covers"
  | "led-lights"
  | "floor-mats"
  | "exterior-accessories"
  | "mobile-holders"
  | "combo-deals";

export interface CategoryInfo {
  id: ProductCategory;
  slug: ProductCategory;
  name: string;
  description: string;
  shortDesc: string;
  itemCount: string;
  image: string;
  isHero?: boolean;
  subcategories: string[];
  hidden?: boolean;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "seat-covers",
    slug: "seat-covers",
    name: "Seat Covers",
    description: "Custom-fit premium leather & scratchless covers",
    shortDesc: "Custom-fit premium leather & scratchless covers for all car models.",
    itemCount: "Custom Fitted",
    image: "/images/products/premium-leather-seat-covers.jpg",
    isHero: true,
    subcategories: ["Custom Leather Upholstery", "Bucket Fit Covers", "Perforated Covers"],
  },
  {
    id: "led-lights",
    slug: "led-lights",
    name: "LED & Projector Lights",
    description: "Headlights, fog lights & ambient lighting",
    shortDesc: "Headlights, fog lights, laser mini pods & interior ambient lighting.",
    itemCount: "High-Output LEDs",
    image: "/images/products/rego-racing-ai-hero.jpg",
    isHero: false,
    subcategories: ["Headlight LEDs", "Fog Lights", "Interior Lighting"],
  },
  {
    id: "floor-mats",
    slug: "floor-mats",
    name: "Floor & TP Mats",
    description: "7D mats, simple mats & full protection TP mats",
    shortDesc: "7D deep-dish diamond quilted mats and all-weather TP trunk liners.",
    itemCount: "Complete Coverage",
    image: "/images/products/7d-floor-mats-premium.jpg",
    isHero: false,
    subcategories: ["Floor Mats", "Trunk Mats", "All-Weather Mats"],
  },
  {
    id: "exterior-accessories",
    slug: "exterior-accessories",
    name: "Exterior Accessories",
    description: "Mud flaps, air press & body styling",
    shortDesc: "Durable mud flaps, body styling, and exterior vehicle protection.",
    itemCount: "Road Protection",
    image: "/images/products/mud-flaps-set.jpg",
    isHero: false,
    subcategories: ["Exterior Protection", "Mud Flaps", "Air Press"],
  },
  {
    id: "mobile-holders",
    slug: "mobile-holders",
    name: "Mobile Holders & Key Covers",
    description: "Dashboard holders & premium key covers",
    shortDesc: "Precision CNC magnetic mounts and handcrafted genuine leather key covers.",
    itemCount: "Daily Essentials",
    image: "/images/products/universal-mobile-holder.jpg",
    isHero: false,
    subcategories: ["Phone Mounts", "Key Covers", "Car Gadgets"],
  },
  {
    id: "combo-deals",
    slug: "combo-deals",
    name: "Combo Deals",
    description: "Bundle & save on complete car upgrades",
    shortDesc: "Discounted interior upgrades pairing tailored seat covers with 7D mats.",
    itemCount: "Special Value",
    image: "/images/products/seat-cover-floor-mat-combo.jpg",
    isHero: false,
    subcategories: ["Bundles", "Interior Combos", "Saver Packages"],
  },
];

export interface SeatCoverQuality {
  id: string;
  label: string;
  description: string;
  basePrice: number;
}

export const SEAT_COVER_QUALITIES: SeatCoverQuality[] = [
  { id: "LR9", label: "LR9", description: "Economy Leather Rite", basePrice: 12000 },
  { id: "ST8", label: "ST8", description: "Standard Leather Rite", basePrice: 15000 },
  { id: "ST27", label: "ST27", description: "Premium Leather Rite", basePrice: 18500 },
  { id: "NS3", label: "NS3", description: "Advanced Leather Rite", basePrice: 22000 },
  { id: "Japanese Scratchless", label: "Japanese", description: "Scratchless Material", basePrice: 25000 },
  { id: "Scratchless Premium", label: "Premium", description: "Scratchless Leather", basePrice: 28000 },
];

export interface CoverColor {
  color: string;
  hex: string;
  surcharge: number;
}

export const COVER_COLORS: CoverColor[] = [
  { color: "Black", hex: "#18181b", surcharge: 0 },
  { color: "Grey", hex: "#4b5563", surcharge: 0 },
  { color: "Beige", hex: "#d2b48c", surcharge: 0 },
  { color: "Brown", hex: "#5c3d28", surcharge: 0 },
  { color: "Mustard", hex: "#d97706", surcharge: 500 },
  { color: "Maroon", hex: "#831843", surcharge: 500 },
];

export interface VehicleCompatibility {
  universal: boolean;
  makes?: string[];
  models?: string[];
  years?: number[];
  note?: string;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  badge?: string;
  isSeatCover?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  inStock: boolean;
  stock?: boolean;
  brand?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  specifications: { [key: string]: string };
  vehicleCompatibility: VehicleCompatibility;
  variants?: ProductVariant[];
  relatedSlugs: string[];
  warranty?: string;
  hidden?: boolean;
}

export const PRODUCTS_DATA: Product[] = [];

// NOTE (2026-11-16): all products removed from the site on the owner's order.
// The 21 old products are gone for good — the new 26 products (real images in
// the "All Pictures" Drive folder) will be added here once their names and
// descriptions are identified. Do NOT re-add the old products.

// Active products & categories exported for components & SEO
export const ACTIVE_PRODUCTS_DATA = PRODUCTS_DATA.filter((p) => !p.hidden);
export const ACTIVE_CATEGORIES_DATA = CATEGORIES_DATA.filter((c) => !c.hidden);

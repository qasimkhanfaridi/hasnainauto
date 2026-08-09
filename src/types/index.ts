export type ProductBadge = "Hot" | "Best Seller" | "Limited Stock";

export type ProductCategory =
  | "seat-covers"
  | "led-lights"
  | "floor-mats"
  | "exterior-accessories"
  | "mobile-holders"
  | "combo-deals";

export type SeatCoverQuality =
  | "LR9"
  | "ST8"
  | "ST27"
  | "NS3"
  | "Japanese Scratchless"
  | "Scratchless Premium";

export type CoverColor =
  | "Black"
  | "Grey"
  | "Beige"
  | "Brown"
  | "Mustard"
  | "Maroon";

export type PaymentMethod = "cod" | "advance";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  basePrice: number;
  images: string[];
  videoUrl?: string;
  badge?: ProductBadge;
  isSeatCover: boolean;
  isFeatured: boolean;
  inStock: boolean;
  relatedSlugs: string[];
}

export interface CartItem {
  id: string;
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
    quality?: SeatCoverQuality;
    color?: CoverColor;
    variant?: string;
  };
  paymentMethod: PaymentMethod;
  isSeatCover: boolean;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
}

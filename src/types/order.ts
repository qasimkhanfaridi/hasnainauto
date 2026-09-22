export type PaymentMethod = "cod" | "bank" | "jazzcash";

export interface OrderItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: string;
}

export interface Order {
  orderId: string; // e.g. "HA-84920"
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    deliveryType: "delivery" | "pickup";
    notes?: string;
  };
  vehicle?: {
    make: string;
    model: string;
    year?: number;
  } | null;
  items: OrderItem[];
  payment: {
    method: PaymentMethod;
    methodTitle: string;
    transactionId?: string;
    status: "pending_verification" | "cod_confirmed";
  };
  pricing: {
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  };
}

export const BRAND = {
  name: "Hasnain Auto",
  tagline: "Decoration Accessories",
  domain: "hasnainauto.com",
  whatsapp: "923040200070",
  phone: "+92 304 0200070",
  email: "orders@hasnainauto.com",
  address: "Main Auto Market, Lahore, Pakistan",
  rating: 4.8,
  reviewCount: 1247,
} as const;

export const DELIVERY_CHARGE = 350;
export const FREE_DELIVERY_THRESHOLD = 5000;
export const ADVANCE_DISCOUNT_PERCENT = 10;
export const SEAT_COVER_ADVANCE_PERCENT = 30;

export const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}`;

export function whatsappOrderLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

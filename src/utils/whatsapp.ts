import { BUSINESS_CONFIG } from "@/config/business";
import { Product } from "@/data/products";
import { SelectedVehicle } from "@/data/vehicles";

export interface CustomBreakdown {
  quality?: string;
  color?: string;
  multiplier?: number;
  qualityPrice?: number;
  colorSurcharge?: number;
}

export interface CartOrderDetails {
  items: {
    product: Product;
    quantity: number;
    selectedVariant?: string;
    customDetails?: string;
    finalPrice?: number;
  }[];
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  deliveryMethod: "pickup" | "delivery";
  selectedVehicle?: SelectedVehicle | null;
  notes?: string;
}

export interface QuickOrderDetails {
  name: string;
  phone: string;
  carMake: string;
  carModel: string;
  carYear: string;
  requirement: string;
  message?: string;
}

/**
 * Creates single-product WhatsApp order link with optional custom breakdown
 */
export function createSingleProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  selectedVariant?: string,
  vehicle?: SelectedVehicle | null,
  customPrice?: number,
  customBreakdown?: CustomBreakdown
): string {
  const finalPrice = customPrice !== undefined ? customPrice * quantity : (product.salePrice || product.price) * quantity;
  const vehicleStr = vehicle && vehicle.make
    ? `${vehicle.make} ${vehicle.model} ${vehicle.year || ""}`.trim()
    : "Universal / Not Specified";

  const variantStr = selectedVariant ? ` (${selectedVariant})` : "";

  let breakdownStr = "";
  if (customBreakdown?.quality) {
    breakdownStr += `\n*Quality Grade:* ${customBreakdown.quality}`;
  }
  if (customBreakdown?.color) {
    breakdownStr += `\n*Selected Color:* ${customBreakdown.color}${customBreakdown.colorSurcharge ? ` (+Rs. ${customBreakdown.colorSurcharge})` : ""}`;
  }
  if (customBreakdown?.multiplier && customBreakdown.multiplier !== 1) {
    breakdownStr += `\n*Vehicle Size Multiplier:* ${customBreakdown.multiplier}x (${vehicleStr})`;
  }

  const text = `Assalam-o-Alaikum ${BUSINESS_CONFIG.name},

I want to order:
*Product:* ${product.name}${variantStr}${breakdownStr}
*Vehicle:* ${vehicleStr}
*Quantity:* ${quantity}
*Total Calculated Price:* ${BUSINESS_CONFIG.currency.symbol} ${finalPrice.toLocaleString()}

Please confirm availability and booking.

Thank you.`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates multi-item Cart WhatsApp order link
 */
export function createCartWhatsAppUrl(details: CartOrderDetails): string {
  const { items, customerName, customerPhone, city, address, deliveryMethod, selectedVehicle, notes } = details;

  const itemsList = items
    .map((item, index) => {
      const price = (item.finalPrice || item.product.salePrice || item.product.price) * item.quantity;
      const variant = item.selectedVariant ? ` [${item.selectedVariant}]` : "";
      const extra = item.customDetails ? ` (${item.customDetails})` : "";
      return `${index + 1}. *${item.product.name}*${variant}${extra} × ${item.quantity} = ${BUSINESS_CONFIG.currency.symbol} ${price.toLocaleString()}`;
    })
    .join("\n");

  const grandTotal = items.reduce(
    (sum, item) => sum + (item.finalPrice || item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const vehicleStr = selectedVehicle && selectedVehicle.make
    ? `${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.year || ""}`.trim()
    : "Not Specified";

  const deliveryStr = deliveryMethod === "pickup"
    ? "🏬 Store Pickup at Saddar, Rawalpindi"
    : `🚚 Delivery to ${city || "Address"}`;

  const text = `Assalam-o-Alaikum ${BUSINESS_CONFIG.name},

*NEW ORDER REQUEST*
-------------------------------
${itemsList}
-------------------------------
*Total Amount:* ${BUSINESS_CONFIG.currency.symbol} ${grandTotal.toLocaleString()}
*Delivery Option:* ${deliveryStr}

*Customer Details:*
• *Name:* ${customerName || "Customer"}
• *Phone:* ${customerPhone || "N/A"}
• *City:* ${city || "Rawalpindi / Islamabad"}
• *Address:* ${address || "Store Pickup / Pending"}
• *Vehicle:* ${vehicleStr}
${notes ? `• *Special Notes:* ${notes}\n` : ""}
Please confirm the order and dispatch timeline.`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates Quick WhatsApp Order / Quote link
 */
export function createQuickOrderWhatsAppUrl(details: QuickOrderDetails): string {
  const vehicleStr = `${details.carMake} ${details.carModel} ${details.carYear}`.trim() || "Unspecified Car";

  const text = `Assalam-o-Alaikum ${BUSINESS_CONFIG.name},

*QUICK INQUIRY / CUSTOM QUOTE*
• *Customer Name:* ${details.name}
• *Phone Number:* ${details.phone}
• *Vehicle:* ${vehicleStr}
• *Accessory Needed:* ${details.requirement}
${details.message ? `• *Details:* ${details.message}\n` : ""}
Please guide me with the available options, price, and fitment. Thank you!`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

/**
 * General customer consultation WhatsApp link
 */
export function createConsultationWhatsAppUrl(customMessage?: string): string {
  const defaultText = `Assalam-o-Alaikum ${BUSINESS_CONFIG.name}, I need consultation regarding car decoration and accessories for my vehicle.`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(customMessage || defaultText)}`;
}

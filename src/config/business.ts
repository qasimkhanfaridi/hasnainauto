export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  address: {
    line1: string;
    market: string;
    street: string;
    area: string;
    city: string;
    country: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string; // for wa.me links
  social: {
    facebook: string;
    tiktok: string;
    instagram: string;
  };
  googleMapsUrl: string;
  googleMapsEmbed: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  payments: {
    cod: {
      enabled: boolean;
      title: string;
      subtitle: string;
      notice: string;
    };
    bankTransfer: {
      enabled: boolean;
      title: string;
      subtitle: string;
      bankName: string;
      accountTitle: string;
      accountNumber: string;
      iban: string;
      branch: string;
      instructions: string;
    };
    jazzCash: {
      enabled: boolean;
      title: string;
      subtitle: string;
      accountTitle: string;
      accountNumber: string;
      instructions: string;
    };
  };
  delivery: {
    standardFee: number;
    freeDeliveryThreshold: number;
    storePickupAddress: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Hasnain Auto Decoration & Accessories",
  shortName: "Hasnain Auto",
  tagline: "Upgrade Your Drive",
  subTagline: "Premium Car Decoration & Accessories in Saddar, Rawalpindi",
  address: {
    line1: "1st Floor, Azhar Shaheed Auto Market",
    market: "Azhar Shaheed Auto Market",
    street: "Kashmir Road",
    area: "Saddar",
    city: "Rawalpindi",
    country: "Pakistan",
    full: "1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi, Pakistan",
  },
  phone: "+92 312 5127096",
  phoneRaw: "+923125127096",
  whatsapp: "+92 312 5127096",
  whatsappRaw: "923125127096",
  social: {
    facebook: "https://facebook.com/hasnainautodecoration",
    tiktok: "https://tiktok.com/@hasnainautodecoration",
    instagram: "https://instagram.com/hasnainauto.pk",
  },
  googleMapsUrl: "https://maps.google.com/?q=Azhar+Shaheed+Auto+Market+Kashmir+Road+Saddar+Rawalpindi",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.518607148123!2d73.0514102!3d33.5920197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df937b2ec1e737%3A0x6b8bc6ff64149955!2sKashmir%20Rd%2C%20Saddar%2C%20Rawalpindi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  openingHours: {
    weekdays: "Monday – Saturday: 10:30 AM – 10:00 PM",
    sunday: "Sunday: 1:00 PM – 8:00 PM",
  },
  currency: {
    symbol: "Rs.",
    code: "PKR",
  },
  payments: {
    cod: {
      enabled: true,
      title: "Cash on Delivery (COD)",
      subtitle: "Pay in cash upon arrival at your doorstep",
      notice: "Available across Pakistan via courier. Our dispatch team will call your number to verify before dispatch.",
    },
    bankTransfer: {
      enabled: true,
      title: "Bank Account / Online Transfer",
      subtitle: "Transfer via Raast, IBFT or Mobile Banking App",
      bankName: "Meezan Bank Ltd",
      accountTitle: "Hasnain Auto Decoration",
      accountNumber: "02010108928371",
      iban: "PK45MEZN0002010108928371",
      branch: "Kashmir Road Saddar Branch, Rawalpindi",
      instructions: "Transfer the exact total amount via your banking app, then enter your Transaction ID (TID) below.",
    },
    jazzCash: {
      enabled: true,
      title: "JazzCash Mobile Account",
      subtitle: "Instant mobile payment via JazzCash App or *786#",
      accountTitle: "Hasnain Auto",
      accountNumber: "0312-5127096",
      instructions: "Send payment to JazzCash account 0312-5127096 (Hasnain Auto) and enter the TID/Reference number below.",
    },
  },
  delivery: {
    standardFee: 250,
    freeDeliveryThreshold: 5000,
    storePickupAddress: "1st Floor, Azhar Shaheed Auto Market, Kashmir Road, Saddar, Rawalpindi",
  },
  meta: {
    title: "Hasnain Auto Decoration & Accessories | Saddar Rawalpindi",
    description: "Premium car accessories, decoration, LED lights, seat covers, 7D mats, and multimedia showroom in Saddar, Rawalpindi. Cash on Delivery, Bank Transfer, JazzCash & expert installation.",
    keywords: [
      "Hasnain Auto Decoration",
      "Hasnain Auto Rawalpindi",
      "car accessories Rawalpindi",
      "car decoration Rawalpindi",
      "auto accessories Saddar Rawalpindi",
      "car accessories Saddar",
      "car decoration Saddar",
      "car accessories Islamabad",
      "seat covers Rawalpindi",
      "7D floor mats Pakistan",
      "LED headlights Saddar",
    ],
    siteUrl: "https://hasnainauto.com",
  },
};

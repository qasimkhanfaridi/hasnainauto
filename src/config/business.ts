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
  meta: {
    title: "Hasnain Auto Decoration & Accessories | Saddar Rawalpindi",
    description: "Premium car accessories, decoration, LED lights, Android panels, seat covers and multimedia showroom in Saddar, Rawalpindi. WhatsApp ordering & expert installation.",
    keywords: [
      "Hasnain Auto Decoration",
      "Hasnain Auto Rawalpindi",
      "car accessories Rawalpindi",
      "car decoration Rawalpindi",
      "auto accessories Saddar Rawalpindi",
      "car accessories Saddar",
      "car decoration Saddar",
      "car accessories Islamabad",
      "auto decoration Rawalpindi",
      "car interior accessories Rawalpindi",
      "car lighting Rawalpindi",
      "car multimedia Rawalpindi",
      "Android panel Rawalpindi",
      "LED headlights Saddar",
    ],
    siteUrl: "https://hasnainauto.com",
  },
};

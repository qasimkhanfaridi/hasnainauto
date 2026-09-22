import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { BUSINESS_CONFIG } from "@/config/business";

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Hasnain Auto Decoration & Accessories | Saddar, Rawalpindi",
    template: "%s | Hasnain Auto Saddar Rawalpindi",
  },
  description:
    "Rawalpindi's premier auto accessories showroom in Saddar. Custom leatherette seat covers, 20,000 LM LED headlights, 7D floor mats, Octa-Core Android panels, ambient lighting & expert workshop installation. Order via WhatsApp.",
  keywords: BUSINESS_CONFIG.meta.keywords,
  authors: [{ name: "Hasnain Auto Decoration" }],
  creator: "Hasnain Auto Decoration",
  metadataBase: new URL(BUSINESS_CONFIG.meta.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: BUSINESS_CONFIG.meta.siteUrl,
    title: "Hasnain Auto Decoration & Accessories | Saddar, Rawalpindi",
    description:
      "Upgrade your vehicle with premium automotive interior, exterior, lighting, and multimedia accessories. WhatsApp ordering & direct store installation in Saddar Rawalpindi.",
    siteName: BUSINESS_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Hasnain Auto Decoration Saddar Rawalpindi Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasnain Auto Decoration & Accessories",
    description: "Premium car accessories and decoration showroom in Saddar, Rawalpindi. WhatsApp orders available.",
    images: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Schema structured data
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "name": BUSINESS_CONFIG.name,
    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200",
    "@id": BUSINESS_CONFIG.meta.siteUrl,
    "url": BUSINESS_CONFIG.meta.siteUrl,
    "telephone": BUSINESS_CONFIG.phone,
    "priceRange": "Rs. 1,000 - Rs. 50,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1st Floor, Azhar Shaheed Auto Market, Kashmir Road",
      "addressLocality": "Saddar",
      "addressRegion": "Rawalpindi, Punjab",
      "postalCode": "46000",
      "addressCountry": "PK",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5920197,
      "longitude": 73.0514102,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:30",
        "closes": "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "13:00",
        "closes": "20:00",
      },
    ],
    "sameAs": [
      BUSINESS_CONFIG.social.facebook,
      BUSINESS_CONFIG.social.tiktok,
      BUSINESS_CONFIG.social.instagram,
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-surface-200 text-carbon-900 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

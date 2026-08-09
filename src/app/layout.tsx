import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import { BRAND } from "@/lib/constants";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Premium car accessories store in Pakistan. Custom seat covers, LED lights, floor mats, and interior accessories with nationwide COD delivery.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

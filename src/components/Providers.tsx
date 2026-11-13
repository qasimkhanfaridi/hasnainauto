"use client";

import React, { useState } from "react";
import { VehicleProvider } from "@/context/VehicleContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { QuickOrderModal } from "./QuickOrderModal";
import { Product } from "@/data/products";
import { ProductQuickViewModal } from "./ProductQuickViewModal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <ThemeProvider>
      <VehicleProvider>
        <CartProvider>
          <div className="relative min-h-screen flex flex-col bg-white dark:bg-[#070b12] text-gray-900 dark:text-gray-100 antialiased selection:bg-red-500/20 selection:text-red-700 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-200">
            <Header
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenQuickOrder={() => setIsQuickOrderOpen(true)}
            />

            <main className="flex-1 w-full min-w-0 overflow-x-hidden pb-20 lg:pb-0">{children}</main>

            <Footer />

            {/* Persistent Mobile Bottom Navigation */}
            <MobileBottomNav />

            {/* Floating Action Button */}
            <FloatingWhatsApp />

            {/* Slide-over Shopping Cart */}
            <CartDrawer />

            {/* Instant Search Dialog */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* Quick WhatsApp Quote Modal */}
            <QuickOrderModal
              isOpen={isQuickOrderOpen}
              onClose={() => setIsQuickOrderOpen(false)}
            />

            {/* Global Quick View Modal */}
            <ProductQuickViewModal
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
            />
          </div>
        </CartProvider>
      </VehicleProvider>
    </ThemeProvider>
  );
}

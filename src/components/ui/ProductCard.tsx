"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product, ProductBadge } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

const BADGE_STYLES: Record<ProductBadge, string> = {
  Hot: "badge-hot",
  "Best Seller": "badge-bestseller",
  "Limited Stock": "badge-limited",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.basePrice,
      quantity: 1,
      paymentMethod: "cod",
      isSeatCover: product.isSeatCover,
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="card-premium overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-grey-light">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-md ${BADGE_STYLES[product.badge]}`}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-navy text-sm sm:text-base leading-snug mb-2 group-hover:text-gold-dark transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-navy mb-4">
            {formatPrice(product.basePrice)}
            {product.isSeatCover && <span className="text-xs font-normal text-grey-text ml-1">from</span>}
          </p>
          <button onClick={handleQuickAdd} className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 btn-gold text-sm">
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </article>
    </Link>
  );
}

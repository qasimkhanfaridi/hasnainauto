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
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded ${BADGE_STYLES[product.badge]}`}>
              {product.badge === "Hot" ? "New" : product.badge}
            </span>
          )}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg hover:bg-brand-dark"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-auto price-red text-lg">
            {formatPrice(product.basePrice)}
            {product.isSeatCover && <span className="text-xs font-normal text-grey-text ml-1">from</span>}
          </p>
        </div>
      </article>
    </Link>
  );
}

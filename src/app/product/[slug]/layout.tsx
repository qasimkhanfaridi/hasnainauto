import type { Metadata } from "next";
import { PRODUCTS_DATA } from "@/data/products";

type ProductLayoutProps = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = PRODUCTS_DATA.find((p) => p.slug === params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const description =
    product.shortDescription?.slice(0, 160) ||
    product.description.replace(/\s+/g, " ").trim().slice(0, 160);

  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${params.slug}` },
    openGraph: {
      title: `${product.name} | Hasnain Auto Saddar`,
      description,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : undefined,
    },
  };
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children;
}

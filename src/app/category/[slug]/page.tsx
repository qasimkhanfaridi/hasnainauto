import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import { getCategories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);

  return (
    <div>
      <div className="relative h-48 sm:h-64 bg-navy overflow-hidden">
        <Image src={category.image} alt={category.name} fill sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/70">{category.description}</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <p className="text-center text-grey-text py-12">Products coming soon. Contact us on WhatsApp for availability.</p>
        )}
      </div>
    </div>
  );
}

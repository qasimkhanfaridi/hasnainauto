import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/product/ProductGallery";
import ProductConfigurator from "@/components/product/ProductConfigurator";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, getRelatedProducts, getProducts, getCatalog } from "@/data/products";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.relatedSlugs);
  const inventory = getCatalog();

  return (
    <div className="pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} name={product.name} videoUrl={product.videoUrl} />
          <div>
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-gold text-navy text-xs font-bold rounded-md mb-3">{product.badge}</span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">{product.name}</h1>
            <p className="text-grey-text mb-6">{product.shortDescription}</p>
            <ProductConfigurator
              product={product}
              catalog={{
                carMakes: inventory.carMakes,
                carModels: inventory.carModels,
                years: inventory.years,
                qualities: inventory.seatCoverQualities,
                colors: inventory.coverColors,
              }}
            />
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-xl font-bold text-navy mb-4">Product Description</h2>
          <p className="text-grey-text leading-relaxed max-w-3xl">{product.description}</p>
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

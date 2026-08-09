import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand font-bold text-xs uppercase tracking-widest mb-2">Top Picks</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Our Premium Products</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

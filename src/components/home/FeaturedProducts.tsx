import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  return (
    <section className="section-padding bg-grey-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Top Picks</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

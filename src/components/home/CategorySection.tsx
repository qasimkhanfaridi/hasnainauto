import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/data/categories";

export default function CategorySection() {
  const categories = getCategories();

  return (
    <section className="section-padding bg-grey-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-brand font-bold text-xs uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Shop by Category</h2>
          </div>
          <Link href="/category/seat-covers" className="text-sm font-bold text-brand hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group text-center">
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:border-brand transition-colors">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-3 text-sm font-bold text-navy group-hover:text-brand transition-colors leading-snug px-1">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Promo banners */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Link href="/category/seat-covers" className="relative overflow-hidden rounded-xl min-h-[160px] bg-navy p-6 flex items-end">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
              alt="Seat covers"
              fill
              className="object-cover opacity-40"
              sizes="50vw"
            />
            <div className="relative">
              <p className="text-white/80 text-sm mb-1">Best Sellers</p>
              <h3 className="text-white text-2xl font-extrabold mb-3">Seat Covers</h3>
              <span className="inline-flex px-4 py-2 bg-gold text-navy text-xs font-extrabold rounded-md uppercase">
                Explore Seat Covers
              </span>
            </div>
          </Link>
          <Link href="/category/led-lights" className="relative overflow-hidden rounded-xl min-h-[160px] bg-navy p-6 flex items-end">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
              alt="LED lights"
              fill
              className="object-cover opacity-40"
              sizes="50vw"
            />
            <div className="relative">
              <p className="text-white/80 text-sm mb-1">Bright Upgrade</p>
              <h3 className="text-white text-2xl font-extrabold mb-3">LED Lights</h3>
              <span className="inline-flex px-4 py-2 bg-brand text-white text-xs font-extrabold rounded-md uppercase">
                Shop LED Lights
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

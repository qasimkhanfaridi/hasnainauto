import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { getCategories } from "@/data/categories";

export default function Footer() {
  const categories = getCategories();
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-1">{BRAND.name}</h3>
            <p className="text-gold text-sm font-medium mb-4">{BRAND.tagline}</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Pakistan&apos;s trusted destination for premium car accessories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-sm text-white/70 hover:text-white">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Service</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/track-order" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-white">Admin Portal</Link></li>
              <li>Cash on Delivery Available</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{BRAND.address}</li>
              <li>{BRAND.phone}</li>
              <li>{BRAND.email}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="text-sm text-white/50">{BRAND.domain}</p>
        </div>
      </div>
    </footer>
  );
}

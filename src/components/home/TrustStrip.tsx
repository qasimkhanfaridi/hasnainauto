import { Star, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function TrustStrip() {
  return (
    <section className="bg-grey-light border-y border-grey-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(BRAND.rating) ? "text-gold fill-gold" : "text-grey-mid"}`} />
              ))}
            </div>
            <span className="font-bold text-navy text-lg">{BRAND.rating}</span>
            <span className="text-grey-text text-sm">({BRAND.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-grey-mid" />
          <p className="font-semibold text-navy">Trusted Auto Accessories Store in Pakistan</p>
          <div className="hidden md:block w-px h-8 bg-grey-mid" />
          <div className="flex items-center gap-2 text-grey-text text-sm">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Visit our shop — {BRAND.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

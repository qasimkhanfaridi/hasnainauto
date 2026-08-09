import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { BRAND } from "@/lib/constants";

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-grey-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Customer Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">What Our Customers Say</h2>
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="font-bold text-navy text-lg">{BRAND.rating}</span>
            <span className="text-grey-text text-sm">{BRAND.reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <article key={review.id} className="card-premium p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-navy">{review.name}</h4>
                    {review.verified && <BadgeCheck className="w-4 h-4 text-gold" />}
                  </div>
                  <p className="text-xs text-grey-text">{review.location} · {review.date}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-navy/80 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              {review.image && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                  <Image src={review.image} alt={`Review by ${review.name}`} fill sizes="300px" className="object-cover" />
                </div>
              )}
              <p className="text-xs text-grey-text">
                Purchased: <span className="font-medium text-navy">{review.product}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

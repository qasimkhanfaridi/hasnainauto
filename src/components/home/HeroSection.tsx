import Image from "next/image";
import Link from "next/link";
import { Shield, Truck, Award } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const TRUST_BADGES = [
  { icon: Shield, text: "Cash on Delivery Available" },
  { icon: Truck, text: "Fast Delivery Nationwide" },
  { icon: Award, text: "Premium Quality Guaranteed" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
        alt="Luxury car interior"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-2xl">
          <p className="text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-4">Hasnain Auto</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Premium Car Accessories for Style &amp; Comfort
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            Upgrade your driving experience with high-quality seat covers, lights, and interior accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/category/seat-covers" className="inline-flex items-center justify-center px-8 py-3.5 btn-gold text-base">
              Shop Now
            </Link>
            <WhatsAppButton
              label="WhatsApp Order"
              message="Hi Hasnain Auto, I'd like to place an order for car accessories."
              className="!relative !bottom-auto !right-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm text-white/90 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

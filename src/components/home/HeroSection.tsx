import Image from "next/image";
import Link from "next/link";
import { Shield, Truck, Award, Headphones, ArrowRight } from "lucide-react";

const TRUST = [
  { icon: Award, text: "Premium Quality" },
  { icon: Shield, text: "Perfect Fit" },
  { icon: Truck, text: "Fast Delivery" },
  { icon: Headphones, text: "Customer Support" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Premium car accessories"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(225,6,0,0.55)_0%,rgba(11,28,51,0.92)_48%,rgba(11,28,51,0.85)_100%)]" />
        <div className="absolute -right-20 top-0 w-72 h-full rotate-12 bg-brand/30 blur-2xl" />
        <div className="absolute right-10 bottom-0 w-64 h-64 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 text-gold text-xs font-bold tracking-widest uppercase">
            Hasnain Auto
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.1] mb-5">
            PREMIUM ACCESSORIES FOR{" "}
            <span className="text-brand">STYLE THAT DRIVES</span> PERFORMANCE
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl">
            Seat covers, LED lights, floor mats &amp; more — custom fit for your car with nationwide COD.
          </p>
          <Link
            href="/category/seat-covers"
            className="inline-flex items-center gap-2 px-8 py-3.5 btn-gold text-base uppercase tracking-wide"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/90">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

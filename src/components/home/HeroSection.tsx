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
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#0b1c33_0%,rgba(11,28,51,0.88)_42%,rgba(225,6,0,0.72)_100%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[repeating-linear-gradient(-25deg,transparent,transparent_18px,rgba(245,197,24,0.12)_18px,rgba(245,197,24,0.12)_36px)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-22 lg:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 mb-5 text-gold font-display text-sm sm:text-base tracking-[0.22em] uppercase">
            <span className="w-8 h-[2px] bg-gold inline-block" />
            Hasnain Auto
          </p>

          <h1 className="font-display uppercase leading-[0.95] mb-6">
            <span className="block text-white text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-wide">
              Premium Accessories For
            </span>
            <span className="block mt-2 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide">
              <span className="text-gold">Style That Drives</span>
            </span>
            <span className="block mt-2 text-white text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-wide">
              <span className="text-brand">Performance</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#d7dee8] font-medium leading-relaxed mb-8 max-w-xl border-l-4 border-gold pl-4">
            Seat covers, LED lights, floor mats &amp; more — custom fit for your car with nationwide COD.
          </p>

          <Link
            href="/category/seat-covers"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-md text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-brand/30"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#e8eef6]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

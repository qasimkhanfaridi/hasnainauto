import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const POINTS = [
  "Affordable premium pricing",
  "Custom fitting for your car",
  "Trusted by thousands nationwide",
  "Fast COD delivery across Pakistan",
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl p-8 sm:p-10 bg-[linear-gradient(135deg,#e10600_0%,#f5c518_100%)] text-white">
          <p className="text-white/80 font-bold text-xs uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">The Hasnain Auto Difference</h2>
          <ul className="space-y-3 mb-8">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm sm:text-base font-semibold">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
          <Link href="/category/seat-covers" className="inline-flex px-6 py-3 bg-navy text-white font-bold rounded-lg">
            Shop Premium Products
          </Link>
        </div>
        <div className="relative min-h-[280px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=80"
            alt="Car interior"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  );
}

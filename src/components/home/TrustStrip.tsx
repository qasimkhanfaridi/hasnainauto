import { Star, Users, Package, BadgeCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";

const STATS = [
  { icon: Users, value: "5000+", label: "Happy Customers" },
  { icon: Package, value: "1000+", label: "Premium Products" },
  { icon: Star, value: String(BRAND.rating), label: "Customer Rating" },
  { icon: BadgeCheck, value: "100%", label: "Satisfaction Focus" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-grey-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-extrabold text-navy text-lg leading-none">{value}</p>
                <p className="text-xs text-grey-text mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

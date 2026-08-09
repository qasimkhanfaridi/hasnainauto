import { Gem, Ruler, Banknote, Truck } from "lucide-react";

const FEATURES = [
  { icon: Gem, title: "Premium Materials", description: "Only the finest leather, scratchless fabrics, and automotive-grade components." },
  { icon: Ruler, title: "Custom Fitting Available", description: "Tailored to your exact car make, model, and year for a perfect factory finish." },
  { icon: Banknote, title: "Cash on Delivery", description: "Pay when you receive. No risk, no hassle — order with complete confidence." },
  { icon: Truck, title: "Fast Delivery Across Pakistan", description: "Nationwide shipping with 2–5 day delivery to all major cities." },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">The Hasnain Auto Difference</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-navy flex items-center justify-center">
                <Icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{title}</h3>
              <p className="text-grey-text text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

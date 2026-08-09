import Link from "next/link";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-6">Upgrade Your Car Today</h2>
        <p className="text-grey-text text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers across Pakistan. Premium accessories, custom fitting, and hassle-free delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/category/seat-covers" className="px-8 py-3.5 btn-gold text-base">Shop Now</Link>
          <WhatsAppButton
            label="WhatsApp Contact"
            message="Hi Hasnain Auto, I need help choosing car accessories."
            className="!relative !bottom-auto !right-auto"
          />
        </div>
      </div>
    </section>
  );
}

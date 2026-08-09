import { MapPin, Phone, Mail, Clock } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Contact Us</h1>
        <p className="text-grey-text max-w-lg mx-auto">Have questions? Reach out — we&apos;re here to help.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[
            { icon: MapPin, label: "Visit Our Shop", value: BRAND.address },
            { icon: Phone, label: "Phone", value: BRAND.phone },
            { icon: Mail, label: "Email", value: BRAND.email },
            { icon: Clock, label: "Business Hours", value: "Mon–Sat: 10:00 AM – 8:00 PM" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="card-premium p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">{label}</h3>
                <p className="text-grey-text text-sm">{value}</p>
              </div>
            </div>
          ))}
          <WhatsAppButton
            label="Chat on WhatsApp"
            message="Hi Hasnain Auto, I have a question about your products."
            className="!relative !bottom-auto !right-auto w-full"
          />
        </div>
        <div className="card-premium p-6 sm:p-8">
          <h2 className="font-bold text-navy text-xl mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
              <input required className="w-full px-4 py-3 rounded-lg border border-grey-mid" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
              <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-grey-mid" placeholder="03XX XXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
              <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-grey-mid resize-none" placeholder="How can we help?" />
            </div>
            <button type="submit" className="w-full py-3.5 btn-gold">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readInventory } from "@/lib/store";

export default async function AdminCatalogPage() {
  const jar = await cookies();
  if (jar.get("ha_admin_session")?.value !== "ok") redirect("/admin");
  const inv = readInventory();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy">Cars & Catalog Master Data</h2>
        <p className="text-sm text-grey-text">Managed via Excel sheets: CarMakes, CarModels, Years, SeatCoverQualities, CoverColors, Categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="card-premium p-5">
          <h3 className="font-bold text-navy mb-3">Car Makes ({inv.carMakes.length})</h3>
          <div className="flex flex-wrap gap-2">
            {inv.carMakes.map((m) => (
              <span key={m} className="px-3 py-1 bg-grey-light rounded-full text-sm">{m}</span>
            ))}
          </div>
        </section>

        <section className="card-premium p-5">
          <h3 className="font-bold text-navy mb-3">Years ({inv.years.length})</h3>
          <div className="flex flex-wrap gap-2">
            {inv.years.map((y) => (
              <span key={y} className="px-3 py-1 bg-grey-light rounded-full text-sm">{y}</span>
            ))}
          </div>
        </section>

        <section className="card-premium p-5 lg:col-span-2">
          <h3 className="font-bold text-navy mb-3">Car Models ({inv.carModels.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-grey-text border-b">
                  <th className="py-2">Make</th>
                  <th className="py-2">Model</th>
                  <th className="py-2">Price Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {inv.carModels.map((row) => (
                  <tr key={`${row.make}-${row.model}`} className="border-b border-grey-mid">
                    <td className="py-2">{row.make}</td>
                    <td className="py-2">{row.model}</td>
                    <td className="py-2">{row.priceMultiplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card-premium p-5">
          <h3 className="font-bold text-navy mb-3">Seat Cover Qualities</h3>
          <ul className="space-y-2 text-sm">
            {inv.seatCoverQualities.map((q) => (
              <li key={q.id} className="flex justify-between gap-4">
                <span><strong>{q.label}</strong> — {q.description}</span>
                <span className="font-medium">Rs. {q.basePrice.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-premium p-5">
          <h3 className="font-bold text-navy mb-3">Colors</h3>
          <ul className="space-y-2 text-sm">
            {inv.coverColors.map((c) => (
              <li key={c.color} className="flex justify-between">
                <span>{c.color}</span>
                <span>+Rs. {c.surcharge}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-premium p-5 lg:col-span-2">
          <h3 className="font-bold text-navy mb-3">Categories</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {inv.categories.map((c) => (
              <div key={c.slug} className="p-3 bg-grey-light rounded-lg">
                <p className="font-semibold">{c.name} {c.isHero ? "(Hero)" : ""}</p>
                <p className="text-xs text-grey-text">{c.slug}</p>
                <p className="text-grey-text mt-1">{c.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

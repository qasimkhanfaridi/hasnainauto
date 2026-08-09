import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { readInventory } from "@/lib/store";
import { formatPrice } from "@/lib/format";

export default async function AdminProductsPage() {
  const jar = await cookies();
  if (jar.get("ha_admin_session")?.value !== "ok") redirect("/admin");

  const inventory = readInventory();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Products</h2>
          <p className="text-sm text-grey-text">
            {inventory.products.length} products · Edit via Bulk Import Excel (full overwrite)
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/api/admin/import" className="px-4 py-2 btn-navy text-sm">Export Excel</a>
          <a href="/admin/import" className="px-4 py-2 btn-gold text-sm">Import Excel</a>
        </div>
      </div>

      <div className="overflow-x-auto card-premium">
        <table className="w-full text-sm">
          <thead className="bg-grey-light text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name / Slug</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Flags</th>
            </tr>
          </thead>
          <tbody>
            {inventory.products.map((p) => (
              <tr key={p.id} className="border-t border-grey-mid">
                <td className="p-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-grey-light">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="56px" />
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-grey-text">{p.slug}</p>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 font-medium">{formatPrice(p.basePrice)}</td>
                <td className="p-3 text-xs text-grey-text">
                  {[
                    p.badge,
                    p.isFeatured ? "Featured" : null,
                    p.isSeatCover ? "SeatCover" : null,
                    p.inStock ? "InStock" : "Out",
                  ].filter(Boolean).join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

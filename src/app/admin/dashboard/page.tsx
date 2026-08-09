import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { readInventory, readOrders } from "@/lib/store";
import { formatPrice } from "@/lib/format";

export default async function AdminDashboardPage() {
  const jar = await cookies();
  if (jar.get("ha_admin_session")?.value !== "ok") redirect("/admin");

  const inventory = readInventory();
  const orders = readOrders();
  const pending = orders.filter((o) => o.status === "Pending Confirmation").length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy">Dashboard</h2>
        <p className="text-grey-text text-sm mt-1">
          Inventory version {inventory.version} · Updated {new Date(inventory.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Products", value: inventory.products.length, href: "/admin/products" },
          { label: "Orders", value: orders.length, href: "/admin/orders" },
          { label: "Pending Orders", value: pending, href: "/admin/orders" },
          { label: "Car Models", value: inventory.carModels.length, href: "/admin/catalog" },
        ].map((card) => (
          <Link key={card.label} href={card.href} className="card-premium p-5 hover:shadow-lg transition-shadow">
            <p className="text-sm text-grey-text">{card.label}</p>
            <p className="text-3xl font-bold text-navy mt-1">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm text-gold-dark font-semibold">View all</Link>
          </div>
          {orders.slice(0, 5).length === 0 ? (
            <p className="text-sm text-grey-text">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between text-sm border-b border-grey-mid pb-2">
                  <div>
                    <p className="font-semibold text-navy">{o.id}</p>
                    <p className="text-grey-text">{o.customer.name} · {o.status}</p>
                  </div>
                  <p className="font-medium">{formatPrice(o.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-premium p-6">
          <h3 className="font-bold text-navy mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/import" className="block w-full text-center py-3 btn-gold">Bulk Import Excel (Overwrite)</Link>
            <a href="/api/admin/import?template=1" className="block w-full text-center py-3 btn-navy">Download Client Excel Template</a>
            <a href="/api/admin/import" className="block w-full text-center py-3 border border-navy rounded-lg font-semibold text-navy">Export Current Inventory</a>
          </div>
          <p className="text-xs text-grey-text mt-4">
            Each Excel import fully replaces products, categories, makes, models, years, qualities, and colors.
          </p>
        </div>
      </div>
    </div>
  );
}

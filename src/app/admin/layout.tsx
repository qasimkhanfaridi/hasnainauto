import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/catalog", label: "Cars & Catalog" },
  { href: "/admin/import", label: "Bulk Import" },
];

async function logoutAction() {
  "use server";
  const { clearAdminSession } = await import("@/lib/adminAuth");
  await clearAdminSession();
  redirect("/admin");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const authed = jar.get("ha_admin_session")?.value === "ok";

  return (
    <div className="min-h-screen bg-grey-light">
      <header className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-gold text-xs uppercase tracking-widest">{BRAND.name} Admin</p>
            <h1 className="font-bold text-lg">Inventory & Orders Portal</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">View Store</Link>
            {authed && (
              <form action={logoutAction}>
                <button type="submit" className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm">
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
        {authed && (
          <nav className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm text-white/80 hover:text-white whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

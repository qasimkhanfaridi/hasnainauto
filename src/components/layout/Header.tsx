"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

type NavLink = { href: string; label: string };

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/track-order", label: "Track Order" },
  ]);

  useEffect(() => {
    fetch("/api/admin/inventory")
      .then((r) => r.json())
      .then((data) => {
        const categoryLinks = (data.categories ?? []).map((c: { slug: string; name: string }) => ({
          href: `/category/${c.slug}`,
          label: c.name,
        }));
        setNavLinks([
          { href: "/", label: "Home" },
          ...categoryLinks,
          { href: "/contact", label: "Contact" },
          { href: "/track-order", label: "Track Order" },
        ]);
      })
      .catch(() => undefined);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-grey-mid/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-navy tracking-tight">{BRAND.name}</span>
            <span className="text-[10px] sm:text-xs text-gold font-medium tracking-widest uppercase">
              {BRAND.tagline}
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-navy/80 hover:text-navy font-medium transition-colors rounded-lg hover:bg-grey-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2.5 rounded-lg hover:bg-grey-light" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-navy" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-navy text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="xl:hidden p-2.5 rounded-lg hover:bg-grey-light" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-grey-mid bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-navy rounded-lg hover:bg-grey-light">
                {link.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-gold rounded-lg hover:bg-grey-light">
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

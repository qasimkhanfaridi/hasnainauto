"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Phone, Search } from "lucide-react";
import { BRAND, whatsappOrderLink } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import BrandLogo from "@/components/ui/BrandLogo";

type NavLink = { href: string; label: string };

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
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

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/category/seat-covers?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-grey-mid overflow-x-clip">
      {/* Top utility bar */}
      <div className="hidden md:block bg-grey-light border-b border-grey-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-xs text-grey-text">
          <p className="truncate pr-4">Premium car accessories · Nationwide COD delivery</p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-brand font-medium">
              <Phone className="w-3.5 h-3.5" /> {BRAND.phone}
            </a>
            <a href={whatsappOrderLink("Hi Hasnain Auto, I need help.")} target="_blank" rel="noopener noreferrer" className="hover:text-brand font-medium">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4 h-16 lg:h-[72px]">
          <button className="xl:hidden p-2 rounded-lg hover:bg-grey-light" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <BrandLogo />

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl mx-auto min-w-0">
            <div className="flex w-full rounded-lg overflow-hidden border border-grey-mid">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search seat covers, lights, mats..."
                className="flex-1 min-w-0 px-4 py-2.5 text-sm outline-none"
              />
              <button type="submit" className="px-4 bg-brand text-white hover:bg-brand-dark flex-shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href={whatsappOrderLink("Hi Hasnain Auto, I want a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex px-4 py-2 btn-gold text-sm"
            >
              Get a Quote
            </a>
            <Link href="/cart" className="relative p-2.5 rounded-lg hover:bg-grey-light" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-navy" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Dark category nav — scrollbar hidden */}
      <div className="hidden xl:block bg-navy overflow-x-clip">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-3 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                i === 0 ? "bg-brand text-white" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <div className="xl:hidden border-t border-grey-mid bg-white">
          <form onSubmit={onSearch} className="px-4 pt-3">
            <div className="flex rounded-lg overflow-hidden border border-grey-mid">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 min-w-0 px-3 py-2.5 text-sm outline-none"
              />
              <button type="submit" className="px-3 bg-brand text-white"><Search className="w-4 h-4" /></button>
            </div>
          </form>
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-navy rounded-lg hover:bg-brand-soft hover:text-brand">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

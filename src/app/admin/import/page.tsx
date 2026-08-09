"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");

  const onImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult("");
    if (!file) {
      setError("Choose an Excel (.xlsx) file first.");
      return;
    }
    if (!confirm) {
      setError("Tick the confirmation box — import will REPLACE the entire inventory.");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/import", { method: "POST", body: form });
    const data = await res.json();
    setLoading(false);

    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    if (!res.ok) {
      setError(data.error || "Import failed");
      return;
    }

    setResult(
      `Overwrite successful. Products: ${data.counts.products}, Categories: ${data.counts.categories}, Makes: ${data.counts.carMakes}, Models: ${data.counts.carModels}, Years: ${data.counts.years}. Version ${data.version}`
    );
    setConfirm(false);
    setFile(null);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-navy">Bulk Import (Full Overwrite)</h2>
        <p className="text-sm text-grey-text mt-1">
          Upload the filled client Excel. Every import replaces ALL products, brands, models, years, qualities, colors, and categories.
        </p>
      </div>

      <div className="card-premium p-6 space-y-4">
        <h3 className="font-bold text-navy">1. Get the file to share with client</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="/api/admin/import?template=1" className="px-4 py-3 btn-gold text-center text-sm">
            Download Excel Template
          </a>
          <a href="/api/admin/import" className="px-4 py-3 btn-navy text-center text-sm">
            Export Current Inventory
          </a>
          <Link href="/CLIENT_INVENTORY_TEMPLATE_GUIDE.md" className="px-4 py-3 border border-navy rounded-lg text-center text-sm font-semibold text-navy">
            Open Client Guide
          </Link>
        </div>
        <p className="text-xs text-grey-text">
          Tip: Export current inventory, send to client for edits (spelling, prices, names), then re-import to overwrite everything.
        </p>
      </div>

      <form onSubmit={onImport} className="card-premium p-6 space-y-4">
        <h3 className="font-bold text-navy">2. Import & overwrite</h3>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mt-1 accent-gold" />
          <span>
            I understand this will <strong>delete the previous inventory</strong> and replace it with the Excel contents.
          </span>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {result && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{result}</p>}
        <button type="submit" disabled={loading} className="w-full py-3 btn-gold disabled:opacity-50">
          {loading ? "Importing..." : "Import & Overwrite Inventory"}
        </button>
      </form>

      <div className="card-premium p-6 text-sm text-grey-text space-y-2">
        <h3 className="font-bold text-navy">Excel sheets required</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Products</strong> — name, slug, price, images, category, flags</li>
          <li><strong>Categories</strong> — shop categories</li>
          <li><strong>CarMakes</strong> — Toyota, Honda, …</li>
          <li><strong>CarModels</strong> — make + model + priceMultiplier</li>
          <li><strong>Years</strong> — generation years</li>
          <li><strong>SeatCoverQualities</strong> — LR9, ST8, …</li>
          <li><strong>CoverColors</strong> — Black, Grey, … + surcharge</li>
        </ul>
      </div>
    </div>
  );
}

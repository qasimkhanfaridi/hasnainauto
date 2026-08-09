"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) router.replace("/admin/dashboard");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Invalid password");
      return;
    }
    router.replace("/admin/dashboard");
    router.refresh();
  };

  if (checking) {
    return <p className="text-grey-text text-center py-20">Checking session...</p>;
  }

  return (
    <div className="max-w-md mx-auto card-premium p-8">
      <h2 className="text-2xl font-bold text-navy mb-2">Admin Login</h2>
      <p className="text-sm text-grey-text mb-6">Enter the admin password to manage inventory and orders.</p>
      <form onSubmit={login} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-grey-mid"
            placeholder="Admin password"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full py-3 btn-gold">Sign In</button>
      </form>
      <p className="text-xs text-grey-text mt-4">Default password: <code>hasnain2026</code> (change via ADMIN_PASSWORD in .env.local)</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Copy, Upload, Check } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  width?: number;
  height?: number;
}

export default function AdminMediaPage() {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [configured, setConfigured] = useState(false);
  const [cloudName, setCloudName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/upload");
    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    const data = await res.json();
    setMedia(data.media || []);
    setConfigured(Boolean(data.cloudinary?.configured));
    setCloudName(data.cloudinary?.cloudName || "");
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setError("");
    setMessage("");
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
      }
      setMessage(`Uploaded ${files.length} image(s) to Cloudinary.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy">Media / Image Upload</h2>
        <p className="text-sm text-grey-text mt-1">
          Upload product photos to Cloudinary, then copy URL into Excel or assign on Products page.
        </p>
      </div>

      {!configured ? (
        <div className="card-premium p-6 border border-amber-200 bg-amber-50 text-sm space-y-2">
          <p className="font-semibold text-navy">Cloudinary setup required (one-time)</p>
          <ol className="list-decimal pl-5 space-y-1 text-grey-text">
            <li>Open <a className="text-gold-dark underline" href="https://console.cloudinary.com" target="_blank" rel="noreferrer">Cloudinary Console</a></li>
            <li>Go to <strong>Settings → API Keys</strong></li>
            <li>Copy Cloud Name, API Key, API Secret</li>
            <li>Add them in Vercel → Project → Settings → Environment Variables:</li>
          </ol>
          <pre className="bg-white p-3 rounded-lg text-xs overflow-x-auto border border-grey-mid">{`CLOUDINARY_CLOUD_NAME=bnhgwryb
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret`}</pre>
          <p className="text-grey-text">Also add the same values in local <code>.env.local</code>, then redeploy / restart.</p>
        </div>
      ) : (
        <div className="card-premium p-4 text-sm text-green-800 bg-green-50">
          Cloudinary connected{cloudName ? ` (${cloudName})` : ""}. You can upload images.
        </div>
      )}

      <div className="card-premium p-6">
        <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 cursor-pointer ${configured ? "border-gold bg-gold/5" : "border-grey-mid opacity-60 pointer-events-none"}`}>
          <Upload className="w-8 h-8 text-gold" />
          <span className="font-semibold text-navy">
            {uploading ? "Uploading..." : "Click to upload images"}
          </span>
          <span className="text-xs text-grey-text">JPG, PNG, WEBP · max 8MB each · multiple files OK</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={!configured || uploading}
            onChange={(e) => onUpload(e.target.files)}
          />
        </label>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        {message && <p className="text-sm text-green-700 mt-3">{message}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <article key={item.id} className="card-premium overflow-hidden">
            <div className="relative aspect-square bg-grey-light">
              <Image src={item.url} alt={item.name} fill className="object-cover" sizes="200px" />
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs text-navy truncate" title={item.name}>{item.name}</p>
              <button
                type="button"
                onClick={() => copyUrl(item.url)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold btn-navy"
              >
                {copied === item.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === item.url ? "Copied" : "Copy URL"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {media.length === 0 && configured && (
        <p className="text-center text-grey-text text-sm py-8">No uploads yet. Upload your first product photo above.</p>
      )}
    </div>
  );
}

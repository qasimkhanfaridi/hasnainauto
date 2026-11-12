"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Upload, 
  Wand2, 
  Layers, 
  FileText, 
  Download, 
  Key, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft
} from "lucide-react";

export default function AiStudioPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"catalog" | "flux" | "gemini_spec">("catalog");
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState(
    "Ultra-high-end 8K commercial automotive studio photograph of high-power LED headlight bulbs, vacuum copper liquid cooling pipes, turbo cooling fan, external Canbus driver box, dark reflective acrylic pedestal, specular cyan and gold rim lighting, photorealistic, sharp focus, zero watermarks."
  );
  
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [specText, setSpecText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSelectedFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResultImage(null);
      setSpecText(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("mode", mode);
      if (apiKey) formData.append("apiKey", apiKey);
      if (mode === "flux") formData.append("prompt", prompt);

      const res = await fetch("/api/ai-studio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Processing failed");
      }

      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      }
      if (data.analysis) {
        setSpecText(data.analysis);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Store
            </Link>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-white">
                  Hasnain Auto AI Studio Hub
                </h1>
                <p className="text-xs text-gray-400">
                  Turn raw WhatsApp mobile shots into 8K commercial automotive catalog &amp; ad visuals
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#0e1626] border border-cyan-500/20 px-3 py-1.5 rounded-lg text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>API Gateway Active</span>
          </div>
        </div>

        {/* Studio Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column: Form & Settings */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mode Selector */}
            <div className="bg-[#0b101c] border border-gray-800 p-5 rounded-2xl space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                Select AI Engine Mode
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={() => setMode("catalog")}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-left transition ${
                    mode === "catalog"
                      ? "bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950"
                      : "bg-[#080d16] border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Layers className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase">1. Photoroom Catalog Studio (Recommended)</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Preserves 100% of the real product (exact wires, logos &amp; copper pipes) on a luxury dark studio floor.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("flux")}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-left transition ${
                    mode === "flux"
                      ? "bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950"
                      : "bg-[#080d16] border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Wand2 className="w-5 h-5 text-amber-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase">2. FLUX.1 Cinematic Ad Generator</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Generates photorealistic 8K hyper-action visuals for Meta, Instagram Reels &amp; TikTok ads.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("gemini_spec")}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-left transition ${
                    mode === "gemini_spec"
                      ? "bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950"
                      : "bg-[#080d16] border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase">3. Gemini Auto-Spec &amp; Ad Copywriter</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Reads the box photo, detects socket type &amp; copper pipes, and writes high-converting Urdu/English ad copy.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <form onSubmit={handleSubmit} className="bg-[#0b101c] border border-gray-800 p-5 rounded-2xl space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Upload WhatsApp Mobile Photo
                </label>
                <div className="border-2 border-dashed border-gray-700 hover:border-cyan-400/80 rounded-xl p-6 text-center cursor-pointer transition relative bg-[#080d16]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-200">
                    {selectedFile ? selectedFile.name : "Click or drag mobile photo here"}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">PNG, JPG, WebP up to 25MB</p>
                </div>
              </div>

              {/* API Key Input (Optional override) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-cyan-400" />
                    API Key ({mode === "catalog" ? "Photoroom" : mode === "flux" ? "Fal.ai" : "Gemini"})
                  </span>
                  <span className="text-[10px] text-gray-500">Optional if set in .env.local</span>
                </label>
                <input
                  type="password"
                  placeholder={`Enter your ${mode === "catalog" ? "Photoroom" : mode === "flux" ? "Fal.ai" : "Gemini"} API key`}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#080d16] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* FLUX Prompt */}
              {mode === "flux" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    FLUX Creative Studio Prompt
                  </label>
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-[#080d16] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedFile}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black uppercase text-xs tracking-wider transition shadow-lg shadow-cyan-950 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing in AI Studio...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Transform To 8K Studio Quality</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Right Column: Live Before & After Preview */}
          <div className="lg:col-span-7 bg-[#0b101c] border border-gray-800 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center justify-between">
              <span>Studio Visual Output</span>
              {resultImage && (
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Render Complete
                </span>
              )}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
              {/* Before View */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">
                  Original Mobile Photo
                </span>
                <div className="relative w-full aspect-square bg-[#080d16] border border-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Original Upload"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-600 text-xs">
                      No photo uploaded yet
                    </div>
                  )}
                </div>
              </div>

              {/* After View */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest mb-2 font-mono">
                  8K AI Studio Master
                </span>
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#131b2e] to-[#080c14] border border-cyan-500/40 rounded-xl overflow-hidden flex items-center justify-center shadow-2xl shadow-cyan-950/60">
                  {resultImage ? (
                    <Image
                      src={resultImage}
                      alt="AI Studio Result"
                      fill
                      className="object-contain p-3"
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-600 text-xs">
                      {loading ? "Rendering in AI studio..." : "Waiting for transformation"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spec Analysis Output */}
            {specText && (
              <div className="mt-6 p-4 rounded-xl bg-[#080d16] border border-gray-800 text-xs leading-relaxed text-gray-300">
                <span className="text-cyan-400 font-bold block mb-1 uppercase font-mono">
                  Gemini Spec &amp; Ad Copy Analysis:
                </span>
                <pre className="whitespace-pre-wrap font-sans text-xs text-gray-300">
                  {specText}
                </pre>
              </div>
            )}

            {/* Download CTA */}
            {resultImage && (
              <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                <a
                  href={resultImage}
                  download="hasnain-auto-studio-master.png"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 transition"
                >
                  <Download className="w-4 h-4" />
                  Download 8K Master File
                </a>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

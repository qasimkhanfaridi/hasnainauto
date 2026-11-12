import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // Allow enough time for AI processing

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const mode = (formData.get("mode") as string) || "catalog"; // "catalog" (Photoroom) | "flux" | "gemini_spec"
    const apiKey = (formData.get("apiKey") as string) || process.env.PHOTOROOM_API_KEY || process.env.FAL_KEY || process.env.GEMINI_API_KEY;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ─── Mode 1: Photoroom API (Preserve Real Product & Add Dark Studio Stage) ───
    if (mode === "catalog") {
      const photoroomKey = apiKey || process.env.PHOTOROOM_API_KEY;
      if (!photoroomKey) {
        return NextResponse.json({
          error: "Missing Photoroom API key. Please provide your key or set PHOTOROOM_API_KEY in .env.local",
          hint: "Get a free key from https://photoroom.com/api"
        }, { status: 400 });
      }

      const pFormData = new FormData();
      pFormData.append("image_file", new Blob([buffer], { type: file.type }), file.name);
      pFormData.append("format", "png");
      pFormData.append("shadow.mode", "ai.soft"); // Realistic soft contact shadow
      pFormData.append("background.color", "#080c14"); // Dark automotive obsidian background

      const res = await fetch("https://sdk.photoroom.com/v1/segment", {
        method: "POST",
        headers: {
          "x-api-key": photoroomKey,
        },
        body: pFormData,
      });

      if (!res.ok) {
        const errText = await res.text();
        return NextResponse.json({ error: `Photoroom error: ${errText}` }, { status: res.status });
      }

      const resultBuffer = await res.arrayBuffer();
      const base64Image = Buffer.from(resultBuffer).toString("base64");
      return NextResponse.json({
        success: true,
        mode: "catalog",
        mimeType: "image/png",
        imageUrl: `data:image/png;base64,${base64Image}`,
      });
    }

    // ─── Mode 2: FLUX.1 via Fal.ai (Cinematic Ad Creatives) ───
    if (mode === "flux") {
      const falKey = apiKey || process.env.FAL_KEY;
      if (!falKey) {
        return NextResponse.json({
          error: "Missing Fal.ai API key. Please provide your key or set FAL_KEY in .env.local",
          hint: "Get a key from https://fal.ai"
        }, { status: 400 });
      }

      const prompt = (formData.get("prompt") as string) || 
        "Ultra-high-end 8K commercial automotive studio photograph of high-power LED headlight bulbs, vacuum copper liquid cooling pipes, turbo cooling fan, external Canbus driver box, dark reflective acrylic pedestal, specular cyan and gold rim lighting, photorealistic, sharp focus, zero watermarks.";

      const res = await fetch("https://fal.run/fal-ai/flux/dev", {
        method: "POST",
        headers: {
          "Authorization": `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          image_size: "square_hd",
          num_inference_steps: 28,
          guidance_scale: 3.5,
          enable_safety_checker: true,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return NextResponse.json({ error: `Fal.ai FLUX error: ${errText}` }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json({
        success: true,
        mode: "flux",
        imageUrl: data.images?.[0]?.url || "",
      });
    }

    // ─── Mode 3: Gemini Vision (Auto Spec Extraction & Urdu/English Ad Copy) ───
    if (mode === "gemini_spec") {
      const geminiKey = apiKey || process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        return NextResponse.json({
          error: "Missing Gemini API key. Set GEMINI_API_KEY in .env.local",
          hint: "Get a free key from https://ai.google.dev"
        }, { status: 400 });
      }

      const base64Data = buffer.toString("base64");
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are an automotive lighting engineer and e-commerce copywriter in Pakistan for Hasnain Auto Saddar Rawalpindi. Inspect this product photo and extract:\n1. Product Name & Estimated SKU\n2. Socket Types (H4, H11, 9005, etc.)\n3. Copper Pipe Count & Cooling Tech\n4. Claimed Wattage & Lumens\n5. Three-sentence high-converting Urdu/English ad caption for WhatsApp & Facebook ads.",
                },
                {
                  inline_data: {
                    mime_type: file.type || "image/jpeg",
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return NextResponse.json({ error: `Gemini error: ${errText}` }, { status: res.status });
      }

      const geminiData = await res.json();
      const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis returned.";

      return NextResponse.json({
        success: true,
        mode: "gemini_spec",
        analysis: answer,
      });
    }

    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

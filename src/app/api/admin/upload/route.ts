import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getCloudinaryConfigStatus, uploadImageBuffer } from "@/lib/cloudinary";
import { readMedia, saveMediaItem } from "@/lib/mediaStore";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    cloudinary: getCloudinaryConfigStatus(),
    media: readMedia(),
  });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  // ~8MB limit
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 8MB" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageBuffer(buffer, file.name);
    const item = {
      id: `media-${Date.now()}`,
      url: uploaded.url,
      publicId: uploaded.publicId,
      name: file.name,
      bytes: uploaded.bytes,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
      createdAt: new Date().toISOString(),
    };
    try {
      saveMediaItem(item);
    } catch {
      // Vercel filesystem may be read-only; Cloudinary URL is still valid
    }
    return NextResponse.json({ ok: true, item });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Upload failed",
        cloudinary: getCloudinaryConfigStatus(),
      },
      { status: 400 }
    );
  }
}

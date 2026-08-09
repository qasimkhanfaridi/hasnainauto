import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readInventory, overwriteInventory } from "@/lib/store";

export async function GET() {
  return NextResponse.json(readInventory());
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const saved = overwriteInventory(body);
  return NextResponse.json(saved);
}

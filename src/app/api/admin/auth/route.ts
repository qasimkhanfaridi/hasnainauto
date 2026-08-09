import { NextResponse } from "next/server";
import { getAdminPassword, setAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body?.action === "logout") {
    await clearAdminSession();
    return NextResponse.json({ ok: true });
  }
  if (body?.password === getAdminPassword()) {
    await setAdminSession();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

import { cookies } from "next/headers";

const COOKIE = "ha_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "hasnain2026";
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === "ok";
}

export async function setAdminSession() {
  const jar = await cookies();
  jar.set(COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("UNAUTHORIZED");
  }
}

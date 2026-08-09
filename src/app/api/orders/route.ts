import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { findOrder, readOrders, saveOrder, updateOrder } from "@/lib/store";
import type { Order, OrderStatus } from "@/types/admin";

function makeOrderId() {
  return `HA-${Date.now().toString(36).toUpperCase()}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const phone = searchParams.get("phone") ?? undefined;

  if (id) {
    const order = findOrder(id, phone);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(order);
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readOrders());
}

export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();
  const order: Order = {
    id: body.id || makeOrderId(),
    createdAt: now,
    updatedAt: now,
    status: "Pending Confirmation",
    customer: body.customer,
    paymentMethod: body.paymentMethod,
    items: body.items,
    subtotal: body.subtotal,
    discount: body.discount,
    deliveryCharge: body.deliveryCharge,
    total: body.total,
    notes: body.notes ?? "",
  };
  saveOrder(order);
  return NextResponse.json(order);
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }
  const updated = updateOrder(body.id, {
    status: body.status as OrderStatus,
    notes: body.notes,
  });
  if (!updated) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(updated);
}

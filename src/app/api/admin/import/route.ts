import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { overwriteInventory, readInventory } from "@/lib/store";
import { parseInventoryWorkbook, buildInventoryWorkbook, workbookToBuffer } from "@/lib/excelInventory";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const template = searchParams.get("template") === "1";
  const catalog = readInventory();
  const wb = buildInventoryWorkbook(catalog);
  const buffer = workbookToBuffer(wb);
  const filename = template
    ? "HasnainAuto_Inventory_TEMPLATE.xlsx"
    : `HasnainAuto_Inventory_Export_${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Excel file is required" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = parseInventoryWorkbook(buffer);
    const saved = overwriteInventory(parsed);
    return NextResponse.json({
      ok: true,
      message: "Inventory fully overwritten from Excel.",
      counts: {
        products: saved.products.length,
        categories: saved.categories.length,
        carMakes: saved.carMakes.length,
        carModels: saved.carModels.length,
        years: saved.years.length,
        seatCoverQualities: saved.seatCoverQualities.length,
        coverColors: saved.coverColors.length,
      },
      updatedAt: saved.updatedAt,
      version: saved.version,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Import failed" },
      { status: 400 }
    );
  }
}

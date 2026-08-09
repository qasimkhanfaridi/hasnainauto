import { readInventory } from "@/lib/store";
import type { CoverColor, SeatCoverQuality } from "@/types";
import { getModelMultiplier } from "./cars";

export function getSeatCoverQualities() {
  return readInventory().seatCoverQualities;
}

export function getCoverColors() {
  return readInventory().coverColors;
}

export function calculateSeatCoverPrice(
  quality: SeatCoverQuality,
  model: string,
  color: CoverColor
): number {
  const catalog = readInventory();
  const qualityData = catalog.seatCoverQualities.find((q) => q.id === quality);
  if (!qualityData) return 0;
  const multiplier = getModelMultiplier(model);
  const colorExtra = catalog.coverColors.find((c) => c.color === color)?.surcharge ?? 0;
  return Math.round(qualityData.basePrice * multiplier + colorExtra);
}

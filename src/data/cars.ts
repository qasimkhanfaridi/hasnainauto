import { readInventory } from "@/lib/store";

export function getCarMakes(): string[] {
  return readInventory().carMakes;
}

export function getCarModels() {
  return readInventory().carModels;
}

export function getModelsForMake(make: string): string[] {
  return getCarModels().filter((m) => m.make === make).map((m) => m.model);
}

export function getCarYears(): string[] {
  return readInventory().years;
}

export function getModelMultiplier(model: string): number {
  const row = getCarModels().find((m) => m.model === model);
  return row?.priceMultiplier ?? 1;
}

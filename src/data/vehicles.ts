export interface VehicleModel {
  name: string;
  years: number[];
  popular?: boolean;
  priceMultiplier?: number;
}

export interface VehicleMake {
  name: string;
  slug: string;
  popular?: boolean;
  models: VehicleModel[];
}

export const YEARS_LIST: number[] = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015
];

export const CAR_MODELS_WITH_MULTIPLIER = [
  { make: "Toyota", model: "Corolla", priceMultiplier: 1 },
  { make: "Toyota", model: "Yaris", priceMultiplier: 0.92 },
  { make: "Toyota", model: "Fortuner", priceMultiplier: 1.25 },
  { make: "Toyota", model: "Hilux", priceMultiplier: 1.2 },
  { make: "Toyota", model: "Prado", priceMultiplier: 1.35 },
  { make: "Honda", model: "Civic", priceMultiplier: 1.05 },
  { make: "Honda", model: "City", priceMultiplier: 0.95 },
  { make: "Honda", model: "BR-V", priceMultiplier: 1 },
  { make: "Suzuki", model: "Alto", priceMultiplier: 0.85 },
  { make: "Suzuki", model: "Cultus", priceMultiplier: 0.9 },
  { make: "Suzuki", model: "Swift", priceMultiplier: 0.93 },
  { make: "Kia", model: "Sportage", priceMultiplier: 1.1 },
  { make: "Kia", model: "Picanto", priceMultiplier: 0.88 },
  { make: "Hyundai", model: "Tucson", priceMultiplier: 1.12 },
  { make: "MG", model: "HS", priceMultiplier: 1.05 },
  { make: "Changan", model: "Alsvin", priceMultiplier: 0.95 },
  { make: "Proton", model: "Saga", priceMultiplier: 0.9 },
];

export function getModelMultiplier(make?: string, model?: string): number {
  if (!make || !model) return 1;
  const match = CAR_MODELS_WITH_MULTIPLIER.find(
    (m) =>
      m.make.toLowerCase() === make.toLowerCase() &&
      (m.model.toLowerCase() === model.toLowerCase() ||
        model.toLowerCase().includes(m.model.toLowerCase()))
  );
  return match ? match.priceMultiplier : 1;
}

export const VEHICLE_DATABASE: VehicleMake[] = [
  {
    name: "Toyota",
    slug: "toyota",
    popular: true,
    models: [
      { name: "Corolla", years: YEARS_LIST, popular: true, priceMultiplier: 1 },
      { name: "Yaris", years: YEARS_LIST, popular: true, priceMultiplier: 0.92 },
      { name: "Fortuner", years: YEARS_LIST, popular: true, priceMultiplier: 1.25 },
      { name: "Hilux", years: YEARS_LIST, popular: true, priceMultiplier: 1.2 },
      { name: "Prado", years: YEARS_LIST, popular: true, priceMultiplier: 1.35 },
      { name: "Prius", years: YEARS_LIST },
      { name: "Aqua", years: YEARS_LIST },
      { name: "Vitz", years: YEARS_LIST },
    ],
  },
  {
    name: "Honda",
    slug: "honda",
    popular: true,
    models: [
      { name: "Civic", years: YEARS_LIST, popular: true, priceMultiplier: 1.05 },
      { name: "City", years: YEARS_LIST, popular: true, priceMultiplier: 0.95 },
      { name: "BR-V", years: YEARS_LIST, popular: true, priceMultiplier: 1 },
      { name: "Vezel / HR-V", years: YEARS_LIST },
    ],
  },
  {
    name: "Suzuki",
    slug: "suzuki",
    popular: true,
    models: [
      { name: "Alto", years: YEARS_LIST, popular: true, priceMultiplier: 0.85 },
      { name: "Cultus", years: YEARS_LIST, popular: true, priceMultiplier: 0.9 },
      { name: "Swift", years: YEARS_LIST, popular: true, priceMultiplier: 0.93 },
      { name: "Wagon R", years: YEARS_LIST, popular: true, priceMultiplier: 0.9 },
      { name: "Every", years: YEARS_LIST },
      { name: "Bolan", years: YEARS_LIST },
    ],
  },
  {
    name: "Kia",
    slug: "kia",
    popular: true,
    models: [
      { name: "Sportage", years: YEARS_LIST, popular: true, priceMultiplier: 1.1 },
      { name: "Picanto", years: YEARS_LIST, popular: true, priceMultiplier: 0.88 },
      { name: "Stonic", years: YEARS_LIST },
      { name: "Sorento", years: YEARS_LIST, priceMultiplier: 1.25 },
    ],
  },
  {
    name: "Hyundai",
    slug: "hyundai",
    popular: true,
    models: [
      { name: "Tucson", years: YEARS_LIST, popular: true, priceMultiplier: 1.12 },
      { name: "Elantra", years: YEARS_LIST, popular: true, priceMultiplier: 1.05 },
      { name: "Sonata", years: YEARS_LIST, priceMultiplier: 1.1 },
      { name: "Santa Fe", years: YEARS_LIST, priceMultiplier: 1.3 },
    ],
  },
  {
    name: "MG",
    slug: "mg",
    popular: true,
    models: [
      { name: "HS", years: YEARS_LIST, popular: true, priceMultiplier: 1.05 },
      { name: "ZS / ZS EV", years: YEARS_LIST },
      { name: "MG GT", years: YEARS_LIST },
    ],
  },
  {
    name: "Changan",
    slug: "changan",
    popular: true,
    models: [
      { name: "Alsvin", years: YEARS_LIST, popular: true, priceMultiplier: 0.95 },
      { name: "Oshan X7", years: YEARS_LIST, popular: true, priceMultiplier: 1.2 },
      { name: "Karvaan", years: YEARS_LIST, priceMultiplier: 0.95 },
    ],
  },
  {
    name: "Proton",
    slug: "proton",
    models: [
      { name: "Saga", years: YEARS_LIST, popular: true, priceMultiplier: 0.9 },
      { name: "X70", years: YEARS_LIST, priceMultiplier: 1.15 },
    ],
  },
];

export interface SelectedVehicle {
  make: string;
  model: string;
  year?: number;
}

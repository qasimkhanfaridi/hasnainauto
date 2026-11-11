/** Novsight-style product lines — maps to live slugs in products.ts */

export interface LedSeriesLine {
  id: string;
  name: string;
  seriesLabel: string;
  description: string;
  highlight: string;
  image: string;
  href: string;
  specs: string[];
  accent: "orange" | "gold" | "teal" | "cyan";
}

export const LED_SERIES_LINES: LedSeriesLine[] = [
  {
    id: "rego-racing",
    name: "Rego Racing",
    seriesLabel: "001 Series",
    description: "4 copper pipes, aluminium fan, German technology",
    highlight: "260W · 30,000 LM · Canbus",
    image: "/images/products/rego-racing-led-01.jpg",
    href: "/product/rego-racing-led-headlights",
    specs: ["4 Copper Pipes", "Canbus", "1Y Warranty"],
    accent: "orange",
  },
  {
    id: "mother-6",
    name: "Mother 6 Copper",
    seriesLabel: "002 Series",
    description: "Six copper tubes with 12,000 RPM turbo fan",
    highlight: "280W · 35,000 LM · Canbus",
    image: "/images/products/mother-6-copper-led-01.jpg",
    href: "/product/mother-6-copper-led-headlights",
    specs: ["6 Copper Pipes", "Turbo Fan", "1Y Warranty"],
    accent: "teal",
  },
  {
    id: "b-pro",
    name: "B Pro 8 Copper",
    seriesLabel: "003 Series",
    description: "Maximum copper pipe count for pro thermal headroom",
    highlight: "240W · 30,000 LM · Canbus",
    image: "/images/products/b-pro-8-copper-led-01.jpg",
    href: "/product/b-pro-8-copper-led-headlights",
    specs: ["8 Copper Pipes", "Canbus", "1Y Warranty"],
    accent: "gold",
  },
  {
    id: "mother-5",
    name: "Mother 5",
    seriesLabel: "004 Series",
    description: "6000K crisp white with turbo fan cooling",
    highlight: "260W · 35,000 LM · 6000K",
    image: "/images/products/mother-5-copper-led-01.jpg",
    href: "/product/mother-5-copper-led-headlights",
    specs: ["5 Copper Pipes", "6000K", "Turbo Fan"],
    accent: "teal",
  },
  {
    id: "golden-rego",
    name: "Golden Box Rego",
    seriesLabel: "010 Series",
    description: "Premium Rego tier with 4 copper tubes & Canbus",
    highlight: "230W · 35,000 LM · 6500K",
    image: "/images/products/golden-box-rego-led-01.jpg",
    href: "/product/golden-box-rego-led-headlights",
    specs: ["4 Copper Pipes", "Canbus", "1Y Warranty"],
    accent: "gold",
  },
  {
    id: "black-rego",
    name: "Black Box Rego",
    seriesLabel: "007 Series",
    description: "Compact 2-pipe Rego value upgrade",
    highlight: "180W · 25,000 LM · 6500K",
    image: "/images/products/black-box-rego-led-01.jpg",
    href: "/product/black-box-rego-led-headlights",
    specs: ["2 Copper Tubes", "Compact Kit", "1Y Warranty"],
    accent: "orange",
  },
  {
    id: "y6",
    name: "Y6 Projector Tubes",
    seriesLabel: "008 Series",
    description: "Projector-style H4 dual beam with aluminium fan",
    highlight: "65W · 5500K · H4 Only",
    image: "/images/products/y6-projector-led-h4-01.jpg",
    href: "/product/y6-projector-led-h4",
    specs: ["H4 Dual Beam", "Al Fan", "Projector Tube"],
    accent: "cyan",
  },
  {
    id: "mini-lens",
    name: "Mini Projector Lens",
    seriesLabel: "009 Series",
    description: "Compact projector optic — H4, H11, 9005",
    highlight: "75W · 12,000 LM",
    image: "/images/products/mini-projector-lens-led-01.jpg",
    href: "/product/mini-projector-lens-led-headlights",
    specs: ["Mini Lens", "Al Fan", "3 Sockets"],
    accent: "cyan",
  },
  {
    id: "wooden-box-zinc-alloy",
    name: "Wooden Box Zinc Alloy",
    seriesLabel: "011 Series",
    description: "Zinc alloy body, ATD driver, copper cooling",
    highlight: "Premium · H4 / H11 / 9005",
    image: "/images/products/wooden-box-zinc-alloy-led-01.jpg",
    href: "/product/wooden-box-zinc-alloy-led-headlights",
    specs: ["Zinc Alloy Body", "ATD Driver", "3 Sockets"],
    accent: "gold",
  },
  {
    id: "tasa-h4",
    name: "TASA H4 Premium",
    seriesLabel: "012 Series",
    description: "Dual-chip LED, aluminium fan, 1-year warranty",
    highlight: "H4 Dual Beam · 1Y Warranty",
    image: "/images/products/tasa-h4-premium-led-01.jpg",
    href: "/product/tasa-h4-premium-led-headlights",
    specs: ["Dual LED Chip", "Al Fan + Driver", "1Y Warranty"],
    accent: "orange",
  },
  {
    id: "ultra-4-lens-fog",
    name: "Ultra 4-Lens Fog / Aux",
    seriesLabel: "014 Series",
    description: "4-LED pod for bikes, adventure & off-road",
    highlight: "Metal Housing · Heat Sinks",
    image: "/images/products/ultra-bright-4-lens-fog-01.jpg",
    href: "/product/ultra-bright-4-lens-fog-aux-light",
    specs: ["4-Lens Pod", "Metal Body", "Bikes & Off-Road"],
    accent: "cyan",
  },
];

export const LED_SOCKET_FILTERS = ["H4", "H11", "9005", "9006", "H7"] as const;

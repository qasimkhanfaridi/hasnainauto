export type ProductCategory =
  | "seat-covers"
  | "led-lights"
  | "floor-mats"
  | "exterior-accessories"
  | "mobile-holders"
  | "combo-deals";

export interface CategoryInfo {
  id: ProductCategory;
  slug: ProductCategory;
  name: string;
  description: string;
  shortDesc: string;
  itemCount: string;
  image: string;
  isHero?: boolean;
  subcategories: string[];
  hidden?: boolean;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "seat-covers",
    slug: "seat-covers",
    name: "Seat Covers",
    description: "Custom-fit premium leather & scratchless covers",
    shortDesc: "Custom-fit premium leather & scratchless covers for all car models.",
    itemCount: "Custom Fitted",
    image: "/images/products/premium-leather-seat-covers.jpg",
    isHero: true,
    subcategories: ["Custom Leather Upholstery", "Bucket Fit Covers", "Perforated Covers"],
  },
  {
    id: "led-lights",
    slug: "led-lights",
    name: "LED & Projector Lights",
    description: "Headlights, fog lights & ambient lighting",
    shortDesc: "Headlights, fog lights, laser mini pods & interior ambient lighting.",
    itemCount: "High-Output LEDs",
    image: "/images/products/rego-racing-ai-hero.jpg",
    isHero: false,
    subcategories: ["Headlight LEDs", "Fog Lights", "Interior Lighting"],
  },
  {
    id: "floor-mats",
    slug: "floor-mats",
    name: "Floor & TP Mats",
    description: "7D mats, simple mats & full protection TP mats",
    shortDesc: "7D deep-dish diamond quilted mats and all-weather TP trunk liners.",
    itemCount: "Complete Coverage",
    image: "/images/products/7d-floor-mats-premium.jpg",
    isHero: false,
    subcategories: ["Floor Mats", "Trunk Mats", "All-Weather Mats"],
  },
  {
    id: "exterior-accessories",
    slug: "exterior-accessories",
    name: "Exterior Accessories",
    description: "Mud flaps, air press & body styling",
    shortDesc: "Durable mud flaps, body styling, and exterior vehicle protection.",
    itemCount: "Road Protection",
    image: "/images/products/mud-flaps-set.jpg",
    isHero: false,
    subcategories: ["Exterior Protection", "Mud Flaps", "Air Press"],
  },
  {
    id: "mobile-holders",
    slug: "mobile-holders",
    name: "Mobile Holders & Key Covers",
    description: "Dashboard holders & premium key covers",
    shortDesc: "Precision CNC magnetic mounts and handcrafted genuine leather key covers.",
    itemCount: "Daily Essentials",
    image: "/images/products/universal-mobile-holder.jpg",
    isHero: false,
    subcategories: ["Phone Mounts", "Key Covers", "Car Gadgets"],
  },
  {
    id: "combo-deals",
    slug: "combo-deals",
    name: "Combo Deals",
    description: "Bundle & save on complete car upgrades",
    shortDesc: "Discounted interior upgrades pairing tailored seat covers with 7D mats.",
    itemCount: "Special Value",
    image: "/images/products/seat-cover-floor-mat-combo.jpg",
    isHero: false,
    subcategories: ["Bundles", "Interior Combos", "Saver Packages"],
  },
];

export interface SeatCoverQuality {
  id: string;
  label: string;
  description: string;
  basePrice: number;
}

export const SEAT_COVER_QUALITIES: SeatCoverQuality[] = [
  { id: "LR9", label: "LR9", description: "Economy Leather Rite", basePrice: 12000 },
  { id: "ST8", label: "ST8", description: "Standard Leather Rite", basePrice: 15000 },
  { id: "ST27", label: "ST27", description: "Premium Leather Rite", basePrice: 18500 },
  { id: "NS3", label: "NS3", description: "Advanced Leather Rite", basePrice: 22000 },
  { id: "Japanese Scratchless", label: "Japanese", description: "Scratchless Material", basePrice: 25000 },
  { id: "Scratchless Premium", label: "Premium", description: "Scratchless Leather", basePrice: 28000 },
];

export interface CoverColor {
  color: string;
  hex: string;
  surcharge: number;
}

export const COVER_COLORS: CoverColor[] = [
  { color: "Black", hex: "#18181b", surcharge: 0 },
  { color: "Grey", hex: "#4b5563", surcharge: 0 },
  { color: "Beige", hex: "#d2b48c", surcharge: 0 },
  { color: "Brown", hex: "#5c3d28", surcharge: 0 },
  { color: "Mustard", hex: "#d97706", surcharge: 500 },
  { color: "Maroon", hex: "#831843", surcharge: 500 },
];

export interface VehicleCompatibility {
  universal: boolean;
  makes?: string[];
  models?: string[];
  years?: number[];
  note?: string;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  productNumber?: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  badge?: string;
  isSeatCover?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  inStock: boolean;
  stock?: boolean;
  brand?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  specifications: { [key: string]: string };
  vehicleCompatibility: VehicleCompatibility;
  variants?: ProductVariant[];
  relatedSlugs: string[];
  warranty?: string;
  hidden?: boolean;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "ktm-ai-led-headlight",
    productNumber: 1,
    name: "KTM Ai LED Headlight",
    slug: "ktm-ai-led-headlight",
    shortDescription: "App-controlled LED headlight kit with 4 bulbs and external drivers.",
    description: "KTM Ai LED headlight system with app control — change modes from your phone. Four bulbs with colour-coded socket adapters (H4 / H11 / 9005 / 9006) and external drivers. Crisp 6000K white light, plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 19500, // SAMPLE price — replace with real price
    price: 19500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "KTM",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/ktm-ai-led-headlight-1.jpg", "/images/products/ktm-ai-led-headlight-2.jpg", "/images/products/ktm-ai-led-headlight-3.jpg", "/images/products/ktm-ai-led-headlight-4.jpg", "/images/products/ktm-ai-led-headlight-5.jpg", "/images/products/ktm-ai-led-headlight-6.jpg", "/images/products/ktm-ai-led-headlight-7.jpg", "/images/products/ktm-ai-led-headlight-8.jpg", "/images/products/ktm-ai-led-headlight-9.jpg", "/images/products/ktm-ai-led-headlight-10.jpg"],
    features: ["App control (QR + App Store)", "4 bulbs + external drivers", "6000K white light", "Plug-and-play"],
    specifications: {"Socket": "H4 / H11 / 9005 / 9006", "Colour Temperature": "6000K", "Control": "Mobile app"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "rego-racing-h4-led-headlights",
    productNumber: 2,
    name: "REGO Racing H4 LED Headlights",
    slug: "rego-racing-h4-led-headlights",
    shortDescription: "REGO Racing H4 LED headlight bulbs, 6500K white.",
    description: "REGO Racing H4 LED headlight bulbs in a black metal case, with Mother 6500K drivers and braided wiring. Bright white 6500K beam, plug-and-play H4 fitment.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 21900, // OLD real price from old catalog (same product)
    price: 21900, // OLD real price from old catalog (same product)
    originalPrice: 24900, // OLD real price from old catalog (same product)
    inStock: true,
    brand: "REGO Racing",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/rego-racing-h4-led-headlights-1.jpg", "/images/products/rego-racing-h4-led-headlights-2.jpg", "/images/products/rego-racing-h4-led-headlights-3.jpg", "/images/products/rego-racing-h4-led-headlights-4.jpg", "/images/products/rego-racing-h4-led-headlights-5.jpg", "/images/products/rego-racing-h4-led-headlights-6.jpg"],
    features: ["6500K white light", "External drivers", "Plug-and-play H4"],
    specifications: {"Socket": "H4", "Colour Temperature": "6500K"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["rego-4-copper-h4-golden-box", "rego-racing-copper-led-headlights-6500k"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "y6-h4-mini-projector-lens",
    productNumber: 3,
    name: "Y6 H4 LED Mini Projector Lens",
    slug: "y6-h4-mini-projector-lens",
    shortDescription: "Y6 H4 mini projector-lens LED bulbs with a sharp cutoff line.",
    description: "Y6 H4 mini projector-lens LED headlight bulbs — hi and lo beam in one bulb, with a sharp clear cutoff line and no glare. 6000K white, plug-and-play H4.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 16500, // OLD real price from old catalog (same product)
    price: 16500, // OLD real price from old catalog (same product)
    originalPrice: 19500, // OLD real price from old catalog (same product)
    inStock: true,
    brand: "Y6",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/y6-h4-mini-projector-lens-1.jpg", "/images/products/y6-h4-mini-projector-lens-2.jpg", "/images/products/y6-h4-mini-projector-lens-3.jpg", "/images/products/y6-h4-mini-projector-lens-4.jpg", "/images/products/y6-h4-mini-projector-lens-5.jpg", "/images/products/y6-h4-mini-projector-lens-6.jpg"],
    features: ["Mini projector lens", "Sharp cutoff line, no glare", "Hi/Lo beam in one bulb", "6000K white"],
    specifications: {"Socket": "H4", "Colour Temperature": "6000K"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "h11-mini-projector-lens-led",
    productNumber: 4,
    name: "H11 Mini Projector Lens LED",
    slug: "h11-mini-projector-lens-led",
    shortDescription: "H11 single-beam mini projector-lens LED bulbs (Smart Kit 2022).",
    description: "H11 single-beam mini projector-lens LED headlight bulbs with a focused beam and clean cutoff line. Smart Kit 2022 drivers, plug-and-play H11 — for low beam and fog.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 17200, // OLD real price from old catalog (same product)
    price: 17200, // OLD real price from old catalog (same product)
    originalPrice: 20500, // OLD real price from old catalog (same product)
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/h11-mini-projector-lens-led-1.jpg", "/images/products/h11-mini-projector-lens-led-2.jpg", "/images/products/h11-mini-projector-lens-led-3.jpg", "/images/products/h11-mini-projector-lens-led-4.jpg", "/images/products/h11-mini-projector-lens-led-5.jpg"],
    features: ["Mini projector lens", "Clean cutoff line", "Single beam", "Plug-and-play H11"],
    specifications: {"Socket": "H11"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "rego-4-copper-h4-golden-box",
    productNumber: 5,
    name: "REGO Racing 4 Copper H4 LED Headlights (Golden Box)",
    slug: "rego-4-copper-h4-golden-box",
    shortDescription: "REGO 4-copper H4 LED bulbs in the premium golden metal box.",
    description: "REGO Racing 4-copper H4 LED headlight bulbs, 6500K white, in the premium metallic (golden) box edition. 6-copper high-range brightness, H4 fitment.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 24200, // OLD real price from old catalog (same product)
    price: 24200, // OLD real price from old catalog (same product)
    originalPrice: 27800, // OLD real price from old catalog (same product)
    inStock: true,
    brand: "REGO Racing",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/rego-4-copper-h4-golden-box-1.jpg", "/images/products/rego-4-copper-h4-golden-box-2.jpg", "/images/products/rego-4-copper-h4-golden-box-3.jpg", "/images/products/rego-4-copper-h4-golden-box-4.jpg", "/images/products/rego-4-copper-h4-golden-box-5.jpg", "/images/products/rego-4-copper-h4-golden-box-6.jpg"],
    features: ["4 copper tubes", "6500K white light", "Premium metallic box", "Plug-and-play H4"],
    specifications: {"Socket": "H4", "Colour Temperature": "6500K"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["rego-racing-h4-led-headlights", "rego-racing-copper-led-headlights-6500k"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "copper-led-headlights-h4-wooden-box",
    productNumber: 6,
    name: "Copper LED Headlights H4 (Wooden Box)",
    slug: "copper-led-headlights-h4-wooden-box",
    shortDescription: "Copper-bodied H4 LED headlights in a premium wooden presentation box.",
    description: "Copper-bodied H4 LED headlight bulbs with fan cooling and external driver, in a premium red wooden presentation box. Brand is not printed on the box — the shop will confirm the name.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 19800, // OLD real price from old catalog (same product)
    price: 19800, // OLD real price from old catalog (same product)
    originalPrice: 22800, // OLD real price from old catalog (same product)
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/copper-led-headlights-h4-wooden-box-1.jpg", "/images/products/copper-led-headlights-h4-wooden-box-2.jpg", "/images/products/copper-led-headlights-h4-wooden-box-3.jpg", "/images/products/copper-led-headlights-h4-wooden-box-4.jpg", "/images/products/copper-led-headlights-h4-wooden-box-5.jpg", "/images/products/copper-led-headlights-h4-wooden-box-6.jpg"],
    features: ["Copper body, fan-cooled", "External driver", "Premium wooden box", "Plug-and-play H4"],
    specifications: {"Socket": "H4"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "4x4-led-off-road-light-bar-4-lens",
    productNumber: 7,
    name: "4x4 LED High Power Off-Road Light Bar (4-Lens)",
    slug: "4x4-led-off-road-light-bar-4-lens",
    shortDescription: "Pair of 4-lens LED off-road light bars for pickups and 4x4s.",
    description: "4x4 LED high-power off-road light bars — two 4-lens bars with mounting brackets and hardware. Bracket-mount on bull bar, bumper or roof. Spot + flood combo for pickups, SUVs and 4x4s.",
    category: "led-lights",
    subcategory: "Fog Lights",
    basePrice: 16800, // OLD real price from old catalog (same product)
    price: 16800, // OLD real price from old catalog (same product)
    originalPrice: 19500, // OLD real price from old catalog (same product)
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/4x4-led-off-road-light-bar-4-lens-1.jpg", "/images/products/4x4-led-off-road-light-bar-4-lens-2.jpg", "/images/products/4x4-led-off-road-light-bar-4-lens-3.jpg"],
    features: ["4 lenses per bar, pair", "Brackets + hardware included", "Spot + flood combo", "12V universal"],
    specifications: {"Lenses": "4 per bar", "Voltage": "12V", "Mount": "Bull bar / bumper / roof"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["led-off-road-light-bar-5-lens"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "led-off-road-light-bar-5-lens",
    productNumber: 8,
    name: "LED Off-Road Light Bar (5-Lens)",
    slug: "led-off-road-light-bar-5-lens",
    shortDescription: "Pair of 5-lens LED off-road light bars — same line as the 4-lens.",
    description: "LED off-road light bars — two 5-lens bars with brackets and hardware, same 4x4 auxiliary-light line as the 4-lens version, one lens wider. Bracket-mount for pickups, SUVs and 4x4s.",
    category: "led-lights",
    subcategory: "Fog Lights",
    basePrice: 17500, // SAMPLE price — replace with real price
    price: 17500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/led-off-road-light-bar-5-lens-1.jpg", "/images/products/led-off-road-light-bar-5-lens-2.jpg"],
    features: ["5 lenses per bar, pair", "Brackets + hardware included", "Spot + flood combo", "12V universal"],
    specifications: {"Lenses": "5 per bar", "Voltage": "12V", "Mount": "Bull bar / bumper / roof"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["4x4-led-off-road-light-bar-4-lens"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "rego-motorcycle-led-headlight",
    productNumber: 9,
    name: "REGO Motorcycle LED Headlight",
    slug: "rego-motorcycle-led-headlight",
    shortDescription: "REGO super-bright motorcycle LED headlight — small dual-pod projector.",
    description: "REGO motorcycle LED headlight — small dual-pod projector light for bikes, wide 12V–85V voltage, super bright. Note: this is a bike light in a car-accessory shop — confirm it belongs on the site.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 4500, // SAMPLE price — replace with real price
    price: 4500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "REGO",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/rego-motorcycle-led-headlight-1.jpg", "/images/products/rego-motorcycle-led-headlight-2.jpg", "/images/products/rego-motorcycle-led-headlight-3.jpg"],
    features: ["Dual-pod projector", "12V–85V wide voltage", "Super bright"],
    specifications: {"Voltage": "12V–85V", "Type": "Motorcycle headlight"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "super-bright-t10-led-bulbs",
    productNumber: 10,
    name: "Super Bright T10 LED Bulbs (High Power)",
    slug: "super-bright-t10-led-bulbs",
    shortDescription: "Super bright high-power T10 LED wedge bulbs.",
    description: "Super bright T10 LED bulbs (high power) — wedge bulbs for parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1200, // SAMPLE price — replace with real price
    price: 1200, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/super-bright-t10-led-bulbs-1.jpg", "/images/products/super-bright-t10-led-bulbs-2.jpg"],
    features: ["High power", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["premium-t10-led-bulbs-ultra-bright", "t10-led-bulbs-super-bright"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "super-bright-led-interior-dome-lights",
    productNumber: 11,
    name: "Super Bright LED Interior Dome Lights",
    slug: "super-bright-led-interior-dome-lights",
    shortDescription: "Round LED dome-light panels for car interiors.",
    description: "Super bright LED interior dome lights — four round LED panels with adapters, for bright white cabin light. Plug-and-play with multi-function adapters.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 2500, // SAMPLE price — replace with real price
    price: 2500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/super-bright-led-interior-dome-lights-1.jpg", "/images/products/super-bright-led-interior-dome-lights-2.jpg"],
    features: ["4 round LED panels", "Bright white cabin light", "Adapters included"],
    specifications: {"Type": "Interior dome light", "Panels": "4 round"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["premium-auto-led-interior-light-kit"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "premium-auto-led-interior-light-kit",
    productNumber: 12,
    name: "Premium Auto LED Interior Light Kit",
    slug: "premium-auto-led-interior-light-kit",
    shortDescription: "Rectangular LED panels for car dome and roof lights.",
    description: "Premium auto LED interior light kit — two rectangular LED panels with festoon adapters, for dome and roof lights. Bright white cabin light, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 2800, // SAMPLE price — replace with real price
    price: 2800, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/premium-auto-led-interior-light-kit-1.jpg", "/images/products/premium-auto-led-interior-light-kit-2.jpg", "/images/products/premium-auto-led-interior-light-kit-3.jpg", "/images/products/premium-auto-led-interior-light-kit-4.jpg"],
    features: ["2 rectangular LED panels", "Festoon adapters included", "Bright white cabin light"],
    specifications: {"Type": "Interior light kit", "Panels": "2 rectangular"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["super-bright-led-interior-dome-lights"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "premium-t10-led-bulbs-ultra-bright",
    productNumber: 13,
    name: "Premium T10 LED Bulbs (Ultra-Bright)",
    slug: "premium-t10-led-bulbs-ultra-bright",
    shortDescription: "Premium ultra-bright T10 LED wedge bulbs, 12V.",
    description: "Premium T10 LED bulbs, ultra-bright — cylindrical wedge bulbs for parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1500, // SAMPLE price — replace with real price
    price: 1500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/premium-t10-led-bulbs-ultra-bright-1.jpg", "/images/products/premium-t10-led-bulbs-ultra-bright-2.jpg"],
    features: ["Ultra-bright", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["super-bright-t10-led-bulbs", "t10-led-bulbs-premium"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "t10-led-bulbs-premium",
    productNumber: 14,
    name: "T10 LED Bulbs (Premium Automotive Lighting)",
    slug: "t10-led-bulbs-premium",
    shortDescription: "Premium ultra-bright T10 LED bulbs for automotive lighting.",
    description: "T10 LED bulbs — premium automotive lighting, ultra bright. Longer wedge bulbs for parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1500, // SAMPLE price — replace with real price
    price: 1500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/t10-led-bulbs-premium-1.jpg", "/images/products/t10-led-bulbs-premium-2.jpg"],
    features: ["Ultra-bright", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["premium-t10-led-bulbs-ultra-bright", "premium-t10-led-canbus-bulbs-8000k"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "led-festoon-bulbs-31mm-21-led",
    productNumber: 15,
    name: "LED Festoon Bulbs 31mm 21-LED",
    slug: "led-festoon-bulbs-31mm-21-led",
    shortDescription: "31mm festoon LED bulbs, 21 LEDs per bulb.",
    description: "LED festoon bulbs — 31mm, 21 LEDs per bulb, super bright, high performance. For dome, map and boot lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1800, // SAMPLE price — replace with real price
    price: 1800, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/led-festoon-bulbs-31mm-21-led-1.jpg", "/images/products/led-festoon-bulbs-31mm-21-led-2.jpg"],
    features: ["21 LEDs per bulb", "31mm festoon", "Super bright", "12V"],
    specifications: {"Socket": "Festoon 31mm", "LEDs": "21 per bulb", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["premium-led-festoon-bulbs-cob"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "premium-led-festoon-bulbs-cob",
    productNumber: 16,
    name: "Premium LED Festoon Bulbs (COB)",
    slug: "premium-led-festoon-bulbs-cob",
    shortDescription: "Premium festoon LED bulbs with one large COB chip each.",
    description: "Premium LED festoon bulbs with a large COB chip — bright wide spread for dome and map lights. Double-ended festoon, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1800, // SAMPLE price — replace with real price
    price: 1800, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/premium-led-festoon-bulbs-cob-1.jpg", "/images/products/premium-led-festoon-bulbs-cob-2.jpg"],
    features: ["Large COB chip", "Wide bright spread", "Plug-and-play"],
    specifications: {"Socket": "Festoon", "Chip": "COB"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["led-festoon-bulbs-31mm-21-led"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "premium-t10-led-canbus-bulbs-8000k",
    productNumber: 17,
    name: "Premium T10 LED Canbus Bulbs (8000K)",
    slug: "premium-t10-led-canbus-bulbs-8000k",
    shortDescription: "Canbus error-free T10 LED bulbs, 8000K.",
    description: "Premium T10 LED canbus bulbs, 8000K — error-free on canbus cars, no dashboard warning. For parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 2200, // SAMPLE price — replace with real price
    price: 2200, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/premium-t10-led-canbus-bulbs-8000k-1.jpg", "/images/products/premium-t10-led-canbus-bulbs-8000k-2.jpg"],
    features: ["Canbus error-free", "8000K", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Colour Temperature": "8000K", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["t10-led-bulbs-premium", "premium-t10-led-bulbs-ultra-bright-ceramic"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "premium-t10-led-bulbs-ultra-bright-ceramic",
    productNumber: 18,
    name: "Premium T10 LED Bulbs (Ultra Bright, Ceramic)",
    slug: "premium-t10-led-bulbs-ultra-bright-ceramic",
    shortDescription: "Premium ultra-bright T10 LED bulbs with a white ceramic body.",
    description: "Premium T10 LED bulbs, ultra bright — white ceramic body with two yellow chips each. For parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1500, // SAMPLE price — replace with real price
    price: 1500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/premium-t10-led-bulbs-ultra-bright-ceramic-1.jpg", "/images/products/premium-t10-led-bulbs-ultra-bright-ceramic-2.jpg"],
    features: ["Ultra-bright", "White ceramic body", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["premium-t10-led-canbus-bulbs-8000k", "t10-led-bulbs-super-bright"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "t10-led-bulbs-super-bright",
    productNumber: 19,
    name: "T10 LED Bulbs (Super Bright)",
    slug: "t10-led-bulbs-super-bright",
    shortDescription: "Super bright T10 LED bulbs, 12V.",
    description: "T10 LED bulbs, super bright — flat-board wedge bulbs for parking, interior and number-plate lights. 12V, plug-and-play.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1200, // SAMPLE price — replace with real price
    price: 1200, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/t10-led-bulbs-super-bright-1.jpg", "/images/products/t10-led-bulbs-super-bright-2.jpg"],
    features: ["Super bright", "12V", "Plug-and-play"],
    specifications: {"Socket": "T10", "Voltage": "12V"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["super-bright-t10-led-bulbs", "premium-t10-led-bulbs-ultra-bright-ceramic"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "led-headlight-auto-intelligent-system-v150",
    productNumber: 20,
    name: "LED Headlight Auto Intelligent System (V-150)",
    slug: "led-headlight-auto-intelligent-system-v150",
    shortDescription: "V-150 high-power LED headlight kit with external drivers.",
    description: "LED headlight auto intelligent system (V-150) — H4 LED headlight bulbs with gold trim ring, fan base and external drivers. Plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 18500, // SAMPLE price — replace with real price
    price: 18500, // SAMPLE price — replace with real price
    inStock: true,
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/led-headlight-auto-intelligent-system-v150-1.jpg", "/images/products/led-headlight-auto-intelligent-system-v150-2.jpg", "/images/products/led-headlight-auto-intelligent-system-v150-3.jpg", "/images/products/led-headlight-auto-intelligent-system-v150-4.jpg"],
    features: ["External drivers", "Fan-cooled", "Plug-and-play"],
    specifications: {"Socket": "H4", "Driver": "V-150 High Power"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "lenso-led-headlight-bulbs",
    productNumber: 21,
    name: "LENSO LED Headlight Bulbs (3000W Performance)",
    slug: "lenso-led-headlight-bulbs",
    shortDescription: "LENSO performance-upgrade LED headlight bulbs.",
    description: "LENSO LED headlight bulbs — 3000W performance upgrades line, red fan-base bulbs with external drivers. LENSO is an established Pakistani-market LED brand.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 18500, // SAMPLE price — replace with real price
    price: 18500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "LENSO",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/lenso-led-headlight-bulbs-1.jpg", "/images/products/lenso-led-headlight-bulbs-2.jpg", "/images/products/lenso-led-headlight-bulbs-3.jpg", "/images/products/lenso-led-headlight-bulbs-4.jpg"],
    features: ["Performance upgrades line", "Fan-cooled", "External drivers"],
    specifications: {"Socket": "H4", "Brand": "LENSO"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "sh-pro-two-colour-led-headlight",
    productNumber: 22,
    name: "SH Pro Two-Colour LED Headlight",
    slug: "sh-pro-two-colour-led-headlight",
    shortDescription: "One light, two colours — white + warm yellow, 2-year warranty.",
    description: "SH Pro two-colour LED headlight — one light, two colours (bright white + warm yellow, switchable). H4 / 9005 / H11 compatible, 600W, 2-year warranty.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 8500, // SAMPLE price — replace with real price
    price: 8500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "SH Pro",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/sh-pro-two-colour-led-headlight-1.jpg", "/images/products/sh-pro-two-colour-led-headlight-2.jpg", "/images/products/sh-pro-two-colour-led-headlight-3.jpg", "/images/products/sh-pro-two-colour-led-headlight-4.jpg"],
    features: ["Two colours: white + warm yellow", "600W", "2-year warranty", "H4 / 9005 / H11"],
    specifications: {"Socket": "H4 / 9005 / H11", "Power": "600W", "Warranty": "2 years"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "rego-racing-copper-led-headlights-6500k",
    productNumber: 23,
    name: "REGO Racing LED Headlights (Copper, 6500K)",
    slug: "rego-racing-copper-led-headlights-6500k",
    shortDescription: "REGO Racing copper LED headlights, 6500K, perfect light angle.",
    description: "REGO Racing copper LED headlights — copper bulbs and drivers, 6500K white, perfect light angle. H4 / H11 / 9005 fitments, plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 19500, // SAMPLE price — replace with real price
    price: 19500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "REGO Racing",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/rego-racing-copper-led-headlights-6500k-1.jpg", "/images/products/rego-racing-copper-led-headlights-6500k-2.jpg", "/images/products/rego-racing-copper-led-headlights-6500k-3.jpg", "/images/products/rego-racing-copper-led-headlights-6500k-4.jpg", "/images/products/rego-racing-copper-led-headlights-6500k-5.jpg"],
    features: ["Copper body", "6500K white light", "Perfect light angle", "H4 / H11 / 9005"],
    specifications: {"Socket": "H4 / H11 / 9005", "Colour Temperature": "6500K"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["rego-racing-h4-led-headlights", "rego-4-copper-h4-golden-box"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "mother-6-copper-led-headlights",
    productNumber: 24,
    name: "Mother 6 Copper LED Headlights (Professional)",
    slug: "mother-6-copper-led-headlights",
    shortDescription: "Mother 6-copper LED headlights, gold professional edition.",
    description: "Mother 6-copper LED headlights, professional edition — gold copper bulbs with gold drivers, high-range brightness, 6500K. Plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 24500, // OLD real price from old catalog (same product)
    price: 24500, // OLD real price from old catalog (same product)
    originalPrice: 27900, // OLD real price from old catalog (same product)
    inStock: true,
    brand: "MOTHER",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/mother-6-copper-led-headlights-1.jpg", "/images/products/mother-6-copper-led-headlights-2.jpg", "/images/products/mother-6-copper-led-headlights-3.jpg", "/images/products/mother-6-copper-led-headlights-4.jpg", "/images/products/mother-6-copper-led-headlights-5.jpg"],
    features: ["6 copper tubes", "6500K white light", "High-range brightness", "Professional edition"],
    specifications: {"Socket": "H4", "Colour Temperature": "6500K"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["mother-led-headlights-green"],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "b-pro-8-copper-led-headlights",
    productNumber: 25,
    name: "B PRO LED Headlights (8 Copper, Super Focusing)",
    slug: "b-pro-8-copper-led-headlights",
    shortDescription: "B PRO 8-copper LED headlights, high power super focusing.",
    description: "B PRO LED headlights — 8-copper, high power super focusing. Black bulbs with copper chips and black drivers. Plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 22800, // OLD real price from old catalog (same product)
    price: 22800, // OLD real price from old catalog (same product)
    originalPrice: 25900, // OLD real price from old catalog (same product)
    inStock: true,
    brand: "B PRO",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/b-pro-8-copper-led-headlights-1.jpg", "/images/products/b-pro-8-copper-led-headlights-2.jpg", "/images/products/b-pro-8-copper-led-headlights-3.jpg", "/images/products/b-pro-8-copper-led-headlights-4.jpg", "/images/products/b-pro-8-copper-led-headlights-5.jpg", "/images/products/b-pro-8-copper-led-headlights-6.jpg"],
    features: ["8 copper tubes", "Super focusing", "High power"],
    specifications: {"Socket": "H4"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: [],
    warranty: "1-Year Replacement Warranty",
  },
  {
    id: "mother-led-headlights-green",
    productNumber: 26,
    name: "Mother LED Headlights (Green)",
    slug: "mother-led-headlights-green",
    shortDescription: "Mother green-edition LED headlights, 7500W drivers.",
    description: "Mother LED headlights, green edition — green anodised fan-base bulbs with black drivers printed 'MOTHER 7500 watt'. Plug-and-play.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 23500, // SAMPLE price — replace with real price
    price: 23500, // SAMPLE price — replace with real price
    inStock: true,
    brand: "MOTHER",
    rating: 0,
    reviewCount: 0,
    images: ["/images/products/mother-led-headlights-green-1.jpg", "/images/products/mother-led-headlights-green-2.jpg", "/images/products/mother-led-headlights-green-3.jpg", "/images/products/mother-led-headlights-green-4.jpg", "/images/products/mother-led-headlights-green-5.jpg", "/images/products/mother-led-headlights-green-6.jpg", "/images/products/mother-led-headlights-green-7.jpg"],
    features: ["Green anodised body", "Fan-cooled", "7500W drivers"],
    specifications: {"Socket": "H4", "Driver": "MOTHER 7500 watt"},
    vehicleCompatibility: { universal: true },
    relatedSlugs: ["mother-6-copper-led-headlights"],
    warranty: "1-Year Replacement Warranty",
  },
];

// NOTE (2026-11-16): the 21 old products were removed on the owner's order.
// The 26 new products (real images from the "All Pictures" Drive folder) were
// added 2026-11-16 with SAMPLE prices — 8 reuse real old-catalog prices, 18 are
// samples (sumair: "prices sample daldo filhal"). Replace with real prices
// from the client. Do NOT re-add the old products.

// Active products & categories exported for components & SEO
export const ACTIVE_PRODUCTS_DATA = PRODUCTS_DATA.filter((p) => !p.hidden);
export const ACTIVE_CATEGORIES_DATA = CATEGORIES_DATA.filter((c) => !c.hidden);

// TOP COLLECTIONS (2026-11-16, sumair): the 15 light-type collections from the
// homepage, now also the shop's categories. Each collection lists the product
// slugs that belong to it — explicit, never guessed. A dual-beam H4 kit
// belongs to both Low Beam and High Beam (that is what dual-beam means).
// Collections with no products yet stay empty and show "Coming soon".
export interface CollectionInfo {
  id: string;
  name: string;
}

export const COLLECTIONS_LIST: CollectionInfo[] = [
  { id: "car-perfumes", name: "Car Perfumes" },
  { id: "ambient-lights", name: "Ambient Lights" },
  { id: "auxpods", name: "Pods - Auxiliary Lighting" },
  { id: "low-beam", name: "Low Beam" },
  { id: "high-beam", name: "High Beam" },
  { id: "fog-lights", name: "Fog Lights" },
  { id: "parking-lights", name: "Parking Lights" },
  { id: "cabin-lights", name: "Cabin Lights" },
  { id: "turn-signal", name: "Turn Signal" },
  { id: "dynamic-side-mirrors", name: "Dynamic Side Mirrors" },
  { id: "license-plate", name: "License Plate" },
  { id: "brake-lights", name: "Brake Lights" },
  { id: "fender-lights", name: "Fender Lights" },
  { id: "reverse-lights", name: "Reverse Lights" },
  { id: "motorcycle-leds", name: "Motorcycle Leds" },
];

export const COLLECTION_PRODUCT_SLUGS: Record<string, string[]> = {
  "car-perfumes": [],
  "ambient-lights": ["super-bright-led-interior-dome-lights", "premium-auto-led-interior-light-kit"],
  "auxpods": ["4x4-led-off-road-light-bar-4-lens", "led-off-road-light-bar-5-lens"],
  "low-beam": [
    "h11-mini-projector-lens-led",
    "sh-pro-two-colour-led-headlight",
    "ktm-ai-led-headlight",
    "rego-racing-h4-led-headlights",
    "y6-h4-mini-projector-lens",
    "rego-4-copper-h4-golden-box",
    "copper-led-headlights-h4-wooden-box",
    "led-headlight-auto-intelligent-system-v150",
    "lenso-led-headlight-bulbs",
    "rego-racing-copper-led-headlights-6500k",
    "mother-6-copper-led-headlights",
    "b-pro-8-copper-led-headlights",
    "mother-led-headlights-green",
  ],
  "high-beam": [
    "sh-pro-two-colour-led-headlight",
    "ktm-ai-led-headlight",
    "rego-racing-h4-led-headlights",
    "y6-h4-mini-projector-lens",
    "rego-4-copper-h4-golden-box",
    "copper-led-headlights-h4-wooden-box",
    "led-headlight-auto-intelligent-system-v150",
    "lenso-led-headlight-bulbs",
    "rego-racing-copper-led-headlights-6500k",
    "mother-6-copper-led-headlights",
    "b-pro-8-copper-led-headlights",
    "mother-led-headlights-green",
  ],
  "fog-lights": ["4x4-led-off-road-light-bar-4-lens", "led-off-road-light-bar-5-lens"],
  "parking-lights": [
    "super-bright-t10-led-bulbs",
    "premium-t10-led-bulbs-ultra-bright",
    "t10-led-bulbs-premium",
    "premium-t10-led-canbus-bulbs-8000k",
    "premium-t10-led-bulbs-ultra-bright-ceramic",
    "t10-led-bulbs-super-bright",
  ],
  "cabin-lights": [
    "super-bright-led-interior-dome-lights",
    "premium-auto-led-interior-light-kit",
    "led-festoon-bulbs-31mm-21-led",
    "premium-led-festoon-bulbs-cob",
  ],
  "turn-signal": [],
  "dynamic-side-mirrors": [],
  "license-plate": [],
  "brake-lights": [],
  "fender-lights": [],
  "reverse-lights": [],
  "motorcycle-leds": ["rego-motorcycle-led-headlight"],
};

/** Live products in a collection (slugs that no longer exist are ignored). */
export const collectionProducts = (collectionId: string): Product[] => {
  const slugs = COLLECTION_PRODUCT_SLUGS[collectionId] ?? [];
  return ACTIVE_PRODUCTS_DATA.filter((p) => slugs.includes(p.slug));
};

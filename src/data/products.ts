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
    description: `Smart Lighting at Your Fingertips! Control Brightness & Color Temperatures Directly from Your Smartphone.

Step into the future of automotive lighting with the KTM Ai Smart LED Headlight Kit. Designed for drivers who want total control over their road visibility in all weather conditions, these intelligent bulbs connect seamlessly to your smartphone (iOS & Android) via Bluetooth. Switch effortlessly between crisp white light for clear highway nights and warm yellow tones for heavy fog and rain — all with a single tap on the mobile app.

Key Features & Smart Technology:
- Smart Bluetooth App Control (iOS & Android): Scan the QR code to download the dedicated app and customize lighting modes, brightness levels, and color temperatures right from your phone.
- All-Weather Multi-Color Dimming: Adapt instantly to changing weather — use 6000K–6500K Pure White for maximum clarity on dark roads, or switch to 3000K–4300K Warm Yellow to cut through thick winter fog, smog, and rain.
- High-Intensity Automotive LED Chips: Engineered with precision-aligned CSP chips that produce a dense, wide beam pattern with zero dark spots.
- Turbo Finned Aluminum Cooling System: Heavy-duty aviation aluminum heatsink with radial cooling fins and a high-speed silent fan prevents overheating and maximizes bulb lifespan.
- External Intelligent CANBUS Driver: Comes with an external metallic control driver and braided cables to guarantee stable power, zero flickering, and error-free compatibility on modern vehicles.
- Universal Socket Options Available: Available in multiple base types (H4, H7, H11, 9005/HB3, 9006/HB4) for a direct plug-and-play installation.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 7500,
    price: 7500,
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
    description: `Built for Performance! Extreme Long-Range Brightness, Heavy-Duty Cooling, and Rugged Braided Durability.

Unleash maximum road visibility on dark highways and city streets with the REGO Racing H4 LED Headlight Kit. Engineered for drivers who demand racing-grade reliability and intense illumination, these dual-beam bulbs feature elongated high-output LED strips on both sides for a wide, penetrating 6000K–6500K Crystal White beam. Housed in a rugged gunmetal aluminum body with heavy-duty braided cables and external control drivers, this kit is built to handle Pakistan's toughest road and weather conditions.

Key Features & Engineering:
- High-Intensity Dual-Sided LED Chips: Precision-placed high-output LED strips deliver a sharp, focused High and Low beam pattern with zero dark spots.
- Gunmetal Finned Aluminum Heatsink & Turbo Fan: Thick radial cooling fins paired with a high-speed silent fan rapidly dissipate heat, ensuring consistent brightness on long night drives.
- External Metal Control Drivers: Dedicated metallic driver boxes regulate voltage fluctuations, preventing flickering and protecting the LED chips.
- Heavy-Duty Braided Wiring Harness: Wrapped in a tough black-and-yellow woven sleeve to resist engine bay heat, abrasion, and moisture.
- True Plug-and-Play 3-Pin H4 Connector: Direct OEM 3-pin H4 plug design allows quick, hassle-free installation with zero wire cutting.
- Protective Hard Carrying Case: Comes packed in a durable black hard case with foam cushioning for safe storage and guaranteed genuine quality.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 8500,
    price: 8500,
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
    description: `The Best-Selling H4 Mini Projector! Unbeatable Low-Beam Cut-Off & Long-Range High-Beam Power.

Experience a massive upgrade in night-driving clarity without opening or modifying your headlight housing! The Y6 H4 Mini LED Projector Lens Kit is engineered specifically for H4 reflector headlights, combining a precision optical glass projector lens for the low beam with high-intensity LED chips for a powerful, far-reaching high beam. Say goodbye to scattered light and dark spots — drive with a crisp, luxury-car beam pattern that keeps the road bright and oncoming drivers glare-free.

Key Features & Engineering:
- Built-In Optical Mini Projector Lens (Low Beam): Delivers a clean, wide, and razor-sharp Z-shaped/flat cut-off line that illuminates the road evenly without blinding oncoming traffic.
- Dedicated High-Beam Reflector & LED Chips: Switches instantly to a super-bright, long-throw high beam for dark highways and motorways.
- High-Power Automotive LED Chips: Produces intense 6000K Crystal White light that cuts through darkness and improves sign visibility.
- Aviation Aluminum Heatsink & Turbo Cooling: Heavy-duty black anodized finned aluminum body with a built-in silent cooling fan ensures rapid heat dissipation and long-lasting reliability.
- External Intelligent Driver & 3-Pin H4 Plug: Equipped with an external current-stabilizing driver box and direct 3-pin H4 connector for true Plug-and-Play installation — zero wire cutting required.
- Left-Hand Drive (LHD) / Right-Hand Drive (RHD) Precision: Engineered specifically for standard H4 reflector bowls with an adjustable locking collar for perfect beam alignment.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 8000,
    price: 8000,
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
    description: `Projector-Grade Precision Without the Hassle! Crisp Cut-Off Line, Zero Glare, and 80% Upgraded Brightness.

Transform your car's standard reflector headlights into a high-end projector setup in minutes! The H11 Single Beam Mini Projector Lens LED Kit is engineered with a built-in optical convex lens that focuses light directly onto the road ahead. Unlike regular LED bulbs that scatter light in reflector housings, this mini projector delivers a razor-sharp horizontal cut-off line — giving you maximum visibility at night without blinding oncoming drivers.

Key Features & Specifications:
- Built-In Mini Projector Lens: Precision optical glass lens creates a wide, uniform, and focused beam pattern with zero dark spots.
- 6x High-Brightness CSP LED Chips: Equipped with 6 premium automotive-grade CSP chips per bulb, delivering up to 80% upgraded brightness over standard halogen bulbs.
- Anti-Glare Sharp Cut-Off Line: Engineered specifically for reflector headlights and fog lamps to keep light strictly on the road and out of oncoming drivers' eyes.
- Smart Kit External Driver & Braided Cables: Features an intelligent external control box ("Smart Kit") paired with heat-resistant braided wiring for stable voltage, instant start-up, and flicker-free performance.
- Aviation-Grade Aluminum Heatsink: Finned aluminum body with a built-in turbo cooling system rapidly dissipates heat for long-lasting durability.
- True Plug-and-Play H11 Fitment: Compact mini-lens design fits directly into standard H11/H8/H9 sockets without needing to open or modify your headlight housing.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 7500,
    price: 7500,
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
    description: `Unrivaled Quad-Copper Cooling & Racing-Grade Brilliance in an Exclusive Golden Metal Box!

Command the road at night with the flagship REGO Racing 4-Copper Pipe H4 LED Headlight Kit, presented in a signature Golden Metal Tin Box. Engineered for drivers who want maximum lumen output without overheating or dimming on long journeys, these bulbs feature four vacuum-sealed copper heat pipes paired with a gold-anodized turbo cooling body. Delivering a razor-sharp, ultra-bright 6000K–6500K Crystal White beam, they turn pitch-black highways into crystal-clear driving lanes.

Key Features & Engineering:
- 4x Quad-Copper Heat Dissipation Pipes: Four pure copper thermal tubes rapidly pull heat away from the high-power LED chips, maintaining 100% peak brightness even during hours of continuous night driving.
- Gold-Anodized Aluminum Heatsink & Turbo Fan: Precision-milled golden cooling fins combined with a high-speed silent turbo fan ensure superior thermal management and extended bulb lifespan.
- High-Intensity Dual-Beam LED Chips (H4): Produces a wide, focused Low Beam with a clean cut-off and an ultra-long-throw High Beam for dark motorways.
- External Golden CANBUS Control Driver: Dedicated metallic driver box stabilizes voltage fluctuations, prevents dashboard error codes, and eliminates flickering.
- Heavy-Duty Red & Black Braided Wiring: Heat-resistant woven cable sleeve protects against engine bay heat, vibration, and moisture.
- True Plug-and-Play 3-Pin H4 Fitment: Direct OEM 3-pin H4 connector allows fast, damage-free installation with zero wire cutting.
- Signature Golden Metal Storage Box: Packed in an embossed, foam-lined golden collector's box guaranteeing authentic REGO Racing quality.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 13500,
    price: 13500,
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
    description: `Turn Night into Day! Experience Unmatched Brightness, Zero Overheating, and Luxury Craftsmanship.

Upgrade your driving safety and give your car a bold, modern look with our flagship Quad-Copper Pipe LED Headlight Kit presented in an exclusive Luxury Wooden Gift Box. Engineered for automotive enthusiasts who refuse to compromise on visibility, these bulbs deliver a razor-sharp, pure white beam that cuts through pitch-black roads, rain, and fog without blinding oncoming traffic.

Key Features & Engineering:
- 4x Vacuum Copper Heat Pipes: Built with advanced quad-copper heat-conducting tubes that instantly pull heat away from the high-power LED chips, ensuring consistent maximum brightness without dimming.
- Heavy-Duty Zinc Alloy Body: Precision-crafted zinc alloy housing offers superior durability, shock resistance, and sleek metallic aesthetics.
- High-Speed Aluminum Turbo Fan: Integrated silent aluminum cooling fan works alongside the copper pipes to maintain optimal operating temperatures even on long highway drives.
- Intelligent External CANBUS Driver: Comes with a dedicated metallic control box to ensure stable current, zero flickering, and error-free installation on modern vehicles.
- Focused Beam Pattern (H4 Dual-Beam Design): Features precision-aligned high-intensity LED chips that replicate halogen filament positioning for a clean cut-off line and wide road coverage.
- 1-Year Hassle-Free Replacement Warranty: Buy with complete peace of mind — backed by Hasnain Auto Decoration Accessories with a full 1-year replacement guarantee.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 15500,
    price: 15500,
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
    description: `Product Overview:
Upgrade your vehicle's visibility, safety, and aggressive off-road look with the 4-Lens LED Projector Light Bar from Hasnain Auto. Engineered for extreme performance, this auxiliary light bar features advanced quad-projector lenses that concentrate light into a powerful, razor-sharp beam — ensuring maximum road coverage without blinding oncoming traffic. Whether you are driving through dense fog, heavy rain, or dark off-road trails, this multi-mode light guarantees crystal-clear vision.

Key Features & 4-in-1 Lighting Modes:
Adapt instantly to any weather or driving condition with four versatile built-in light modes:
- Pure White Light (6000K): Delivers a crisp, ultra-bright beam for standard night driving and clear highways.
- Golden Yellow Light (3000K): Cuts effortlessly through heavy fog, dust storms, and downpours, offering superior penetration and reducing glare.
- Yellow & White Mix (Dual Beam): Combines both colors to give you maximum brightness and wide peripheral road coverage.
- Strobe / Flicker Mode: Perfect for emergency situations, foggy conditions, or off-road group convoys to make your vehicle instantly visible.

Product Specifications & Build Quality:
- Quad-Projector Lens Technology: Features 4 high-intensity magnifying lenses that maximize light output and prevent scattering.
- Universal Fitment: Designed with a flexible mounting system to fit effortlessly on the front bumper, grille, or bull bar of almost any car, SUV, 4x4 (Hilux, Revo, Prado, Land Cruiser), or pickup truck.
- Rugged All-Weather Build: Built with a heavy-duty, die-cast aluminum housing that provides exceptional heat dissipation, waterproofing, and durability against rough terrains.
- Energy Efficient: High illumination output with low power consumption, ensuring zero strain on your vehicle's battery.

What's in the Box?
- 2x 4-Lens LED Projector Light Bars (Left & Right Pair)
- Complete Heavy-Duty Mounting Brackets & Fitting Hardware (Nuts/Bolts)

Why Shop From Hasnain Auto?
- 100% Quality Assurance: Rigorously tested for durability and performance.
- Professional Installation Available: Physical fitting services available at our Saddar, Rawalpindi showroom.
- Hassle-Free Shopping: Enjoy Cash on Delivery (COD) right at your doorstep across Pakistan.`,
    category: "led-lights",
    subcategory: "Fog Lights",
    basePrice: 4000,
    price: 4000,
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
    basePrice: 4500,
    price: 4500,
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
    description: `Compact Size, Massive Output! Dual-Color White & Yellow Projector Beam for Bikes, Cars & Off-Road Rides.

Ride safely through pitch-black roads, heavy fog, and rain with the REGO Super Bright Motorcycle LED Mini Driving Lights. Engineered with high-precision optical projector lenses inside a rugged red-and-black aluminum casing, these compact auxiliary pods deliver an intense, focused beam pattern without blinding oncoming traffic. Featuring dual-color technology, you can switch seamlessly between crisp 6000K White for clear night cruising and 3000K Golden Yellow for cutting through thick winter fog, smog, and rain.

Key Features & Specifications:
- Dual-Color Beam Mode (White & Yellow): Instant switching between pure white light (high visibility on dark roads) and warm yellow light (all-weather fog and rain penetration).
- High-Brightness Projector Lens: Optical convex lens focuses 2000LM–3000LM of light into a sharp, wide beam with zero dark spots.
- Wide Voltage Compatibility (12V–80V DC): Works reliably on almost all motorcycles (70cc, 125cc, 150cc, heavy bikes), cars, rickshaws, and e-bikes without burning out.
- 20W–25W Efficient Power Output: Delivers maximum illumination while drawing low current, keeping your bike's battery and wiring completely safe.
- Rugged Waterproof Aluminum Housing: Heavy-duty die-cast aluminum body with red anodized accents resists water, dust, mud, and road vibrations.
- Adjustable Mounting Brackets Included: Comes with sturdy metal brackets and bolts for easy installation on handlebars, crash guards, front forks, or car bumpers.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 2500,
    price: 2500,
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
    description: `Small Bulb, Massive Upgrade! Crisp 6000K White Glow for Parking Lights, Cabin, Trunk & License Plates.

Replace dull, yellowish factory bulbs with the Super Bright T10 High-Power LED Bulbs. Encased in a clear, heat-resistant silicone gel body for shock and moisture protection, these compact wedge bulbs feature multiple high-intensity SMD LED chips arranged for 360-degree uniform lighting. Whether used as front parking/pilot lights, interior map/dome lights, trunk lights, or rear license plate lights, they instantly give your vehicle a clean, modern luxury look.

Key Features & Specifications:
- High-Power Multi-SMD LED Chips: Delivers intense, crisp 6000K Crystal White brightness that is up to 3x brighter than standard halogen T10 bulbs.
- Protective Silicone Gel Coating: Transparent waterproof and shockproof encapsulation protects the LED chips from moisture, dust, and engine heat.
- Universal T10 Wedge Fitment (W5W / 194 / 168): Fits almost all cars and motorcycles in parking lights, speedometers, door courtesy lights, cabin/map lights, trunk lights, and number plate housings.
- Energy Saving & Low Heat: Draws minimal 12V DC power, preventing battery drain and avoiding melting of plastic light covers.
- Easy Plug-and-Play Installation: Simply pull out the old glass bulb and push in the T10 LED—zero wiring or modification needed.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1000,
    price: 1000,
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
    description: `Flood Your Car Cabin with Daylight! Ultra-Wide Multi-Segment Illumination for Roof, Map & Trunk Lights.

Say goodbye to dim, single-bulb cabin lighting and transform your car's interior with the Super Bright Multi-Segment LED Interior Panel Light. Featuring an innovative 4-circle clover-style LED array, this high-power panel packs dozens of bright white LED chips into a sleek, low-profile board that illuminates every corner of your cabin. Whether you are reading, searching for items at night, or lighting up your boot/trunk, it delivers clean, wide-angle 6000K Crystal White brightness with universal plug-and-play compatibility.

Key Features & Specifications:
- High-Power Multi-Segment LED Design: Four interconnected circular LED clusters deliver maximum, shadow-free brightness across the entire cabin.
- Universal Fitment: Designed to fit seamlessly inside almost all car roof/dome light housings, map/reading lights, and trunk/luggage compartments.
- Plug-and-Play Connector Wiring: Equipped with pre-attached red-and-black extension leads and universal pin connectors for quick, solder-free installation.
- Easy Peel-and-Stick Backing: Slim, lightweight board easily mounts inside any light cover without rattling or loose connections.
- Energy Efficient & Long Lifespan: Operates on standard 12V DC power with ultra-low heat generation and extended durability.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 650,
    price: 650,
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
    basePrice: 650,
    price: 650,
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
    description: `Crisp, High-Output White Brilliance! Upgrade Dull Factory Bulbs to Modern 12V LED Illumination in Seconds.

Elevate your vehicle's exterior and interior styling with the Premium T10 W5W Ultra-Bright LED Bulbs. Encased in a crystal-clear, heat-resistant silicone sleeve for superior shock and moisture protection, these compact wedge bulbs feature high-intensity SMD LED chips arranged on all sides for true 360-degree uniform light distribution. Ideal for front parking/pilot lights, license plate lights, cabin map lights, door courtesy lights, and trunk compartments, they deliver a clean, modern 6000K Crystal White glow on standard 12V automotive systems.

Key Features & Specifications:
- Ultra-Bright Multi-SMD Array: Delivers intense, crisp 6000K Crystal White illumination with zero dark spots, outshining standard halogen T10 bulbs.
- Protective Clear Silicone Encapsulation: Fully sealed against water, humidity, dust, and road vibrations while resisting engine bay heat.
- Universal T10 / W5W Fitment (194 / 168): Direct replacement for standard 12V wedge sockets across cars and motorcycles, including parking lights, number plate lights, speedometer clusters, and interior dome/map housings.
- Low Power Draw & Cool Operation: Consumes minimal 12V DC current to protect your battery and prevent melting or yellowing of plastic light lenses.
- Instant Plug-and-Play Installation: Simple direct-fit base allows effortless installation in seconds with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1000,
    price: 1000,
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
    description: `Crisp, High-Output White Brilliance! Upgrade Dull Factory Bulbs to Modern 12V LED Illumination in Seconds.

Elevate your vehicle's exterior and interior styling with the Premium T10 W5W Ultra-Bright LED Bulbs. Encased in a crystal-clear, heat-resistant silicone sleeve for superior shock and moisture protection, these compact wedge bulbs feature high-intensity SMD LED chips arranged on all sides for true 360-degree uniform light distribution. Ideal for front parking/pilot lights, license plate lights, cabin map lights, door courtesy lights, and trunk compartments, they deliver a clean, modern 6000K Crystal White glow on standard 12V automotive systems.

Key Features & Specifications:
- Ultra-Bright Multi-SMD Array: Delivers intense, crisp 6000K Crystal White illumination with zero dark spots, outshining standard halogen T10 bulbs.
- Protective Clear Silicone Encapsulation: Fully sealed against water, humidity, dust, and road vibrations while resisting engine bay heat.
- Universal T10 / W5W Fitment (194 / 168): Direct replacement for standard 12V wedge sockets across cars and motorcycles, including parking lights, number plate lights, speedometer clusters, and interior dome/map housings.
- Low Power Draw & Cool Operation: Consumes minimal 12V DC current to protect your battery and prevent melting or yellowing of plastic light lenses.
- Instant Plug-and-Play Installation: Simple direct-fit base allows effortless installation in seconds with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1000,
    price: 1000,
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
    description: `Upgrade Dull Yellow Cabin Lights to Crisp, Luxury White Brilliance!

Give your car's interior a clean, modern, and luxury feel with the 31MM-21LED Premium Series Festoon Bulb. Designed to replace dim, factory-installed yellowish halogen bulbs, this compact powerhouse packs 21 high-intensity SMD LED chips into a standard 31mm frame. Whether you are looking for something in your cabin at night, lighting up your trunk, or illuminating your license plate, it delivers bright, uniform, crystal-white illumination without draining your car's battery.

Key Features & Specifications:
- 21x High-Brightness SMD LED Chips: Engineered with a dense 3x7 LED array that provides 300% brighter, wider, and shadow-free illumination compared to stock bulbs.
- Standard 31mm Festoon Fitment (DE3175 / DE3022): Universal 31mm length fits directly into most car dome lights, map/reading lights, door courtesy lights, trunk/boot lights, and license plate housings.
- Gold-Plated Conductive Terminals: Precision-crafted metallic end caps ensure a tight, rust-free connection with zero flickering over bumpy roads.
- Built-In Aluminum Heat Dissipation: Features an integrated metallic heatsink backing to prevent overheating and ensure a long, reliable lifespan.
- Energy Efficient & Low Power Draw: Operates on standard 12V DC automotive power while consuming minimal energy and generating very low heat.
- Instant Plug-and-Play Installation: No wiring or modification required — simply remove your old bulb and snap this LED into place in seconds.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 850,
    price: 850,
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
    description: `Upgrade Dull Yellow Cabin Lights to Crisp, Luxury White Brilliance!

Give your car's interior a clean, modern, and luxury feel with the 31MM-21LED Premium Series Festoon Bulb. Designed to replace dim, factory-installed yellowish halogen bulbs, this compact powerhouse packs 21 high-intensity SMD LED chips into a standard 31mm frame. Whether you are looking for something in your cabin at night, lighting up your trunk, or illuminating your license plate, it delivers bright, uniform, crystal-white illumination without draining your car's battery.

Key Features & Specifications:
- 21x High-Brightness SMD LED Chips: Engineered with a dense 3x7 LED array that provides 300% brighter, wider, and shadow-free illumination compared to stock bulbs.
- Standard 31mm Festoon Fitment (DE3175 / DE3022): Universal 31mm length fits directly into most car dome lights, map/reading lights, door courtesy lights, trunk/boot lights, and license plate housings.
- Gold-Plated Conductive Terminals: Precision-crafted metallic end caps ensure a tight, rust-free connection with zero flickering over bumpy roads.
- Built-In Aluminum Heat Dissipation: Features an integrated metallic heatsink backing to prevent overheating and ensure a long, reliable lifespan.
- Energy Efficient & Low Power Draw: Operates on standard 12V DC automotive power while consuming minimal energy and generating very low heat.
- Instant Plug-and-Play Installation: No wiring or modification required — simply remove your old bulb and snap this LED into place in seconds.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 850,
    price: 850,
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
    description: `Crisp, High-Output White Brilliance! Upgrade Dull Factory Bulbs to Modern 12V LED Illumination in Seconds.

Elevate your vehicle's exterior and interior styling with the Premium T10 W5W Ultra-Bright LED Bulbs. Encased in a crystal-clear, heat-resistant silicone sleeve for superior shock and moisture protection, these compact wedge bulbs feature high-intensity SMD LED chips arranged on all sides for true 360-degree uniform light distribution. Ideal for front parking/pilot lights, license plate lights, cabin map lights, door courtesy lights, and trunk compartments, they deliver a clean, modern 6000K Crystal White glow on standard 12V automotive systems.

Key Features & Specifications:
- Ultra-Bright Multi-SMD Array: Delivers intense, crisp 6000K Crystal White illumination with zero dark spots, outshining standard halogen T10 bulbs.
- Protective Clear Silicone Encapsulation: Fully sealed against water, humidity, dust, and road vibrations while resisting engine bay heat.
- Universal T10 / W5W Fitment (194 / 168): Direct replacement for standard 12V wedge sockets across cars and motorcycles, including parking lights, number plate lights, speedometer clusters, and interior dome/map housings.
- Low Power Draw & Cool Operation: Consumes minimal 12V DC current to protect your battery and prevent melting or yellowing of plastic light lenses.
- Instant Plug-and-Play Installation: Simple direct-fit base allows effortless installation in seconds with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1250,
    price: 1250,
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
    description: `Crisp, High-Output White Brilliance! Upgrade Dull Factory Bulbs to Modern 12V LED Illumination in Seconds.

Elevate your vehicle's exterior and interior styling with the Premium T10 W5W Ultra-Bright LED Bulbs. Encased in a crystal-clear, heat-resistant silicone sleeve for superior shock and moisture protection, these compact wedge bulbs feature high-intensity SMD LED chips arranged on all sides for true 360-degree uniform light distribution. Ideal for front parking/pilot lights, license plate lights, cabin map lights, door courtesy lights, and trunk compartments, they deliver a clean, modern 6000K Crystal White glow on standard 12V automotive systems.

Key Features & Specifications:
- Ultra-Bright Multi-SMD Array: Delivers intense, crisp 6000K Crystal White illumination with zero dark spots, outshining standard halogen T10 bulbs.
- Protective Clear Silicone Encapsulation: Fully sealed against water, humidity, dust, and road vibrations while resisting engine bay heat.
- Universal T10 / W5W Fitment (194 / 168): Direct replacement for standard 12V wedge sockets across cars and motorcycles, including parking lights, number plate lights, speedometer clusters, and interior dome/map housings.
- Low Power Draw & Cool Operation: Consumes minimal 12V DC current to protect your battery and prevent melting or yellowing of plastic light lenses.
- Instant Plug-and-Play Installation: Simple direct-fit base allows effortless installation in seconds with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 650,
    price: 650,
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
    description: `Crisp, High-Output White Brilliance! Upgrade Dull Factory Bulbs to Modern 12V LED Illumination in Seconds.

Elevate your vehicle's exterior and interior styling with the Premium T10 W5W Ultra-Bright LED Bulbs. Encased in a crystal-clear, heat-resistant silicone sleeve for superior shock and moisture protection, these compact wedge bulbs feature high-intensity SMD LED chips arranged on all sides for true 360-degree uniform light distribution. Ideal for front parking/pilot lights, license plate lights, cabin map lights, door courtesy lights, and trunk compartments, they deliver a clean, modern 6000K Crystal White glow on standard 12V automotive systems.

Key Features & Specifications:
- Ultra-Bright Multi-SMD Array: Delivers intense, crisp 6000K Crystal White illumination with zero dark spots, outshining standard halogen T10 bulbs.
- Protective Clear Silicone Encapsulation: Fully sealed against water, humidity, dust, and road vibrations while resisting engine bay heat.
- Universal T10 / W5W Fitment (194 / 168): Direct replacement for standard 12V wedge sockets across cars and motorcycles, including parking lights, number plate lights, speedometer clusters, and interior dome/map housings.
- Low Power Draw & Cool Operation: Consumes minimal 12V DC current to protect your battery and prevent melting or yellowing of plastic light lenses.
- Instant Plug-and-Play Installation: Simple direct-fit base allows effortless installation in seconds with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 1250,
    price: 1250,
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
    description: `Intelligent Night-Vision Engineering! Crisp 6500K Pure White Beam, Heavy-Duty Cooling & Smart Voltage Control.

Command dark roads with confidence using the LED Headlight Auto Intelligent System (V-150). Engineered for maximum brightness and electrical stability, this high-power kit features elongated dual-sided LED chips that deliver a wide, focused 6500K pure white beam without dark spots. Built with a black-and-gold finned aluminum heatsink, an external V-150 intelligent driver module, and rugged braided wiring, it comes neatly packed in a durable protective hard case—making it a reliable, long-lasting upgrade for daily city driving and motorway travel.

Key Features & Specifications:
- High-Power 6500K LED Chips: Produces intense, crystal-white illumination for clear road visibility, sharp sign reflection, and superior night-driving safety.
- Auto Intelligent V-150 External Driver: Dedicated metallic control box regulates voltage fluctuations, prevents flickering, and ensures error-free compatibility on modern vehicle electrical systems.
- Black & Gold Finned Aluminum Heatsink: Precision-milled cooling fins paired with a built-in silent turbo fan rapidly dissipate heat for consistent peak output.
- Heavy-Duty Braided Wiring Harness: Wrapped in a tough woven protective sleeve to resist engine bay heat, abrasion, and moisture.
- True Plug-and-Play Installation: Standard OEM connector design allows quick, hassle-free installation in minutes with zero wire cutting or modifications.
- Protective Hard Carrying Case: Presented in a sturdy black-and-red hard storage case with foam cushioning to keep the kit protected and authentic.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 9500,
    price: 9500,
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
    description: `Performance-Grade Road Illumination! Intense 6000K–6500K White Beam, Red Anodized Turbo Cooling & External CANBUS Driver.

Transform your night driving experience with the LENSO 3000W Performance Upgrades LED Headlight Kit. Engineered for drivers seeking high-output visibility and modern styling, these bulbs feature precision-aligned high-intensity LED chips that project a wide, razor-sharp pure white beam across dark highways and city roads. Built with a striking red-anodized finned aluminum heatsink, a silent high-speed cooling fan, and an external control driver, this performance upgrade delivers consistent brightness without overheating or flickering.

Key Features & Specifications:
- 3000W Performance-Grade Output: High-intensity automotive LED chips produce a dense, far-reaching 6000K–6500K crystal-white beam with zero dark spots.
- Red-Anodized Aluminum Heatsink & Turbo Fan: Heavy-duty finned aluminum body with a red metallic finish rapidly dissipates heat to protect the LED chips and extend bulb lifespan.
- External Intelligent Control Driver: Dedicated inline driver box stabilizes voltage fluctuations, prevents flickering, and ensures error-free operation on modern vehicles.
- Focused Beam Pattern: Replicates halogen filament geometry to maximize down-road visibility while minimizing glare for oncoming drivers.
- True Plug-and-Play Installation: Direct OEM socket fitment allows quick, hassle-free installation in minutes with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 13500,
    price: 13500,
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
    description: `Conquer Any Weather! Switch Effortlessly Between 6000K Crystal White & 3000K Golden Yellow in One Bulb.

Master every road and weather condition with the SH Pro Two-Colour LED Headlight Kit. Engineered for drivers who need extreme brightness on clear nights and superior visibility during heavy winter fog, smog, or rain, these dual-color bulbs allow instant switching between pure white and warm yellow light using your vehicle's existing headlight switch. Built with a rugged black-and-gold finned aluminum heatsink, a silent high-speed turbo fan, and external control drivers, the SH Pro delivers reliable, high-output illumination all year round.

Key Features & Specifications:
- All-Weather Two-Colour Technology: Easily toggle between 6000K Crystal White for maximum clarity on dark highways and 3000K Golden Yellow to cut through thick fog, rain, and dust.
- High-Power 600W / 60,000LM Performance: Equipped with dual-color high-intensity LED chips that project a wide, dense, and focused beam with zero dark spots.
- Black & Gold Finned Aluminum Cooling System: Precision-milled aluminum heatsink paired with a high-speed silent turbo fan rapidly dissipates heat for consistent peak brightness.
- External Intelligent Control Drivers: Dedicated inline driver modules regulate voltage fluctuations, prevent flickering, and ensure smooth color switching.
- True Plug-and-Play Installation: Direct OEM connector fitment allows quick, hassle-free installation in minutes with zero wire cutting or extra switches required.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 7500,
    price: 7500,
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
    description: `Flagship Copper Thermal Engineering! Extreme 6500K Crystal-White Brilliance, Full-Copper Body & External CANBUS Drivers.

Experience top-tier automotive lighting performance with the flagship REGO Racing Full-Copper LED Headlight Kit, presented in a signature luxury black magnetic box with custom foam cushioning. Engineered with a full copper-finish body, matching copper external control drivers, and high-output dual-sided LED chips, these bulbs deliver a razor-sharp, high-intensity 6500K pure white beam with maximum focus and zero dark spots. Designed for drivers who demand uncompromised night visibility and long-term thermal stability on dark highways and motorways.

Key Features & Specifications:
- Full-Copper Thermal Body & Heatsink: Precision-machined copper housing rapidly pulls heat away from the LED chips, preventing lumen drop and ensuring consistent peak brightness during extended night drives.
- High-Intensity 6500K Focus Beam: Engineered with high-output dual-sided LED chips and adjustable collar positioning to produce a clean, focused beam pattern that illuminates the road without blinding oncoming traffic.
- High-Speed Silent Turbo Cooling Fan: Built-in heavy-duty cooling fan works alongside the finned copper heatsink for superior heat dissipation and extended bulb lifespan.
- Matching Copper External CANBUS Drivers: Dedicated metallic driver modules regulate voltage fluctuations, eliminate flickering, and ensure error-free compatibility on modern vehicle electrical systems.
- True Plug-and-Play Installation: Direct OEM connector fitment with braided wiring allows quick, damage-free installation in minutes with zero wire cutting.
- Signature Black Presentation Box: Comes packed in a rigid black REGO Racing display box with precision-cut protective foam and user manual.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 14500,
    price: 14500,
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
    description: `Ultimate 6-Copper Thermal Engineering! Unrivaled Long-Range 6000K Crystal-White Output & Multi-Module External CANBUS System.

Experience flagship-grade road illumination with the Mother 6-Copper Pipe Professional LED Headlight Kit. Engineered for automotive enthusiasts and long-distance highway drivers who demand maximum output without thermal throttling, these heavy-duty bulbs feature an advanced six-copper heat-pipe cooling architecture inside a precision gold-anodized body. Supported by dedicated external golden metallic CANBUS driver modules and rugged braided cables, this professional series kit delivers an intense, razor-sharp 6000K crystal-white beam that cuts through pitch-black roads and harsh weather with zero flickering.

Key Features & Engineering:
- 6x Vacuum-Sealed Copper Heat Pipes: Six pure copper thermal tubes rapidly pull heat away from the high-power LED chips, ensuring 100% peak brightness without dimming even on multi-hour motorway drives.
- Gold-Anodized Aluminum Heatsink & Turbo Fan: Precision-milled golden cooling fins paired with a silent high-speed turbo fan maximize airflow and extend bulb lifespan.
- Heavy-Duty External Metallic CANBUS Drivers: High-grade gold-finished external control modules regulate voltage fluctuations, eliminate dashboard error codes, and guarantee flicker-free performance.
- High-Intensity Focused Beam Pattern: Precision-aligned dual-sided LED chips project a wide, dense beam with a clean cut-off line—maximizing road visibility without blinding oncoming traffic.
- Braided Heat-Resistant Wiring Harness: Wrapped in a tough woven protective sleeve to withstand extreme engine bay heat, vibration, and moisture.
- True Plug-and-Play Installation: Direct OEM connector fitment allows fast, damage-free installation in minutes with zero wire cutting.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 15500,
    price: 15500,
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
    description: `⚡ EXTREME POWER. MAXIMUM COOLING. UNMATCHED PERFORMANCE.

Meet the Ultimate High-Performance LED Headlight from Hasnain Auto Decoration Accessories — our most powerful and fastest-performing LED lighting solution for drivers who want maximum illumination and serious road presence. 🚗💡🔥

Featuring an impressive 300W Real Power, 15 high-performance LEDs, a premium Korean LED Chip, 8 Copper Heat-Dissipation Tubes, an Aluminium Cooling Fan, and Advanced CANBUS Compatible Technology, this flagship LED is engineered to deliver an exceptional lighting upgrade for compatible vehicles.

With 8 copper cooling tubes, this LED is designed for enhanced heat dissipation and sustained performance, while its 300W Real Power puts it at the top of our LED performance range.

🚀 EXTREME 300W REAL POWER

⚡ 300W REAL POWER — OUR MOST POWERFUL LED

Built for drivers who don't want an ordinary lighting upgrade.

The 300W Real Power configuration delivers an extremely powerful lighting performance, designed to provide intense illumination and a stronger road presence than our lower-power LED models.

🔥 Maximum Power
💡 Maximum Illumination
🚗 Maximum Performance

If you're looking for one of the most powerful LED upgrades in our range, this is the flagship choice.

🔥 8 COPPER HEAT-DISSIPATION TUBES

❄️ ADVANCED 8-TUBE COOLING SYSTEM

The flagship cooling system features 8 Copper Pipe Tubes, providing multiple heat-transfer pathways away from the LED assembly.

Combined with the integrated Aluminium Cooling Fan, the system is designed to provide advanced thermal management and help maintain stable performance during extended operation.

🔥 8 Copper Tubes
❄️ Active Aluminium Fan Cooling
🌡️ Advanced Heat Management

More cooling capacity. More stability. Built for serious performance.

💡 15 HIGH-PERFORMANCE LEDs

The LED assembly features 15 high-performance LEDs designed to deliver powerful and consistent illumination.

The combination of multiple LEDs and 300W Real Power creates a high-output lighting setup for drivers who demand maximum performance from their headlights.

🇰🇷 PREMIUM KOREAN LED CHIP

At the heart of this high-performance lighting system is a premium Korean LED Chip, selected for powerful light performance, efficiency and consistent operation.

This advanced chip technology works together with the high-power LED configuration and advanced cooling system to provide a premium lighting experience.

🔌 ADVANCED CANBUS COMPATIBLE TECHNOLOGY

Equipped with Advanced CANBUS Compatible Technology, designed to improve compatibility with many modern vehicle electrical systems.

It can also help minimize common LED-related issues such as flickering or dashboard warning lights on compatible vehicles.

🚘 Modern Vehicle Compatibility
⚡ Stable Electrical Performance
🔌 Advanced CANBUS Technology

🎯 POWERFUL & CONTROLLED BEAM

Designed to provide strong, focused and controlled illumination when correctly installed in a compatible headlight housing.

Its high-output performance makes it an ideal choice for drivers who frequently travel at night, drive on highways or require stronger illumination on darker roads.

🌙 BUILT FOR THE NIGHT

Whether you're driving through:

🏙️ City Roads
🛣️ Highways
🌑 Dark Roads
🚗 Long-Distance Routes
🌧️ Low-Light Conditions

The 300W flagship LED is designed to deliver the powerful illumination needed for demanding night-driving conditions.

💎 PREMIUM PRODUCT SPECIFICATIONS

Product Type | 🔥 Flagship High-Performance LED Headlight
Real Power | ⚡ 300W
LED Quantity | 💡 15 LEDs
LED Chip | 🇰🇷 Korean Chip
Heat Dissipation | 🔥 8 Copper Pipe Tubes
Cooling System | ❄️ Aluminium Cooling Fan
Technology | 🔌 Advanced CANBUS Compatible
Performance Level | 🏆 Our Highest-Power LED
Warranty | 🛡️ 1 Year Replacement Warranty

🏆 WHY CHOOSE OUR 300W FLAGSHIP LED?

✔️ 300W Real Power
✔️ 15 High-Performance LEDs
✔️ Premium Korean LED Chip
✔️ 8 Copper Heat-Dissipation Tubes
✔️ Aluminium Cooling Fan
✔️ Advanced CANBUS Compatible Technology
✔️ Extremely Powerful Illumination
✔️ Advanced Thermal Management
✔️ Focused & Controlled Beam Performance
✔️ Premium Modern Design
✔️ Our Highest-Power LED Model
✔️ 1 Year Replacement Warranty

🔥 THE MOST POWERFUL LED IN OUR RANGE

Our LED range is built for different performance requirements — but when it comes to maximum power, the choice is clear.

300W REAL POWER + 8 COPPER TUBES = FLAGSHIP PERFORMANCE 🔥

The combination of 300W Real Power, 15 LEDs, Korean Chip technology, 8 Copper Heat-Dissipation Tubes, Aluminium Fan Cooling and Advanced CANBUS Technology makes this our most powerful and performance-focused LED headlight.

If you're looking for maximum lighting power and premium cooling technology, this is the LED designed to stand at the top. 🚗💨🔥

🛡️ 1 YEAR REPLACEMENT WARRANTY

Enjoy additional confidence with a 1 YEAR REPLACEMENT WARRANTY 🛡️

Warranty terms and conditions may apply.

🏪 AVAILABLE AT HASNAIN AUTO DECORATION ACCESSORIES

Hasnain Auto Decoration Accessories

Premium Car Accessories & Auto Decoration Solutions 🚘✨

📱 Call / WhatsApp: 03125127096
💬 WhatsApp Available

🔥 300W REAL POWER | 15 LEDs | 8 COPPER TUBES

🇰🇷 Korean Chip | ❄️ Aluminium Fan | 🔌 Advanced CANBUS Technology | 🛡️ 1 Year Replacement Warranty

💡 THE ULTIMATE POWER UPGRADE.

🔥 MAXIMUM POWER. MAXIMUM COOLING. MAXIMUM PERFORMANCE.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 11500,
    price: 11500,
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
    description: `Signature Emerald-Green Precision! Extreme Long-Range 6000K–6500K White Beam, Heavy-Duty Finned Heatsink & External CANBUS Driver.

Command pitch-black roads with unmatched clarity using the Mother Auto LED Headlight System (Green Edition). Engineered for drivers seeking high-output performance and durable thermal management, these bulbs feature an emerald-green anodized aluminum heatsink paired with precision dual-sided LED chips. Delivering a wide, focused 6000K–6500K crystal-white beam with zero dark spots, the kit includes an external black metallic CANBUS control box and rugged braided wiring for flicker-free reliability on daily city commutes and long motorway journeys.

Key Features & Engineering:
- High-Intensity Dual-Sided LED Chips: Projects a dense, far-reaching 6000K–6500K pure white beam with a clean cut-off pattern that maximizes visibility without blinding oncoming traffic.
- Emerald-Green Anodized Aluminum Heatsink & Turbo Fan: Thick radial cooling fins combined with a high-speed silent turbo fan rapidly dissipate heat to prevent dimming and extend bulb lifespan.
- External Metallic CANBUS Control Driver: Dedicated black control module stabilizes voltage fluctuations, eliminates dashboard error codes, and ensures smooth, flicker-free operation.
- Heavy-Duty Braided Wiring Harness: Wrapped in a tough woven protective sleeve to resist extreme engine bay heat, vibration, and moisture.
- True Plug-and-Play Fitment: Direct OEM socket design allows quick, damage-free installation in minutes with zero wire cutting or modifications.`,
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 14500,
    price: 14500,
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
// added 2026-11-16 with SAMPLE prices. On 2026-11-19 sumair gave the CORRECT
// prices by product number (#01-#26) and they replaced all 26 prices here
// (price + basePrice; the 8 old originalPrice "was" values were removed, so
// no struck-through discount shows). Do NOT re-add the old products.

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

/* Hot Deals (2026-11-16, sumair): the 5 flagship headlight kits shown in the
   homepage Hot Deals box. Moved here from HeroSection.tsx 2026-11-18 so the
   list lives in ONE place — HeroSection AND the cart drawer (Hot Deal sale
   countdown banner) both import it from here. */
export const HOT_DEAL_SLUGS: readonly string[] = [
  "mother-6-copper-led-headlights",
  "rego-4-copper-h4-golden-box",
  "b-pro-8-copper-led-headlights",
  "rego-racing-h4-led-headlights",
  "ktm-ai-led-headlight",
];

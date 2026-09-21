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
    image: "/images/products/f5-pro-h4-led.jpg",
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
  { id: "Japanese Scratchless", label: "Japanese", description: "Japanese Scratchless Material", basePrice: 25000 },
  { id: "Scratchless Premium", label: "Premium", description: "Scratchless Premium Material", basePrice: 28000 },
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
    id: "1",
    slug: "premium-leather-seat-covers",
    name: "Premium Leather Seat Covers",
    shortDescription: "Custom-fit leather covers for all major car models",
    description:
      "Transform your car interior with our premium bespoke leather seat covers. Available in multiple quality grades from economy LR9 to Japanese scratchless and premium scratchless material. Tailored specifically to your vehicle's make, model, and seat contours.",
    category: "seat-covers",
    subcategory: "Custom Leather Upholstery",
    basePrice: 15000,
    price: 15000,
    originalPrice: 18000,
    salePrice: 15000,
    badge: "Hot",
    isSeatCover: true,
    isFeatured: true,
    featured: true,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "Hasnain Custom",
    rating: 4.9,
    reviewCount: 84,
    images: [
      "/images/products/premium-leather-seat-covers.jpg",
      "/images/products/seat-cover-floor-mat-combo.jpg",
    ],
    features: [
      "Custom laser-tailored fit for all Pakistani car models",
      "Choice of 6 leather grades (LR9 to Scratchless Premium)",
      "High-density memory foam padding for long drive comfort",
      "Perforated breathable center cushion with red diamond stitch",
      "Professional in-shop fitting at Kashmir Road Saddar",
    ],
    specifications: {
      "Available Grades": "LR9, ST8, ST27, NS3, Japanese Scratchless, Scratchless Premium",
      "Available Colors": "Black, Grey, Beige, Brown, Mustard, Maroon",
      "Stitching": "Red / Contrast Diamond Double Stitch",
      "Foam Density": "High-Resilience Cold-Cured Foam",
      "Fitting Duration": "Approx 2 hours at Saddar Workshop",
      "Warranty": "1 Year Workmanship Guarantee",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan", "Proton"],
      note: "Custom-tailored pattern cut specifically for your vehicle model.",
    },
    relatedSlugs: [
      "7d-floor-mats-premium",
      "ambient-led-lights",
      "leather-key-cover-set",
    ],
    warranty: "1 Year Workmanship & Stitching Warranty",
  },
  {
    id: "2",
    slug: "7d-floor-mats-premium",
    name: "7D Floor Mats Premium Set",
    shortDescription: "Full coverage 7D mats with premium finish",
    description:
      "Premium 7D floor mats designed for complete floor protection. Crafted with multi-layer diamond quilted leatherette, anti-skid bottom grip spikes, and reinforced metal heel pad for the driver's pedal area.",
    category: "floor-mats",
    subcategory: "Floor Mats",
    basePrice: 4500,
    price: 4500,
    originalPrice: 5500,
    salePrice: 4500,
    badge: "Best Seller",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: true,
    inStock: true,
    stock: true,
    brand: "OpticDrive 7D",
    rating: 4.8,
    reviewCount: 112,
    images: ["/images/products/7d-floor-mats-premium.jpg"],
    features: [
      "Deep-dish raised side walls to lock in dirt, water & mud",
      "Heavy-duty driver steel heel reinforcement plate",
      "Sporty red contrast edge binding and diamond quilting",
      "Waterproof, mud-proof, and washable in minutes",
      "Anti-skid textured backing prevents sliding",
    ],
    specifications: {
      "Structure": "7-Layer High-Density Composite with EVA Base",
      "Coverage": "Front Row, Second Row & Transmission Center Tunnel",
      "Binding": "Heavy-Duty Red Contrast Edge Binding",
      "Cleaning": "Waterproof wipe or pressure wash",
      "Fitment": "Custom-fit for Toyota, Honda, Suzuki, KIA & Hyundai",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan", "Proton"],
      note: "Molded custom sets available for all Pakistani sedan and SUV models.",
    },
    relatedSlugs: ["tp-full-protection-mats", "premium-leather-seat-covers"],
    warranty: "6 Months Material Warranty",
  },
  {
    id: "3",
    slug: "led-headlight-projector",
    name: "LED Headlight Projector Kit",
    shortDescription: "Crystal-clear projector headlights with LED technology",
    description:
      "Upgrade your night driving visibility with our premium LED projector headlight kit. Built with aerospace aluminum, dual vacuum copper heat pipes, and high-lumen Osram chips delivering a razor-sharp beam cutoff that illuminates the road without blinding oncoming traffic.",
    category: "led-lights",
    subcategory: "Headlight LEDs",
    basePrice: 8500,
    price: 8500,
    originalPrice: 11000,
    salePrice: 8500,
    badge: "Hot",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "HyperBeam Pro",
    rating: 4.9,
    reviewCount: 96,
    images: [
      "/images/products/f5-pro-h4-led.jpg",
      "/images/products/led-h11-novsight-pro.jpg",
    ],
    variants: [
      {
        name: "Socket Type",
        options: ["H4 (Dual Beam)", "H11 (Projector)", "9005 (HB3 High)", "9006 (HB4)", "H7"],
      },
    ],
    features: [
      "Ultra-high output 20,000 LM crisp 6000K pure white illumination",
      "Precision optical focus with anti-glare razor-sharp beam cut-off",
      "Dual vacuum sintered copper heat pipes with 12,000 RPM cooling fan",
      "Integrated Intelligent Canbus driver with zero dashboard errors",
      "100% plug & play fitment into factory bulb sockets",
    ],
    specifications: {
      "Power Rating": "130W Pair (65W per bulb)",
      "Luminous Flux": "20,000 Lumens Pair",
      "Color Temp": "6000K Diamond Cool White",
      "Operating Life": "> 50,000 Hours",
      "Waterproof": "IP68 Submersible Sealed",
    },
    vehicleCompatibility: {
      universal: true,
      note: "Sockets available for Corolla, Civic, Alto, Swift, Yaris, Sportage & all Pakistani cars.",
    },
    relatedSlugs: ["ambient-led-lights", "fog-lights-led"],
    warranty: "1 Year Replacement Warranty",
  },
  {
    id: "4",
    slug: "tp-full-protection-mats",
    name: "TP Full Protection Mats",
    shortDescription: "Complete trunk & floor protection system",
    description:
      "Total Protection (TP) mats provide 360° floor and trunk coverage. Engineered for maximum spill containment, protecting your car carpet from luggage dirt, groceries, spilled liquids, and tough weather conditions.",
    category: "floor-mats",
    subcategory: "Trunk Mats",
    basePrice: 6200,
    price: 6200,
    originalPrice: 7500,
    salePrice: 6200,
    badge: "Limited Stock",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "TotalProtect",
    rating: 4.7,
    reviewCount: 48,
    images: ["/images/products/tp-full-protection-mats.jpg"],
    features: [
      "Seamless high-wall containment tray design",
      "Heavy-duty thermoplastic all-weather composite",
      "Textured geometric traction surface prevents cargo sliding",
      "Odor-free, heat-resistant, and non-toxic",
      "Easily removed and hosed clean in seconds",
    ],
    specifications: {
      "Material": "Heavy-Duty All-Weather Thermoplastic (TPE)",
      "Coverage": "Full Trunk Boot Floor Tray",
      "Thickness": "3.5mm Heavy Gauge",
      "Color": "Matte Carbon Black",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan"],
      note: "Precision molded for Corolla, Civic, Sportage, Tucson, Yaris, and Alsvin trunks.",
    },
    relatedSlugs: ["7d-floor-mats-premium"],
    warranty: "1 Year Crack & Degradation Warranty",
  },
  {
    id: "5",
    slug: "ambient-led-lights",
    name: "Ambient Interior LED Lights",
    shortDescription: "RGB ambient lighting for luxury cabin feel",
    description:
      "Create a premium showroom atmosphere inside your vehicle. Ultra-thin concealed acrylic guide strips deliver uniform dot-free lighting with 64 colors, dynamic music sync, and Bluetooth smartphone app control.",
    category: "led-lights",
    subcategory: "Interior Lighting",
    basePrice: 3200,
    price: 3200,
    originalPrice: 4200,
    salePrice: 3200,
    badge: "Best Seller",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: true,
    inStock: true,
    stock: true,
    brand: "Symphony Glow",
    rating: 4.9,
    reviewCount: 138,
    images: ["/images/products/symphony-ambient-led.jpg"],
    variants: [
      {
        name: "Kit Package",
        options: [
          "6-in-1 Dashboard & 4 Doors",
          "10-in-1 Full Cabin with Footwells",
          "18-in-1 Symphony Smart Acrylic",
        ],
      },
    ],
    features: [
      "Ultra-thin 1mm acrylic light blade inserts seamlessly into trim crevices",
      "64 Vibrant Colors + 200+ Dynamic chasing & streaming modes",
      "Smart Bluetooth iOS / Android App + wireless physical mini controller",
      "Real-time acoustic sensor for sound & music rhythm sync",
      "Subtle OEM Mercedes & Audi luxury ambient appearance",
    ],
    specifications: {
      "Input Voltage": "12V DC (Connected via fuse tap / ACC)",
      "Colors": "64 RGBIC Symphony Colors",
      "Control Method": "Bluetooth Smartphone App + RF Remote",
      "Installation": "Concealed wire harness installation at Saddar shop",
    },
    vehicleCompatibility: {
      universal: true,
      note: "Universal flexible channels fit dashboard and all 4 doors of any vehicle.",
    },
    relatedSlugs: ["led-headlight-projector"],
    warranty: "6 Months Functional Warranty",
  },
  {
    id: "6",
    slug: "universal-mobile-holder",
    name: "Universal Mobile Holder",
    shortDescription: "Sturdy dashboard mount with 360° rotation",
    description:
      "Keep your phone secure while driving with precision CNC machined aluminum construction, carbon-fiber pattern grips, strong magnetic hold, and smooth 360-degree ball joint rotation for optimal navigation angles.",
    category: "mobile-holders",
    subcategory: "Phone Mounts",
    basePrice: 1200,
    price: 1200,
    originalPrice: 1600,
    salePrice: 1200,
    badge: "Hot",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "Velox CNC",
    rating: 4.8,
    reviewCount: 65,
    images: ["/images/products/universal-mobile-holder.jpg"],
    variants: [
      {
        name: "Mount Style",
        options: ["Magnetic Heavy Duty", "Gravity Lock Auto-Clamp"],
      },
    ],
    features: [
      "Aerospace-grade CNC anodized matte black aluminum body",
      "Strong neodymium magnetic core holds even through heavy road bumps",
      "360-degree rotation ball joint for portrait & landscape GPS navigation",
      "Ultra-strong 3M heat-resistant dashboard adhesive pedestal",
    ],
    specifications: {
      "Material": "Anodized Aluminum Alloy + Carbon Texture",
      "Rotation": "Full 360-Degree Swivel",
      "Phone Compatibility": "All iPhones, Samsung, Xiaomi & Android smartphones",
    },
    vehicleCompatibility: {
      universal: true,
      note: "Universal fitment on any car dashboard or air vent slat.",
    },
    relatedSlugs: ["leather-key-cover-set"],
    warranty: "6 Months Replacement Warranty",
  },
  {
    id: "7",
    slug: "leather-key-cover-set",
    name: "Leather Key Cover Set",
    shortDescription: "Premium leather key fob protection",
    description:
      "Protect and style your car smart key with genuine handcrafted leather and durable zinc alloy carabiner keychain. Precision 3D molding ensures exact button alignment and zero signal attenuation.",
    category: "mobile-holders",
    subcategory: "Key Covers",
    basePrice: 850,
    price: 850,
    originalPrice: 1200,
    salePrice: 850,
    badge: "Limited Stock",
    isSeatCover: false,
    isFeatured: true,
    featured: true,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "Hasnain Leathercraft",
    rating: 4.9,
    reviewCount: 92,
    images: ["/images/products/leather-key-cover-set.jpg"],
    variants: [
      {
        name: "Key Compatibility",
        options: [
          "Toyota Smart Key (Corolla/Yaris/Fortuner)",
          "Honda Smart Key (Civic/City/BRV)",
          "Suzuki Keyless (Alto/Cultus/Swift)",
          "KIA Smart Key (Sportage/Picanto)",
        ],
      },
    ],
    features: [
      "100% Genuine Italian top-grain leather with red contrast stitching",
      "Heavy-duty zinc alloy anti-lost carabiner keychain clip",
      "360° protection against key drops, scratches, and dust",
      "Exact button embossings with zero signal interference",
    ],
    specifications: {
      "Material": "Genuine Leather + Zinc Alloy Hardware",
      "Finish": "Matte Black with Red Contrast Stitch",
      "Package Includes": "Leather Cover + Metal Carabiner Clip + Screwdriver",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan"],
      note: "Available for push-start smart keys of all major Pakistani cars.",
    },
    relatedSlugs: ["universal-mobile-holder"],
    warranty: "6 Months Stitching Warranty",
  },
  {
    id: "8",
    slug: "seat-cover-floor-mat-combo",
    name: "Seat Cover + Floor Mat Combo",
    shortDescription: "Complete interior upgrade bundle — save 15%",
    description:
      "The ultimate interior transformation package for your car. Includes custom-fit diamond-quilted leather seat covers paired with matched 7D deep-dish floor mats at a discounted bundle price. Complete cockpit makeover in a single visit.",
    category: "combo-deals",
    subcategory: "Bundles",
    basePrice: 17500,
    price: 17500,
    originalPrice: 21000,
    salePrice: 17500,
    badge: "Best Seller",
    isSeatCover: true,
    isFeatured: true,
    featured: true,
    bestSeller: true,
    inStock: true,
    stock: true,
    brand: "Hasnain Signature Bundle",
    rating: 5.0,
    reviewCount: 41,
    images: [
      "/images/products/seat-cover-floor-mat-combo.jpg",
      "/images/products/premium-leather-seat-covers.jpg",
    ],
    features: [
      "Complete cockpit transformation: Full seat covers + 7D floor mats",
      "Save 15% compared to purchasing individual items",
      "Matching diamond stitch design and red accent trim",
      "Tailor-made specifically to your car make, model, and year",
      "Priority in-shop installation at Saddar Rawalpindi workshop",
    ],
    specifications: {
      "Included Items": "Full Front & Rear Seat Covers + 7D Front, Rear & Tunnel Mats",
      "Seat Cover Grades": "LR9 to Scratchless Premium selectable",
      "Color Matching": "Matched Black with Red Stitch, Beige, Grey or Brown",
      "Turnaround": "Installed same-day at Kashmir Road workshop",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan", "Proton"],
      note: "Custom-manufactured for your exact car model.",
    },
    relatedSlugs: ["premium-leather-seat-covers", "7d-floor-mats-premium"],
    warranty: "1 Year Full Bundle Warranty",
  },
  {
    id: "9",
    slug: "fog-lights-led",
    name: "LED Fog Lights Pair",
    shortDescription: "High-intensity fog lights for all weather",
    description:
      "High-intensity sealed LED fog lights with sharp horizontal cutoff and all-weather penetrating beam. Built with blue anti-reflective glass lenses and high-torque solenoids for rain, winter fog, and unlit highway driving.",
    category: "led-lights",
    subcategory: "Fog Lights",
    basePrice: 5500,
    price: 5500,
    originalPrice: 7000,
    salePrice: 5500,
    badge: "Popular",
    isSeatCover: false,
    isFeatured: false,
    featured: false,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "OpticDrive Fog",
    rating: 4.7,
    reviewCount: 53,
    images: [
      "/images/products/biled-fog-projectors.jpg",
      "/images/products/laser-mini-driving-pod.jpg",
    ],
    variants: [
      {
        name: "Beam Style",
        options: [
          "6000K Pure White High Output",
          "3000K Golden Amber Fog Penetrator",
          "Dual-Color (White Low + Amber High)",
        ],
      },
    ],
    features: [
      "Ultra-wide 160-degree flat horizontal beam cutoff",
      "IP68 waterproof sealed aluminum alloy body",
      "Laser projector lens penetrates thick winter fog and heavy rain",
      "Universal bracket matches Toyota, Honda, and Suzuki factory fog housings",
    ],
    specifications: {
      "Power": "80W Pair",
      "Color Temp": "6000K White / 3000K Golden Amber",
      "Lens": "Optic Glass Optical Convex Lens",
      "Waterproof": "IP68 Submersible",
    },
    vehicleCompatibility: {
      universal: true,
      note: "Direct bracket fitment for Toyota Corolla/Yaris, Honda Civic/City, Suzuki Swift.",
    },
    relatedSlugs: ["led-headlight-projector"],
    warranty: "1 Year Replacement Warranty",
  },
  {
    id: "10",
    slug: "mud-flaps-set",
    name: "Heavy Duty Mud Flaps",
    shortDescription: "Protect your car body from road debris",
    description:
      "Heavy-duty molded splash guards engineered specifically for tough Pakistani road conditions. Protects rocker panels, doors, and rear bumper from gravel stone chips, slush, and tar.",
    category: "exterior-accessories",
    subcategory: "Exterior Protection",
    basePrice: 1800,
    price: 1800,
    originalPrice: 2400,
    salePrice: 1800,
    badge: "Essential",
    isSeatCover: false,
    isFeatured: false,
    featured: false,
    bestSeller: false,
    inStock: true,
    stock: true,
    brand: "AeroShield",
    rating: 4.6,
    reviewCount: 37,
    images: ["/images/products/mud-flaps-set.jpg"],
    variants: [
      {
        name: "Vehicle Type",
        options: ["Sedan Fitment", "SUV / Crossover Fitment", "Hatchback Fitment"],
      },
    ],
    features: [
      "Flexible yet durable high-density PP/ABS plastic composite",
      "Pre-drilled factory screw holes for direct bolt-on installation",
      "All-weather flexibility: Won't crack in winter or melt in summer",
      "Protects expensive car paint from flying stones and muddy spray",
    ],
    specifications: {
      "Set Includes": "4 Pieces (Front Left/Right & Rear Left/Right) + Screws",
      "Material": "Impact-Resistant Polypropylene",
      "Finish": "Textured Matte Black OEM Style",
    },
    vehicleCompatibility: {
      universal: false,
      makes: ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan", "Proton"],
      note: "Matched mounting holes for Corolla, Civic, City, Alto, Yaris, Swift & Sportage.",
    },
    relatedSlugs: ["7d-floor-mats-premium"],
    warranty: "6 Months Durability Warranty",
  },
];

// Active products & categories exported for components & SEO
export const ACTIVE_PRODUCTS_DATA = PRODUCTS_DATA.filter((p) => !p.hidden);
export const ACTIVE_CATEGORIES_DATA = CATEGORIES_DATA.filter((c) => !c.hidden);

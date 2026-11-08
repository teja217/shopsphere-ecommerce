export const sampleCategories = [
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    slug: "electronics",
    description: "High-performance laptops, crystal-clear 4K displays, and cutting-edge productivity gear.",
    icon: "Laptop",
    bannerImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    itemCount: 6
  },
  {
    id: "audio-wearables",
    name: "Audio & Wearables",
    slug: "audio-wearables",
    description: "Immersive noise-cancelling headphones, high-fidelity wireless earbuds, and biometric smartwatches.",
    icon: "Headphones",
    bannerImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    itemCount: 5
  },
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel",
    slug: "fashion-apparel",
    description: "Modern minimalist urban wear, weatherproof outerwear, and premium accessories.",
    icon: "Shirt",
    bannerImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    itemCount: 5
  },
  {
    id: "smart-home",
    name: "Smart Home & Living",
    slug: "smart-home",
    description: "Intelligent ambient lighting, connected climate controls, and modern home essentials.",
    icon: "Home",
    bannerImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    itemCount: 4
  },
  {
    id: "fitness-outdoors",
    name: "Fitness & Outdoors",
    slug: "fitness-outdoors",
    description: "Engineered training equipment, thermal hydration gear, and adventure accessories.",
    icon: "Activity",
    bannerImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    itemCount: 4
  }
];

export const sampleProducts = [
  {
    id: "SP-101",
    name: "AuraPro ANC Wireless Headphones",
    slug: "aurapro-anc-wireless-headphones",
    category: "audio-wearables",
    categoryName: "Audio & Wearables",
    price: 249.99,
    originalPrice: 329.99,
    discountPercentage: 24,
    rating: 4.9,
    reviewsCount: 382,
    stock: 28,
    isAvailable: true,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Flagship hybrid active noise cancellation with 45-hour battery life and spatial audio support.",
    description: "The AuraPro ANC Wireless Headphones redefine your listening experience. Powered by dual custom neodymium 40mm drivers and an advanced hybrid active noise-cancelling chipset, these headphones deliver deep resonant bass, crystal-clear mids, and pristine highs. Plush memory foam earcups wrapped in breathable protein leather guarantee all-day fatigue-free listening.",
    features: [
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "Up to 45 Hours of continuous playback on a single charge",
      "Multipoint Bluetooth 5.3 connection for smooth multi-device switching",
      "Built-in quad beamforming microphones for crystal-clear calls",
      "Quick charge: 10 minutes gives 5 hours of playback"
    ],
    specifications: {
      "Brand": "AuraSound",
      "Connectivity": "Bluetooth 5.3 / 3.5mm Aux",
      "Battery Life": "45 Hours (ANC On)",
      "Driver Size": "40mm Neodymium",
      "Weight": "250g",
      "Warranty": "2 Years Official"
    },
    tags: ["headphones", "audio", "wireless", "anc", "bluetooth", "music"]
  },
  {
    id: "SP-102",
    name: "TitanUltra 4K OLED Gaming Monitor 32\"",
    slug: "titanultra-4k-oled-gaming-monitor-32",
    category: "electronics",
    categoryName: "Electronics & Gadgets",
    price: 899.99,
    originalPrice: 1099.99,
    discountPercentage: 18,
    rating: 4.8,
    reviewsCount: 145,
    stock: 12,
    isAvailable: true,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "32-inch 4K UHD Quantum OLED display with 240Hz refresh rate and 0.03ms response time.",
    description: "Designed for content creators and elite gamers alike, the TitanUltra 32\" 4K OLED Monitor delivers breathtaking contrast ratios with infinite blacks and 99% DCI-P3 color gamut accuracy. Featuring HDR True Black 400 and ultra-fast 240Hz refresh rates with NVIDIA G-Sync and AMD FreeSync Premium Pro compatibility.",
    features: [
      "3840 x 2160 UHD Quantum Dot OLED Panel",
      "Ultra-fluid 240Hz refresh rate with 0.03ms GtG response time",
      "99% DCI-P3 color accuracy with factory calibration certificate",
      "Dual HDMI 2.1, DisplayPort 1.4, and 90W USB-C Power Delivery",
      "Custom graphene heat sink for burn-in prevention and silent cooling"
    ],
    specifications: {
      "Brand": "TitanTech",
      "Screen Size": "32 Inches",
      "Resolution": "3840 x 2160 Pixels",
      "Refresh Rate": "240 Hz",
      "Ports": "2x HDMI 2.1, 1x DP 1.4, 1x USB-C 90W",
      "Warranty": "3 Years Burn-in Guarantee"
    },
    tags: ["monitor", "4k", "oled", "gaming", "display", "pc", "electronics"]
  },
  {
    id: "SP-103",
    name: "ChronoSphere Pro Smartwatch Gen 4",
    slug: "chronosphere-pro-smartwatch-gen-4",
    category: "audio-wearables",
    categoryName: "Audio & Wearables",
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    rating: 4.7,
    reviewsCount: 512,
    stock: 45,
    isAvailable: true,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Aerospace-grade titanium chassis with continuous SpO2, ECG monitoring, and 14-day battery.",
    description: "The ChronoSphere Pro Gen 4 merges classic horology with cutting-edge health tracking. Encased in grade-5 titanium with sapphire crystal glass, it monitors your heart rate, sleep stages, stress levels, and blood oxygen with medical-grade precision. Supports 100+ workout modes and standalone GPS navigation.",
    features: [
      "Always-On 1.43\" AMOLED display with 1000 nits peak brightness",
      "Comprehensive biosensor suite: ECG, Heart Rate, SpO2 & Skin Temperature",
      "14-Day battery life in smartwatch mode / 40 hours continuous GPS",
      "5ATM water resistance rating (up to 50 meters diving)",
      "NFC contactless payment and Bluetooth call management"
    ],
    specifications: {
      "Brand": "ChronoSphere",
      "Case Material": "Grade 5 Titanium & Sapphire Glass",
      "Display": "1.43\" AMOLED 466x466",
      "Water Resistance": "5 ATM",
      "Battery Life": "Up to 14 Days",
      "Compatibility": "iOS & Android"
    },
    tags: ["smartwatch", "wearable", "fitness", "watch", "health", "titanium"]
  },
  {
    id: "SP-104",
    name: "KeyCraft Matrix 75% Mechanical Keyboard",
    slug: "keycraft-matrix-75-mechanical-keyboard",
    category: "electronics",
    categoryName: "Electronics & Gadgets",
    price: 139.99,
    originalPrice: 169.99,
    discountPercentage: 17,
    rating: 4.9,
    reviewsCount: 290,
    stock: 30,
    isAvailable: true,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Gasket-mounted hot-swappable mechanical keyboard with CNC aluminum frame and tri-mode connectivity.",
    description: "Elevate your typing bliss. The KeyCraft Matrix 75 features custom factory-lubed linear switches, sound-dampening silicone poron foam, gasket mounting for a soft acoustic bounce, and premium double-shot PBT keycaps. Effortlessly switch between 2.4GHz wireless, Bluetooth 5.1, and USB-C wired.",
    features: [
      "Gasket mounted architecture with five-layer acoustic sound dampening",
      "Hot-swappable PCB compatible with 3-pin and 5-pin MX switches",
      "Tri-mode connection: 2.4Ghz dongle, 3x Bluetooth profiles, and USB-C",
      "South-facing per-key RGB backlighting with 22 dynamic modes",
      "CNC anodized aluminum body with brass weight plate"
    ],
    specifications: {
      "Brand": "KeyCraft",
      "Layout": "75% Compact (82 Keys)",
      "Switches": "Pre-lubed Matcha Linear (45g)",
      "Keycaps": "Double-shot PBT Cherry Profile",
      "Battery": "4000mAh Rechargeable",
      "Weight": "1150g"
    },
    tags: ["keyboard", "mechanical", "pc", "gaming", "workspace", "wireless"]
  },
  {
    id: "SP-105",
    name: "Vanguard Urban Commuter Backpack 28L",
    slug: "vanguard-urban-commuter-backpack-28l",
    category: "fashion-apparel",
    categoryName: "Fashion & Apparel",
    price: 89.99,
    originalPrice: 119.99,
    discountPercentage: 25,
    rating: 4.8,
    reviewsCount: 420,
    stock: 50,
    isAvailable: true,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Weatherproof Cordura 1000D backpack with dedicated 16\" laptop sleeve and magnetic Fidlock clasps.",
    description: "Built for daily metropolitan transit and weekend adventures. The Vanguard Urban Commuter features indestructible Cordura ballistic nylon, waterproof YKK Aquaguard zippers, an anti-theft hidden passport pocket, and an ergonomic ventilated EVA back panel.",
    features: [
      "Waterproof 1000D Cordura exterior with weather-sealed zippers",
      "Dedicated suspended 16\" MacBook / gaming laptop compartment",
      "Magnetic Fidlock quick-release front buckles",
      "Integrated luggage trolley pass-through strap",
      "Concealed RFID-blocking travel pocket"
    ],
    specifications: {
      "Brand": "Vanguard Goods",
      "Capacity": "28 Liters",
      "Dimensions": "48 x 32 x 18 cm",
      "Material": "1000D Ballistic Cordura",
      "Laptop Fit": "Up to 16.5 Inches",
      "Weight": "980g"
    },
    tags: ["backpack", "bag", "travel", "urban", "commute", "fashion"]
  },
  {
    id: "SP-106",
    name: "LumiDesk Smart Ambient Light Bar",
    slug: "lumidesk-smart-ambient-light-bar",
    category: "smart-home",
    categoryName: "Smart Home & Living",
    price: 64.99,
    originalPrice: 79.99,
    discountPercentage: 18,
    rating: 4.6,
    reviewsCount: 188,
    stock: 35,
    isAvailable: true,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Zero-glare monitor screen bar with auto-dimming ambient sensor and wireless rotary puck.",
    description: "Save desk space and eliminate screen reflection. The LumiDesk Light Bar sits securely atop curved or flat monitors, casting an asymmetric soft pool of light across your workstation. Adjust color temperature from cozy 2700K to focused 6500K with the included wireless CNC aluminum rotary remote.",
    features: [
      "Asymmetrical optical design ensures zero screen reflection and eye strain",
      "Auto-dimming ambient light sensor balances lux levels dynamically",
      "2.4GHz wireless aluminum rotary controller for brightness and hue",
      "Color temperature range: 2700K (warm amber) to 6500K (cool daylight)",
      "USB-C powered with universal clamp fitting monitors from 5mm to 55mm"
    ],
    specifications: {
      "Brand": "LumiDesign",
      "Power Source": "USB-C 5V/2A",
      "Color Rendering": "Ra > 95",
      "Luminous Flux": "350 Lumens",
      "Remote Control": "2.4Ghz Wireless Dial",
      "Material": "Sandblasted Aluminum Alloy"
    },
    tags: ["lighting", "desk", "smart-home", "workspace", "lamp", "ergonomics"]
  },
  {
    id: "SP-107",
    name: "ApexPro Precision Ergonomic Mouse",
    slug: "apexpro-precision-ergonomic-mouse",
    category: "electronics",
    categoryName: "Electronics & Gadgets",
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    rating: 4.8,
    reviewsCount: 310,
    stock: 22,
    isAvailable: true,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "57-degree natural vertical handshake angle with MagSpeed electromagnetic scrolling.",
    description: "Designed by ergonomic scientists to relieve forearm strain and carpal tunnel tension. ApexPro features an ultra-precise 8000 DPI Darkfield glass sensor, customizable thumb gesture buttons, and silent acoustic switches.",
    features: [
      "Natural 57-degree vertical elevation reduces wrist pressure by 40%",
      "MagSpeed magnetic scroll wheel spins 1000 lines per second silently",
      "8000 DPI optical sensor tracks seamlessly even on transparent glass",
      "Pairs with up to 3 devices simultaneously with Flow cross-computer copy-paste",
      "70-day battery life on a single 2-hour USB-C charge"
    ],
    specifications: {
      "Brand": "ApexGear",
      "Sensor": "Darkfield 8000 DPI",
      "Buttons": "6 Programmable Buttons",
      "Connectivity": "Bluetooth Low Energy & 2.4Ghz USB",
      "Battery": "500mAh Li-Po Rechargeable",
      "Weight": "135g"
    },
    tags: ["mouse", "ergonomic", "electronics", "office", "pc", "wireless"]
  },
  {
    id: "SP-108",
    name: "AeroPulse PureSound Wireless Earbuds",
    slug: "aeropulse-puresound-wireless-earbuds",
    category: "audio-wearables",
    categoryName: "Audio & Wearables",
    price: 129.99,
    originalPrice: 159.99,
    discountPercentage: 18,
    rating: 4.7,
    reviewsCount: 462,
    stock: 60,
    isAvailable: true,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Lossless LDAC audio, adaptive noise cancellation, and IPX7 sweatproof resistance.",
    description: "Immerse yourself in concert-grade audio anywhere you go. AeroPulse combines carbon-nanotube drivers with LDAC high-resolution codec streaming. Adaptive ANC adjusts silence levels in real-time according to surrounding decibels.",
    features: [
      "Hi-Res Audio Wireless certification with LDAC codec support",
      "Smart adaptive noise cancellation up to -42dB",
      "32 Hours total battery life with wireless charging case",
      "6-Mic array with AI neural noise reduction for wind protection",
      "IPX7 waterproof rating for heavy workouts and downpours"
    ],
    specifications: {
      "Brand": "AuraSound",
      "Water Resistance": "IPX7 Certified",
      "Audio Codecs": "LDAC, AAC, SBC",
      "Playtime": "8 Hours (Earbuds) + 24 Hours (Case)",
      "Charging": "Qi Wireless & Fast USB-C",
      "Weight": "4.8g per earbud"
    },
    tags: ["earbuds", "audio", "wireless", "music", "bluetooth", "sports"]
  },
  {
    id: "SP-109",
    name: "IronFlex Pro Adjustable Dumbbell Set (5-52.5 lbs)",
    slug: "ironflex-pro-adjustable-dumbbell-set",
    category: "fitness-outdoors",
    categoryName: "Fitness & Outdoors",
    price: 299.99,
    originalPrice: 399.99,
    discountPercentage: 25,
    rating: 4.9,
    reviewsCount: 215,
    stock: 14,
    isAvailable: true,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Replaces 15 pairs of individual weights with a rapid 1-second dial-selector mechanism.",
    description: "Transform your living room into a high-end strength studio. The IronFlex Pro lets you adjust weight from 5 to 52.5 lbs with a simple twist of a dial. Engineered with laser-cut steel plates coated in scratch-resistant thermoplastic molding for ultra-quiet workouts.",
    features: [
      "15 Weight settings in one compact dumbbell: 5 to 52.5 lbs per hand",
      "Instant 1-second dial selector mechanism with dual safety lock",
      "Molded thermoplastic coating protects floors and eliminates metal clanking",
      "Ergonomic contoured knurled steel grip handle",
      "Includes two heavy-duty storage docking cradles"
    ],
    specifications: {
      "Brand": "IronFlex Labs",
      "Weight Range": "5 to 52.5 lbs (2.5 to 24 kg)",
      "Material": "Machined Steel Plates with Thermoplastic Sheath",
      "Dimensions": "40 x 20 x 23 cm each",
      "Warranty": "5 Years Structural Guarantee"
    },
    tags: ["fitness", "gym", "workout", "dumbbells", "strength", "home-gym"]
  },
  {
    id: "SP-110",
    name: "StormShield All-Weather Technical Parka",
    slug: "stormshield-all-weather-technical-parka",
    category: "fashion-apparel",
    categoryName: "Fashion & Apparel",
    price: 189.99,
    originalPrice: 249.99,
    discountPercentage: 24,
    rating: 4.8,
    reviewsCount: 167,
    stock: 20,
    isAvailable: true,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "3-layer Gore-Tex waterproof breathable shell with magnetic draft storm flap and thermal liner.",
    description: "Engineered to withstand torrential storms, biting wind, and freezing cold. The StormShield Parka features taped seam construction, storm-tight YKK zippers, an adjustable helmet-compatible hood, and an interior thermal insulation layer made from recycled PrimaLoft fibers.",
    features: [
      "20,000mm hydrostatic waterproof rating with 15,000g breathability",
      "Fully taped micro-welded seams prevent all moisture intrusion",
      "PrimaLoft Eco thermal insulation provides warmth without bulk",
      "Two deep fleece-lined handwarmer pockets & hidden chest media pocket",
      "Concealed underarm zipper vents for rapid heat regulation"
    ],
    specifications: {
      "Brand": "NordicPeak",
      "Material": "100% Recycled 3-Layer Nylon Gore-Tex",
      "Insulation": "PrimaLoft Black Eco 100g",
      "Waterproofing": "20,000 mm",
      "Care": "Machine wash cold delicate"
    },
    tags: ["jacket", "parka", "outerwear", "fashion", "winter", "weatherproof"]
  },
  {
    id: "SP-111",
    name: "PureMist Ultrasonic Aroma & Air Humidifier",
    slug: "puremist-ultrasonic-aroma-air-humidifier",
    category: "smart-home",
    categoryName: "Smart Home & Living",
    price: 49.99,
    originalPrice: 65.99,
    discountPercentage: 24,
    rating: 4.7,
    reviewsCount: 310,
    stock: 40,
    isAvailable: true,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Whisper-quiet 24dB ultrasonic cool mist with 3L tank, essential oil tray, and RGB ambient glow.",
    description: "Maintain optimal 45-55% humidity in your bedroom or home office. PureMist disperses an ultra-fine 5-micron soothing mist that hydrates dry skin and eases respiration. Features a dedicated aromatherapeutic essential oil tray and calming ambient mood light.",
    features: [
      "Large 3.0-Liter top-fill water tank provides 30 hours continuous mist",
      "Whisper-quiet sleep operation under 24dB with display shutoff",
      "Auto shut-off protection when water reservoir is empty",
      "Custom essential oil diffusion tray for aromatherapy",
      "7-Color warm gradient breathing nightlight"
    ],
    specifications: {
      "Brand": "ZenLiving",
      "Capacity": "3.0 Liters",
      "Coverage": "Up to 350 sq ft",
      "Noise Level": "< 24 dB",
      "Power": "24W Energy Efficient",
      "Timer": "2h / 4h / 8h auto-off"
    },
    tags: ["humidifier", "smart-home", "wellness", "aromatherapy", "living"]
  },
  {
    id: "SP-112",
    name: "HydroVault Insulated Thermal Bottle 32oz",
    slug: "hydrovault-insulated-thermal-bottle-32oz",
    category: "fitness-outdoors",
    categoryName: "Fitness & Outdoors",
    price: 34.99,
    originalPrice: 44.99,
    discountPercentage: 22,
    rating: 4.9,
    reviewsCount: 650,
    stock: 85,
    isAvailable: true,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Double-wall copper vacuum insulation keeps drinks ice-cold for 24 hours or piping hot for 12 hours.",
    description: "The ultimate hydration flask. Made from food-grade 18/8 pro stainless steel with a zero-condensation powder coat exterior. Includes two interchangeable leakproof lids: a high-flow chug lid and a sports straw lid.",
    features: [
      "TempLock double-wall vacuum copper lining prevents heat transfer",
      "100% BPA-free and toxin-free 18/8 food-grade stainless steel",
      "Zero exterior condensation sweat guarantee",
      "Includes 2 lids: Straw Sports Cap and Wide-Mouth Chug Cap",
      "Dishwasher safe and fits standard vehicle cup holders"
    ],
    specifications: {
      "Brand": "HydroVault",
      "Capacity": "32 oz / 950 ml",
      "Cold Retention": "Up to 24 Hours",
      "Hot Retention": "Up to 12 Hours",
      "Weight": "410g",
      "Color": "Matte Obsidian Black"
    },
    tags: ["bottle", "flask", "fitness", "outdoors", "hydration", "sports"]
  },
  {
    id: "SP-113",
    name: "Classic Minimalist Chronograph Leather Watch",
    slug: "classic-minimalist-chronograph-leather-watch",
    category: "fashion-apparel",
    categoryName: "Fashion & Apparel",
    price: 149.99,
    originalPrice: 199.99,
    discountPercentage: 25,
    rating: 4.8,
    reviewsCount: 238,
    stock: 25,
    isAvailable: true,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Japanese quartz movement with genuine Italian full-grain leather strap and sapphire crystal.",
    description: "Timeless Scandinavian elegance meets precision timekeeping. Featuring an ultra-slim 7.8mm 316L surgical stainless steel case, clean sub-dials, and interchangeable vegetable-tanned leather straps.",
    features: [
      "Precision Japanese Miyota chronograph quartz movement",
      "Scratch-resistant anti-reflective coated sapphire crystal",
      "Full-grain hand-stitched Italian leather strap with quick release",
      "5 ATM / 50M water resistance",
      "Date display window and stopwatch complication"
    ],
    specifications: {
      "Brand": "NordicAura",
      "Case Diameter": "40 mm",
      "Case Thickness": "7.8 mm",
      "Strap Width": "20 mm",
      "Movement": "Miyota Chronograph Quartz",
      "Water Resistance": "5 ATM"
    },
    tags: ["watch", "leather", "classic", "minimalist", "fashion", "accessories"]
  },
  {
    id: "SP-114",
    name: "OmniPower 140W GaN Fast Charger & Hub",
    slug: "omnipower-140w-gan-fast-charger-hub",
    category: "electronics",
    categoryName: "Electronics & Gadgets",
    price: 74.99,
    originalPrice: 89.99,
    discountPercentage: 16,
    rating: 4.9,
    reviewsCount: 380,
    stock: 55,
    isAvailable: true,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Ultra-compact Gallium Nitride charger with 3x USB-C PD 3.1 and 1x USB-A ports.",
    description: "Power your entire digital ecosystem from a single pocket-sized brick. Powered by GaNFast technology, the OmniPower 140W fast-charges a 16\" MacBook Pro to 50% in just 28 minutes while simultaneously charging your phone and tablet safely.",
    features: [
      "Next-gen GaN III semiconductor delivers 40% smaller footprint with 3x efficiency",
      "USB-C Power Delivery 3.1 supports up to 140W single-port charging",
      "Intelligent dynamic power allocation across 4 ports",
      "Foldable travel prongs with UK/EU adapter compatibility",
      "ActiveProtect safety sensor monitors temperature 3 million times daily"
    ],
    specifications: {
      "Brand": "OmniPower",
      "Max Output": "140 Watts",
      "Ports": "3x USB-C, 1x USB-A",
      "Fast Protocols": "PD 3.1, QC 4.0+, PPS, AFC",
      "Weight": "260g"
    },
    tags: ["charger", "gan", "usb-c", "electronics", "power", "travel"]
  },
  {
    id: "SP-115",
    name: "ZenMat Alignment Eco Yoga & Workout Mat",
    slug: "zenmat-alignment-eco-yoga-workout-mat",
    category: "fitness-outdoors",
    categoryName: "Fitness & Outdoors",
    price: 54.99,
    originalPrice: 69.99,
    discountPercentage: 21,
    rating: 4.7,
    reviewsCount: 195,
    stock: 42,
    isAvailable: true,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Natural tree rubber with warrior non-slip polyurethane surface and laser-etched alignment guides.",
    description: "Never slip during sweaty flows again. ZenMat features an ultra-grippy polyurethane top layer bonded to a dense natural biodegradable tree rubber base. Laser-etched alignment lines help you position hands and feet precisely to prevent joint injury.",
    features: [
      "Unrivalled wet and dry warrior grip prevents slipping",
      "Laser-etched body alignment system for optimal pose symmetry",
      "Dense 5mm high-rebound cushioning protects knees, hips, and wrists",
      "100% PVC-free, non-toxic, and sustainably harvested tree rubber",
      "Includes premium canvas carry strap"
    ],
    specifications: {
      "Brand": "ZenLiving",
      "Thickness": "5.0 mm",
      "Dimensions": "183 cm x 68 cm (Extra Wide)",
      "Material": "Natural Biodegradable Rubber + Non-Slip PU",
      "Weight": "2.8 kg"
    },
    tags: ["yoga", "mat", "fitness", "eco", "exercise", "pilates"]
  },
  {
    id: "SP-116",
    name: "SmartGlow Matter RGBIC Floor Corner Lamp",
    slug: "smartglow-matter-rgbic-floor-corner-lamp",
    category: "smart-home",
    categoryName: "Smart Home & Living",
    price: 99.99,
    originalPrice: 129.99,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 220,
    stock: 28,
    isAvailable: true,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "16 million colors with Matter, Apple HomeKit, Alexa, Google Home, and music rhythm sync.",
    description: "Turn empty corners into dramatic living art. The SmartGlow corner floor lamp stands 57 inches high with individual segmented RGBIC LEDs. Sync with your Spotify playlist, movie soundtracks, or setup circadian wake-up lighting schedules.",
    features: [
      "Universal Matter-over-WiFi protocol compatible with Apple Home, Alexa & Google",
      "RGBIC technology displays multiple gradients simultaneously",
      "Music sync mode with high-sensitivity integrated microphone",
      "Weighted triangular aluminum base prevents tipping",
      "Preloaded with 64 dynamic festive and relaxing ambient scenes"
    ],
    specifications: {
      "Brand": "SmartGlow",
      "Height": "145 cm (57 Inches)",
      "Colors": "16 Million + Tunable White (2200K-6500K)",
      "Connectivity": "Matter, Wi-Fi 2.4GHz, Bluetooth",
      "Lifespan": "50,000 Hours"
    },
    tags: ["lamp", "smart-home", "rgb", "matter", "lighting", "home-decor"]
  }
];

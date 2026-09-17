// Mock data and type definitions for AFRIVERSE Arusha Edition

export type Language = "en" | "sw";
export type Currency = "USD" | "TZS";
export type UserRole = "admin" | "seller" | "buyer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopName?: string;
  phone?: string;
  avatar?: string;
}

// --- ARTISANS ---
export interface Artisan {
  id: string;
  name: string;
  craft: string;
  location: string;
  district: string;
  bio: { en: string; sw: string };
  rating: number;
  reviewCount: number;
  verified: boolean;
  yearsActive: number;
  specialties: string[];
  imageColor: string; // gradient fallback
  initials: string;
  phone: string;
}

export const artisans: Artisan[] = [
  {
    id: "a1",
    name: "Amina Kessy",
    craft: "Tanzanite & Gold Jewelry",
    location: "Cultural Heritage Centre, Dodoma Road, Arusha",
    district: "Arusha Central",
    bio: {
      en: "Third-generation Arusha goldsmith who crafts authentic Arusha artisan-made goods using traditional techniques.",
      sw: "Mfua dhahabu wa kizazi cha tatu wa Arusha anayetengeneza bidhaa halisi za mikono za Arusha.",
    },
    rating: 4.9,
    reviewCount: 248,
    verified: true,
    yearsActive: 12,
    specialties: ["Tanzanite Rings", "Gold Necklaces", "Maasai Shuka Jewelry"],
    imageColor: "from-tanzanite to-gold",
    initials: "AK",
    phone: "+255754998882",
  },
  {
    id: "a2",
    name: "Lemagas Ole Nkeri",
    craft: "Maasai Beadwork & Cultural Wear",
    location: "Arusha Maasai Market, Fire Road",
    district: "Monduli Road",
    bio: {
      en: "Maasai elder and master craftsperson creating authentic Arusha artisan-made goods including ceremonial collars and Maasai shuka wear.",
      sw: "Mzee wa Kimaasai na msanii bingwa anayetengeneza bidhaa halisi za mikono za Arusha.",
    },
    rating: 5.0,
    reviewCount: 193,
    verified: true,
    yearsActive: 28,
    specialties: ["Maasai Shuka Cloth", "Warrior Collars", "Beaded Sandals"],
    imageColor: "from-earth to-gold",
    initials: "LN",
    phone: "+255754998882",
  },
  {
    id: "a3",
    name: "Grace Mwangi",
    craft: "East African Fine Art",
    location: "Arusha Central Market Crafts Bazaar",
    district: "Arusha CBD",
    bio: {
      en: "Contemporary Arusha painter whose authentic Arusha artisan-made canvases capture Mount Meru and Maasai culture.",
      sw: "Mchoraji wa kisasa wa Arusha anayeunda sanaa halisi ya mikono ya Arusha.",
    },
    rating: 4.8,
    reviewCount: 167,
    verified: true,
    yearsActive: 9,
    specialties: ["Oil Paintings", "Natural Pigment Art", "Limited Edition Prints"],
    imageColor: "from-earth-dark to-earth",
    initials: "GM",
    phone: "+255754998882",
  },
  {
    id: "a4",
    name: "Joseph Mrema",
    craft: "Wood Carvings & Sculpture",
    location: "Tengeru Craft Cooperative",
    district: "Tengeru",
    bio: {
      en: "Arusha cooperative leader producing authentic Arusha artisan-made ebony sculptures and home decor.",
      sw: "Kiongozi wa ushirika wa Arusha anayetengeneza sanamu halisi za mbao za Arusha.",
    },
    rating: 4.7,
    reviewCount: 312,
    verified: true,
    yearsActive: 19,
    specialties: ["Ebony Figurines", "Decorative Masks", "Wildlife Sculptures"],
    imageColor: "from-obsidian-surface to-earth-dark",
    initials: "JM",
    phone: "+255754998882",
  },
  {
    id: "a5",
    name: "Fatuma Hassan",
    craft: "Arusha Coffee & Organic Spices",
    location: "Mount Meru Coffee & Craft Estate",
    district: "Usa River",
    bio: {
      en: "Arusha coffee farmer from the slopes of Mount Meru crafting authentic Arusha artisan-made coffee and spice sets.",
      sw: "Mkulima wa kahawa wa Arusha anayetengeneza kahawa na viungo halisi vya Arusha.",
    },
    rating: 4.9,
    reviewCount: 521,
    verified: true,
    yearsActive: 15,
    specialties: ["Single-Origin Arabica", "Cardamom Blends", "Organic Spice Sets"],
    imageColor: "from-earth-dark to-earth-light",
    initials: "FH",
    phone: "+255754998882",
  },
  {
    id: "a6",
    name: "Daniel Kimaro",
    craft: "Safari & Cultural Tours",
    location: "Clock Tower Craft Bazaar",
    district: "Arusha Town",
    bio: {
      en: "Licensed Arusha tour guide offering authentic Arusha artisan-made cultural experiences and local workshop visits.",
      sw: "Mwongozo wa safari wa Arusha anayetoa ziara za kitamaduni na uzoefu wa mafundi.",
    },
    rating: 5.0,
    reviewCount: 884,
    verified: true,
    yearsActive: 16,
    specialties: ["Big Five Safari", "Maasai Village Visits", "Arusha Craft Tours"],
    imageColor: "from-tanzanite-deep to-tanzanite",
    initials: "DK",
    phone: "+255754998882",
  },
];

// --- PRODUCTS ---
export interface Product {
  id: string;
  name: string;
  artisanId: string;
  artisanName: string;
  category: string;
  priceUSD: number;
  priceTZS: number;
  description: { en: string; sw: string };
  tags: string[];
  inStock: boolean;
  featured: boolean;
  imageKey: string;
}

export const defaultProducts: Product[] = [
  {
    id: "p1",
    name: "Royal Tanzanite Halo Ring",
    artisanId: "a1",
    artisanName: "Amina Kessy",
    category: "Tanzanite & Jewelry",
    priceUSD: 1850,
    priceTZS: 4773000,
    description: {
      en: "Authentic Arusha artisan-made goods: 18K gold ring with 3.2ct certified tanzanite stone from Arusha.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Pete ya dhahabu ya karati 18 yenye jiwe la tanzanite.",
    },
    tags: ["Tanzanite", "Gold", "Ring", "Luxury", "Arusha Certified"],
    inStock: true,
    featured: true,
    imageKey: "tanzanite-jewelry",
  },
  {
    id: "p2",
    name: "Authentic Maasai Shuka Cloth",
    artisanId: "a2",
    artisanName: "Lemagas Ole Nkeri",
    category: "Maasai Shuka & Textiles",
    priceUSD: 65,
    priceTZS: 167700,
    description: {
      en: "Authentic Arusha artisan-made goods: Traditional red and blue acrylic Maasai Shuka fabric, hand-woven in Arusha.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Kitambaa cha jadi cha Maasai Shuka cha nyekundu na bluu.",
    },
    tags: ["Maasai Shuka", "Textiles", "Arusha Handcrafted", "Traditional"],
    inStock: true,
    featured: true,
    imageKey: "maasai-beadwork",
  },
  {
    id: "p3",
    name: "Maasai Shuka Beaded Jewelry Set",
    artisanId: "a2",
    artisanName: "Lemagas Ole Nkeri",
    category: "Maasai Shuka Jewelry",
    priceUSD: 120,
    priceTZS: 309600,
    description: {
      en: "Authentic Arusha artisan-made goods: Handcrafted jewelry set wrapped in vibrant Maasai Shuka threads and glass beads.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Seti ya mapambo ya shanga zilizosokotwa na vitambaa vya Maasai Shuka.",
    },
    tags: ["Maasai Shuka Jewelry", "Beadwork", "Necklace", "Handmade"],
    inStock: true,
    featured: true,
    imageKey: "maasai-beadwork",
  },
  {
    id: "p4",
    name: "Mount Meru Sunset Oil Canvas",
    artisanId: "a3",
    artisanName: "Grace Mwangi",
    category: "Fine Art",
    priceUSD: 1400,
    priceTZS: 3612000,
    description: {
      en: "Authentic Arusha artisan-made goods: Original oil painting of Mount Meru created with natural volcanic pigments.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Mchoro asili wa mafuta wa Mlima Meru.",
    },
    tags: ["Fine Art", "Mount Meru", "Oil Painting", "Arusha Art"],
    inStock: true,
    featured: true,
    imageKey: "african-art",
  },
  {
    id: "p5",
    name: "Tanzanian AA Single-Origin Coffee",
    artisanId: "a5",
    artisanName: "Fatuma Hassan",
    category: "Coffee & Spices",
    priceUSD: 38,
    priceTZS: 98040,
    description: {
      en: "Authentic Arusha artisan-made goods: Shade-grown Arabica coffee from Mount Meru slopes at 1,600m altitude.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Kahawa bora ya Arabica kutoka miteremko ya Mlima Meru.",
    },
    tags: ["Coffee", "Mount Meru", "Organic", "Arusha Roasted"],
    inStock: true,
    featured: true,
    imageKey: "coffee-spices",
  },
  {
    id: "p6",
    name: "Ebony Maasai Sculptures",
    artisanId: "a4",
    artisanName: "Joseph Mrema",
    category: "Wood Carvings",
    priceUSD: 310,
    priceTZS: 799800,
    description: {
      en: "Authentic Arusha artisan-made goods: Hand-carved ebony wooden figurine set from Tengeru Craft Cooperative.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Sanamu ya mbao za ebony kutoka ushirika wa Tengeru.",
    },
    tags: ["Wood Carving", "Ebony", "Tengeru", "Sculpture"],
    inStock: true,
    featured: false,
    imageKey: "african-art",
  },
];

// --- CATEGORIES ---
export interface Category {
  id: string;
  name: { en: string; sw: string };
  description: { en: string; sw: string };
  icon: string;
  productCount: number;
  imageKey: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "c1",
    name: { en: "Tanzanite & Ethical Jewelry", sw: "Tanzanite & Mapambo" },
    description: { en: "Certified tanzanite and handcrafted gold jewelry from authentic Arusha artisan-made goods.", sw: "Tanzanite iliyothibitishwa na mapambo ya dhahabu." },
    icon: "💎",
    productCount: 48,
    imageKey: "tanzanite-jewelry",
    color: "from-tanzanite-deep to-tanzanite",
  },
  {
    id: "c2",
    name: { en: "Maasai Shuka & Beadwork", sw: "Maasai Shuka & Shanga" },
    description: { en: "Authentic Arusha artisan-made goods including Maasai Shuka textiles, ceremonial wear, and accessories.", sw: "Vitambaa vya Maasai Shuka na mapambo ya shanga." },
    icon: "🔴",
    productCount: 124,
    imageKey: "maasai-beadwork",
    color: "from-red-900 to-earth",
  },
  {
    id: "c3",
    name: { en: "Maasai Shuka Jewelry", sw: "Mapambo ya Maasai Shuka" },
    description: { en: "Intricate necklaces, bangles, and earrings woven with authentic Maasai Shuka fabric.", sw: "Mapambo yaliyotengenezwa kwa vitambaa vya Maasai Shuka." },
    icon: "✨",
    productCount: 52,
    imageKey: "maasai-beadwork",
    color: "from-gold to-earth-dark",
  },
  {
    id: "c4",
    name: { en: "Fine Art & Wood Carvings", sw: "Sanaa & Uchongaji" },
    description: { en: "Original East African paintings, sculptures, and sustainably-sourced wood carvings.", sw: "Mchoro asili wa Afrika Mashariki na uchongaji." },
    icon: "🎨",
    productCount: 87,
    imageKey: "african-art",
    color: "from-earth-dark to-obsidian-surface",
  },
  {
    id: "c5",
    name: { en: "Arusha Coffee & Organic Spices", sw: "Kahawa & Viungo" },
    description: { en: "Single-origin Mount Meru coffee and premium organic spices from Arusha artisans.", sw: "Kahawa ya Mlima Meru na viungo kutoka Arusha." },
    icon: "☕",
    productCount: 63,
    imageKey: "coffee-spices",
    color: "from-earth to-earth-light",
  },
];

// --- ACCURATE ARUSHA ARTISAN SHOPS & HUBS ---
export interface ArushLocation {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  openingHours: string;
  description: string;
  artisanCount: number;
  x: number; // percentage position on map
  y: number;
  highlight: boolean;
}

export const arushLocations: ArushLocation[] = [
  {
    id: "l1",
    name: "Cultural Heritage Centre",
    type: "Premier Artisan Hub & Gallery",
    address: "Dodoma Road, Arusha, Tanzania",
    phone: "+255754998882",
    openingHours: "8:00 AM - 6:00 PM (Daily)",
    description: "Arusha's premier artisan gallery housing 200+ master craftsmen, Tanzanite gem cutters, and wood carvers.",
    artisanCount: 145,
    x: 48,
    y: 42,
    highlight: true,
  },
  {
    id: "l2",
    name: "Arusha Maasai Market",
    type: "Traditional Crafts Market",
    address: "Fire Road / Monduli Road, Arusha, Tanzania",
    phone: "+255754998882",
    openingHours: "7:30 AM - 7:00 PM (Daily)",
    description: "Vibrant open-air market where Maasai women and artisans craft authentic Maasai Shuka textiles, beadwork, and sandals.",
    artisanCount: 210,
    x: 38,
    y: 58,
    highlight: true,
  },
  {
    id: "l3",
    name: "Tengeru Craft Cooperative",
    type: "Community Artisan Cooperative",
    address: "Arusha-Moshi Highway, Tengeru, Arusha",
    phone: "+255754998882",
    openingHours: "8:00 AM - 5:30 PM (Mon-Sat)",
    description: "Artisan woodworking and weaving cooperative producing sustainably harvested ebony sculptures and home decor.",
    artisanCount: 85,
    x: 74,
    y: 36,
    highlight: true,
  },
  {
    id: "l4",
    name: "Arusha Central Market Crafts Bazaar",
    type: "Artisan & Spice Bazaar",
    address: "Market Street, Arusha CBD, Tanzania",
    phone: "+255754998882",
    openingHours: "7:00 AM - 6:30 PM (Daily)",
    description: "Heart of Arusha town where local spice blenders, leather crafters, and fine artists display authentic regional goods.",
    artisanCount: 120,
    x: 55,
    y: 50,
    highlight: false,
  },
  {
    id: "l5",
    name: "Clock Tower Craft Bazaar",
    type: "Cultural Tour & Craft Center",
    address: "Sokoine Road, Arusha Town, Tanzania",
    phone: "+255754998882",
    openingHours: "8:00 AM - 6:00 PM (Daily)",
    description: "Central landmark hub connecting visitors with licensed cultural tour guides and authentic handmade jewelry stalls.",
    artisanCount: 65,
    x: 50,
    y: 65,
    highlight: true,
  },
  {
    id: "l6",
    name: "Mount Meru Coffee & Craft Estate",
    type: "Coffee Farm & Artisan Workshop",
    address: "Usa River, Mount Meru Slopes, Arusha",
    phone: "+255754998882",
    openingHours: "8:30 AM - 5:00 PM (Mon-Sat)",
    description: "Shade-grown organic coffee farm hosting local roasting workshops, pottery, and organic spice blending.",
    artisanCount: 40,
    x: 28,
    y: 30,
    highlight: false,
  },
];

// --- STATS ---
export const stats = [
  { value: "2,400+", label: { en: "Arusha Artisans", sw: "Mafundi wa Arusha" } },
  { value: "100%", label: { en: "Arusha Artisan-Made", sw: "Yaliyotengenezwa Arusha" } },
  { value: "TZS 4.2B", label: { en: "Direct Artisan Payouts", sw: "Malipo ya Mafundi" } },
  { value: "99.8%", label: { en: "Authenticity Verified", sw: "Cheti cha Uhalisi" } },
];

// --- TESTIMONIALS ---
export const testimonials = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    country: "United Kingdom 🇬🇧",
    text: "The tanzanite ring crafted by Amina Kessy is spectacular. Knowing it comes directly from an authentic Arusha artisan with complete transparency makes it priceless.",
    rating: 5,
    product: "Royal Tanzanite Halo Ring",
  },
  {
    id: "t2",
    name: "Jean-Pierre Moreau",
    country: "France 🇫🇷",
    text: "Our Maasai Shuka cloth and cultural tour were delivered seamlessly to our hotel in Arusha via Boda Boda sealed with the official Afriverse label. Outstanding service!",
    rating: 5,
    product: "Authentic Maasai Shuka Cloth",
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    country: "Japan 🇯🇵",
    text: "The Maasai Shuka jewelry set is breathtaking. The craftsmanship from Arusha's artisans is museum-grade. Will order again!",
    rating: 5,
    product: "Maasai Shuka Beaded Jewelry Set",
  },
];

// --- CURRENCY FORMATTER ---
export function formatPrice(usd: number, currency: Currency): string {
  if (currency === "TZS") {
    const tzs = Math.round(usd * 2580);
    return `TZS ${tzs.toLocaleString()}`;
  }
  return `$${usd.toLocaleString()}`;
}

// --- PAYMENT METHODS ---
export interface PaymentMethod {
  id: string;
  name: string;
  provider: string;
  color: string;
  type: "mobile_money" | "card";
  badgeBg: string;
  badgeTextColor: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "mpesa", name: "M-Pesa", provider: "Vodacom", color: "#E00000", type: "mobile_money", badgeBg: "bg-red-600", badgeTextColor: "text-white" },
  { id: "tigopesa", name: "Tigo Pesa", provider: "Tigo", color: "#00A0E2", type: "mobile_money", badgeBg: "bg-sky-600", badgeTextColor: "text-white" },
  { id: "airtelmoney", name: "Airtel Money", provider: "Airtel", color: "#FF0000", type: "mobile_money", badgeBg: "bg-red-700", badgeTextColor: "text-white" },
  { id: "visa", name: "Visa", provider: "Visa Inc.", color: "#1A1F71", type: "card", badgeBg: "bg-blue-900", badgeTextColor: "text-amber-400" },
  { id: "mastercard", name: "Mastercard", provider: "Mastercard International", color: "#EB001B", type: "card", badgeBg: "bg-stone-900", badgeTextColor: "text-orange-500" },
];

export const shippingPartners = [
  "Local Arusha Boda Boda Express",
  "Afriverse Direct Courier",
  "Tanzania Posts Corporation (TPC)",
  "DHL International Express",
];

// --- MOCK ORDERS FOR BODA BODA DELIVERY WORKFLOW ---
export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string; // Arusha district (e.g. Njiro, Sakina, CBD)
  items: { productName: string; price: number; quantity: number }[];
  totalPriceUSD: number;
  totalPriceTZS: number;
  paymentMethod: string;
  status: "Pending" | "Packaged" | "Boda Boda Dispatched" | "Delivered";
  afriverseLabelApplied: boolean;
  bodaBodaRider?: { name: string; phone: string; plateNumber: string };
  createdAt: string;
}

export const initialOrders: Order[] = [
  {
    id: "AFR-8882-01",
    customerName: "Baraka Edward",
    customerPhone: "+255754998882",
    deliveryLocation: "Njiro Complex, Arusha",
    items: [{ productName: "Authentic Maasai Shuka Cloth", price: 65, quantity: 2 }],
    totalPriceUSD: 130,
    totalPriceTZS: 335400,
    paymentMethod: "M-Pesa (+255754998882)",
    status: "Pending",
    afriverseLabelApplied: false,
    createdAt: "2026-09-09 09:30 AM",
  },
  {
    id: "AFR-8882-02",
    customerName: "Sophia Loren",
    customerPhone: "+255754998882",
    deliveryLocation: "Sakina Area, Namanga Road, Arusha",
    items: [{ productName: "Maasai Shuka Beaded Jewelry Set", price: 120, quantity: 1 }],
    totalPriceUSD: 120,
    totalPriceTZS: 309600,
    paymentMethod: "Visa (*4829)",
    status: "Packaged",
    afriverseLabelApplied: true,
    createdAt: "2026-09-09 10:15 AM",
  },
  {
    id: "AFR-8882-03",
    customerName: "Rashid Ali",
    customerPhone: "+255754998882",
    deliveryLocation: "Clock Tower Plaza, Arusha CBD",
    items: [{ productName: "Royal Tanzanite Halo Ring", price: 1850, quantity: 1 }],
    totalPriceUSD: 1850,
    totalPriceTZS: 4773000,
    paymentMethod: "M-Pesa (+255754998882)",
    status: "Boda Boda Dispatched",
    afriverseLabelApplied: true,
    bodaBodaRider: {
      name: "Juma Kassim",
      phone: "+255754998882",
      plateNumber: "MC 452 ABC",
    },
    createdAt: "2026-09-09 08:00 AM",
  },
];

// --- CHAT MESSAGES ---
export interface ChatMessage {
  id: string;
  senderRole: "buyer" | "seller" | "admin";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  artisanName: string;
  artisanPhone: string;
  buyerName: string;
  topic: string;
  messages: ChatMessage[];
}

export const initialChatThreads: ChatThread[] = [
  {
    id: "chat-1",
    artisanName: "Amina Kessy",
    artisanPhone: "+255754998882",
    buyerName: "Baraka Edward",
    topic: "Maasai Shuka & Tanzanite Custom Order",
    messages: [
      { id: "m1", senderRole: "buyer", senderName: "Baraka Edward", text: "Habari Amina! Is the Maasai Shuka jewelry set packaged with the official Afriverse label?", timestamp: "09:40 AM" },
      { id: "m2", senderRole: "seller", senderName: "Amina Kessy", text: "Marahaba Baraka! Yes, I sealed the package in a box with the Afriverse label and sent it via Boda Boda rider Juma (+255754998882).", timestamp: "09:42 AM" },
      { id: "m3", senderRole: "buyer", senderName: "Baraka Edward", text: "Asante sana! Please notify him to call when he arrives at Njiro Complex.", timestamp: "09:45 AM" },
    ],
  },
];

// Mock data and type definitions for AFRIVERSE Arusha Edition

export type Language = "en" | "sw";
export type Currency = "USD" | "TZS";
export type UserRole = "admin" | "seller" | "buyer" | "artisan" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopName?: string;
  phone?: string;
  avatar?: string;
}

// --- REVIEWS ---
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
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
    craft: "Heritage Jewelry & Meru Crafts",
    location: "Cultural Heritage Centre, Dodoma Road, Arusha",
    district: "Arusha Central",
    bio: {
      en: "Third-generation Arusha metalsmith and jeweler crafting authentic Arusha artisan-made goods using heritage brass, hand-blown beads, and traditional techniques.",
      sw: "Fundi wa vito wa kizazi cha tatu wa Arusha anayetengeneza bidhaa halisi za mikono za Arusha kwa kutumia shaba na shanga za jadi.",
    },
    rating: 4.9,
    reviewCount: 248,
    verified: true,
    yearsActive: 12,
    specialties: ["Maasai Shuka Jewelry", "Handmade Brass Chokers", "Meru Clay Crafts"],
    imageColor: "from-amber-700 to-gold",
    initials: "AK",
    phone: "+255754112233",
  },
  {
    id: "a2",
    name: "Lemagas Ole Nkeri",
    craft: "Maasai Beadwork & Cultural Wear",
    location: "Arusha Maasai Market, Fire Road",
    district: "Monduli Road",
    bio: {
      en: "Maasai elder and master craftsperson creating authentic Arusha artisan-made goods including ceremonial collars and Maasai shuka wear.",
      sw: "Mzee wa Kimaasai na msanii bingwa anayetengeneza bidhaa halisi za mikono za Arusha ikiwemo shuka na mikufu ya heshima.",
    },
    rating: 5.0,
    reviewCount: 193,
    verified: true,
    yearsActive: 28,
    specialties: ["Maasai Shuka Cloth", "Warrior Collars", "Beaded Ceremonial Shields"],
    imageColor: "from-earth to-gold",
    initials: "LN",
    phone: "+255754334455",
  },
  {
    id: "a3",
    name: "Grace Mwangi",
    craft: "East African Fine Art",
    location: "Arusha Central Market Crafts Bazaar",
    district: "Arusha CBD",
    bio: {
      en: "Contemporary Arusha painter whose authentic Arusha artisan-made canvases capture Mount Meru sunsets, wildlife, and Maasai pastoral culture.",
      sw: "Mchoraji wa kisasa wa Arusha anayeunda sanaa halisi ya mikono inayoonyesha machweo ya Mlima Meru na maisha ya kichungaji.",
    },
    rating: 4.8,
    reviewCount: 167,
    verified: true,
    yearsActive: 9,
    specialties: ["Oil Paintings", "Natural Volcanic Pigment Art", "Limited Edition Canvas"],
    imageColor: "from-earth-dark to-earth",
    initials: "GM",
    phone: "+255754556677",
  },
  {
    id: "a4",
    name: "Joseph Mrema",
    craft: "Arusha Handcrafted Sculptures",
    location: "Arusha Central Crafts Bazaar",
    district: "Arusha Town",
    bio: {
      en: "Arusha craft guild master producing ethically harvested hardwood sculptures, cultural figurines, and artisanal home decor.",
      sw: "Bingwa wa sanaa ya mikono wa Arusha anayetengeneza sanamu za mbao zilizovunwa kisheria na mapambo ya nyumbani.",
    },
    rating: 4.7,
    reviewCount: 312,
    verified: true,
    yearsActive: 19,
    specialties: ["Handcrafted Figurines", "Decorative Bowls", "Wildlife Sculptures"],
    imageColor: "from-obsidian-surface to-earth-dark",
    initials: "JM",
    phone: "+255754778899",
  },
  {
    id: "a5",
    name: "Fatuma Hassan",
    craft: "Arusha Coffee & Organic Spices",
    location: "Mount Meru Coffee & Craft Estate",
    district: "Usa River",
    bio: {
      en: "Arusha coffee grower from the slopes of Mount Meru crafting authentic Arusha artisan-made single-origin coffee and spice sets.",
      sw: "Mkulima wa kahawa wa Arusha kutoka miteremko ya Mlima Meru anayetengeneza kahawa na viungo halisi vya asili.",
    },
    rating: 4.9,
    reviewCount: 521,
    verified: true,
    yearsActive: 15,
    specialties: ["Single-Origin Arabica", "Cardamom Blends", "Organic Spice Sets"],
    imageColor: "from-earth-dark to-earth-light",
    initials: "FH",
    phone: "+255754889911",
  },
  {
    id: "a6",
    name: "Daniel Kimaro",
    craft: "Safari & Cultural Tours",
    location: "Clock Tower Craft Bazaar",
    district: "Arusha Town",
    bio: {
      en: "Licensed Arusha cultural guide offering authentic cultural experiences, heritage workshops, and artisan community visits.",
      sw: "Mwongozo wa safari wa Arusha anayetoa ziara za kitamaduni na uzoefu wa mafundi wa ndani.",
    },
    rating: 5.0,
    reviewCount: 884,
    verified: true,
    yearsActive: 16,
    specialties: ["Cultural Heritage Tours", "Maasai Village Visits", "Arusha Craft Walks"],
    imageColor: "from-amber-900 to-gold",
    initials: "DK",
    phone: "+255754223388",
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
  artisanStory: { en: string; sw: string };
  culturalBackground: { en: string; sw: string };
  materialAuthenticity: { en: string; sw: string };
  recommendedUses: { en: string; sw: string }[];
  costBreakdown: {
    artisanDirectPercent: number;
    materialsPercent: number;
    logisticsPercent: number;
    communityFundPercent: number;
  };
  reviews: Review[];
  tags: string[];
  inStock: boolean;
  featured: boolean;
  imageKey: string;
  imageUrl?: string;
  image?: string;
}

export const defaultProducts: Product[] = [
  {
    id: "p2",
    name: "Authentic Maasai Shuka Cloth",
    artisanId: "a2",
    artisanName: "Lemagas Ole Nkeri",
    category: "Maasai Shuka & Cultural Textiles",
    priceUSD: 65,
    priceTZS: 167700,
    description: {
      en: "Authentic Arusha artisan-made goods: Traditional red and blue acrylic Maasai Shuka fabric, hand-finished in Arusha.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Kitambaa cha jadi cha Maasai Shuka chenye rangi nyekundu na bluu kilichomalizika Arusha.",
    },
    artisanStory: {
      en: "Lemagas Ole Nkeri has woven and curated traditional Maasai Shuka textiles for over 28 years at the Arusha Maasai Market. Every thread is selected for resilience against harsh savanna winds, continuing traditions passed down from his pastoralist forebears.",
      sw: "Lemagas Ole Nkeri amekuwa akitengeneza vitambaa vya asili vya Maasai Shuka kwa zaidi ya miaka 28 katika Soko la Maasai Arusha. Kila uzi umechaguliwa kustahimili hali ya hewa, akidumisha urithi wa mababu zake.",
    },
    culturalBackground: {
      en: "The Maasai Shuka is the iconic garment of the Maasai people of northern Tanzania. Traditionally worn wrapped around the torso, the vibrant red geometric patterns symbolize bravery, unity with the earth, and cultural resilience across generations.",
      sw: "Maasai Shuka ni vazi mashuhuri la jamii ya Wamaasai kaskazini mwa Tanzania. Rangi nyekundu na mistari huashiria ushujaa, ulinzi na mshikamano wa kijamii unaodumu kwa vizazi vingi.",
    },
    materialAuthenticity: {
      en: "100% thick-gauge acrylic yarn with authentic selvage edge. Softened with natural botanical wash; colorfast under intense sunlight and gentle machine wash.",
      sw: "Uzi imara wa akriliki 100% wenye kingo halisi za jadi. Umeoshwa kiasili na hauondoki rangi juani au kwa kufua.",
    },
    recommendedUses: [
      { en: "Traditional ceremonial wrap or shawl", sw: "Vazi la heshima la mabegani au sherehe" },
      { en: "Luxury safari throw blanket or picnic spread", sw: "Blanketi ya safari, mapambo ya sofa au pikiniki" },
      { en: "Statement home wall hanging & bohemian upholstery", sw: "Pambo la ukutani au kitambaa cha meza" },
    ],
    costBreakdown: {
      artisanDirectPercent: 70,
      materialsPercent: 15,
      logisticsPercent: 10,
      communityFundPercent: 5,
    },
    reviews: [
      {
        id: "rev-201",
        author: "Jean-Pierre Moreau",
        rating: 5,
        date: "2026-08-14",
        title: "Incredible quality and warmth",
        comment: "Ordered this during my visit to Arusha and it arrived at our lodge via Boda Boda in a sealed Afriverse box. Thick, rich texture and vibrant colors.",
        verified: true,
        location: "Lyon, France",
      },
      {
        id: "rev-202",
        author: "Neema Mollel",
        rating: 5,
        date: "2026-09-02",
        title: "Shuka halisi ya kiasili",
        comment: "Kitambaa kizito na kimenyooka vizuri. Ni zawadi bora sana kwa wageni wanaotembelea Tanzania.",
        verified: true,
        location: "Arusha, Tanzania",
      },
    ],
    tags: ["Maasai Shuka", "Textiles", "Arusha Handcrafted", "Traditional", "Savanna"],
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
      en: "Authentic Arusha artisan-made goods: Handcrafted jewelry set wrapped in vibrant Maasai Shuka threads and Czech glass beads.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Seti ya mapambo ya shanga zilizosokotwa na vitambaa vya Maasai Shuka na shanga imara.",
    },
    artisanStory: {
      en: "Created by a cooperative of 14 Maasai women artisans under Lemagas Ole Nkeri's direction in Monduli, this set represents communal harmony. Each artisan stitches patterns reflecting clan stories and nature motifs.",
      sw: "Imeundwa na ushirika wa wanawake 14 wa Kimaasai chini ya uongozi wa Lemagas huko Monduli. Kila muundo unaelezea hadithi za koo na mazingira ya asili.",
    },
    culturalBackground: {
      en: "Beadwork is a central form of visual speech in Maasai culture. Red symbolizes blood and bravery; white represents peace and pure milk; blue represents the sky and rain that nourishes the pastures.",
      sw: "Ufumaji wa shanga ni lugha ya picha katika utamaduni wa Kimaasai. Nyekundu inaashiria ushujaa; nyeupe amani na maziwa safi; bluu anga na mvua yenye neema.",
    },
    materialAuthenticity: {
      en: "Sustainably reclaimed cattle hide backing, Czech glass seed beads, brass wire clasp, and genuine Maasai Shuka edge binding.",
      sw: "Ngozi halisi iliyosafishwa, shanga za kioo, vifungo vya shaba, na pindo la kitambaa cha Maasai Shuka.",
    },
    recommendedUses: [
      { en: "High-fashion cultural gala or evening statement necklace", sw: "Mkufu wa mtindo wa kipekee kwa sherehe za hadhi" },
      { en: "Collector's framed African jewelry display", sw: "Maonyesho ya sanaa na vito vya kiasili" },
      { en: "Cherished cross-cultural wedding gift", sw: "Zawadi ya heshima kwa harusi na matukio maalum" },
    ],
    costBreakdown: {
      artisanDirectPercent: 75,
      materialsPercent: 12,
      logisticsPercent: 8,
      communityFundPercent: 5,
    },
    reviews: [
      {
        id: "rev-301",
        author: "Yuki Tanaka",
        rating: 5,
        date: "2026-07-29",
        title: "Museum-grade craftsmanship",
        comment: "The detail on the collar and matching earrings is mesmerizing. Arrived safely packaged with the artisan certificate.",
        verified: true,
        location: "Tokyo, Japan",
      },
    ],
    tags: ["Maasai Shuka Jewelry", "Beadwork", "Necklace", "Handmade", "Ceremonial"],
    inStock: true,
    featured: true,
    imageKey: "maasai-beadwork",
  },
  {
    id: "p4",
    name: "Mount Meru Sunset Oil Canvas",
    artisanId: "a3",
    artisanName: "Grace Mwangi",
    category: "East African Fine Art & Decor",
    priceUSD: 1400,
    priceTZS: 3612000,
    description: {
      en: "Authentic Arusha artisan-made goods: Original oil painting of Mount Meru created with natural volcanic earth pigments and linseed oil.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Mchoro asili wa mafuta wa Mlima Meru uliotengenezwa kwa rangi za udongo wa volkano na mafuta ya kitani.",
    },
    artisanStory: {
      en: "Grace Mwangi paints en plein air from her open-air studio overlooking the slopes of Mount Meru. She grinds local volcanic ash, red laterite soil, and crushed ochre directly into her palette to achieve luminous, authentic earth tones.",
      sw: "Grace Mwangi anachora akiwa kwenye studio yake inayoangalia Mlima Meru. Anatumia udongo asili wa volkano na madini ya rangi kuunda picha zenye uhai.",
    },
    culturalBackground: {
      en: "Mount Meru (4,562m) is the sacred guardian of Arusha, revered by the Waarusha and Wameru peoples as an ancestor mountain. Its jagged caldera and cloud crowns have inspired East African folklore for centuries.",
      sw: "Mlima Meru (mita 4,562) ni mlinzi wa kihistoria wa Arusha, anayeheshimiwa na jamii za Waarusha na Wameru kama mlima wa baraka na vyanzo vya maji.",
    },
    materialAuthenticity: {
      en: "Hand-stretched organic cotton canvas over seasoned Tanzanian cypress stretcher bars. Sealed with UV-protective archival varnish.",
      sw: "Turubai ya pamba asilia iliyotandikwa kwenye fremu imara ya mbao za mberoshi. Imepakwa kinga ya mionzi ya jua.",
    },
    recommendedUses: [
      { en: "Luxury living room or executive office centerpiece", sw: "Pambo kuu la sebule ya kifahari au ofisi ya hadhi" },
      { en: "Fine art investment and heritage collection", sw: "Ukusanyaji wa sanaa halisi ya thamani inayopanda" },
    ],
    costBreakdown: {
      artisanDirectPercent: 78,
      materialsPercent: 12,
      logisticsPercent: 6,
      communityFundPercent: 4,
    },
    reviews: [
      {
        id: "rev-401",
        author: "Sarah Mitchell",
        rating: 5,
        date: "2026-08-30",
        title: "Spectacular focal point in our home",
        comment: "The volcanic pigments give Mount Meru a golden glow at sunset that photo prints can never replicate. Truly breathtaking.",
        verified: true,
        location: "London, UK",
      },
    ],
    tags: ["Fine Art", "Mount Meru", "Oil Painting", "Arusha Art", "Canvas"],
    inStock: true,
    featured: true,
    imageKey: "african-art",
  },
  {
    id: "p5",
    name: "Tanzanian AA Single-Origin Coffee",
    artisanId: "a5",
    artisanName: "Fatuma Hassan",
    category: "Arusha Coffee & Organic Spices",
    priceUSD: 38,
    priceTZS: 98040,
    description: {
      en: "Authentic Arusha artisan-made goods: Shade-grown Arabica coffee from Mount Meru volcanic slopes at 1,600m altitude.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Kahawa bora ya Arabica iliyokuzwa kivulini kwenye miteremko ya Mlima Meru kwa urefu wa mita 1,600.",
    },
    artisanStory: {
      en: "Fatuma Hassan's family cooperative tends heirloom Bourbon-variety Arabica coffee trees beneath banana shade trees on the slopes of Mount Meru. Hand-picked, spring-washed, and roasted in micro-batches in Arusha.",
      sw: "Ushirika wa kifamilia wa Fatuma Hassan unakuza kahawa ya Arabica chini ya migomba kwenye miteremko ya Mlima Meru. Inachumwa kwa mikono na kukaangwa kwa makini Arusha.",
    },
    culturalBackground: {
      en: "Coffee farming has shaped Arusha's rural culture for more than a century. The volcanic soil of Mount Meru imparts crisp blackcurrant acidity and honey sweetness distinctive to northern Tanzanian highlands.",
      sw: "Kilimo cha kahawa kimejenga maisha ya vijijini Arusha kwa karne nyingi. Udongo wa volkano unaleta ladha ya matunda na utamu asili unaotambulika kimataifa.",
    },
    materialAuthenticity: {
      en: "Grade AA hand-sorted whole bean Arabica. Fair Trade and organic certified; packed in biodegradable valve foil bags with roast date stamp.",
      sw: "Kahawa daraja la AA Arabica iliyochambuliwa kwa mkono. Imefungwa kwenye mfuko maalum wa kuhifadhi unyevu na harufu.",
    },
    recommendedUses: [
      { en: "Artisanal pour-over, French press, or Chemex brewing", sw: "Kahawa ya asubuhi kwa mtindo wa chujio au press" },
      { en: "Authentic Tanzanian coffee ceremony with guests", sw: "Makaribisho maalum ya kahawa safi ya kiasili" },
    ],
    costBreakdown: {
      artisanDirectPercent: 72,
      materialsPercent: 14,
      logisticsPercent: 9,
      communityFundPercent: 5,
    },
    reviews: [
      {
        id: "rev-501",
        author: "Marcus Webb",
        rating: 5,
        date: "2026-09-05",
        title: "Best African Arabica I've ever tasted",
        comment: "Rich notes of dark berries and wild honey with smooth body. The packaging was pristine.",
        verified: true,
        location: "Dar es Salaam, Tanzania",
      },
    ],
    tags: ["Coffee", "Mount Meru", "Organic", "Arusha Roasted", "Arabica"],
    inStock: true,
    featured: true,
    imageKey: "coffee-spices",
  },
  {
    id: "p7",
    name: "Handwoven Maasai Beaded Shield Wall Art",
    artisanId: "a2",
    artisanName: "Lemagas Ole Nkeri",
    category: "Maasai Shuka & Cultural Textiles",
    priceUSD: 180,
    priceTZS: 464400,
    description: {
      en: "Authentic Arusha artisan-made goods: Hand-stitched Maasai warrior ceremonial shield wall decor crafted with buffalo leather and glass bead mosaics.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Ngao ya kishujaa ya ukutani iliyoshonwa kwa ngozi imara na shanga za kioo za Kimaasai.",
    },
    artisanStory: {
      en: "Lemagas crafted this ceremonial decorative shield honoring warrior heraldry. Stitched over bent olive wood hoops, each bead row follows sacred geometric codes that guard homes and bring good fortune.",
      sw: "Lemagas ametengeneza ngao hii ya pambo akifuata miundo ya kitamaduni ya mashujaa. Imefungwa kwenye fremu ya mti wa mzeituni kwa ulinzi na baraka ya makazi.",
    },
    culturalBackground: {
      en: "The traditional Maasai shield (el-longo) was carried by Morans (warriors) for protection. In contemporary interior decor, it represents family guardian energy, resilience, and unshakeable pride.",
      sw: "Ngao ya jadi ya Kimaasai (el-longo) ilibebwa na Morani kwa ulinzi. Leo hutumika kama pambo linaloashiria ulinzi wa familia na fahari ya utamaduni.",
    },
    materialAuthenticity: {
      en: "Ethically sourced cured cowhide, seasoned wild olive frame, sinew stitching, and vibrant glass beads.",
      sw: "Ngozi halisi iliyotibiwa, fremu ya mti mgumu, mishipa ya asili, na shanga dhabiti za kioo.",
    },
    recommendedUses: [
      { en: "Striking entrance hall or library focal artwork", sw: "Pambo maridadi la ukumbi wa kuingilia au sebuleni" },
      { en: "Authentic East African heritage interior installation", sw: "Mapambo ya hoteli au makazi ya kitamaduni" },
    ],
    costBreakdown: {
      artisanDirectPercent: 74,
      materialsPercent: 14,
      logisticsPercent: 7,
      communityFundPercent: 5,
    },
    reviews: [
      {
        id: "rev-701",
        author: "David Kariuki",
        rating: 5,
        date: "2026-08-22",
        title: "Stunning wall centerpiece",
        comment: "The detail of the beadwork on genuine leather is remarkable. It arrived in perfect condition with its authenticity stamp.",
        verified: true,
        location: "Nairobi, Kenya",
      },
    ],
    tags: ["Maasai Shuka", "Wall Art", "Leather", "Shield", "Heritage"],
    inStock: true,
    featured: false,
    imageKey: "maasai-beadwork",
  },
  {
    id: "p8",
    name: "Handcrafted Meru Terracotta Incense Pot",
    artisanId: "a1",
    artisanName: "Amina Kessy",
    category: "East African Fine Art & Decor",
    priceUSD: 85,
    priceTZS: 219300,
    description: {
      en: "Authentic Arusha artisan-made goods: Pit-fired terracotta incense burner shaped with Mount Meru riverbed clay and engraved with tribal sun motifs.",
      sw: "Bidhaa halisi ya mikono ya Arusha: Chombo cha udongo wa mfinyanzi cha kuchoma ubani kilichochongwa kwa michoro ya jua ya jadi.",
    },
    artisanStory: {
      en: "Amina Kessy digs natural red clay along riverbeds near Usa River at the foothills of Mount Meru. Using hand-coiling and wood-pit reduction firing, each piece displays unique natural smoky flame marks.",
      sw: "Amina Kessy anavuna udongo mwekundu karibu na mito ya Mlima Meru. Kwa kutumia mikono na moto wa kuni, kila chombo kinapata alama za kipekee za moshi na joto.",
    },
    culturalBackground: {
      en: "Terracotta pottery has been used for centuries across northern Tanzania for sacred incense burning, frankincense blessing rituals, and evening gatherings.",
      sw: "Vyombo vya udongo vimetumika kwa karne nyingi kaskazini mwa Tanzania kwa kuchoma ubani, manukato ya asili na mikutano ya baraka za jioni.",
    },
    materialAuthenticity: {
      en: "100% natural Mount Meru riverbed clay, pit-fired without toxic glazes. Polished with smooth river stones and organic beeswax.",
      sw: "Udongo asilia 100% wa mtoni uliookwa bila kemikali. Umenyooshwa kwa mawe ya mto na nta ya asili ya nyuki.",
    },
    recommendedUses: [
      { en: "Aromatherapy, botanical resin, and natural incense burner", sw: "Kuchoma ubani, manukato ya asili na tiba ya harufu" },
      { en: "Artisan coffee table vessel and conversation piece", sw: "Pambo la meza ya kahawa au stendi ya maua makavu" },
    ],
    costBreakdown: {
      artisanDirectPercent: 76,
      materialsPercent: 12,
      logisticsPercent: 7,
      communityFundPercent: 5,
    },
    reviews: [
      {
        id: "rev-801",
        author: "Aïcha Diallo",
        rating: 5,
        date: "2026-09-08",
        title: "Earthy, grounding and gorgeous",
        comment: "The natural smoke patterns on the terracotta are magnificent. It brings the warmth of Arusha into our living room.",
        verified: true,
        location: "Dakar, Senegal",
      },
    ],
    tags: ["Terracotta", "Pottery", "Meru Clay", "Handmade", "Home Decor"],
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
    name: { en: "Maasai Shuka & Cultural Textiles", sw: "Maasai Shuka & Vitambaa vya Jadi" },
    description: { en: "Authentic hand-finished Maasai Shuka blankets, wraps, wall tapestries, and cultural woven textiles.", sw: "Vitambaa halisi vya Maasai Shuka, mashuka ya mabegani na mapambo ya ukutani." },
    icon: "🔴",
    productCount: 142,
    imageKey: "maasai-beadwork",
    color: "from-red-900 to-earth",
  },
  {
    id: "c2",
    name: { en: "Maasai Shuka Beadwork & Regalia", sw: "Maasai Shuka & Shanga za Jadi" },
    description: { en: "Hand-beaded warrior collars, ceremonial adornments, and authentic glass seed bead creations.", sw: "Mikufu ya jadi ya shanga, mapambo ya sherehe na sanaa za kitamaduni." },
    icon: "✨",
    productCount: 88,
    imageKey: "maasai-beadwork",
    color: "from-gold to-earth-dark",
  },
  {
    id: "c3",
    name: { en: "Maasai Shuka Jewelry", sw: "Mapambo ya Maasai Shuka" },
    description: { en: "Intricate necklaces, bangles, and earrings woven with authentic Maasai Shuka threadwork.", sw: "Mapambo yaliyotengenezwa kwa vitambaa na shanga za Maasai Shuka." },
    icon: "💎",
    productCount: 65,
    imageKey: "maasai-beadwork",
    color: "from-amber-600 to-gold",
  },
  {
    id: "c4",
    name: { en: "East African Fine Art & Decor", sw: "Sanaa ya Afrika Mashariki na Mapambo" },
    description: { en: "Original Mount Meru oil paintings, terracotta pottery, and ethical artisanal home decor.", sw: "Michoro halisi ya Mlima Meru, vyombo vya udongo na mapambo ya nyumbani." },
    icon: "🎨",
    productCount: 76,
    imageKey: "african-art",
    color: "from-earth-dark to-obsidian-surface",
  },
  {
    id: "c5",
    name: { en: "Arusha Coffee & Organic Spices", sw: "Kahawa & Viungo vya Arusha" },
    description: { en: "Single-origin Mount Meru Arabica coffee and premium organic highland spices.", sw: "Kahawa ya Mlima Meru na viungo asilia vya milimani kutoka kwa wakulima wa Arusha." },
    icon: "☕",
    productCount: 54,
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
    description: "Arusha's premier artisan gallery housing 150+ master craftspeople, textile weavers, and fine artists.",
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
    name: "Arusha Cultural Guild Collective",
    type: "Community Artisan Cooperative",
    address: "Arusha-Moshi Highway, Arusha",
    phone: "+255754998882",
    openingHours: "8:00 AM - 5:30 PM (Mon-Sat)",
    description: "Artisan textile and weaving cooperative producing sustainably crafted home decor, woven rugs, and terracotta wares.",
    artisanCount: 95,
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
    description: "Central landmark hub connecting visitors with licensed cultural tour guides and authentic handmade craft stalls.",
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
    description: "Shade-grown organic coffee farm hosting local roasting workshops, clay pottery, and organic spice blending.",
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
    text: "The Mount Meru oil canvas by Grace Mwangi is breathtaking. Knowing it was created with volcanic pigments directly from an authentic Arusha artisan with complete transparency makes it priceless.",
    rating: 5,
    product: "Mount Meru Sunset Oil Canvas",
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

export function formatPriceWithSecondary(usd: number, currency: Currency): { primary: string; secondary: string } {
  const tzs = Math.round(usd * 2580);
  if (currency === "TZS") {
    return {
      primary: `TZS ${tzs.toLocaleString()}`,
      secondary: `$${usd.toLocaleString()} USD`,
    };
  }
  return {
    primary: `$${usd.toLocaleString()}`,
    secondary: `TZS ${tzs.toLocaleString()}`,
  };
}

export function formatPriceCombined(usd: number, currency: Currency): string {
  const tzs = Math.round(usd * 2580);
  if (currency === "TZS") {
    return `TZS ${tzs.toLocaleString()} ($${usd.toLocaleString()})`;
  }
  return `$${usd.toLocaleString()} (TZS ${tzs.toLocaleString()})`;
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
    customerPhone: "+255714223344",
    deliveryLocation: "Njiro Complex, Arusha",
    items: [{ productName: "Authentic Maasai Shuka Cloth", price: 65, quantity: 2 }],
    totalPriceUSD: 130,
    totalPriceTZS: 335400,
    paymentMethod: "M-Pesa (+255714223344)",
    status: "Pending",
    afriverseLabelApplied: false,
    createdAt: "2026-09-09 09:30 AM",
  },
  {
    id: "AFR-8882-02",
    customerName: "Sophia Loren",
    customerPhone: "+255788556677",
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
    customerPhone: "+255755123456",
    deliveryLocation: "Clock Tower Plaza, Arusha CBD",
    items: [{ productName: "Mount Meru Sunset Oil Canvas", price: 1400, quantity: 1 }],
    totalPriceUSD: 1400,
    totalPriceTZS: 3612000,
    paymentMethod: "M-Pesa (+255755123456)",
    status: "Boda Boda Dispatched",
    afriverseLabelApplied: true,
    bodaBodaRider: {
      name: "Juma Kassim",
      phone: "+255768432109",
      plateNumber: "MC 452 ABC",
    },
    createdAt: "2026-09-09 08:00 AM",
  },
];

// --- CHAT MESSAGES ---
export interface ChatMessage {
  id: string;
  senderRole: UserRole;
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
    artisanName: "Lemagas Ole Nkeri",
    artisanPhone: "+255754334455",
    buyerName: "Baraka Edward",
    topic: "Maasai Shuka & Custom Beadwork Order",
    messages: [
      { id: "m1", senderRole: "buyer", senderName: "Baraka Edward", text: "Habari Lemagas! Is the Maasai Shuka jewelry set packaged with the official Afriverse label?", timestamp: "09:40 AM" },
      { id: "m2", senderRole: "seller", senderName: "Lemagas Ole Nkeri", text: "Marahaba Baraka! Yes, I sealed the package in a box with the Afriverse label and sent it via Boda Boda rider Juma (+255768432109).", timestamp: "09:42 AM" },
      { id: "m3", senderRole: "buyer", senderName: "Baraka Edward", text: "Asante sana! Please notify him to call when he arrives at Njiro Complex.", timestamp: "09:45 AM" },
    ],
  },
];

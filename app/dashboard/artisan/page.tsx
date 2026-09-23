"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AccessRestricted from "@/components/AccessRestricted";
import ArtisanLiveStudio from "./live/page";
import { useStore } from "@/lib/store";
import { Product, formatPriceCombined } from "@/lib/data";

import {
  Sparkles,
  ShieldCheck,
  Package,
  PlusCircle,
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  Upload,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Star,
  Clock,
  ArrowRight,
  AlertCircle,
  X,
  Search,
  HeartHandshake,
  Layers,
  Sliders,
  Video } from "lucide-react";

type Tab = "overview" | "my_crafts" | "add_craft" | "live";

const CATEGORIES = [
  { id: "Maasai Beadwork", label: "Maasai Beadwork", icon: "✨", presetImg: "maasai-beadwork" },
  { id: "Wood Carvings", label: "Wood Carvings", icon: "🪵", presetImg: "african-art" },
  { id: "Textiles", label: "Textiles & Shuka", icon: "🧶", presetImg: "maasai-beadwork" },
  { id: "East African Fine Art & Decor", label: "East African Fine Art", icon: "🎨", presetImg: "african-art" },
  { id: "Coffee", label: "Arusha Coffee & Spices", icon: "☕", presetImg: "coffee-spices" },
];

export default function ArtisanDashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    logout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    lang,
    setLang,
    currency,
    setCurrency,
  } = useStore();

  const isEn = lang === "en";
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>("all");
  const [authChecked, setAuthChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPriceUSD, setEditPriceUSD] = useState<number>(0);
  const [editInStock, setEditInStock] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");

  // Product Upload Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Maasai Beadwork");
  const [priceUSD, setPriceUSD] = useState<number>(75);
  const [priceTZS, setPriceTZS] = useState<number>(193500);
  const [culturalStory, setCulturalStory] = useState("");
  const [craftBackground, setCraftBackground] = useState("");
  const [materials, setMaterials] = useState("");
  const [dimensions, setDimensions] = useState("45cm x 30cm");
  const [weight, setWeight] = useState("0.85 kg");
  const [technique, setTechnique] = useState("Hand-twisted glass beads & natural hide backing");
  const [uses, setUses] = useState("");
  const [tags, setTags] = useState("Maasai, Handcrafted, Arusha, Authentic");
  const [selectedPresetImage, setSelectedPresetImage] = useState("maasai-beadwork");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Route Guard / Protection: Check if user is logged in with artisan role
  useEffect(() => {
    let activeUser = currentUser;
    if (!activeUser && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("afriverse_active_session");
        if (raw) activeUser = JSON.parse(raw);
      } catch {
        activeUser = null;
      }
    }

    if (!activeUser) {
      setAuthChecked(true);
      setHasAccess(false);
      return;
    }

    const isArtisan = activeUser.role === "artisan" || activeUser.role === "seller";
    if (!isArtisan) {
      setAuthChecked(true);
      setHasAccess(false);
      return;
    }

    setAuthChecked(true);
    setHasAccess(true);
  }, [currentUser, router]);

  // USD to TZS conversion
  const handleUSDChange = (val: number) => {
    setPriceUSD(val);
    setPriceTZS(Math.round(val * 2580));
  };

  const handleTZSChange = (val: number) => {
    setPriceTZS(val);
    setPriceUSD(Math.round((val / 2580) * 100) / 100);
  };

  // Handle image upload file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center text-[#D4AF37]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-body tracking-wider uppercase">Authenticating Artisan Access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return <AccessRestricted />;
  }

  const activeArtisan = currentUser || {
    id: "a1",
    name: "Amina Kessy",
    email: "amina@merucrafts.co.tz",
    role: "artisan",
    shopName: "Amina Meru Cultural Crafts Studio",

    phone: "+255 754 998 882",
  };

  // Filter crafts belonging to this artisan
  const artisanProducts = products.filter(
    (p) =>
      p.artisanId === activeArtisan.id ||
      p.artisanName.toLowerCase() === activeArtisan.name.toLowerCase() ||
      p.artisanId === "a1"
  );

  const totalCraftsCount = artisanProducts.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length || 3;
  const totalSalesUSD = 2480;

  const filteredProducts = artisanProducts.filter((p) => {
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat =
      selectedCatFilter === "all" ||
      p.category.toLowerCase().includes(selectedCatFilter.toLowerCase());
    return matchSearch && matchCat;
  });

  // Handle Craft Submission
  const handleSubmitCraft = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError(isEn ? "Please enter a craft title." : "Tafadhali weka jina la bidhaa.");
      return;
    }

    if (priceUSD <= 0) {
      setFormError(isEn ? "Price must be greater than zero." : "Bei lazima iwe zaidi ya sifuri.");
      return;
    }

    const specsSummary = `Dimensions: ${dimensions} | Weight: ${weight} | Technique: ${technique}`;
    const newCraft: Omit<Product, "id"> = {
      name: title.trim(),
      artisanId: activeArtisan.id,
      artisanName: activeArtisan.name || "Amina Kessy",
      category,
      priceUSD: Number(priceUSD),
      priceTZS: Number(priceTZS),
      description: {
        en: craftBackground.trim() ? `${craftBackground.trim()} (${specsSummary})` : `Authentic handcrafted Arusha craft: ${title.trim()} (${specsSummary})`,
        sw: `Bidhaa halisi ya mikono ya Arusha: ${title.trim()} (${specsSummary})`,
      },
      artisanStory: {
        en: culturalStory.trim() || "Handcrafted with generations of indigenous knowledge and artistry in Arusha, Tanzania.",
        sw: "Imetengenezwa kwa mikono kwa kutumia ustadi wa urithi wa vizazi Arusha, Tanzania.",
      },
      culturalBackground: {
        en: culturalStory.trim() || "Rooted in authentic Arusha Maasai and Meru cultural traditions.",
        sw: "Imejikita katika mila na desturi za Maasai na Meru.",
      },
      materialAuthenticity: {
        en: materials.trim() || "100% natural, locally sourced materials from Arusha region.",
        sw: "Vifaa 100% vya asili vilivyopatikana mkoani Arusha.",
      },
      recommendedUses: [
        {
          en: uses.trim() || "Ceremonial wear, traditional adornment, luxury interior decor.",
          sw: "Mavazi ya sherehe, mapambo ya kitamaduni, mapambo ya nyumba.",
        },
      ],
      costBreakdown: {
        artisanDirectPercent: 60,
        materialsPercent: 20,
        logisticsPercent: 10,
        communityFundPercent: 10,
      },
      reviews: [],
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      inStock: true,
      featured: true,
      imageKey: selectedPresetImage,
      imageUrl: imagePreview || undefined,
      image: imagePreview || undefined,
    };

    addProduct(newCraft);
    setPublishSuccess(true);

    // Reset form
    setTitle("");
    setCulturalStory("");
    setCraftBackground("");
    setMaterials("");
    setUses("");
    setImagePreview(null);

    setTimeout(() => {
      setActiveTab("my_crafts");
    }, 1200);
  };

  // Save edits
  const handleSaveEdit = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editName.trim() || editingProduct.name,
      priceUSD: editPriceUSD,
      priceTZS: Math.round(editPriceUSD * 2580),
      inStock: editInStock,
    });
    setEditingProduct(null);
  };

  return (
    <main className="min-h-screen bg-[#0F0F12] text-earth-cream selection:bg-gold selection:text-obsidian pb-16">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* ── ARTISAN PROFILE BANNER ────────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#141419] via-[#1A1A22] to-[#121216] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar with luxury gold ring */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-700 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#0F0F12] rounded-2xl flex items-center justify-center text-2xl font-bold font-display text-[#D4AF37]">
                    {activeArtisan.name ? activeArtisan.name.slice(0, 2).toUpperCase() : "AK"}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-[#0F0F12] w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-black font-bold" title="Online & Active">
                  ✓
                </span>
              </div>

              {/* Profile Details */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                    {activeArtisan.name || "Amina Kessy"}
                  </h1>
                  {/* Verified Artisan Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold shadow-sm">
                    <ShieldCheck size={14} className="text-[#D4AF37]" />
                    {isEn ? "Verified Artisan Badge" : "Fundi Bingwa Aliyethibitishwa"}
                  </span>
                </div>

                <p className="text-sm font-body text-amber-300/90 flex items-center gap-2">
                  <span>🏪 {activeArtisan.shopName || "Amina Meru Cultural Crafts Studio"}</span>
                  <span>•</span>
                  <span className="text-earth-cream/60">Arusha Cultural Heritage Guild</span>
                </p>

                <div className="flex items-center gap-4 text-xs text-earth-cream/60 pt-1">
                  <span>📍 Mount Meru Foothills, Arusha</span>
                  <span>•</span>
                  <span>⭐ 4.9 Rating (248 verified reviews)</span>
                  <span>•</span>
                  <span>📞 {activeArtisan.phone || "+255 754 998 882"}</span>
                </div>
              </div>
            </div>

            {/* Total Sales Metrics Banner */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              <div className="text-center px-5 py-3 rounded-2xl bg-[#0F0F12]/90 border border-[#D4AF37]/30 min-w-[125px] shadow-md">
                <div className="text-[11px] font-body uppercase text-[#D4AF37] font-bold tracking-wider">Total Sales</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {formatPriceCombined(totalSalesUSD, currency)}
                </div>
                <div className="text-[10px] text-green-400 font-mono mt-0.5">+18.4% this mo.</div>
              </div>

              <button
                onClick={() => setActiveTab("live")}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-400/60 text-xs font-bold transition shadow-sm"
                title="Go Live Stream"
              >
                <Video size={14} />
                🔴 Go Live Stream
              </button>

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-red-950/50 text-earth-cream/70 hover:text-red-400 border border-white/10 hover:border-red-500/40 text-xs font-semibold transition shadow-sm"
                title="Log Out"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* ── SUCCESS NOTIFICATION ────────────────────────────────────────── */}
        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-[#121216] border border-emerald-500/40 text-emerald-300 flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Craft successfully added to live shop!
                </h4>
                <p className="text-xs text-emerald-300/80">
                  Your new piece is now live for global buyers with authenticity verification.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPublishSuccess(false)}
              className="text-emerald-400 hover:text-white p-1 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── NAVIGATION TABS ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-[#D4AF37]/20 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-[#D4AF37] text-[#0F0F12] shadow-[0_0_15px_#D4AF3740]"
                : "bg-[#16161A] text-earth-cream/70 hover:text-white border border-white/5 hover:border-[#D4AF37]/30"
            }`}
          >
            <LayoutDashboard size={15} />
            {isEn ? "Overview" : "Muhtasari"}
          </button>

          <button
            onClick={() => setActiveTab("my_crafts")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "my_crafts"
                ? "bg-[#D4AF37] text-[#0F0F12] shadow-[0_0_15px_#D4AF3740]"
                : "bg-[#16161A] text-earth-cream/70 hover:text-white border border-white/5 hover:border-[#D4AF37]/30"
            }`}
          >
            <Package size={15} />
            {isEn ? `My Crafts (${totalCraftsCount})` : `Bidhaa Zangu (${totalCraftsCount})`}
          </button>

          <button
            onClick={() => setActiveTab("add_craft")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "add_craft"
                ? "bg-[#D4AF37] text-[#0F0F12] shadow-[0_0_15px_#D4AF3740]"
                : "bg-[#16161A] text-earth-cream/70 hover:text-white border border-white/5 hover:border-[#D4AF37]/30"
            }`}
          >
            <PlusCircle size={15} />
            {isEn ? "Add New Craft" : "Weka Bidhaa Mpya"}
          </button>

          <button
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "live"
                ? "bg-red-600 text-white shadow-[0_0_15px_#dc262640]"
                : "bg-[#16161A] text-red-400/80 hover:text-red-300 border border-red-500/20 hover:border-red-500/50"
            }`}
          >
            <Video size={15} />
            🔴 Live Stream Studio
          </button>
        </div>

        {/* ── TAB 1: OVERVIEW ─────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats Banner: Total Crafts Listed, Pending Orders, Sales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Stat 1: Total Crafts Listed */}
              <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/25 p-6 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/60 transition">
                <div className="flex items-center justify-between text-earth-cream/70 text-xs font-semibold mb-3">
                  <span className="uppercase tracking-wider">Total Crafts Listed</span>
                  <Package size={18} className="text-[#D4AF37]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">{totalCraftsCount} Crafts</div>
                <div className="text-xs text-amber-300/80 mt-2 flex items-center gap-1.5">
                  <span>Active in Global Catalog</span>
                </div>
              </div>

              {/* Stat 2: Pending Orders */}
              <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/25 p-6 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/60 transition">
                <div className="flex items-center justify-between text-earth-cream/70 text-xs font-semibold mb-3">
                  <span className="uppercase tracking-wider">Pending Orders</span>
                  <Clock size={18} className="text-amber-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">{pendingOrdersCount} Pending</div>
                <div className="text-xs text-amber-400 mt-2 flex items-center gap-1.5">
                  <span>Awaiting Arusha Hub Pickup</span>
                </div>
              </div>

              {/* Stat 3: Sales */}
              <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/25 p-6 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/60 transition">
                <div className="flex items-center justify-between text-earth-cream/70 text-xs font-semibold mb-3">
                  <span className="uppercase tracking-wider">Total Sales</span>
                  <DollarSign size={18} className="text-[#D4AF37]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {formatPriceCombined(totalSalesUSD, currency)}
                </div>
                <div className="text-xs text-green-400 mt-2 flex items-center gap-1.5 font-medium">
                  <TrendingUp size={14} /> +18.4% organic sales growth
                </div>
              </div>
            </div>

            {/* Cultural Impact Model */}
            <div className="rounded-3xl bg-gradient-to-r from-[#14141A] to-[#121216] border border-[#D4AF37]/25 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <HeartHandshake className="text-[#D4AF37]" size={18} />
                  AFRIVERSE Ethical Fair-Trade Revenue Model
                </h3>
                <span className="text-xs text-[#D4AF37] font-mono font-semibold">Arusha Fair Trade Certified</span>
              </div>
              <p className="text-xs text-earth-cream/70 leading-relaxed max-w-3xl">
                Every craft sold under your studio directly funds local artisan wages, sustainable indigenous material harvesting, and the Arusha Cultural Heritage Preservation Fund.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#0F0F12] border border-white/5">
                  <span className="text-[11px] text-earth-cream/60">Artisan Direct</span>
                  <div className="text-lg font-bold font-mono text-[#D4AF37] mt-0.5">60%</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F12] border border-white/5">
                  <span className="text-[11px] text-earth-cream/60">Raw Materials</span>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">20%</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F12] border border-white/5">
                  <span className="text-[11px] text-earth-cream/60">Boda Boda Logistics</span>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">10%</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F12] border border-white/5">
                  <span className="text-[11px] text-earth-cream/60">Community Fund</span>
                  <div className="text-lg font-bold font-mono text-green-400 mt-0.5">10%</div>
                </div>
              </div>
            </div>

            {/* Recent Orders for this Artisan */}
            <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-base font-bold font-display text-white">Recent Orders for Your Studio</h3>
                <span className="text-xs text-[#D4AF37] font-semibold">Active Dispatch Status</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-earth-cream/60 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition">
                        <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-semibold">{order.id}</td>
                        <td className="py-3.5 px-4 font-medium text-white">{order.customerName}</td>
                        <td className="py-3.5 px-4 text-earth-cream/70">{order.deliveryLocation}</td>
                        <td className="py-3.5 px-4 font-mono text-white font-bold">
                          {formatPriceCombined(order.totalPriceUSD, currency)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              order.status === "Delivered"
                                ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                                : order.status === "Boda Boda Dispatched"
                                ? "bg-sky-950/60 text-sky-300 border-sky-500/30"
                                : "bg-amber-950/60 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            <Clock size={10} />
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: MY CRAFTS ────────────────────────────────────────────── */}
        {activeTab === "my_crafts" && (
          <div className="space-y-6">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md w-full">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-cream/40" />
                <input
                  type="text"
                  placeholder="Search your craft titles, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCatFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    selectedCatFilter === "all"
                      ? "bg-[#D4AF37] text-black"
                      : "bg-[#141418] text-earth-cream/70 border border-white/10 hover:border-[#D4AF37]/40"
                  }`}
                >
                  All ({artisanProducts.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                      selectedCatFilter === cat.id
                        ? "bg-[#D4AF37] text-black"
                        : "bg-[#141418] text-earth-cream/70 border border-white/10 hover:border-[#D4AF37]/40"
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Crafts Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-[#141418] border border-white/10 p-8 space-y-4">
                <Package size={40} className="text-[#D4AF37]/40 mx-auto" />
                <h3 className="text-lg font-bold text-white">No crafts found</h3>
                <p className="text-xs text-earth-cream/60 max-w-sm mx-auto">
                  {searchQuery
                    ? "Try adjusting your search query or category filter."
                    : "You haven't listed any crafts yet. Publish your first piece to the global AFRIVERSE market!"}
                </p>
                <button
                  onClick={() => setActiveTab("add_craft")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#c49f2e] transition"
                >
                  <PlusCircle size={15} /> Publish Your First Craft
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-3xl bg-[#141418] border border-white/10 hover:border-[#D4AF37]/50 transition overflow-hidden shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                        {p.imageUrl || p.image ? (
                          <img
                            src={p.imageUrl || p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/maasai-beadwork.jpg";
                            }}
                          />
                        ) : (
                          <Image
                            src={`/images/${p.imageKey}.jpg`}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        )}

                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0F0F12]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold">
                            {p.category}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                              p.inStock
                                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                                : "bg-red-950/80 text-red-300 border-red-500/40"
                            }`}
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <h4 className="text-base font-bold text-white font-display line-clamp-1">{p.name}</h4>
                        <p className="text-xs text-earth-cream/70 line-clamp-2 leading-relaxed">
                          {p.description.en || p.artisanStory?.en}
                        </p>

                        <div className="pt-2 flex items-baseline justify-between border-t border-white/5">
                          <div className="text-sm font-bold font-mono text-[#D4AF37]">
                            {formatPriceCombined(p.priceUSD, currency)}
                          </div>
                          <span className="text-[11px] text-earth-cream/50">By {p.artisanName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Edit and Delete options */}
                    <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-white/5 mt-3">
                      <Link
                        href={`/products/${p.id}`}
                        className="flex items-center gap-1.5 text-xs text-earth-cream/70 hover:text-[#D4AF37] font-medium py-1.5 px-3 rounded-xl hover:bg-white/5 transition"
                      >
                        <ExternalLink size={13} /> View
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setEditName(p.name);
                            setEditPriceUSD(p.priceUSD);
                            setEditInStock(p.inStock);
                          }}
                          className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/20 transition font-semibold"
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-xl border border-red-500/20 transition font-semibold"
                          title="Delete Craft"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: ADD NEW CRAFT (INTEGRATED UPLOAD FORM) ────────────────── */}
        {activeTab === "add_craft" && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#141418] border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-5">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                Artisan Studio Direct Upload
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Add New Craft
              </h2>
              <p className="text-xs text-earth-cream/70 mt-1.5">
                Publish your authentic Arusha handiwork directly to global customers with verified cultural storytelling and specifications.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitCraft} className="space-y-8">
              {/* 1. Image Preview & Upload Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  1. Craft Image Preview & Selector *
                </label>
                <p className="text-[11px] text-earth-cream/60">
                  Upload a photograph from your Arusha studio or select an authentic category preset.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-3xl p-6 text-center cursor-pointer bg-[#0F0F12]/60 hover:bg-[#0F0F12] transition flex flex-col items-center justify-center min-h-[190px]"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Upload size={28} className="text-[#D4AF37] mb-2" />
                    <span className="text-xs font-bold text-white">Click to Upload Photo</span>
                    <span className="text-[10px] text-earth-cream/50 mt-1">PNG, JPG, WEBP live preview</span>
                  </div>

                  {/* Live Thumbnail Preview */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[190px] bg-black/50 flex items-center justify-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Craft preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 bg-black/70 text-white hover:text-red-400 p-1.5 rounded-full"
                          title="Remove custom image"
                        >
                          <X size={14} />
                        </button>
                        <span className="absolute bottom-2 left-2 bg-[#0F0F12]/80 text-[10px] text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          ✓ Custom Upload
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src={`/images/${selectedPresetImage}.jpg`}
                          alt="Preset preview"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[10px] text-[#D4AF37] font-semibold">
                            Preset: {selectedPresetImage}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Preset Selector Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] text-earth-cream/50">Preset selector:</span>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedPresetImage(cat.presetImg);
                        setImagePreview(null);
                      }}
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border transition ${
                        selectedPresetImage === cat.presetImg && !imagePreview
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "bg-white/5 text-earth-cream/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Title & Category Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Authentic Maasai Ceremonial Shuka Wrap"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    Category Dropdown *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      const matched = CATEGORIES.find((c) => c.id === e.target.value);
                      if (matched && !imagePreview) {
                        setSelectedPresetImage(matched.presetImg);
                      }
                    }}
                    className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#0F0F12] text-white">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. TZS / USD Price Input */}
              <div className="p-5 rounded-3xl bg-[#0F0F12] border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign size={14} /> TZS / USD Price Input
                  </label>
                  <span className="text-[10px] text-earth-cream/60 font-mono">
                    Auto-calculated: 1 USD ≈ 2,580 TZS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-earth-cream/70 font-medium">Price in USD ($) *</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={priceUSD}
                      onChange={(e) => handleUSDChange(Number(e.target.value))}
                      className="w-full rounded-2xl bg-[#141418] border border-white/15 px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-earth-cream/70 font-medium">Price in TZS (Tanzanian Shillings) *</span>
                    <input
                      type="number"
                      min="1000"
                      step="500"
                      value={priceTZS}
                      onChange={(e) => handleTZSChange(Number(e.target.value))}
                      className="w-full rounded-2xl bg-[#141418] border border-white/15 px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 text-xs text-white/90 flex items-center justify-between border border-white/5">
                  <span className="text-earth-cream/60">Final Buyer Price:</span>
                  <span className="font-bold text-[#D4AF37] font-mono">
                    ${priceUSD} USD (~{priceTZS.toLocaleString()} TZS)
                  </span>
                </div>
              </div>

              {/* 4. Cultural Background Story */}
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Cultural Background Story
                  </h4>
                  <p className="text-[11px] text-earth-cream/60">
                    Describe the heritage significance and cultural lineage of this piece for international patrons.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-earth-cream">
                    Cultural Story & Tradition Details *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detail the cultural story, clan patterns, or ceremonial symbolism..."
                    value={culturalStory}
                    onChange={(e) => setCulturalStory(e.target.value)}
                    className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-earth-cream">
                    Artisan Studio Process
                  </label>
                  <textarea
                    rows={2}
                    placeholder="How was this crafted in your Arusha studio? How long did it take?"
                    value={craftBackground}
                    onChange={(e) => setCraftBackground(e.target.value)}
                    className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* 5. Specs (Specifications, Dimensions, Materials) */}
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders size={14} className="text-[#D4AF37]" />
                    Craft Specs & Materials
                  </h4>
                  <p className="text-[11px] text-earth-cream/60">
                    Exact measurements and material authenticity parameters.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-earth-cream">Dimensions Spec</label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="e.g. 50cm x 35cm"
                      className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-earth-cream">Weight Spec</label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 0.75 kg"
                      className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-earth-cream">Technique Spec</label>
                    <input
                      type="text"
                      value={technique}
                      onChange={(e) => setTechnique(e.target.value)}
                      placeholder="e.g. Hand-beaded, Loom woven"
                      className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-earth-cream">Material Authenticity</label>
                    <input
                      type="text"
                      value={materials}
                      onChange={(e) => setMaterials(e.target.value)}
                      placeholder="e.g. 100% East African combed cotton, organic acacia dyes"
                      className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-earth-cream">Recommended Uses</label>
                    <input
                      type="text"
                      value={uses}
                      onChange={(e) => setUses(e.target.value)}
                      placeholder="e.g. Traditional wrap, ceremonial wear, wall hanging"
                      className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-bold text-sm hover:shadow-[0_0_25px_#D4AF3766] transition flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  Publish Craft to AFRIVERSE Marketplace
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── TAB 4: LIVE STREAM STUDIO ─────────────────────────────────── */}
        {activeTab === "live" && (
          <div className="rounded-3xl bg-[#0F0F12] border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
            <ArtisanLiveStudio />
          </div>
        )}
      </div>

      {/* ── EDIT PRODUCT MODAL ──────────────────────────────────────────────── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#141418] border border-[#D4AF37]/30 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold font-display text-white">Edit Craft Listing</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-earth-cream/60 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-earth-cream/70 font-medium">Craft Title</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-earth-cream/70 font-medium">Price (USD)</label>
                <input
                  type="number"
                  value={editPriceUSD}
                  onChange={(e) => setEditPriceUSD(Number(e.target.value))}
                  className="w-full rounded-2xl bg-[#0F0F12] border border-white/15 px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="text-[10px] text-earth-cream/50">
                  ≈ {(editPriceUSD * 2580).toLocaleString()} TZS
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-earth-cream/80">Inventory Status</span>
                <button
                  type="button"
                  onClick={() => setEditInStock(!editInStock)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                    editInStock
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                      : "bg-red-950/80 text-red-300 border-red-500/40"
                  }`}
                >
                  {editInStock ? "In Stock" : "Out of Stock"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-xs text-earth-cream/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:bg-amber-400 transition shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}

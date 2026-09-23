"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { Product, Order, artisans, formatPrice, formatPriceCombined } from "@/lib/data";
import {
  Store,
  PlusCircle,
  Package,
  Truck,
  CheckCircle,
  CheckCircle2,
  QrCode,
  Printer,
  Sun,
  Moon,
  ShieldCheck,
  Phone,
  MapPin,
  Tag,
  DollarSign,
  AlertCircle,
  FileText,
  UserCheck,
  Users,
  ShoppingBag,
  Sparkles,
  Crown,
  Navigation,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    products,
    addProduct,
    orders,
    sealAfriverseLabel,
    dispatchBodaBoda,
    markOrderDelivered,
    theme,
    toggleTheme,
    lang,
    setLang,
    currency,
    setCurrency,
  } = useStore();

  const isEn = lang === "en";
  const currentRole = currentUser?.role || "admin";

  // Navigation tab state per role
  const [adminTab, setAdminTab] = useState<"overview" | "artisans" | "orders" | "catalog">("overview");
  const [artisanTab, setArtisanTab] = useState<"orders" | "post_product" | "label_generator" | "products">("orders");
  const [buyerTab, setBuyerTab] = useState<"my_orders" | "delivery_settings" | "support">("my_orders");

  // Post Product Form State (Maasai Shuka & Cultural Crafts)
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("Maasai Shuka & Cultural Textiles");
  const [pPriceUSD, setPPriceUSD] = useState(85);
  const [pDescEn, setPDescEn] = useState("");
  const [pDescSw, setPDescSw] = useState("");
  const [pTags, setPTags] = useState("Maasai Shuka, Handmade, Arusha");
  const [postSuccess, setPostSuccess] = useState(false);

  // Selected Order for Afriverse Label Printing
  const [selectedOrderForLabel, setSelectedOrderForLabel] = useState<Order | null>(orders[0] || null);

  // Boda Boda Dispatch Form State (Default rider: Juma Kassim +255768432109)
  const [dispatchRiderName, setDispatchRiderName] = useState("Juma Kassim");
  const [dispatchRiderPhone, setDispatchRiderPhone] = useState("+255768432109");
  const [dispatchPlateNumber, setDispatchPlateNumber] = useState("MC 452 ABC");
  const [selectedOrderToDispatch, setSelectedOrderToDispatch] = useState<string | null>(null);

  // Quick switch role handler
  const handleSwitchRole = (newRole: "admin" | "seller" | "buyer") => {
    if (newRole === "admin") {
      setCurrentUser({
        id: "u-admin",
        name: "Afriverse Admin",
        email: "admin@afriverse.co.tz",
        role: "admin",
        phone: "+255754998882",
      });
    } else if (newRole === "seller") {
      setCurrentUser({
        id: "a1",
        name: "Amina Kessy",
        email: "amina@merucrafts.co.tz",
        role: "artisan",
        shopName: "Amina Meru Cultural Crafts",
        phone: "+255754998882",
      });
      router.push("/dashboard/artisan");
    } else {
      setCurrentUser({
        id: "u-cust",
        name: "Baraka Edward",
        email: "baraka@example.com",
        role: "buyer",
        phone: "+255714223344",
      });
    }
  };

  const handlePostProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;

    const tagsArray = pTags.split(",").map((t) => t.trim());
    addProduct({
      name: pName,
      artisanId: currentUser?.id || "a1",
      artisanName: currentUser?.name || "Amina Kessy",
      category: pCategory,
      priceUSD: Number(pPriceUSD),
      priceTZS: Math.round(Number(pPriceUSD) * 2580),
      description: {
        en: pDescEn || `Authentic Arusha artisan-made goods: ${pName}`,
        sw: pDescSw || `Bidhaa halisi ya mikono ya Arusha: ${pName}`,
      },
      tags: tagsArray,
      inStock: true,
      featured: true,
      imageKey: "maasai-beadwork",
      artisanStory: { en: "A skilled Arusha artisan with years of craft experience.", sw: "Fundi wa Arusha mwenye uzoefu wa miaka mingi." },
      culturalBackground: { en: "Rooted in Arusha's rich Maasai and Meru traditions.", sw: "Imejikita katika mila za Maasai na Meru za Arusha." },
      materialAuthenticity: { en: "Hand-sourced natural materials from Tanzania.", sw: "Vifaa vya asili vya mkono kutoka Tanzania." },
      recommendedUses: [{ en: "Home décor, gifting, cultural ceremonies.", sw: "Mapambo ya nyumba, zawadi, sherehe za kitamaduni." }],
      costBreakdown: { artisanDirectPercent: 60, materialsPercent: 20, logisticsPercent: 10, communityFundPercent: 10 },
      reviews: [],
    });

    setPostSuccess(true);
    setPName("");
    setPDescEn("");
    setPDescSw("");
    setTimeout(() => setPostSuccess(false), 4000);
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderToDispatch) return;
    dispatchBodaBoda(selectedOrderToDispatch, dispatchRiderName, dispatchRiderPhone, dispatchPlateNumber);
    setSelectedOrderToDispatch(null);
  };

  // Calculations for Admin KPIs
  const totalVolumeUSD = orders.reduce((sum, o) => sum + o.totalPriceUSD, 0);
  const totalVolumeTZS = orders.reduce((sum, o) => sum + o.totalPriceTZS, 0);
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Role-Based Access Control (RBAC) Switcher Banner */}
        <div className="glass-card rounded-2xl p-4 border border-gold/30 mb-8 bg-gold/5 flex flex-wrap items-center justify-between gap-4 shadow-luxury">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              {isEn ? "Live Role-Based Access Control (RBAC) Portal" : "Mfumo wa Ruhusa za Watumiaji (RBAC)"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-earth-cream/60 mr-1">{isEn ? "Switch Dashboard View:" : "Badili Muonekano:"}</span>
            <button
              onClick={() => handleSwitchRole("admin")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === "admin"
                  ? "bg-gold text-obsidian shadow-gold"
                  : "bg-obsidian-surface border border-gold/30 text-gold hover:bg-gold/10"
              }`}
            >
              <Crown size={13} /> {isEn ? "Admin View" : "Msimamizi"}
            </button>
            <button
              onClick={() => handleSwitchRole("seller")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === "seller"
                  ? "bg-amber-500 text-obsidian shadow-gold"
                  : "bg-obsidian-surface border border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              }`}
            >
              <Store size={13} /> {isEn ? "Artisan View" : "Fundi / Msanii"}
            </button>
            <button
              onClick={() => handleSwitchRole("buyer")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === "buyer"
                  ? "bg-sky-500 text-obsidian shadow-gold"
                  : "bg-obsidian-surface border border-sky-500/30 text-sky-300 hover:bg-sky-500/10"
              }`}
            >
              <ShoppingBag size={13} /> {isEn ? "Customer View" : "Mnunuzi"}
            </button>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-gold/30 mb-8 flex flex-wrap items-center justify-between gap-6 shadow-luxury">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-body font-bold uppercase px-3 py-1 rounded-full ${
                  currentRole === "admin"
                    ? "bg-gold text-obsidian"
                    : currentRole === "seller"
                    ? "bg-amber-500 text-obsidian"
                    : "bg-sky-500 text-obsidian"
                }`}
              >
                ROLE: {currentRole.toUpperCase()}
              </span>
              <span className="text-earth-cream/60 text-xs font-body font-medium">
                Arusha Operations Desk
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl text-earth-cream">
              {currentUser?.name || "Afriverse User"} <span className="shimmer-text">Dashboard</span>
            </h1>
            <p className="text-earth-cream/70 text-xs font-body mt-1">
              {currentRole === "admin" && (
                <>Platform Administrator | Arusha Regional Master Oversight | Hotline: <strong className="text-gold">+255754998882</strong></>
              )}
              {currentRole === "seller" && (
                <>Shop: <strong className="text-gold">{currentUser?.shopName || "Amina Meru Cultural Crafts"}</strong> | Arusha Maasai Market</>
              )}
              {currentRole === "buyer" && (
                <>Verified Buyer: <strong className="text-gold">{currentUser?.name || "Baraka Edward"}</strong> | Delivery: Njiro Complex, Arusha</>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 text-xs font-body font-semibold transition-all"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {(currentRole === "seller" || currentRole === "artisan") && (
              <Link
                href="/dashboard/artisan"
                className="btn-gold px-4 py-2 rounded-full text-xs font-body font-bold shadow-gold flex items-center gap-1.5"
              >
                <Sparkles size={14} /> Open Artisan Studio Dashboard →
              </Link>
            )}

            <Link
              href="/login"
              className="btn-outline-gold px-4 py-2 rounded-full text-xs font-body font-semibold"
            >
              Switch Account / Login
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ADMIN DASHBOARD VIEW                                                  */}
        {/* ========================================================================= */}
        {currentRole === "admin" && (
          <div className="space-y-8">
            {/* Admin Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-gold/20">
                <div className="text-xs text-earth-cream/60 font-body mb-1">Gross Platform Volume</div>
                <div className="font-mono text-gold font-bold text-xl lg:text-2xl">
                  {formatPrice(currency === "TZS" ? totalVolumeTZS : totalVolumeUSD, currency)}
                </div>
                <div className="text-[10px] text-earth-cream/50 mt-1">
                  Equiv: {formatPrice(currency === "TZS" ? totalVolumeUSD : totalVolumeTZS, currency === "TZS" ? "USD" : "TZS")}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-gold/20">
                <div className="text-xs text-earth-cream/60 font-body mb-1">Registered Artisans</div>
                <div className="font-mono text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
                  {artisans.length}
                  <span className="text-xs bg-green-900/80 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                    100% Verified
                  </span>
                </div>
                <div className="text-[10px] text-earth-cream/50 mt-1">Arusha Region & Meru</div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-gold/20">
                <div className="text-xs text-earth-cream/60 font-body mb-1">Platform Orders</div>
                <div className="font-mono text-gold font-bold text-xl lg:text-2xl">
                  {orders.length}
                </div>
                <div className="text-[10px] text-earth-cream/50 mt-1">Escrow & Direct Payout</div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-gold/20">
                <div className="text-xs text-earth-cream/60 font-body mb-1">Boda Boda Deliveries</div>
                <div className="font-mono text-green-400 font-bold text-xl lg:text-2xl">
                  {deliveredCount} / {orders.length}
                </div>
                <div className="text-[10px] text-earth-cream/50 mt-1">Local Arusha Transit</div>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gold/20 pb-3">
              <button
                onClick={() => setAdminTab("overview")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "overview" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70"
                }`}
              >
                Platform Operations Overview
              </button>
              <button
                onClick={() => setAdminTab("artisans")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "artisans" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70"
                }`}
              >
                Artisan Verification & Guild ({artisans.length})
              </button>
              <button
                onClick={() => setAdminTab("orders")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "orders" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70"
                }`}
              >
                Master Orders & Logistics ({orders.length})
              </button>
              <button
                onClick={() => setAdminTab("catalog")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  adminTab === "catalog" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70"
                }`}
              >
                Master Catalog ({products.length})
              </button>
            </div>

            {/* Admin TAB 1: OVERVIEW */}
            {adminTab === "overview" && (
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 bg-gold/5">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck size={24} className="text-gold" />
                    <h3 className="font-display font-bold text-lg text-earth-cream">
                      Arusha Operations Center & Concierge Hotline
                    </h3>
                  </div>
                  <p className="text-earth-cream/70 text-xs font-body leading-relaxed max-w-3xl">
                    As an Afriverse Administrator, you oversee escrow payouts, artisan authenticity credentials, package seal verification, and courier dispatch. The Admin Operations hotline is strictly <strong>+255754998882</strong>.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Orders List */}
                  <div className="glass-card rounded-3xl p-6 border border-gold/20 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-display font-bold text-base text-earth-cream">Live Order Flow</h4>
                      <button onClick={() => setAdminTab("orders")} className="text-xs text-gold hover:underline">View All →</button>
                    </div>
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="p-3 rounded-xl bg-obsidian-surface/70 border border-gold/15 flex justify-between items-center text-xs">
                          <div>
                            <div className="font-mono font-bold text-gold">{order.id} — {order.customerName}</div>
                            <div className="text-earth-cream/60">{order.deliveryLocation} • {order.items.length} items</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-gold border border-gold/40">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registered Artisans */}
                  <div className="glass-card rounded-3xl p-6 border border-gold/20 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-display font-bold text-base text-earth-cream">Verified Artisan Guild</h4>
                      <button onClick={() => setAdminTab("artisans")} className="text-xs text-gold hover:underline">Manage Artisans →</button>
                    </div>
                    <div className="space-y-3">
                      {artisans.map((artisan) => (
                        <div key={artisan.id} className="p-3 rounded-xl bg-obsidian-surface/70 border border-gold/15 flex justify-between items-center text-xs">
                          <div>
                            <div className="font-display font-bold text-white flex items-center gap-1.5">
                              {artisan.name}
                              <CheckCircle size={12} className="text-green-400" />
                            </div>
                            <div className="text-earth-cream/60">{artisan.location} • {artisan.craft}</div>
                          </div>
                          <span className="font-mono text-gold text-[11px]">{artisan.phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Admin TAB 2: ARTISANS */}
            {adminTab === "artisans" && (
              <div className="glass-card rounded-3xl p-6 border border-gold/30 shadow-luxury space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-xl text-earth-cream">
                      Arusha Artisan Guild & Verification Status
                    </h3>
                    <p className="text-xs text-earth-cream/70 font-body">
                      Verify credentials, cultural authenticity, and mobile money payout records.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-body">
                    <thead>
                      <tr className="border-b border-gold/20 text-gold font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Artisan Name</th>
                        <th className="py-3 px-4">Workshop Location</th>
                        <th className="py-3 px-4">Craft Specialty</th>
                        <th className="py-3 px-4">Payout Phone</th>
                        <th className="py-3 px-4">Verification</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10">
                      {artisans.map((artisan) => (
                        <tr key={artisan.id} className="hover:bg-gold/5 transition-colors">
                          <td className="py-3.5 px-4 font-display font-bold text-white flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px]">
                              {artisan.name[0]}
                            </span>
                            {artisan.name}
                          </td>
                          <td className="py-3.5 px-4 text-earth-cream/80">{artisan.location}</td>
                          <td className="py-3.5 px-4 text-earth-cream/70">{artisan.craft}</td>
                          <td className="py-3.5 px-4 font-mono text-gold">{artisan.phone}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 bg-green-900/60 text-green-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-green-500/40">
                              <CheckCircle size={10} /> Verified
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="btn-outline-gold px-3 py-1 rounded-lg text-[11px] font-bold">
                              Audit Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin TAB 3: ORDERS */}
            {adminTab === "orders" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl text-earth-cream">
                    Master Platform Orders ({orders.length})
                  </h3>
                  <div className="text-xs text-gold">Hotline Support: +255754998882</div>
                </div>

                <div className="grid gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="glass-card rounded-2xl p-5 border border-gold/20 flex flex-col lg:flex-row justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gold font-bold text-base">{order.id}</span>
                          <span className="bg-gold/20 text-gold text-xs px-2.5 py-0.5 rounded-full border border-gold/40">
                            {order.status}
                          </span>
                          {order.afriverseLabelApplied && (
                            <span className="bg-green-900/60 text-green-300 text-xs px-2.5 py-0.5 rounded-full border border-green-500/40">
                              ✓ Sealed Label
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-earth-cream/80 grid sm:grid-cols-3 gap-2">
                          <div>Buyer: <strong>{order.customerName}</strong> ({order.customerPhone})</div>
                          <div>Destination: <strong>{order.deliveryLocation}</strong></div>
                          <div>Total: <strong>{formatPriceCombined(order.totalPriceUSD, currency)}</strong></div>
                        </div>
                        {order.bodaBodaRider && (
                          <div className="text-xs text-sky-300 bg-sky-950/40 p-2 rounded-xl border border-sky-500/30">
                            Rider: <strong>{order.bodaBodaRider.name}</strong> ({order.bodaBodaRider.phone}) | Plate: {order.bodaBodaRider.plateNumber}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!order.afriverseLabelApplied && (
                          <button
                            onClick={() => sealAfriverseLabel(order.id)}
                            className="bg-amber-600 hover:bg-amber-500 text-black px-3 py-1.5 rounded-xl text-xs font-bold"
                          >
                            Apply Seal
                          </button>
                        )}
                        {order.status !== "Delivered" && (
                          <button
                            onClick={() => markOrderDelivered(order.id)}
                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin TAB 4: CATALOG */}
            {adminTab === "catalog" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="glass-card rounded-2xl p-5 border border-gold/20 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gold/10 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/30">
                          {p.category}
                        </span>
                        <span className="text-gold font-bold font-mono">
                          {formatPrice(currency === "TZS" ? p.priceTZS : p.priceUSD, currency)}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-earth-cream text-base mb-1">{p.name}</h4>
                      <p className="text-earth-cream/65 text-xs font-body line-clamp-2 mb-3">{p.description.en}</p>
                    </div>
                    <div className="border-t border-gold/15 pt-3 flex justify-between items-center text-xs font-body text-earth-cream/60">
                      <span>Artisan: <strong className="text-gold">{p.artisanName}</strong></span>
                      <span className="text-green-400">Stock: Active</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ARTISAN / SELLER DASHBOARD VIEW                                       */}
        {/* ========================================================================= */}
        {currentRole === "seller" && (
          <div className="space-y-6">
            {/* Artisan Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 border-b border-gold/20 pb-4">
              <button
                onClick={() => setArtisanTab("orders")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  artisanTab === "orders" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <Truck size={16} />
                Arusha Orders & Boda Boda Dispatch ({orders.length})
              </button>

              <button
                onClick={() => setArtisanTab("post_product")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  artisanTab === "post_product" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <PlusCircle size={16} />
                Post New Craft
              </button>

              <button
                onClick={() => setArtisanTab("label_generator")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  artisanTab === "label_generator" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <Printer size={16} />
                Afriverse Package Label Generator
              </button>

              <button
                onClick={() => setArtisanTab("products")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  artisanTab === "products" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <Package size={16} />
                Manage Shop Products ({products.length})
              </button>
            </div>

            {/* ARTISAN TAB 1: ORDERS & BODA BODA DISPATCH */}
            {artisanTab === "orders" && (
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 bg-gold/5 mb-6">
                  <div className="flex items-center gap-3">
                    <Truck size={24} className="text-gold" />
                    <div>
                      <h3 className="font-display font-bold text-lg text-earth-cream">
                        Local Arusha Delivery Workflow
                      </h3>
                      <p className="text-earth-cream/70 text-xs font-body">
                        1. Artisan receives order notification → 2. Package product in box & seal with official Afriverse label → 3. Dispatch via Boda Boda rider (Juma Kassim: +255768432109) and pay rider directly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="glass-card rounded-2xl p-6 border-2 border-gold/20 hover:border-gold/40 transition-all flex flex-col lg:flex-row justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-gold font-bold text-lg">{order.id}</span>
                          <span
                            className={`text-xs font-body font-bold px-3 py-1 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-900/60 text-green-300 border border-green-500/40"
                                : order.status === "Boda Boda Dispatched"
                                ? "bg-sky-900/60 text-sky-300 border border-sky-500/40"
                                : order.status === "Packaged"
                                ? "bg-amber-900/60 text-amber-300 border border-amber-500/40"
                                : "bg-red-900/60 text-red-300 border border-red-500/40"
                            }`}
                          >
                            Status: {order.status}
                          </span>

                          {order.afriverseLabelApplied ? (
                            <span className="bg-gold/20 text-gold text-xs font-body font-semibold px-2.5 py-0.5 rounded-full border border-gold/40 flex items-center gap-1">
                              <CheckCircle size={12} /> Sealed with Afriverse Label
                            </span>
                          ) : (
                            <span className="bg-red-900/40 text-red-300 text-xs font-body px-2.5 py-0.5 rounded-full border border-red-500/30">
                              Label Unsealed
                            </span>
                          )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-xs font-body text-earth-cream/80">
                          <div>
                            <strong>Buyer:</strong> {order.customerName} ({order.customerPhone})
                          </div>
                          <div>
                            <strong>Arusha Delivery Location:</strong> {order.deliveryLocation}
                          </div>
                          <div>
                            <strong>Payment Method:</strong> {order.paymentMethod}
                          </div>
                          <div>
                            <strong>Total:</strong> {formatPriceCombined(order.totalPriceUSD, currency)}
                          </div>
                        </div>

                        <div className="bg-obsidian-surface/60 rounded-xl p-3 border border-gold/15 text-xs">
                          <div className="font-bold text-gold mb-1">Items ordered:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>{item.quantity}x {item.productName}</span>
                              <span className="font-mono text-gold">${item.price}</span>
                            </div>
                          ))}
                        </div>

                        {order.bodaBodaRider && (
                          <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-3 text-xs text-sky-200">
                            <strong>🏍️ Dispatched Boda Boda Rider:</strong> {order.bodaBodaRider.name} | Phone: {order.bodaBodaRider.phone} | Motor Plate: {order.bodaBodaRider.plateNumber} (Paid directly by artisan)
                          </div>
                        )}
                      </div>

                      {/* Actions Column */}
                      <div className="flex flex-col justify-center gap-3 min-w-[220px]">
                        <button
                          onClick={() => {
                            setSelectedOrderForLabel(order);
                            setArtisanTab("label_generator");
                          }}
                          className="btn-outline-gold px-4 py-2.5 rounded-xl text-xs font-body font-semibold flex items-center justify-center gap-2"
                        >
                          <Printer size={14} />
                          Preview/Print Label
                        </button>

                        {!order.afriverseLabelApplied && (
                          <button
                            onClick={() => sealAfriverseLabel(order.id)}
                            className="bg-amber-600 hover:bg-amber-500 text-black px-4 py-2.5 rounded-xl text-xs font-body font-bold transition-all"
                          >
                            📦 Package Box & Seal Label
                          </button>
                        )}

                        {order.status !== "Boda Boda Dispatched" && order.status !== "Delivered" && (
                          <button
                            onClick={() => setSelectedOrderToDispatch(order.id)}
                            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-body font-bold flex items-center justify-center gap-2 shadow"
                          >
                            <Truck size={14} />
                            Dispatch via Boda Boda
                          </button>
                        )}

                        {order.status === "Boda Boda Dispatched" && (
                          <button
                            onClick={() => markOrderDelivered(order.id)}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-xs font-body font-bold transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle size={14} />
                            Confirm Delivery Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Boda Boda Dispatch Modal Form */}
                {selectedOrderToDispatch && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-gold/40 space-y-4 bg-obsidian">
                      <h3 className="font-display font-bold text-xl text-gold">
                        🏍️ Dispatch Boda Boda Rider
                      </h3>
                      <p className="text-xs text-earth-cream/70 font-body">
                        Enter local Arusha Boda Boda rider details. Artisans pay the rider directly upon package pickup.
                      </p>

                      <form onSubmit={handleDispatchSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-body font-bold text-gold uppercase mb-1">Rider Name</label>
                          <input
                            type="text"
                            required
                            value={dispatchRiderName}
                            onChange={(e) => setDispatchRiderName(e.target.value)}
                            className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream font-body"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-body font-bold text-gold uppercase mb-1">Rider Direct Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={dispatchRiderPhone}
                            onChange={(e) => setDispatchRiderPhone(e.target.value)}
                            className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream font-mono"
                          />
                          <span className="text-[10px] text-earth-cream/60">Rider phone (e.g. +255768432109). Support hotline is +255754998882.</span>
                        </div>

                        <div>
                          <label className="block text-xs font-body font-bold text-gold uppercase mb-1">Motorcycle Plate Number</label>
                          <input
                            type="text"
                            required
                            value={dispatchPlateNumber}
                            onChange={(e) => setDispatchPlateNumber(e.target.value)}
                            className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream font-mono"
                          />
                        </div>

                        <div className="pt-2 flex gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedOrderToDispatch(null)}
                            className="flex-1 btn-outline-gold py-2.5 rounded-xl text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 btn-gold py-2.5 rounded-xl text-xs font-bold"
                          >
                            Confirm Dispatch
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ARTISAN TAB 2: POST NEW CRAFT */}
            {artisanTab === "post_product" && (
              <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 border-2 border-gold/30 shadow-luxury">
                <h2 className="font-display font-bold text-2xl text-earth-cream mb-2">
                  Post New Craft to Shop
                </h2>
                <p className="text-earth-cream/70 text-xs font-body mb-6">
                  List authentic Arusha artisan-made goods including Maasai Shuka textiles, beadwork jewelry, and handcrafted pottery.
                </p>

                {postSuccess && (
                  <div className="bg-green-950/60 border border-green-500/50 text-green-200 text-sm font-body rounded-xl p-4 mb-6 flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Product posted live! View it in the Shop (/products).</span>
                  </div>
                )}

                <form onSubmit={handlePostProduct} className="space-y-5">
                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase mb-2">
                      Product / Craft Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="e.g. Handcrafted Maasai Shuka Beaded Shield"
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body font-semibold text-gold uppercase mb-2">
                        Category
                      </label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value)}
                        className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                      >
                        <option value="Maasai Shuka & Cultural Textiles">Maasai Shuka & Cultural Textiles</option>
                        <option value="Maasai Shuka Jewelry">Maasai Shuka Jewelry</option>
                        <option value="East African Fine Art & Decor">East African Fine Art & Decor</option>
                        <option value="Handcrafted Meru Pottery & Ceramics">Handcrafted Meru Pottery & Ceramics</option>
                        <option value="Arusha Coffee & Organic Spices">Arusha Coffee & Organic Spices</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold text-gold uppercase mb-2">
                        Price in USD ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={pPriceUSD}
                        onChange={(e) => setPPriceUSD(Number(e.target.value))}
                        className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                      />
                      <span className="text-[10px] text-earth-cream/60">Approx: TZS {(pPriceUSD * 2580).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase mb-2">
                      Description (English)
                    </label>
                    <textarea
                      rows={3}
                      value={pDescEn}
                      onChange={(e) => setPDescEn(e.target.value)}
                      placeholder="Authentic Arusha artisan-made goods handcrafted with sustainable materials..."
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={pTags}
                      onChange={(e) => setPTags(e.target.value)}
                      placeholder="Maasai Shuka, Beadwork, Cultural, Arusha"
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-gold py-4 rounded-xl text-sm font-body font-bold shadow-gold-lg"
                  >
                    Post Craft to Global Marketplace →
                  </button>
                </form>
              </div>
            )}

            {/* ARTISAN TAB 3: PACKAGE LABEL GENERATOR */}
            {artisanTab === "label_generator" && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="glass-card rounded-3xl p-6 border-2 border-gold/30">
                  <h3 className="font-display font-bold text-xl text-earth-cream mb-2">
                    Official Afriverse Printable Package Label
                  </h3>
                  <p className="text-earth-cream/70 text-xs font-body">
                    Target artisans print this label and stick it onto the boxed package before handing it to the Boda Boda rider.
                  </p>
                </div>

                {selectedOrderForLabel && (
                  <div className="bg-white text-black p-8 rounded-3xl border-4 border-black shadow-2xl space-y-6 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center border-b-4 border-black pb-4">
                      <div>
                        <div className="font-black text-2xl tracking-tighter">AFRIVERSE ARUSHA</div>
                        <div className="text-xs font-bold tracking-widest text-amber-700">VERIFIED ARTISAN SEAL</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-black bg-black text-white px-3 py-1 rounded">
                          ORDER #{selectedOrderForLabel.id}
                        </div>
                        <div className="text-[10px] text-gray-600 font-mono mt-1">
                          {selectedOrderForLabel.createdAt}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-xs font-mono">
                      <div className="bg-gray-100 p-4 rounded-xl border border-gray-300">
                        <div className="font-bold text-gray-500 uppercase">FROM (ARTISAN SELLER):</div>
                        <div className="font-black text-base mt-1">{currentUser?.name || "Amina Kessy"}</div>
                        <div>Arusha Maasai Market / Craft Hub</div>
                        <div>Shop: {currentUser?.shopName || "Amina Meru Cultural Crafts"}</div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-300">
                        <div className="font-bold text-amber-700 uppercase">TO (BUYER DESTINATION):</div>
                        <div className="font-black text-base mt-1">{selectedOrderForLabel.customerName}</div>
                        <div>{selectedOrderForLabel.deliveryLocation}</div>
                        <div>Tel: {selectedOrderForLabel.customerPhone}</div>
                      </div>
                    </div>

                    <div className="border-t-2 border-b-2 border-black py-3 text-xs font-mono flex justify-between items-center">
                      <div>
                        <span className="font-bold">CONTENTS:</span> {selectedOrderForLabel.items.map((i) => i.productName).join(", ")}
                      </div>
                      <div className="font-black bg-green-200 px-2 py-1 rounded text-green-900">
                        {selectedOrderForLabel.paymentMethod}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <QrCode size={48} className="text-black" />
                        <div className="text-[10px] font-mono leading-tight">
                          <div>SCAN FOR BODA BODA PICKUP</div>
                          <div className="font-bold text-amber-800">HOTLINE: +255754998882</div>
                        </div>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                      >
                        <Printer size={14} /> Print Label Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ARTISAN TAB 4: MANAGE PRODUCTS */}
            {artisanTab === "products" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="glass-card rounded-2xl p-5 border border-gold/20 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gold/10 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/30">
                          {p.category}
                        </span>
                        <span className="text-gold font-bold font-mono">
                          {formatPrice(currency === "TZS" ? p.priceTZS : p.priceUSD, currency)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-earth-cream text-base mb-2">{p.name}</h3>
                      <p className="text-earth-cream/65 text-xs font-body leading-relaxed mb-4">{p.description.en}</p>
                    </div>

                    <div className="border-t border-gold/15 pt-3 flex justify-between items-center text-xs font-body text-earth-cream/60">
                      <span>In Stock: {p.inStock ? "Yes ✅" : "No ❌"}</span>
                      <span className="text-gold font-semibold">Artisan: {p.artisanName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. BUYER / CUSTOMER DASHBOARD VIEW                                       */}
        {/* ========================================================================= */}
        {currentRole === "buyer" && (
          <div className="space-y-6">
            {/* Buyer Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 border-b border-gold/20 pb-4">
              <button
                onClick={() => setBuyerTab("my_orders")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  buyerTab === "my_orders" ? "bg-sky-500 text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <ShoppingBag size={16} />
                My Orders & Live Boda Boda Tracking ({orders.length})
              </button>

              <button
                onClick={() => setBuyerTab("delivery_settings")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  buyerTab === "delivery_settings" ? "bg-sky-500 text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <Navigation size={16} />
                Delivery Address Settings
              </button>

              <button
                onClick={() => setBuyerTab("support")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
                  buyerTab === "support" ? "bg-sky-500 text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
                }`}
              >
                <Phone size={16} />
                Support & Concierge (+255754998882)
              </button>
            </div>

            {/* BUYER TAB 1: MY ORDERS & BODA BODA TRACKING */}
            {buyerTab === "my_orders" && (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="glass-card rounded-3xl p-6 border-2 border-gold/30 space-y-4 shadow-luxury">
                    <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gold/20 pb-4">
                      <div>
                        <span className="text-[10px] text-earth-cream/60 font-mono">ORDER ID</span>
                        <div className="font-mono text-gold font-bold text-xl">{order.id}</div>
                        <div className="text-xs text-earth-cream/70">Placed on {order.createdAt}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-gold/20 text-gold text-xs font-body font-bold px-3 py-1 rounded-full border border-gold/40">
                          {order.status}
                        </span>
                        <Link
                          href="/delivery"
                          className="btn-gold px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1"
                        >
                          <Truck size={12} /> Open Live Tracking Map →
                        </Link>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-body text-earth-cream/80">
                      <div>
                        <span className="text-earth-cream/50">Delivery Destination:</span>
                        <div className="font-bold text-white">{order.deliveryLocation}</div>
                      </div>
                      <div>
                        <span className="text-earth-cream/50">Total Paid:</span>
                        <div className="font-bold text-gold">
                          {formatPriceCombined(order.totalPriceUSD, currency)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-obsidian-surface/60 rounded-2xl p-4 border border-gold/15">
                      <div className="text-xs font-bold text-gold mb-2">Order Items:</div>
                      <div className="space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.productName}</span>
                            <span className="font-mono text-gold">${item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.bodaBodaRider ? (
                      <div className="bg-sky-950/40 border border-sky-500/30 rounded-2xl p-4 text-xs text-sky-200 flex flex-wrap justify-between items-center gap-3">
                        <div>
                          <strong>Assigned Courier:</strong> {order.bodaBodaRider.name} ({order.bodaBodaRider.plateNumber})
                          <div className="text-[11px] text-sky-300/80">Rider Phone: {order.bodaBodaRider.phone}</div>
                        </div>
                        <a
                          href={`tel:${order.bodaBodaRider.phone}`}
                          className="btn-gold px-4 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <Phone size={13} /> Call Rider Directly
                        </a>
                      </div>
                    ) : (
                      <div className="text-xs text-earth-cream/60 bg-gold/5 p-3 rounded-xl border border-gold/10">
                        Package is being boxed and sealed with the official Afriverse label by the artisan. Courier assignment in progress.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* BUYER TAB 2: DELIVERY SETTINGS */}
            {buyerTab === "delivery_settings" && (
              <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border-2 border-gold/30 shadow-luxury space-y-6">
                <div className="flex items-center gap-3">
                  <Navigation size={22} className="text-gold" />
                  <h3 className="font-display font-bold text-xl text-earth-cream">
                    Saved Arusha Delivery Destinations
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-body">
                  <div className="p-4 rounded-2xl bg-obsidian-surface border border-gold/30 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gold text-sm">Primary Address (Default)</div>
                      <div className="text-white mt-1">Njiro Complex, Arusha</div>
                      <div className="text-earth-cream/60 mt-0.5">Contact: +255 714 223 344 (Baraka Edward)</div>
                    </div>
                    <span className="bg-green-900/60 text-green-300 px-2.5 py-1 rounded-full font-bold border border-green-500/30">
                      Active
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-surface border border-gold/10 flex justify-between items-center text-earth-cream/70">
                    <div>
                      <div className="font-bold text-earth-cream">Secondary Office Address</div>
                      <div className="mt-1">Clock Tower Plaza, Arusha CBD</div>
                    </div>
                    <button className="btn-outline-gold px-3 py-1 rounded-xl text-xs">Set as Default</button>
                  </div>
                </div>
              </div>
            )}

            {/* BUYER TAB 3: SUPPORT */}
            {buyerTab === "support" && (
              <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border-2 border-gold/30 shadow-luxury space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={26} className="text-gold" />
                  <div>
                    <h3 className="font-display font-bold text-2xl text-earth-cream">
                      Afriverse Buyer Protection & Support
                    </h3>
                    <p className="text-xs text-earth-cream/70">
                      Guaranteed authenticity seal & local Arusha customer care.
                    </p>
                  </div>
                </div>

                <div className="bg-gold/10 rounded-2xl p-5 border border-gold/20 space-y-3 text-xs font-body">
                  <div className="text-gold font-bold text-sm">Dedicated Hotline: +255754998882</div>
                  <p className="text-earth-cream/80 leading-relaxed">
                    Have questions about package delivery timing, artisan verification, or payment release? Speak directly with our operations team in Arusha.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="tel:+255754998882"
                      className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow"
                    >
                      <Phone size={14} /> Call Admin Support Now
                    </a>
                    <Link
                      href="/chat"
                      className="btn-outline-gold px-6 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <MessageSquare size={14} /> Chat with Artisan
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}

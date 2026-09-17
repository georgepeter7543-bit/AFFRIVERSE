"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { Product, Order } from "@/lib/data";
import {
  Store,
  PlusCircle,
  Package,
  Truck,
  CheckCircle,
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
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const {
    currentUser,
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
  const [activeTab, setActiveTab] = useState<"products" | "post_product" | "orders" | "label_generator" | "shop_profile">("orders");

  // Post Product Form State (Supports Maasai Shuka & Maasai Shuka Jewelry)
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("Maasai Shuka Jewelry");
  const [pPriceUSD, setPPriceUSD] = useState(85);
  const [pDescEn, setPDescEn] = useState("");
  const [pDescSw, setPDescSw] = useState("");
  const [pTags, setPTags] = useState("Maasai Shuka, Handmade, Arusha");

  const [postSuccess, setPostSuccess] = useState(false);

  // Selected Order for Afriverse Label Printing
  const [selectedOrderForLabel, setSelectedOrderForLabel] = useState<Order | null>(orders[0] || null);

  // Boda Boda Dispatch Form State
  const [dispatchRiderName, setDispatchRiderName] = useState("Juma Kassim");
  const [dispatchRiderPhone, setDispatchRiderPhone] = useState("+255754998882");
  const [dispatchPlateNumber, setDispatchPlateNumber] = useState("MC 452 ABC");
  const [selectedOrderToDispatch, setSelectedOrderToDispatch] = useState<string | null>(null);

  const handlePostProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;

    const tagsArray = pTags.split(",").map((t) => t.trim());
    addProduct({
      name: pName,
      artisanId: currentUser?.id || "a1",
      artisanName: currentUser?.name || "Arusha Artisan",
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
    });

    setPostSuccess(true);
    setPName("");
    setPDescEn("");
    setPDescSw("");
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderToDispatch) return;
    dispatchBodaBoda(selectedOrderToDispatch, dispatchRiderName, dispatchRiderPhone, dispatchPlateNumber);
    setSelectedOrderToDispatch(null);
  };

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-gold/30 mb-8 flex flex-wrap items-center justify-between gap-6 shadow-luxury">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gold text-obsidian text-[10px] font-body font-bold uppercase px-3 py-1 rounded-full">
                ROLE: {currentUser?.role.toUpperCase() || "GUEST"}
              </span>
              <span className="text-earth-cream/60 text-xs font-body font-medium">
                Arusha Region HQ
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl text-earth-cream">
              {currentUser?.name || "Arusha Artisan"} <span className="shimmer-text">Dashboard</span>
            </h1>
            <p className="text-earth-cream/70 text-xs font-body mt-1">
              Shop Name: <strong className="text-gold">{currentUser?.shopName || "Amina Arusha Fine Crafts"}</strong> | Contact: +255754998882
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

            <Link
              href="/login"
              className="btn-outline-gold px-4 py-2 rounded-full text-xs font-body font-semibold"
            >
              Switch Role / Logout
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-gold/20 pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
              activeTab === "orders" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
            }`}
          >
            <Truck size={16} />
            Arusha Orders & Boda Boda Dispatch ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("post_product")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
              activeTab === "post_product" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
            }`}
          >
            <PlusCircle size={16} />
            Post New Craft (Maasai Shuka / Jewelry)
          </button>

          <button
            onClick={() => setActiveTab("label_generator")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
              activeTab === "label_generator" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
            }`}
          >
            <Printer size={16} />
            Afriverse Package Label Generator
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-body font-bold transition-all ${
              activeTab === "products" ? "bg-gold text-obsidian shadow-gold" : "glass-card text-earth-cream/70 border-gold/20"
            }`}
          >
            <Package size={16} />
            Manage Shop Products ({products.length})
          </button>
        </div>

        {/* TAB 1: ARUSHA ORDERS & BODA BODA DISPATCH WORKFLOW */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 bg-gold/5 mb-6">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-gold" />
                <div>
                  <h3 className="font-display font-bold text-lg text-earth-cream">
                    Local Arusha Delivery Workflow
                  </h3>
                  <p className="text-earth-cream/70 text-xs font-body">
                    1. Target artisans are provided Afriverse labels &nbsp;→&nbsp; 2. Buyer places order &nbsp;→&nbsp; 3. Artisan packages product in box, seals with Afriverse label &nbsp;→&nbsp; 4. Artisan dispatches package via Boda Boda rider and pays rider directly.
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
                        <strong>Total:</strong> TZS {order.totalPriceTZS.toLocaleString()} (${order.totalPriceUSD})
                      </div>
                    </div>

                    <div className="bg-obsidian-surface/60 rounded-xl p-3 border border-gold/15 text-xs">
                      <div className="font-bold text-gold mb-1">Items ordered:</div>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.productName}</span>
                          <span>${item.price}</span>
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
                        setActiveTab("label_generator");
                      }}
                      className="btn-outline-gold px-4 py-2.5 rounded-xl text-xs font-body font-semibold flex items-center justify-center gap-2"
                    >
                      <Printer size={14} />
                      Preview/Print Afriverse Label
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
                        className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body font-bold text-gold uppercase mb-1">Rider Phone</label>
                      <input
                        type="tel"
                        required
                        value={dispatchRiderPhone}
                        onChange={(e) => setDispatchRiderPhone(e.target.value)}
                        className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body font-bold text-gold uppercase mb-1">Motorcycle Plate Number</label>
                      <input
                        type="text"
                        required
                        value={dispatchPlateNumber}
                        onChange={(e) => setDispatchPlateNumber(e.target.value)}
                        className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2 text-sm text-earth-cream"
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

        {/* TAB 2: POST NEW CRAFT (MAASAI SHUKA / MAASAI SHUKA JEWELRY) */}
        {activeTab === "post_product" && (
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 border-2 border-gold/30 shadow-luxury">
            <h2 className="font-display font-bold text-2xl text-earth-cream mb-2">
              Post New Craft to Shop
            </h2>
            <p className="text-earth-cream/70 text-xs font-body mb-6">
              Post authentic Arusha artisan-made goods including Maasai Shuka textiles, Maasai Shuka jewelry, tanzanite rings, and wood carvings.
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
                  placeholder="e.g. Handmade Maasai Shuka Jewelry Set"
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
                    <option value="Maasai Shuka & Textiles">Maasai Shuka & Textiles</option>
                    <option value="Maasai Shuka Jewelry">Maasai Shuka Jewelry</option>
                    <option value="Tanzanite & Jewelry">Tanzanite & Jewelry</option>
                    <option value="Fine Art">Fine Art</option>
                    <option value="Wood Carvings">Wood Carvings</option>
                    <option value="Coffee & Spices">Coffee & Spices</option>
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
                  placeholder="Authentic Arusha artisan-made goods..."
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
                  placeholder="Maasai Shuka, Jewelry, Arusha"
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

        {/* TAB 3: AFRIVERSE PACKAGE LABEL GENERATOR */}
        {activeTab === "label_generator" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-6 border-2 border-gold/30">
              <h3 className="font-display font-bold text-xl text-earth-cream mb-2">
                Official Afriverse Printable Package Label
              </h3>
              <p className="text-earth-cream/70 text-xs font-body">
                Target artisans print this label and stick it onto the boxed package before handing it to the Boda Boda rider.
              </p>
            </div>

            {/* Printable Label Box */}
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
                    <div>Tel: +255754998882</div>
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
                    <span className="font-bold">CONTENTS:</span> {selectedOrderForLabel.items.map(i => i.productName).join(", ")}
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

        {/* TAB 4: MANAGE PRODUCTS */}
        {activeTab === "products" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="glass-card rounded-2xl p-5 border border-gold/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gold/10 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/30">
                      {p.category}
                    </span>
                    <span className="text-gold font-bold font-mono">${p.priceUSD}</span>
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
      </section>

      <Footer lang={lang} />
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/data";
import { useStore } from "@/lib/store";
import { SlidersHorizontal, Search, X, Sparkles, Package } from "lucide-react";

export default function ShopMarketplacePage() {
  const { products, lang, setLang, currency, setCurrency } = useStore();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const isEn = lang === "en";
  const selectedCatObj = categories.find((c) => c.id === selectedCat);

  // Filter dynamically against global products store (persisted in localStorage)
  const filteredProducts = products.filter((p) => {
    const matchCat =
      !selectedCat ||
      (selectedCatObj &&
        (p.category.toLowerCase().includes(selectedCatObj.name.en.toLowerCase().split("&")[0].trim().toLowerCase()) ||
          selectedCatObj.name.en.toLowerCase().includes(p.category.toLowerCase()) ||
          p.category.toLowerCase() === selectedCatObj.name.en.toLowerCase()));
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.artisanName.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-3">
          <Sparkles size={14} className="text-gold" />
          <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
            AFRIVERSE Marketplace — Arusha Guild
          </span>
        </div>
        <h1 className="section-heading text-4xl lg:text-6xl mb-4">
          {isEn ? "Live Artisan" : "Soko la Moja kwa Moja"}{" "}
          <span className="shimmer-text">{isEn ? "Marketplace" : "la Mafundi"}</span>
        </h1>
        <p className="text-earth-cream/70 font-body text-base max-w-xl">
          {isEn
            ? "Browse authentic, certified crafts directly from Arusha master artisans. Newly published crafts appear live instantly."
            : "Tazama bidhaa halisi zilizothibitishwa moja kwa moja kutoka kwa mafundi wa Arusha. Bidhaa mpya zinaonekana moja kwa moja."}
        </p>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-obsidian-surface/60 backdrop-blur-md p-4 rounded-2xl border border-gold/15">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-cream/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? "Search authentic crafts, artisans, tags..." : "Tafuta bidhaa, mafundi, vitambulisho..."}
              className="w-full bg-obsidian border border-gold/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-earth-cream placeholder:text-earth-cream/40 focus:outline-none focus:border-gold font-body"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-cream/40 hover:text-earth-cream"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCat(null)}
              className={`px-3.5 py-2 rounded-xl text-xs font-body font-semibold whitespace-nowrap transition-all ${
                selectedCat === null
                  ? "bg-gold text-obsidian shadow-gold"
                  : "bg-obsidian border border-gold/20 text-earth-cream/70 hover:border-gold/50"
              }`}
            >
              {isEn ? "All Crafts" : "Zote"} ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-body font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat.id
                    ? "bg-gold text-obsidian shadow-gold"
                    : "bg-obsidian border border-gold/20 text-earth-cream/70 hover:border-gold/50"
                }`}
              >
                {cat.icon} {cat.name[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-obsidian-surface/40 border border-gold/20 p-8 space-y-4">
            <Package size={44} className="text-[#D4AF37]/50 mx-auto" />
            <h3 className="text-xl font-display font-bold text-earth-cream">
              {isEn ? "No matching crafts found" : "Hakuna bidhaa zilizopatikana"}
            </h3>
            <p className="text-sm text-earth-cream/60 max-w-md mx-auto font-body">
              {isEn
                ? "Try adjusting your search query or category filters to discover authentic handmade Arusha pieces."
                : "Jaribu kubadilisha vigezo vya utafutaji ili kupata bidhaa halisi za Arusha."}
            </p>
            <button
              onClick={() => {
                setSelectedCat(null);
                setQuery("");
              }}
              className="btn-gold px-5 py-2 rounded-full text-xs font-bold shadow-gold"
            >
              {isEn ? "Reset Filters" : "Ondoa Vichungi"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} currency={currency} />
            ))}
          </div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}

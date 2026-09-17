"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/data";
import { useStore } from "@/lib/store";
import type { Language, Currency } from "@/lib/data";
import { SlidersHorizontal, Search, X, Sparkles } from "lucide-react";

export default function ProductsPage() {
  const { products, lang, setLang, currency, setCurrency } = useStore();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const isEn = lang === "en";

  const filtered = products.filter((p) => {
    const matchCat = !selectedCat || p.category.toLowerCase().includes(selectedCat.toLowerCase());
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
            Authentic Arusha Artisan-Made Goods
          </span>
        </div>
        <h1 className="section-heading text-4xl lg:text-6xl mb-4">
          {isEn ? "Shop Authentic" : "Duka la Bidhaa Halisi"}
          {" "}
          <span className="shimmer-text">{isEn ? "Arusha Crafts" : "za Mikono Arusha"}</span>
        </h1>
        <p className="text-earth-cream/70 font-body text-base max-w-xl">
          {isEn
            ? "Handpicked authentic Arusha artisan-made goods including Maasai shuka textiles, Maasai shuka jewelry, tanzanite rings, and wood carvings."
            : "Bidhaa halisi zilizochaguliwa kwa mikono kutoka kwa mafundi wa Arusha."}
        </p>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-cream/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? "Search Maasai shuka, jewelry, artisans..." : "Tafuta bidhaa, mafundi..."}
              className="w-full bg-obsidian-surface border border-gold/20 rounded-full pl-10 pr-9 py-2.5 text-sm text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body"
              id="product-search"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-cream/40 hover:text-gold">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCat(null)}
              id="filter-all"
              className={`px-4 py-2 rounded-full text-xs font-body font-bold transition-all ${
                !selectedCat ? "bg-gold text-obsidian shadow-gold" : "border border-gold/20 text-earth-cream/70 hover:border-gold/40"
              }`}
            >
              {isEn ? "All Crafts" : "Zote"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
                id={`filter-${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs font-body font-bold transition-all flex items-center gap-1.5 ${
                  selectedCat === cat.id
                    ? "bg-gold text-obsidian shadow-gold"
                    : "border border-gold/20 text-earth-cream/70 hover:border-gold/40"
                }`}
              >
                {cat.icon} {cat.name[lang]}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="ml-auto text-gold text-xs font-body font-semibold flex items-center gap-1.5">
            <SlidersHorizontal size={13} />
            {filtered.length} {isEn ? "items" : "bidhaa"}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-earth-cream/40 text-4xl mb-4">🔍</p>
            <p className="text-earth-cream/70 font-body">{isEn ? "No products found matching your search." : "Hakuna bidhaa zilizopatikana."}</p>
            <button onClick={() => { setQuery(""); setSelectedCat(null); }} className="mt-4 text-gold text-sm font-body font-bold hover:underline">
              {isEn ? "Clear all filters" : "Futa vichujio"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} currency={currency} />
            ))}
          </div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtisanCard from "@/components/ArtisanCard";
import { artisans } from "@/lib/data";
import type { Language, Currency } from "@/lib/data";
import { Search, SlidersHorizontal, ShieldCheck, MapPin, Truck } from "lucide-react";

const crafts = [
  "All",
  "Tanzanite & Jewelry",
  "Maasai Shuka & Beadwork",
  "Fine Art",
  "Wood Carvings",
  "Coffee & Spices",
  "Safari & Tours",
];

export default function ArtisansPage() {
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [query, setQuery] = useState("");
  const [craftFilter, setCraftFilter] = useState("All");
  const isEn = lang === "en";

  const filtered = artisans.filter((a) => {
    const matchQuery =
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.craft.toLowerCase().includes(query.toLowerCase()) ||
      a.location.toLowerCase().includes(query.toLowerCase());
    const matchCraft = craftFilter === "All" || a.craft.toLowerCase().includes(craftFilter.toLowerCase().split(" ")[0]);
    return matchQuery && matchCraft;
  });

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="section-label mb-3">{isEn ? "The Makers Behind the Crafts" : "Waunda Nyuma ya Uchawi"}</p>
        <h1 className="section-heading text-4xl lg:text-6xl mb-6">
          <span className="shimmer-text">{isEn ? "Verified Arusha Artisans" : "Mafundi wa Arusha"}</span>
        </h1>
        <p className="text-earth-cream/70 font-body text-base max-w-2xl">
          {isEn
            ? "Connecting Arusha artisans to global markets. Every craftsperson is personally verified in Arusha for authentic Arusha artisan-made goods, ethical standards, and genuine heritage."
            : "Kila msanii kwenye AFRIVERSE amethibitishwa kibinafsi na timu yetu ya Arusha."}
        </p>

        {/* Verification notes */}
        <div className="flex flex-wrap gap-6 mt-6 border-t border-gold/15 pt-4 text-xs font-body text-gold">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> 100% Authentic Arusha Artisan-Made Goods
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Based in Arusha City & Regions
          </span>
          <span className="flex items-center gap-2">
            <Truck size={16} /> Direct Arusha Delivery & Express Courier
          </span>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-cream/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? "Search Arusha artisans..." : "Tafuta mafundi..."}
              className="bg-obsidian-surface border border-gold/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body w-64"
              id="artisan-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {crafts.map((craft) => (
              <button
                key={craft}
                onClick={() => setCraftFilter(craft)}
                id={`artisan-filter-${craft.toLowerCase().replace(/\s/g, "-")}`}
                className={`px-4 py-2 rounded-full text-xs font-body font-bold transition-all ${
                  craftFilter === craft ? "bg-gold text-obsidian shadow-gold" : "border border-gold/20 text-earth-cream/70 hover:border-gold/40"
                }`}
              >
                {craft}
              </button>
            ))}
          </div>
          <div className="ml-auto text-gold text-xs font-body font-semibold flex items-center gap-1.5">
            <SlidersHorizontal size={13} />
            {filtered.length} {isEn ? "artisans" : "mafundi"}
          </div>
        </div>
      </section>

      {/* Artisan Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-earth-cream/40 text-4xl mb-4">🔍</p>
            <p className="text-earth-cream/70 font-body">{isEn ? "No artisans found." : "Hakuna mafundi waliopatikana."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((artisan) => (
              <div key={artisan.id} id={artisan.id}>
                <ArtisanCard artisan={artisan} lang={lang} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}

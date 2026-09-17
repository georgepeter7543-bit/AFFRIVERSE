"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import CultureMap from "@/components/CultureMap";
import Testimonials from "@/components/Testimonials";
import PaymentBadges from "@/components/PaymentBadges";
import Footer from "@/components/Footer";
import ArtisanCard from "@/components/ArtisanCard";
import SellerOnboarding from "@/components/SellerOnboarding";
import { artisans } from "@/lib/data";
import type { Language, Currency } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* HERO */}
      <HeroSection lang={lang} currency={currency} />

      {/* STATS BAR */}
      <StatsBar lang={lang} />

      {/* CATEGORIES */}
      <CategoryGrid lang={lang} />

      {/* Luxury Divider */}
      <div className="luxury-divider mx-8 my-4" />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts lang={lang} currency={currency} />

      {/* ARTISAN SPOTLIGHT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="artisan-spotlight">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">
              {isEn ? "Meet Arusha Craftspeople" : "Kutana na Waunda"}
            </p>
            <h2 className="section-heading text-4xl lg:text-5xl">
              {isEn ? "Verified Arusha" : "Mafundi"}
              <br />
              <span className="shimmer-text">{isEn ? "Master Artisans" : "Waliothibitishwa"}</span>
            </h2>
          </div>
          <Link
            href="/artisans"
            className="hidden sm:flex items-center gap-2 btn-outline-gold px-6 py-3 rounded-full text-sm font-body font-semibold"
          >
            {isEn ? "View All Artisans" : "Ona Mafundi Wote"}
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.slice(0, 3).map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} lang={lang} />
          ))}
        </div>
      </section>

      {/* CULTURE MAP PREVIEW */}
      <div className="bg-obsidian-light">
        <CultureMap lang={lang} />
      </div>

      {/* SELLER CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="seller-cta">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-xs font-body font-semibold tracking-wide">
              {isEn ? "Connecting Arusha Artisans to Global Markets" : "Kuunganisha Mafundi wa Arusha na Masoko"}
            </span>
          </div>
          <h2 className="section-heading text-4xl lg:text-5xl mb-4">
            {isEn ? "Sell Authentic" : "Uza Bidhaa Halisi za"}
            <br />
            <span className="shimmer-text">{isEn ? "Arusha Artisan Goods" : "Mikono za Arusha"}</span>
          </h2>
          <p className="text-earth-cream/70 font-body text-lg max-w-xl mx-auto mb-12">
            {isEn
              ? "Join 2,400+ verified Arusha artisans selling Maasai shuka, jewelry, fine art, and wood carvings with direct local Boda Boda dispatch."
              : "Jiunge na mafundi 2,400+ wa Arusha wanaouza bidhaa zao duniani kote."}
          </p>
          <SellerOnboarding lang={lang} compact={true} />

          <Link
            href="/sell"
            className="btn-gold inline-flex items-center gap-2 mt-12 px-10 py-4 rounded-full text-sm font-body font-semibold shadow-gold-lg"
          >
            {isEn ? "Register & Start Selling in Arusha →" : "Anza Kuuza Arusha →"}
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="bg-obsidian-light">
        <Testimonials lang={lang} />
      </div>

      {/* PAYMENT BADGES */}
      <PaymentBadges lang={lang} />

      {/* FOOTER */}
      <Footer lang={lang} />
    </main>
  );
}

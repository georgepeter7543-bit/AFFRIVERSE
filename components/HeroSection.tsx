"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Award, MapPin } from "lucide-react";
import type { Language, Currency } from "@/lib/data";

interface HeroSectionProps {
  lang: Language;
  currency: Currency;
}

const content = {
  en: {
    badge: "Direct from Arusha, Tanzania 🇹🇿",
    badge2: "100% Authentic Arusha Artisan-Made Goods",
    headline: "Connecting Arusha Artisans to",
    headlineAccent: "Global Markets",
    headlineEnd: "& Ethical Luxury",
    subheadline:
      "Connecting Arusha's finest craftsmen, Maasai shuka weavers, and gemstone artisans directly to world buyers. Discover authentic Arusha artisan-made goods crafted with heritage and precision.",
    cta1: "Explore Arusha Collection",
    cta2: "Meet Arusha Artisans",
    stat1: { value: "2,400+", label: "Arusha Artisans" },
    stat2: { value: "100%", label: "Arusha Artisan-Made" },
    stat3: { value: "100%", label: "Authenticity Certified" },
  },
  sw: {
    badge: "Moja kwa moja kutoka Arusha, Tanzania 🇹🇿",
    badge2: "Bidhaa Halisi 100% za Mikono za Arusha",
    headline: "Kuunganisha Mafundi wa Arusha na",
    headlineAccent: "Masoko ya Kimataifa",
    headlineEnd: "& Utamaduni",
    subheadline:
      "Kuunganisha mafundi bora wa Arusha, waunda vitambaa vya Maasai shuka, na vito na wanunuzi wa kimataifa. Gundua bidhaa halisi za mikono za Arusha.",
    cta1: "Chunguza Mkusanyiko",
    cta2: "Kutana na Mafundi",
    stat1: { value: "2,400+", label: "Mafundi wa Arusha" },
    stat2: { value: "100%", label: "Kazi za Arusha" },
    stat3: { value: "100%", label: "Cheti cha Uhalisi" },
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const c = content[lang];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0" ref={heroRef}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Arusha Maasai Market with Kilimanjaro backdrop"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-hero-overlay" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-obsidian/40" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-gold text-xs font-body font-medium tracking-wide border border-gold/30 shadow">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {c.badge}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-earth-cream text-xs font-body font-semibold tracking-wide border border-gold/20">
              <Shield size={12} className="text-gold" />
              {c.badge2}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-earth-cream leading-[1.1] mb-6">
            {c.headline}
            <br />
            <span className="shimmer-text">{c.headlineAccent}</span>
            <br />
            <span className="text-earth-cream/90">{c.headlineEnd}</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-earth-cream/80 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl font-normal">
            {c.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/products"
              id="hero-cta-primary"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-body font-semibold tracking-wide shadow-gold-lg"
            >
              {c.cta1}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/sell"
              id="hero-cta-secondary"
              className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-body font-semibold tracking-wide"
            >
              Start Selling in Arusha →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 border-t border-gold/15 pt-6">
            {[c.stat1, c.stat2, c.stat3].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {i === 0 && <Award size={18} className="text-gold" />}
                  {i === 1 && <MapPin size={18} className="text-gold" />}
                  {i === 2 && <Shield size={18} className="text-gold" />}
                  <span className="font-display font-bold text-2xl text-gold">{stat.value}</span>
                </div>
                <span className="text-earth-cream/70 text-xs font-body uppercase tracking-wider font-medium leading-tight max-w-[90px]">
                  {stat.label}
                </span>
                {i < 2 && <div className="w-px h-8 bg-earth-cream/10 ml-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

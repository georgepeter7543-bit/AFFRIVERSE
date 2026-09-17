"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import type { Language } from "@/lib/data";

interface CategoryGridProps {
  lang: Language;
}

export default function CategoryGrid({ lang }: CategoryGridProps) {
  const isEn = lang === "en";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="categories">
      <div className="text-center mb-14">
        <p className="section-label mb-3">
          {isEn ? "Explore Our World" : "Gundua Ulimwengu Wetu"}
        </p>
        <h2 className="section-heading text-4xl lg:text-5xl mb-4">
          {isEn ? "Arusha's Finest" : "Bora za Arusha"}
          <br />
          <span className="shimmer-text">
            {isEn ? "Craft Categories" : "Makundi ya Ufundi"}
          </span>
        </h2>
        <p className="text-earth-cream/50 font-body text-lg max-w-xl mx-auto">
          {isEn
            ? "From world-exclusive Tanzanite to hand-crafted Maasai beadwork — every category tells a story."
            : "Kutoka Tanzanite ya kipekee duniani hadi mapambo ya Kimaasai yaliyoshonwa kwa mikono."}
        </p>
      </div>

      {/* 5-category grid: 2+2+1 */}
      <div className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.slice(0, 2).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} lang={lang} size="large" />
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.slice(2, 5).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} lang={lang} size="small" />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  lang,
  size,
}: {
  cat: (typeof categories)[0];
  lang: Language;
  size: "large" | "small";
}) {
  const isEn = lang === "en";
  const height = size === "large" ? "h-80" : "h-64";

  return (
    <Link href={`/products?category=${cat.id}`} className={`category-card group relative ${height} rounded-2xl overflow-hidden block cursor-pointer`}>
      {/* Background Image */}
      <Image
        src={`/images/${cat.imageKey}.jpg`}
        alt={cat.name[lang]}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl mb-2">{cat.icon}</div>
            <h3 className="font-display font-bold text-earth-cream text-xl mb-1 group-hover:text-gold transition-colors">
              {cat.name[lang]}
            </h3>
            <p className="text-earth-cream/55 text-sm font-body leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {cat.description[lang]}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-gold/70 text-xs font-body font-medium tracking-wide">
              {cat.productCount} {isEn ? "items" : "bidhaa"}
            </span>
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
              <ArrowRight size={16} className="text-gold group-hover:text-obsidian transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

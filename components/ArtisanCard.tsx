"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, CheckCircle, Award } from "lucide-react";
import type { Artisan, Language } from "@/lib/data";

interface ArtisanCardProps {
  artisan: Artisan;
  lang: Language;
}

export default function ArtisanCard({ artisan, lang }: ArtisanCardProps) {
  return (
    <div className="product-card glass-card rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 group">
      {/* Card Header - Avatar Area */}
      <div className={`relative h-40 bg-gradient-to-br ${artisan.imageColor} flex items-center justify-center overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(201,168,76,0.3) 0, rgba(201,168,76,0.3) 1px, transparent 0, transparent 50%)`,
            backgroundSize: "14px 14px",
          }}
        />
        {/* Avatar */}
        <div className="relative z-10 w-20 h-20 rounded-full border-4 border-gold/40 bg-obsidian flex items-center justify-center shadow-gold">
          <span className="font-display font-bold text-2xl text-gold">{artisan.initials}</span>
        </div>
        {/* Verified Badge */}
        {artisan.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-obsidian/80 rounded-full px-2 py-1">
            <CheckCircle size={11} className="text-gold" />
            <span className="text-gold text-[10px] font-body font-semibold">
              {lang === "en" ? "Verified" : "Imethibitishwa"}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-bold text-earth-cream text-lg group-hover:text-gold transition-colors">
              {artisan.name}
            </h3>
            <p className="text-gold/70 text-xs font-body font-medium tracking-wide">{artisan.craft}</p>
          </div>
          <div className="flex items-center gap-1 bg-obsidian-surface rounded-full px-2 py-1">
            <Star size={11} className="text-gold fill-gold" />
            <span className="text-earth-cream text-xs font-body font-semibold">{artisan.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={12} className="text-earth/70 flex-shrink-0" />
          <span className="text-earth-cream/45 text-xs font-body">{artisan.location}</span>
        </div>

        <p className="text-earth-cream/55 text-sm font-body leading-relaxed mb-4 line-clamp-3">
          {artisan.bio[lang]}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {artisan.specialties.slice(0, 2).map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-full bg-obsidian-surface border border-gold/15 text-earth-cream/50 text-[10px] font-body">
              {s}
            </span>
          ))}
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between pt-3 border-t border-obsidian-surface">
          <div className="flex items-center gap-1.5">
            <Award size={12} className="text-gold/60" />
            <span className="text-earth-cream/40 text-xs font-body">
              {artisan.yearsActive} {lang === "en" ? "yrs active" : "miaka"}
            </span>
          </div>
          <span className="text-earth-cream/30 text-xs font-body">
            {artisan.reviewCount} {lang === "en" ? "reviews" : "maoni"}
          </span>
        </div>
      </div>

      {/* Hover CTA */}
      <Link
        href={`/artisans#${artisan.id}`}
        className="block w-full py-3 text-center text-xs font-body font-semibold tracking-wider uppercase border-t border-gold/10 text-gold/60 hover:text-obsidian hover:bg-gold transition-all duration-300 group-hover:text-obsidian group-hover:bg-gold"
      >
        {lang === "en" ? "View Profile" : "Ona Wasifu"}
      </Link>
    </div>
  );
}

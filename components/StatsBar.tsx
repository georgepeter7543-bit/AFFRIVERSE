"use client";

import { stats } from "@/lib/data";
import type { Language } from "@/lib/data";

interface StatsBarProps {
  lang: Language;
}

export default function StatsBar({ lang }: StatsBarProps) {
  return (
    <section className="relative py-12 overflow-hidden bg-obsidian-light border-y border-gold/10">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-tanzanite/10 via-transparent to-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="font-display font-bold text-3xl lg:text-4xl text-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-earth-cream/50 text-xs font-body tracking-widest uppercase">
                {stat.label[lang]}
              </div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gold/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

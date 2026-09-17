"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import type { Language } from "@/lib/data";
import { useState } from "react";

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const isEn = lang === "en";
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="testimonials">
      <div className="text-center mb-14">
        <p className="section-label mb-3">
          {isEn ? "Global Voices" : "Sauti za Kimataifa"}
        </p>
        <h2 className="section-heading text-4xl lg:text-5xl mb-4">
          {isEn ? "What Our Customers" : "Wateja Wetu"}
          <br />
          <span className="shimmer-text">{isEn ? "Are Saying" : "Wanasema"}</span>
        </h2>
      </div>

      {/* Featured Testimonial */}
      <div className="relative max-w-3xl mx-auto mb-10">
        <div className="glass-card rounded-3xl border border-gold/20 p-8 lg:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Quote size={28} className="text-gold/60" />
          </div>
          <p className="font-display italic text-earth-cream/80 text-xl lg:text-2xl leading-relaxed mb-8">
            "{testimonials[active].text}"
          </p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={14} className="text-gold fill-gold" />
            ))}
          </div>
          <div className="font-body font-semibold text-earth-cream">{testimonials[active].name}</div>
          <div className="text-earth-cream/40 text-sm font-body">{testimonials[active].country}</div>
          <div className="text-gold/50 text-xs font-body mt-1">
            {isEn ? "Purchased:" : "Alinunua:"} {testimonials[active].product}
          </div>
        </div>
      </div>

      {/* Testimonial selectors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            id={`testimonial-${t.id}`}
            className={`glass-card rounded-xl p-4 border text-left transition-all duration-200 ${
              active === i ? "border-gold/50 bg-gold/5" : "border-gold/10 hover:border-gold/25"
            }`}
          >
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_, j) => (
                <Star key={j} size={10} className="text-gold fill-gold" />
              ))}
            </div>
            <div className="font-body font-semibold text-earth-cream text-sm">{t.name}</div>
            <div className="text-earth-cream/35 text-xs font-body">{t.country}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

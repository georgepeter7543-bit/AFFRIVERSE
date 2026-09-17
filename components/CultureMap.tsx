"use client";

import { useState } from "react";
import { MapPin, Users, Info, X, Phone, Clock, Compass } from "lucide-react";
import { arushLocations } from "@/lib/data";
import type { Language } from "@/lib/data";

interface CultureMapProps {
  lang: Language;
}

export default function CultureMap({ lang }: CultureMapProps) {
  const isEn = lang === "en";
  const [selected, setSelected] = useState<string | null>("l1");
  const selectedLocation = arushLocations.find((l) => l.id === selected);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="culture-map">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
          <Compass size={14} className="text-gold" />
          <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
            {isEn ? "Arusha Origin Point Map" : "Ramani ya Arusha"}
          </span>
        </div>
        <h2 className="section-heading text-4xl lg:text-5xl mb-4">
          {isEn ? "Accurate Map of Key" : "Ramani ya Sahihi ya"}
          {" "}
          <span className="shimmer-text">
            {isEn ? "Artisan Shops in Arusha" : "Vituo vya Mafundi Arusha"}
          </span>
        </h2>
        <p className="text-earth-cream/70 font-body text-base sm:text-lg max-w-xl mx-auto">
          {isEn
            ? "Discover verified artisan markets, cooperatives, and gemstone centers across Arusha City and its surrounds."
            : "Gundua vituo vya mafundi, masoko, na vyama vya ushirika kote Arusha."}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Map Panel */}
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-card border-2 border-gold/30 shadow-luxury">
            {/* Map background centered on Arusha */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 50% 50%, rgba(201,168,76,0.25) 0%, transparent 40%),
                  radial-gradient(ellipse at 60% 40%, rgba(27,42,107,0.5) 0%, transparent 60%),
                  linear-gradient(135deg, #0D1640 0%, #1A1A1A 50%, #0D0D0D 100%)
                `,
              }}
            >
              {/* Grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Arusha Central Origin Marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-0">
                <div className="w-24 h-24 rounded-full border border-gold/40 animate-ping opacity-30 bg-gold/10" />
                <span className="text-[11px] font-display font-bold text-gold uppercase tracking-widest mt-1 bg-obsidian/90 px-3 py-1 rounded-full border border-gold/40 shadow">
                  📍 Arusha Origin (HQ)
                </span>
              </div>

              {/* Location Pins */}
              {arushLocations.map((loc) => (
                <button
                  key={loc.id}
                  id={`map-pin-${loc.id}`}
                  onClick={() => setSelected(selected === loc.id ? null : loc.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group z-10"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selected === loc.id
                      ? "bg-gold border-white scale-125 shadow-gold-lg"
                      : "bg-tanzanite border-gold hover:bg-gold hover:scale-110"
                  }`}>
                    <MapPin size={12} className={selected === loc.id ? "text-obsidian" : "text-gold"} />
                  </div>
                  <span className={`text-[10px] font-body font-bold whitespace-nowrap glass-dark px-2 py-0.5 rounded-full border transition-all duration-200 ${
                    selected === loc.id ? "text-gold border-gold" : "text-earth-cream/80 border-earth-cream/20"
                  }`}>
                    {loc.name}
                  </span>
                </button>
              ))}

              <div className="absolute bottom-4 right-4 text-earth-cream/40 font-display text-xs uppercase tracking-widest bg-obsidian/80 px-3 py-1 rounded-full border border-gold/20">
                Arusha, Tanzania 🇹🇿 — +255754998882
              </div>
            </div>
          </div>
        </div>

        {/* Selected Hub Details Panel */}
        <div className="space-y-4">
          {selectedLocation ? (
            <div className="glass-card rounded-2xl p-6 border-2 border-gold/40 relative bg-gold/5 shadow-gold">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-earth-cream/50 hover:text-gold">
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shadow">
                  <MapPin size={20} className="text-obsidian" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gold text-lg">{selectedLocation.name}</h4>
                  <span className="text-earth-cream/60 text-xs font-body">{selectedLocation.type}</span>
                </div>
              </div>

              <p className="text-earth-cream/80 text-sm font-body leading-relaxed mb-4">
                {selectedLocation.description}
              </p>

              <div className="space-y-2 border-t border-gold/20 pt-4 text-xs font-body text-earth-cream/80">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold flex-shrink-0" />
                  <span><strong>Address:</strong> {selectedLocation.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gold flex-shrink-0" />
                  <span><strong>Phone:</strong> {selectedLocation.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold flex-shrink-0" />
                  <span><strong>Hours:</strong> {selectedLocation.openingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-gold font-semibold pt-1">
                  <Users size={14} />
                  <span>{selectedLocation.artisanCount} Verified Arusha Artisans</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 border border-gold/20">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-gold" />
                <span className="text-earth-cream/80 text-xs font-body font-semibold">Select any pin above</span>
              </div>
              <p className="text-earth-cream/60 text-xs font-body">
                Click any key artisan shop pin on the map to see complete contact details, opening hours, and address.
              </p>
            </div>
          )}

          {/* List of Key Arusha Artisan Hubs */}
          <h4 className="section-label mt-6 mb-3">
            {isEn ? "Key Arusha Artisan Shops Directory" : "Orodha ya Vituo vya Arusha"}
          </h4>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {arushLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelected(selected === loc.id ? null : loc.id)}
                className={`w-full text-left glass-card rounded-xl p-3.5 border transition-all duration-200 ${
                  selected === loc.id ? "border-gold bg-gold/10" : "border-gold/15 hover:border-gold/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body font-bold text-earth-cream text-sm">{loc.name}</span>
                  <span className="text-gold text-xs font-mono font-semibold">{loc.artisanCount} artisans</span>
                </div>
                <div className="text-earth-cream/60 text-xs font-body">{loc.address}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import type { Language } from "@/lib/data";
import { useStore } from "@/lib/store";

interface FooterProps {
  lang?: Language;
}

export default function Footer({ lang: propsLang }: FooterProps = {}) {
  const store = useStore();
  const lang = propsLang || store.lang;
  const isEn = lang === "en";

  return (
    <footer className="bg-obsidian border-t border-gold/10 text-earth-cream">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                <span className="text-obsidian font-display font-black text-sm">A</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg text-earth-cream tracking-wide">
                  AFRI<span className="text-gold">VERSE</span>
                </div>
                <div className="text-[10px] text-gold/60 tracking-[0.15em] uppercase font-body">
                  Arusha Edition
                </div>
              </div>
            </div>
            <p className="text-earth-cream/70 text-sm font-body leading-relaxed mb-6 font-medium">
              Connecting Arusha artisans to global markets.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-earth-cream/50 hover:text-gold hover:border-gold/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="section-label mb-5">{isEn ? "Arusha Shop" : "Duka la Arusha"}</h4>
            <ul className="space-y-3">
              {(isEn
                ? [
                    "Maasai Shuka & Cultural Textiles",
                    "Maasai Shuka Beadwork & Regalia",
                    "Maasai Shuka Jewelry",
                    "East African Fine Art & Decor",
                    "Arusha Coffee & Organic Spices",
                    "Handcrafted Meru Clay & Pottery",
                  ]
                : [
                    "Maasai Shuka & Vitambaa vya Jadi",
                    "Maasai Shuka & Shanga za Jadi",
                    "Mapambo ya Maasai Shuka",
                    "Sanaa ya Afrika Mashariki na Mapambo",
                    "Kahawa & Viungo vya Arusha",
                    "Vyombo vya Udongo vya Meru",
                  ]
              ).map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="section-label mb-5">{isEn ? "Platform" : "Jukwaa"}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/sell" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                  {isEn ? "Sell with Us" : "Uza Nasi"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                  {isEn ? "Artisan & Admin Dashboard" : "Dashibodi ya Mafundi"}
                </Link>
              </li>
              <li>
                <Link href="/culture" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                  {isEn ? "Arusha Cultural Map" : "Ramani ya Utamaduni Arusha"}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                  {isEn ? "Track Boda Boda Delivery" : "Fuatilia Boda Boda"}
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-earth-cream/70 hover:text-gold text-sm font-body transition-colors">
                  {isEn ? "In-App Artisan Chat" : "Mazungumzo ya Mafundi"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-5">{isEn ? "Arusha Contact" : "Mawasiliano Arusha"}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-earth-cream/70 text-sm font-body">
                  Arusha Central Market Crafts Bazaar,<br />Market Street, Arusha, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold flex-shrink-0" />
                <span className="text-earth-cream/90 text-sm font-body font-bold">+255754998882</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold flex-shrink-0" />
                <span className="text-earth-cream/70 text-sm font-body">info@afriverse.co.tz</span>
              </li>
            </ul>

            {/* Payment Method Badges in Footer */}
            <div className="mt-6">
              <p className="text-gold text-xs font-body mb-2 font-semibold">
                {isEn ? "Accepted Payment Methods" : "Njia za Malipo"}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold">M-Pesa</span>
                <span className="px-2 py-1 rounded bg-sky-600 text-white text-[10px] font-bold">Tigo Pesa</span>
                <span className="px-2 py-1 rounded bg-red-700 text-white text-[10px] font-bold">Airtel Money</span>
                <span className="px-2 py-1 rounded bg-blue-900 text-amber-300 text-[10px] font-bold">VISA</span>
                <span className="px-2 py-1 rounded bg-stone-900 text-orange-400 text-[10px] font-bold">Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="luxury-divider mx-8" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-earth-cream/50 text-xs font-body">
          © 2026 AFRIVERSE Arusha Edition. Connecting Arusha artisans to global markets.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-earth-cream/80 text-xs font-body font-semibold">
            Direct from Arusha, Tanzania 🇹🇿 — Tel: +255754998882
          </span>
        </div>
      </div>
    </footer>
  );
}

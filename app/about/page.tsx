"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Language, Currency } from "@/lib/data";
import { Heart, Globe, Leaf, Award, Users, Target, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const isEn = lang === "en";

  const values = [
    {
      icon: Heart,
      title: isEn ? "Connecting Arusha Artisans" : "Kuunganisha Mafundi wa Arusha",
      desc: isEn ? "Connecting Arusha artisans to global markets. Every product is hand-verified in Arusha." : "Kuunganisha mafundi wa Arusha na masoko ya kimataifa.",
    },
    {
      icon: Leaf,
      title: isEn ? "Authentic Arusha Goods" : "Bidhaa Halisi za Arusha",
      desc: isEn ? "We list authentic Arusha artisan-made goods — Maasai shuka, jewelry, fine art, and wood carvings." : "Bidhaa halisi za mikono za Arusha.",
    },
    {
      icon: Users,
      title: isEn ? "Direct Artisan Payouts" : "Malipo ya Moja kwa Moja",
      desc: isEn ? "Over 92% of sales proceeds go directly to Arusha artisans via M-Pesa, Tigo Pesa, or Airtel Money." : "Zaidi ya 92% ya mauzo inaenda moja kwa moja kwa msanii.",
    },
    {
      icon: Globe,
      title: isEn ? "Boda Boda Local Dispatch" : "Usafirishaji wa Boda Boda",
      desc: isEn ? "Artisans seal packages in boxes with official Afriverse labels and dispatch via local Boda Boda." : "Usafirishaji wa haraka kupitia Boda Boda Arusha.",
    },
    {
      icon: Award,
      title: isEn ? "Arusha Verification Seal" : "Hati ya Uhalisi ya Arusha",
      desc: isEn ? "Our curation team ensures every item meets authentic Arusha artisan standards." : "Uhakika wa ufundi bora wa Arusha.",
    },
    {
      icon: Target,
      title: isEn ? "Arusha Hotline Support" : "Msaada wa Simu Arusha",
      desc: isEn ? "Dedicated local support in Arusha at +255754998882 available 24/7." : "Simu ya msaada Arusha: +255754998882.",
    },
  ];

  const team = [
    { name: "Neema Oloitipitip", role: isEn ? "Co-Founder & CEO" : "Mwanzilishi Mwenza & Mkurugenzi Mtendaji", initials: "NO", gradient: "from-tanzanite to-gold" },
    { name: "Marcus Webb", role: isEn ? "Co-Founder & CTO" : "Mwanzilishi Mwenza & Mkurugenzi wa Teknolojia", initials: "MW", gradient: "from-earth to-tanzanite" },
    { name: "Zawadi Kimotho", role: isEn ? "Head of Arusha Artisan Relations" : "Mkuu wa Mahusiano ya Mafundi wa Arusha", initials: "ZK", gradient: "from-earth-dark to-earth" },
    { name: "Dr. Ali Hassan", role: isEn ? "Cultural Heritage Advisor" : "Mshauri wa Utamaduni", initials: "AH", gradient: "from-obsidian-surface to-tanzanite" },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(27,42,107,0.3) 0%, transparent 60%)" }}
      >
        <div className="max-w-3xl">
          <p className="section-label mb-3">{isEn ? "Our Story" : "Hadithi Yetu"}</p>
          <h1 className="section-heading text-4xl lg:text-6xl mb-6">
            {isEn ? "Connecting Arusha Artisans to" : "Kuunganisha Mafundi wa Arusha na"}
            <br />
            <span className="shimmer-text">{isEn ? "Global Markets" : "Masoko ya Kimataifa"}</span>
          </h1>
          <p className="text-earth-cream/80 font-body text-xl leading-relaxed mb-6">
            {isEn
              ? "AFRIVERSE Arusha was founded to connect Arusha's finest craftspeople, Maasai shuka weavers, and tanzanite goldsmiths directly with international buyers. Every purchase supports authentic Arusha artisan-made goods."
              : "AFRIVERSE Arusha ilianzishwa kuunganisha mafundi wa Arusha na masoko ya kimataifa."}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-body font-bold text-gold bg-gold/10 p-4 rounded-2xl border border-gold/30">
            <span className="flex items-center gap-1.5"><MapPin size={16} /> Arusha Central Market Crafts Bazaar</span>
            <span className="flex items-center gap-1.5"><Phone size={16} /> Hotline: +255754998882</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="text-center mb-12">
          <p className="section-label mb-3">{isEn ? "What Guides Us" : "Kinachotupokea"}</p>
          <h2 className="section-heading text-4xl">
            {isEn ? "Our Arusha" : "Maadili Yetu"}
            {" "}
            <span className="shimmer-text">{isEn ? "Pillars" : "ya Arusha"}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass-card rounded-2xl p-6 border border-gold/15 hover:border-gold/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold transition-all">
                  <Icon size={22} className="text-gold group-hover:text-obsidian transition-colors" />
                </div>
                <h3 className="font-display font-bold text-earth-cream text-lg mb-2">{v.title}</h3>
                <p className="text-earth-cream/65 text-sm font-body leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Leadership */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">{isEn ? "Leadership" : "Uongozi"}</p>
          <h2 className="section-heading text-4xl">
            {isEn ? "The Arusha" : ""}
            {" "}
            <span className="shimmer-text">{isEn ? "Leadership Team" : "Timu ya Uongozi"}</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {team.map((member) => (
            <div key={member.name} className="glass-card rounded-2xl overflow-hidden border border-gold/15 hover:border-gold/30 transition-all group text-center">
              <div className={`h-28 bg-gradient-to-br ${member.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="w-16 h-16 rounded-full border-3 border-gold/50 bg-obsidian/60 flex items-center justify-center">
                  <span className="font-display font-bold text-xl text-gold">{member.initials}</span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-display font-bold text-earth-cream">{member.name}</h4>
                <p className="text-gold/80 text-xs font-body mt-1 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card rounded-3xl border border-gold/30 p-10 text-center bg-gold/5">
          <h2 className="font-display font-bold text-earth-cream text-3xl mb-4">
            {isEn ? "Ready to Explore Arusha Crafts?" : "Uko Tayari Kugundua Bidhaa za Arusha?"}
          </h2>
          <p className="text-earth-cream/70 font-body max-w-lg mx-auto mb-8 text-sm">
            Discover authentic Arusha artisan-made goods or register your Arusha craft shop to start receiving global orders and local Boda Boda dispatch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-gold px-8 py-4 rounded-full text-sm font-body font-bold shadow-gold-lg">
              {isEn ? "Shop Arusha Collection →" : "Nunua Bidhaa →"}
            </Link>
            <Link href="/sell" className="btn-outline-gold px-8 py-4 rounded-full text-sm font-body font-semibold">
              {isEn ? "Register as Arusha Artisan →" : "Jisajili Kama Msanii →"}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}

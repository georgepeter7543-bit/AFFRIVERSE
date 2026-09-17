"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CultureMap from "@/components/CultureMap";
import { arushLocations } from "@/lib/data";
import type { Language, Currency } from "@/lib/data";
import { MapPin, Users, BookOpen, Mountain, Camera, Phone, Clock, Compass, ShieldCheck } from "lucide-react";

export default function CulturePage() {
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showVisitingGuide, setShowVisitingGuide] = useState(false);
  const isEn = lang === "en";

  const handleVisitArushaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowVisitingGuide(true);
    const guideElement = document.getElementById("visiting-arusha-guide");
    if (guideElement) {
      guideElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlights = [
    {
      icon: Mountain,
      title: isEn ? "Mount Meru & Arusha Region" : "Mlima Meru & Eneo la Arusha",
      desc: isEn ? "Heartland of authentic Arusha artisan-made goods, tanzanite gemstone mining, and organic coffee slopes." : "Kitovu cha bidhaa halisi za mikono za Arusha na kilimo cha kahawa.",
      stat: isEn ? "1,600m Altitude" : "Urefu mita 1,600",
    },
    {
      icon: Users,
      title: isEn ? "Maasai Shuka & Cultural Weaving" : "Urithi wa Maasai Shuka",
      desc: isEn ? "Traditional Maasai shuka weaving and beadwork preserved for generations across Arusha craft centers." : "Usukaji wa vitambaa vya Maasai shuka uliolindwa kwa vizazi.",
      stat: isEn ? "2,400+ Artisans" : "Mafundi 2,400+",
    },
    {
      icon: Camera,
      title: isEn ? "Cultural Heritage Centre" : "Kituo cha Urithi wa Utamaduni",
      desc: isEn ? "Arusha's premier arts, craft, and tanzanite gallery destination with 140+ verified artisan displays." : "Lengo kuu la sanaa na ufundi la Arusha.",
      stat: isEn ? "Dodoma Rd, Arusha" : "Barabara ya Dodoma",
    },
    {
      icon: BookOpen,
      title: isEn ? "Swahili Craft Heritage" : "Urithi wa Ufundi wa Kiswahili",
      desc: isEn ? "Direct connection to artisan workshops where oral craft traditions are celebrated daily." : "Uhusiano wa moja kwa moja na warsha za mafundi.",
      stat: isEn ? "+255754998882" : "+255754998882",
    },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Page Header */}
      <section
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(27,42,107,0.4) 0%, transparent 60%)",
        }}
      >
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
          <Compass size={14} className="text-gold" />
          <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
            {isEn ? "Arusha Culture & Directory" : "Utamaduni & Ramani"}
          </span>
        </div>

        <h1 className="section-heading text-4xl lg:text-6xl mb-6">
          {isEn ? "Connecting Arusha Artisans to" : "Kuunganisha Mafundi wa Arusha na"}
          <br />
          <span className="shimmer-text">{isEn ? "Global Markets & Culture" : "Masoko ya Kimataifa"}</span>
        </h1>
        <p className="text-earth-cream/70 font-body text-lg max-w-2xl mx-auto mb-8">
          {isEn
            ? "Explore the rich cultural landscape of Arusha — from Maasai shuka artisans at Fire Road to certified goldsmiths at Cultural Heritage Centre."
            : "Chunguza mandhari ya utamaduni tajiri wa Arusha na masoko ya mafundi."}
        </p>

        {/* Fixed CTA button: Opens dedicated section on page instead of redirecting to products */}
        <button
          onClick={handleVisitArushaClick}
          className="btn-gold px-8 py-3.5 rounded-full text-sm font-body font-bold shadow-gold-lg inline-flex items-center gap-2"
        >
          <MapPin size={16} />
          {isEn ? "Planning to Visit Arusha? Open Directory Guide ↓" : "Unapanga Kutembelea Arusha? Fungua Mwongozo ↓"}
        </button>
      </section>

      {/* Cultural Highlights Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="glass-card rounded-2xl p-6 border border-gold/15 hover:border-gold/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-tanzanite/40 border border-tanzanite/60 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:border-gold transition-all">
                  <Icon size={22} className="text-gold" />
                </div>
                <div className="text-gold font-display font-bold text-lg mb-1">{h.stat}</div>
                <h3 className="font-display font-bold text-earth-cream mb-2 text-sm">{h.title}</h3>
                <p className="text-earth-cream/65 text-xs font-body leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Map */}
        <CultureMap lang={lang} />

        {/* Dedicated Information Section: "Planning to Visit Arusha Guide" */}
        <div id="visiting-arusha-guide" className="mt-16 glass-card rounded-3xl border-2 border-gold/40 p-8 lg:p-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <MapPin size={28} className="text-obsidian" />
            </div>
            <span className="text-gold text-xs font-body font-bold uppercase tracking-widest">Official Tourist & Visitor Guide</span>
            <h2 className="font-display font-bold text-earth-cream text-3xl sm:text-4xl mt-2 mb-4">
              {isEn ? "Planning to Visit Arusha? Key Artisan Shops Guide" : "Unapanga Kutembelea Arusha? Mwongozo wa Mafundi"}
            </h2>
            <p className="text-earth-cream/80 font-body text-base leading-relaxed">
              Welcome to Arusha! Our verified artisan shops welcome visitors, tourists, and buyers directly. Use the contact phone <strong className="text-gold">+255754998882</strong> to arrange guided workshop tours or Boda Boda package pickups.
            </p>
          </div>

          {/* Directory of Key Artisan Shops */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {arushLocations.map((loc) => (
              <div key={loc.id} className="bg-obsidian-surface/80 rounded-2xl p-6 border border-gold/20 hover:border-gold/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gold/10 text-gold text-[10px] font-bold font-body uppercase px-3 py-1 rounded-full border border-gold/30">
                      {loc.type}
                    </span>
                    <span className="text-gold font-mono text-xs font-semibold">{loc.artisanCount} Artisans</span>
                  </div>

                  <h3 className="font-display font-bold text-earth-cream text-xl mb-2">{loc.name}</h3>
                  <p className="text-earth-cream/70 text-xs font-body leading-relaxed mb-4">{loc.description}</p>
                </div>

                <div className="border-t border-gold/15 pt-4 space-y-2 text-xs font-body text-earth-cream/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gold flex-shrink-0" />
                    <span className="font-bold text-gold">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold flex-shrink-0" />
                    <span>{loc.openingHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gold/10 rounded-2xl p-6 border border-gold/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-display font-bold text-gold text-lg">Need Direct Workshop Assistance in Arusha?</h4>
              <p className="text-earth-cream/80 text-xs font-body">Call our Arusha Headquarters directly at +255754998882 for verified guide assistance.</p>
            </div>
            <a
              href="tel:+255754998882"
              className="btn-gold px-6 py-3 rounded-full text-xs font-body font-bold whitespace-nowrap"
            >
              📞 Call +255754998882
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}

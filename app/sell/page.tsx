"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SellerOnboarding from "@/components/SellerOnboarding";
import PaymentBadges from "@/components/PaymentBadges";
import type { Language, Currency } from "@/lib/data";
import { useStore } from "@/lib/store";
import { CheckCircle, Globe, TrendingUp, Shield, Headphones, Star, AlertCircle, ArrowRight, Store } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
  const router = useRouter();
  const { lang, setLang, currency, setCurrency, registerSeller, currentUser } = useStore();

  // Redirect authenticated artisans straight to their Artisan Dashboard
  useEffect(() => {
    if (currentUser?.role === "artisan" || currentUser?.role === "seller") {
      router.push("/dashboard/artisan");
    }
  }, [currentUser, router]);
  const isEn = lang === "en";

  // Form State
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [craft, setCraft] = useState("Maasai Shuka & Textiles");
  const [location, setLocation] = useState("Arusha Maasai Market");
  const [bio, setBio] = useState("");

  // Agreement Checklist State
  const [agreeArushaBased, setAgreeArushaBased] = useState(false);
  const [agreeQualityStandards, setAgreeQualityStandards] = useState(false);
  const [agreeValidMoneyAccount, setAgreeValidMoneyAccount] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollToRegistrationForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const formElement = document.getElementById("seller-registration-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !bio.trim()) {
      setErrorMessage(isEn ? "Please fill in all required fields." : "Tafadhali jaza sehemu zote zinazohitajika.");
      return;
    }

    if (!agreeArushaBased || !agreeQualityStandards || !agreeValidMoneyAccount) {
      setErrorMessage(
        isEn
          ? "You must agree to all 3 Afriverse standards & money account confirmations to register."
          : "Lazima ukubaliane na masharti yote 3 ya viwango vya Afriverse."
      );
      return;
    }

    setErrorMessage("");
    registerSeller({
      businessName,
      phone,
      craft,
      bio,
    });
    setFormSubmitted(true);
  };

  const benefits = [
    {
      icon: Globe,
      title: isEn ? "Connecting Arusha to Global Buyers" : "Ufikiaji wa Kimataifa",
      desc: isEn
        ? "Connecting Arusha artisans to global markets. Sell authentic Arusha artisan-made goods to verified buyers worldwide."
        : "Kuunganisha mafundi wa Arusha na masoko ya kimataifa.",
    },
    {
      icon: TrendingUp,
      title: isEn ? "Transparent Direct Payouts" : "Bei ya Haki",
      desc: isEn
        ? "Receive direct mobile money payouts (M-Pesa, Tigo Pesa, Airtel Money) instantly upon order dispatch."
        : "Pokea malipo ya moja kwa moja kupitia M-Pesa, Tigo Pesa au Airtel Money.",
    },
    {
      icon: Shield,
      title: isEn ? "Afriverse Seal & Package Label" : "Beji Iliyothibitishwa",
      desc: isEn
        ? "Receive official Afriverse package labels for box sealing and local Boda Boda dispatch."
        : "Pokea lebo rasmi za Afriverse kwa ajili ya kufunga vifurushi vyako.",
    },
    {
      icon: Headphones,
      title: isEn ? "Arusha Local Hotline Support" : "Msaada wa Arusha",
      desc: isEn
        ? "Our Arusha team is on standby 24/7 at +255754998882. Call us anytime in Swahili or English."
        : "Timu yetu ya Arusha ipo tayari 24/7 kwa nambari +255754998882.",
    },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Hero Header */}
      <section
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%)" }}
      >
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6">
          <Star size={14} className="text-gold" />
          <span className="text-gold text-xs font-body font-semibold">
            {isEn ? "Connecting Arusha Artisans to Global Markets" : "Kuunganisha Mafundi wa Arusha na Masoko"}
          </span>
        </div>
        <h1 className="section-heading text-4xl lg:text-6xl mb-6">
          {isEn ? "Sell Authentic" : "Uza Bidhaa Halisi za"}
          <br />
          <span className="shimmer-text">{isEn ? "Arusha Artisan-Made Goods" : "Mikono za Arusha"}</span>
        </h1>
        <p className="text-earth-cream/70 font-body text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          {isEn
            ? "Join 2,400+ Arusha craftspeople selling Maasai shuka, jewelry, fine art, and handcrafted items globally with local Boda Boda dispatch."
            : "Jiunge na mafundi 2,400+ wa Arusha wanaouza bidhaa zao duniani kote."}
        </p>

        {/* CTA smoothly scrolling to registration form */}
        <button
          onClick={scrollToRegistrationForm}
          className="btn-gold px-10 py-4 rounded-full text-base font-body font-bold shadow-gold-lg inline-flex items-center gap-2"
        >
          {isEn ? "Ready to Join? Register Now ↓" : "Uko Tayari Kujiunga? Jisajili Sasa ↓"}
        </button>
      </section>

      {/* Note for New Sellers Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16">
        <div className="glass-card rounded-3xl border-2 border-gold/40 p-8 lg:p-10 shadow-gold bg-gold/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow">
              <AlertCircle size={24} className="text-obsidian" />
            </div>
            <div>
              <span className="text-gold text-xs font-body uppercase font-bold tracking-widest">Crucial Requirement</span>
              <h2 className="font-display font-bold text-2xl text-earth-cream">
                {isEn ? "Note for New Sellers" : "Maelezo kwa Wauzaji Wapyapya"}
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-obsidian-surface/80 rounded-2xl p-5 border border-gold/20">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-display font-bold text-gold text-base mb-2">
                1. Authentic, Quality Goods
              </h3>
              <p className="text-earth-cream/70 text-xs font-body leading-relaxed">
                We are exclusively looking for genuine, high-craftsmanship products (Maasai shuka, beaded jewelry, fine art, handcrafted pottery).
              </p>
            </div>

            <div className="bg-obsidian-surface/80 rounded-2xl p-5 border border-gold/20">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-display font-bold text-gold text-base mb-2">
                2. Based in Arusha
              </h3>
              <p className="text-earth-cream/70 text-xs font-body leading-relaxed">
                All seller accounts must operate within Arusha City or surrounding districts for local Boda Boda dispatch.
              </p>
            </div>

            <div className="bg-obsidian-surface/80 rounded-2xl p-5 border border-gold/20">
              <div className="text-2xl mb-2">🌿</div>
              <h3 className="font-display font-bold text-gold text-base mb-2">
                3. Authentic-Ethical Goods
              </h3>
              <p className="text-earth-cream/70 text-xs font-body leading-relaxed">
                Every craft must be ethically produced with sustainable materials and fair artisan compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="glass-card rounded-2xl p-6 border border-gold/15 hover:border-gold/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold transition-all">
                  <Icon size={22} className="text-gold group-hover:text-obsidian transition-colors" />
                </div>
                <h3 className="font-display font-bold text-earth-cream text-lg mb-2">{b.title}</h3>
                <p className="text-earth-cream/65 text-sm font-body leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Onboarding Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label mb-3">{isEn ? "Simple Setup" : "Mchakato Rahisi"}</p>
            <h2 className="section-heading text-4xl">
              {isEn ? "How Arusha Onboarding" : "Jinsi Usajili"}
              {" "}
              <span className="shimmer-text">{isEn ? "Works" : "Unavyofanya Kazi"}</span>
            </h2>
          </div>
          <SellerOnboarding lang={lang} compact={false} />
        </div>

        {/* Functional Seller Registration Form Section */}
        <div className="max-w-4xl mx-auto" id="seller-registration-form">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border-2 border-gold/30 shadow-luxury">
            <div className="text-center mb-8">
              <span className="section-label">{isEn ? "Official Artisan Signup" : "Usajili wa Mafundi"}</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-earth-cream mt-2">
                {isEn ? "Seller Registration Form" : "Fomu ya Usajili wa Muuzaji"}
              </h2>
              <p className="text-earth-cream/70 font-body text-sm mt-2">
                Fill out the details below to open your shop and start listing your authentic Arusha artisan-made goods.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-green-950/60 border border-green-500/50 rounded-2xl p-8 text-center space-y-4">
                <CheckCircle size={48} className="text-green-400 mx-auto" />
                <h3 className="font-display font-bold text-2xl text-white">
                  🎉 {isEn ? "Congratulations! Shop Created Successfully" : "Hongera! Duka Lako Limetengenezwa"}
                </h3>
                <p className="text-earth-cream/80 font-body text-base max-w-lg mx-auto">
                  Your shop <strong className="text-gold">{businessName}</strong> is now live on AFRIVERSE Arusha Edition. You can now post products and receive orders.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="btn-gold px-8 py-3.5 rounded-full text-sm font-body font-bold inline-flex items-center gap-2"
                  >
                    <Store size={18} />
                    Open Artisan Dashboard →
                  </Link>
                  <Link
                    href="/chat"
                    className="btn-outline-gold px-8 py-3.5 rounded-full text-sm font-body font-semibold"
                  >
                    Go to Artisan Chat
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="bg-red-950/60 border border-red-500/50 text-red-200 text-sm font-body rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-2">
                      {isEn ? "Business / Artisan Name *" : "Jina la Biashara / Msanii *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={isEn ? "e.g. Amina Arusha Crafts" : "Jina la Duka"}
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3.5 text-sm text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-2">
                      {isEn ? "Phone / Payout Number (M-Pesa / Tigo Pesa) *" : "Nambari ya Simu (M-Pesa / Tigo Pesa) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+255 768 432 109"
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3.5 text-sm text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-2">
                      {isEn ? "Primary Craft Category" : "Aina kuu ya Ufundi"}
                    </label>
                    <select
                      value={craft}
                      onChange={(e) => setCraft(e.target.value)}
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3.5 text-sm text-earth-cream focus:outline-none focus:border-gold font-body"
                    >
                      <option value="Maasai Shuka & Cultural Textiles">Maasai Shuka & Cultural Textiles</option>
                      <option value="Maasai Shuka Jewelry">Maasai Shuka Jewelry</option>
                      <option value="East African Fine Art & Decor">East African Fine Art & Decor</option>
                      <option value="Handcrafted Meru Pottery & Ceramics">Handcrafted Meru Pottery & Ceramics</option>
                      <option value="Arusha Coffee & Organic Spices">Arusha Coffee & Organic Spices</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-2">
                      {isEn ? "Arusha Shop / Workshop Location" : "Eneo la Duka Arusha"}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Arusha Maasai Market, Fire Road"
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3.5 text-sm text-earth-cream focus:outline-none focus:border-gold font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-2">
                    {isEn ? "Craft & Business Description *" : "Maelezo ya Ufundi *"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={isEn ? "Describe your handcrafted goods, materials used, and heritage..." : "Eleza kazi zako za mikono..."}
                    className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3.5 text-sm text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body resize-none"
                  />
                </div>

                {/* Mandatory Agreement Checklist */}
                <div className="bg-obsidian-surface/60 rounded-2xl p-6 border border-gold/20 space-y-4">
                  <h4 className="font-display font-bold text-gold text-sm uppercase tracking-wider">
                    {isEn ? "Afriverse Standards Agreement Checklist (Required)" : "Orodha ya Vigezo vya Afriverse"}
                  </h4>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeArushaBased}
                      onChange={(e) => setAgreeArushaBased(e.target.checked)}
                      className="w-5 h-5 rounded border-gold text-gold focus:ring-gold accent-amber-500 mt-0.5"
                    />
                    <span className="text-earth-cream/80 text-xs sm:text-sm font-body">
                      <strong>1. Based in Arusha:</strong> I confirm that I am based in Arusha and produce authentic, quality goods locally.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeQualityStandards}
                      onChange={(e) => setAgreeQualityStandards(e.target.checked)}
                      className="w-5 h-5 rounded border-gold text-gold focus:ring-gold accent-amber-500 mt-0.5"
                    />
                    <span className="text-earth-cream/80 text-xs sm:text-sm font-body">
                      <strong>2. Authentic-Ethical Standards:</strong> I agree to Afriverse quality, authenticity, and ethical handcrafting guidelines.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeValidMoneyAccount}
                      onChange={(e) => setAgreeValidMoneyAccount(e.target.checked)}
                      className="w-5 h-5 rounded border-gold text-gold focus:ring-gold accent-amber-500 mt-0.5"
                    />
                    <span className="text-earth-cream/80 text-xs sm:text-sm font-body">
                      <strong>3. Valid Money Account:</strong> I confirm I possess a valid mobile money account (M-Pesa, Tigo Pesa, Airtel Money, or Bank Account) for receiving direct payouts.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-4 rounded-xl text-base font-body font-bold shadow-gold-lg"
                  id="seller-submit-btn"
                >
                  {isEn ? "Complete Registration & Open Shop →" : "Kamilisha Usajili na Fungua Duka →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <PaymentBadges lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

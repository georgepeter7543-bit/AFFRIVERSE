"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

type Role = "customer" | "artisan" | "admin";

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  shopName?: string;
  phone?: string;
  createdAt: string;
}

const STORAGE_KEY = "afriverse_registered_users";

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const [selectedRole, setSelectedRole] = useState<Role>("customer");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get("redirect");
      if (redir) setRedirectPath(redir);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim() || !email.trim() || !password) {
      setError(isEn ? "Please fill in all required fields." : "Tafadhali jaza sehemu zote zinazohitajika.");
      return;
    }

    if (password !== confirmPassword) {
      setError(isEn ? "Passwords do not match." : "Nywila hazifanani.");
      return;
    }

    if (password.length < 6) {
      setError(isEn ? "Password must be at least 6 characters." : "Nywila lazima iwe na angalau herufi 6.");
      return;
    }

    if (selectedRole === "admin" && password !== "8509Sirat#") {
      setError(isEn ? "Admin account creation requires official admin passphrase." : "Usajili wa msimamizi unahitaji nenosiri kuu.");
      return;
    }

    setLoading(true);

    let users: RegisteredUser[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) users = JSON.parse(raw);
    } catch {
      users = [];
    }

    const duplicate = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (duplicate) {
      setLoading(false);
      setError(
        isEn
          ? "An account with this email already exists. Please sign in instead."
          : "Akaunti yenye barua pepe hii tayari ipo. Tafadhali ingia."
      );
      return;
    }

    const newUser: RegisteredUser = {
      id: `u-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: selectedRole,
      phone: phone.trim() || undefined,
      shopName: selectedRole === "artisan" ? businessName.trim() || undefined : undefined,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      shopName: newUser.shopName,
      phone: newUser.phone,
    };
    setCurrentUser(sessionUser);
    localStorage.setItem("afriverse_active_session", JSON.stringify(sessionUser));

    setSuccess(isEn ? "Account created successfully! Redirecting..." : "Akaunti imefunguliwa! Inaelekeza...");
    setLoading(false);

    setTimeout(() => {
      if (selectedRole === "admin") {
        router.push("/dashboard/admin");
      } else if (selectedRole === "artisan") {
        router.push("/dashboard/artisan");
      } else {
        router.push(redirectPath || "/dashboard/customer");
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0F0F12] text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        <div className="glass-card rounded-3xl p-8 border-2 border-[#D4AF37]/30 shadow-luxury space-y-6 bg-[#141418]">
          <div className="text-center">
            <span className="section-label">{isEn ? "New Account" : "Akaunti Mpya"}</span>
            <h1 className="font-display font-bold text-3xl text-earth-cream mt-1">
              AFRIVERSE <span className="shimmer-text">{isEn ? "Register" : "Jisajili"}</span>
            </h1>
            <p className="text-earth-cream/70 text-xs font-body mt-2">
              {isEn
                ? "Join the Arusha artisan marketplace community."
                : "Jiunge na jumuiya ya wasanifu wa Arusha."}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
              {isEn ? "Select Account Role" : "Chagua Aina ya Akaunti"}
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-obsidian-surface border border-[#D4AF37]/20 rounded-2xl">
              {(["customer", "artisan", "admin"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    selectedRole === r ? "bg-[#D4AF37] text-black shadow" : "text-earth-cream/70 hover:text-white"
                  }`}
                >
                  {r === "customer" ? "🛍️ Customer" : r === "artisan" ? "🎨 Artisan" : "👑 Admin"}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3.5 text-xs text-red-300 bg-red-950/60 border border-red-500/50 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span>{error}</span>
              {error.toLowerCase().includes("already exists") && (
                <Link href="/login" className="ml-auto text-[#D4AF37] underline font-bold whitespace-nowrap">
                  Sign In
                </Link>
              )}
            </div>
          )}
          {success && (
            <div className="p-3.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Full Name *" : "Jina Kamili *"}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Baraka Edward"
                className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-body focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {selectedRole === "artisan" && (
              <div>
                <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                  {isEn ? "Arusha Workshop / Shop Name" : "Jina la Duka"}
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Meru Heritage Crafts"
                  className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-body focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Phone Number" : "Nambari ya Simu"}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+255 714 223 344"
                className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Email Address *" : "Barua Pepe *"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@afriverse.co.tz"
                className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-body focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Password *" : "Nywila *"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 pr-10 text-xs text-earth-cream font-mono focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Confirm Password *" : "Thibitisha Nywila *"}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 rounded-xl text-xs font-body font-bold shadow-gold-lg mt-2 disabled:opacity-60"
            >
              {loading
                ? (isEn ? "Creating account..." : "Inafungua akaunti...")
                : `${isEn ? "Create" : "Fungua"} ${selectedRole.toUpperCase()} ${isEn ? "Account" : "Akaunti"}`}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#D4AF37]/15 space-y-2">
            <p className="text-xs text-earth-cream/60">
              {isEn ? "Already have an account?" : "Una akaunti tayari?"}{" "}
              <Link href="/login" className="text-[#D4AF37] hover:underline font-bold">
                {isEn ? "Sign In" : "Ingia"}
              </Link>
            </p>
            <Link
              href="/products"
              className="text-xs text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors font-body block"
            >
              ← {isEn ? "Continue browsing as Guest" : "Endelea kutazama kama Mgeni"}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}

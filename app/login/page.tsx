"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff, X } from "lucide-react";

type Role = "customer" | "artisan" | "admin";
type AuthMode = "login" | "register";

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

export default function LoginPage() {
  const router = useRouter();
  const { login, setCurrentUser, registerSeller, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const [authMode, setAuthMode] = useState<AuthMode>("login");
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
      const mode = params.get("mode");
      if (mode === "register") setAuthMode("register");
    }
  }, []);

  // Enforce role redirection helper
  const getRedirectForRole = (role: string) => {
    if (role === "artisan" || role === "seller") {
      return "/dashboard/artisan";
    }
    if (role === "admin") {
      return "/dashboard/admin";
    }
    if (role === "customer" || role === "buyer") {
      return redirectPath || "/dashboard/customer";
    }
    return "/";
  };

  // Quick Demo Access Logins
  const handleQuickLogin = (role: Role) => {
    if (role === "admin") {
      login("admin", "8509Sirat#");
      router.push("/dashboard/admin");
    } else if (role === "artisan") {
      const artisanUser = {
        id: "a1",
        name: "Amina Kessy",
        email: "amina@merucrafts.co.tz",
        role: "artisan" as const,
        shopName: "Amina Meru Cultural Crafts Studio",
        phone: "+255754998882",
      };
      setCurrentUser(artisanUser);
      router.push("/dashboard/artisan");
    } else {
      const customerUser = {
        id: "u-cust",
        name: "Baraka Edward",
        email: "baraka@example.com",
        role: "customer" as const,
        phone: "+255714223344",
      };
      setCurrentUser(customerUser);
      router.push(redirectPath || "/dashboard/customer");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError(isEn ? "Please fill in all required fields." : "Tafadhali jaza sehemu zote.");
      return;
    }

    setLoading(true);

    if (authMode === "login") {
      // 1. Admin login credentials
      if (selectedRole === "admin") {
        if (password !== "8509Sirat#") {
          setLoading(false);
          setError(isEn ? "Invalid Admin password. Use official master admin key." : "Nenosiri batili la Msimamizi.");
          return;
        }
        login("admin", password, fullName || "AFRIVERSE Admin", email);
        setSuccess(isEn ? "Welcome Admin! Redirecting to Admin Portal..." : "Karibu Msimamizi! Inaelekeza...");
        setTimeout(() => router.push("/dashboard/admin"), 800);
        return;
      }

      // 2. LocalStorage credentials check
      let users: RegisteredUser[] = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) users = JSON.parse(raw);
      } catch {
        users = [];
      }

      const matched = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password &&
          u.role === selectedRole
      );

      if (matched) {
        const sessionUser = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: matched.role,
          shopName: matched.shopName,
          phone: matched.phone,
        };
        setCurrentUser(sessionUser);
        setLoading(false);
        setSuccess(isEn ? "Welcome back! Redirecting..." : "Karibu tena! Inaelekeza...");
        setTimeout(() => router.push(getRedirectForRole(matched.role)), 800);
        return;
      }

      // 3. Fallback demo logins if user enters demo details
      setLoading(false);
      if (selectedRole === "artisan") {
        const artisanUser = {
          id: "a1",
          name: fullName || "Amina Kessy",
          email,
          role: "artisan" as const,
          shopName: businessName || "Amina Meru Cultural Crafts Studio",
          phone: phone || "+255768432109",
        };
        setCurrentUser(artisanUser);
        setSuccess(isEn ? "Signed in as Artisan! Redirecting to Artisan Dashboard..." : "Umeingia kama Fundi! Inaelekeza...");
        setTimeout(() => router.push("/dashboard/artisan"), 800);
      } else if (selectedRole === "customer") {
        const customerUser = {
          id: `u-${Date.now()}`,
          name: fullName || "Baraka Edward",
          email,
          role: "customer" as const,
          phone: phone || "+255714223344",
        };
        setCurrentUser(customerUser);
        setSuccess(isEn ? "Signed in! Redirecting to Customer Portal..." : "Umeingia! Inaelekeza...");
        setTimeout(() => router.push(redirectPath || "/dashboard/customer"), 800);
      } else {
        setError(isEn ? "No account found with these credentials. Please register." : "Akaunti haikupatikana. Tafadhali jisajili.");
      }
    } else {
      // Register mode
      if (!fullName.trim()) {
        setLoading(false);
        setError(isEn ? "Full Name is required." : "Jina kamili linahitajika.");
        return;
      }

      if (password !== confirmPassword) {
        setLoading(false);
        setError(isEn ? "Passwords do not match." : "Nywila hazifanani.");
        return;
      }

      if (selectedRole === "admin" && password !== "8509Sirat#") {
        setLoading(false);
        setError(isEn ? "Admin account creation requires official admin master key." : "Usajili wa msimamizi unahitaji nenosiri kuu.");
        return;
      }

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
        setError(isEn ? "User already exists. Please login." : "Mtumiaji tayari yupo. Tafadhali ingia.");
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
      setLoading(false);
      setSuccess(isEn ? "Account created! Redirecting..." : "Akaunti imefunguliwa! Inaelekeza...");
      setTimeout(() => router.push(getRedirectForRole(selectedRole)), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0F12] text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        {/* Demo Fast-Login Pill Bar */}
        <div className="glass-card rounded-2xl p-4 border border-[#D4AF37]/30 mb-8 bg-[#D4AF37]/5 shadow-luxury">
          <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Quick Demo Access (Instant RBAC Switch)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="px-2 py-2 rounded-xl bg-obsidian-surface border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all text-center"
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("artisan")}
              className="px-2 py-2 rounded-xl bg-obsidian-surface border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-400 hover:text-black transition-all text-center"
            >
              🎨 Artisan
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("customer")}
              className="px-2 py-2 rounded-xl bg-obsidian-surface border border-sky-500/40 text-sky-300 text-xs font-bold hover:bg-sky-400 hover:text-black transition-all text-center"
            >
              🛍️ Customer
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="glass-card rounded-3xl p-8 border-2 border-[#D4AF37]/30 shadow-luxury space-y-6 bg-[#141418] relative">
          {/* Close (X) Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-earth-cream/70 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 transition-all z-10"
            aria-label="Close auth portal"
            title="Close auth portal"
          >
            <X size={18} />
          </button>
          <div className="text-center">
            <span className="section-label">{isEn ? "Arusha Identity Portal" : "Tovuti ya Utambulisho"}</span>
            <h1 className="font-display font-bold text-3xl text-earth-cream mt-1">
              AFRIVERSE <span className="shimmer-text">Access</span>
            </h1>
            <p className="text-earth-cream/70 text-xs font-body mt-2">
              {isEn
                ? "Connecting Arusha artisans to global markets with authenticated roles."
                : "Kuunganisha wasanifu wa Arusha na masoko ya kimataifa."}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-[#D4AF37]/20 pb-1">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`w-1/2 py-2.5 text-center text-xs font-bold transition-colors border-b-2 ${
                authMode === "login"
                  ? "border-[#D4AF37] text-[#D4AF37]"
                  : "border-transparent text-earth-cream/60 hover:text-earth-cream"
              }`}
            >
              {isEn ? "Sign In" : "Ingia"}
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`w-1/2 py-2.5 text-center text-xs font-bold transition-colors border-b-2 ${
                authMode === "register"
                  ? "border-[#D4AF37] text-[#D4AF37]"
                  : "border-transparent text-earth-cream/60 hover:text-earth-cream"
              }`}
            >
              {isEn ? "Create Account" : "Jisajili"}
            </button>
          </div>

          {/* Role Picker */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
              {isEn ? "Select Account Role" : "Chagua Aina ya Akaunti"}
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-obsidian-surface border border-[#D4AF37]/20 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("customer");
                  setEmail("");
                  setPassword("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedRole === "customer" ? "bg-[#D4AF37] text-black shadow" : "text-earth-cream/70 hover:text-white"
                }`}
              >
                🛍️ Customer
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("artisan");
                  setEmail("");
                  setPassword("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedRole === "artisan" ? "bg-[#D4AF37] text-black shadow" : "text-earth-cream/70 hover:text-white"
                }`}
              >
                🎨 Artisan
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("admin");
                  setEmail("");
                  setPassword("");
                }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedRole === "admin" ? "bg-[#D4AF37] text-black shadow" : "text-earth-cream/70 hover:text-white"
                }`}
              >
                👑 Admin
              </button>
            </div>
          </div>

          {/* Error / Success Feedback */}
          {error && (
            <div className="p-3.5 text-xs text-red-300 bg-red-950/60 border border-red-500/50 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {authMode === "register" && (
              <>
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
                      {isEn ? "Arusha Workshop / Shop Name" : "Jina la Duka Arusha"}
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
              </>
            )}

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Email Address" : "Barua Pepe"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
                className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-body focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                {isEn ? "Password" : "Nywila"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {authMode === "register" && (
              <div>
                <label className="block text-xs font-body font-bold text-[#D4AF37] uppercase mb-1">
                  {isEn ? "Confirm Password *" : "Thibitisha Nywila *"}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full bg-obsidian-surface border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-earth-cream font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 rounded-xl text-xs font-body font-bold shadow-gold-lg mt-2 disabled:opacity-60"
            >
              {loading
                ? (isEn ? "Processing..." : "Inashughulikia...")
                : authMode === "login"
                  ? `${isEn ? "Sign In as" : "Ingia kama"} ${selectedRole.toUpperCase()}`
                  : `${isEn ? "Create" : "Fungua Akaunti ya"} ${selectedRole.toUpperCase()}`}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#D4AF37]/15 space-y-1">
            {authMode === "login" && (
              <p className="text-xs text-earth-cream/60">
                {isEn ? "Don't have an account?" : "Huna akaunti?"}{" "}
                <Link href="/register" className="text-[#D4AF37] hover:underline font-bold">
                  {isEn ? "Create one" : "Fungua akaunti"}
                </Link>
              </p>
            )}
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

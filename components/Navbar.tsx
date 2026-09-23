"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Globe, ShoppingBag, Sun, Moon, User as UserIcon, Store, LogOut, ChevronDown } from "lucide-react";
import type { Language, Currency } from "@/lib/data";
import { useStore } from "@/lib/store";

interface NavbarProps {
  lang?: Language;
  currency?: Currency;
  onLangChange?: (l: Language) => void;
  onCurrencyChange?: (c: Currency) => void;
}

const navLinks = {
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/artisans", label: "Artisans" },
    { href: "/culture", label: "Culture & Map" },
    { href: "/delivery", label: "Track Delivery" },
  ],
  sw: [
    { href: "/", label: "Nyumbani" },
    { href: "/products", label: "Duka" },
    { href: "/artisans", label: "Mafundi" },
    { href: "/culture", label: "Utamaduni & Ramani" },
    { href: "/delivery", label: "Fuatilia Mzigo" },
  ],
};

export default function Navbar({
  lang: propsLang,
  currency: propsCurrency,
  onLangChange: propsOnLangChange,
  onCurrencyChange: propsOnCurrencyChange,
}: NavbarProps = {}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const store = useStore();
  const { cart, currentUser, theme, toggleTheme, logout } = store;

  const lang = propsLang || store.lang;
  const currency = propsCurrency || store.currency;

  const isArtisan = currentUser?.role === "artisan" || currentUser?.role === "seller";
  const isAdmin = currentUser?.role === "admin";

  const userDashboardRoute = isArtisan
    ? "/dashboard/artisan"
    : isAdmin
    ? "/dashboard/admin"
    : "/dashboard/customer";

  const handleLangToggle = () => {
    const nextLang = lang === "en" ? "sw" : "en";
    if (propsOnLangChange) propsOnLangChange(nextLang);
    store.setLang(nextLang);
  };

  const handleCurrencyToggle = () => {
    const nextCurrency = currency === "USD" ? "TZS" : "USD";
    if (propsOnCurrencyChange) propsOnCurrencyChange(nextCurrency);
    store.setCurrency(nextCurrency);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setUserDropdownOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navLinks[lang];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 shadow-luxury"
          : "bg-obsidian/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-obsidian font-display font-black text-sm">A</span>
            </div>
            <div>
              <div className="font-display font-bold text-lg text-earth-cream leading-none tracking-wide">
                AFRI<span className="text-gold">VERSE</span>
              </div>
              <div className="text-[10px] text-gold/60 tracking-[0.15em] uppercase leading-none font-body mt-0.5">
                Arusha Edition
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-earth-cream/70 hover:text-gold font-body text-xs font-semibold tracking-wider uppercase transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              className="p-2 rounded-full border border-gold/20 hover:border-gold/50 text-gold hover:bg-gold/10 transition-all"
              id="theme-toggle-btn"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold text-earth-cream/80 hover:text-gold text-xs font-body font-semibold transition-all bg-gold/5"
              id="lang-toggle"
            >
              <Globe size={13} className="text-gold" />
              <span>{lang === "en" ? "🇬🇧 EN" : "🇹🇿 SW"}</span>
            </button>

            {/* Currency Toggle */}
            <button
              onClick={handleCurrencyToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold text-earth-cream/80 hover:text-gold text-xs font-body font-semibold transition-all bg-gold/5"
              id="currency-toggle"
            >
              <span className="text-gold font-bold">{currency === "USD" ? "$" : "T"}</span>
              <span>{currency === "USD" ? "USD" : "TZS"}</span>
            </button>

            {/* Auth / Dashboard Button & Dropdown */}
            {currentUser ? (
              <div
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="flex items-center gap-1.5">
                  {/* User Profile Button: links directly to /dashboard/artisan if artisan */}
                  <Link
                    href={userDashboardRoute}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-body font-bold transition-all shadow-sm"
                    id="nav-user-btn"
                  >
                    <UserIcon size={13} />
                    <span>{currentUser.role.toUpperCase()}</span>
                    <ChevronDown size={12} className="opacity-70" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 transition-all"
                    id="logout-btn"
                  >
                    <LogOut size={13} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-52 rounded-2xl bg-[#141418] border border-[#D4AF37]/30 shadow-2xl p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[#D4AF37] font-mono capitalize">
                        {currentUser.shopName || `${currentUser.role} Account`}
                      </p>
                    </div>
                    <Link
                      href={userDashboardRoute}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] font-semibold transition"
                    >
                      <Store size={14} className="text-[#D4AF37]" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition font-semibold text-left"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs font-body font-semibold transition-all"
                id="nav-user-btn"
              >
                <UserIcon size={13} />
                <span>LOGIN</span>
              </Link>
            )}

            {/* Cart & Checkout */}
            <Link
              href="/payment"
              className="flex items-center gap-2 btn-gold px-4 py-2 rounded-full text-xs font-body font-semibold shadow-gold relative"
              id="cart-btn"
            >
              <ShoppingBag size={14} />
              {lang === "en" ? "Checkout" : "Lipia"}
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gold hover:bg-gold/10 rounded-full"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-earth-cream/70 hover:text-gold transition-colors"
              id="mobile-menu-btn"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-obsidian/98 backdrop-blur-xl border-t border-gold/10">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-earth-cream/70 hover:text-gold font-body font-medium border-b border-obsidian-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {currentUser && (
              <Link
                href={userDashboardRoute}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-gold font-body font-semibold border-b border-obsidian-surface"
              >
                <Store size={16} />
                {isArtisan
                  ? "Artisan Studio Dashboard"
                  : isAdmin
                  ? "Admin Control Hub"
                  : "Customer Order Portal"}
              </Link>
            )}

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-3 text-red-400 font-body font-semibold border-b border-obsidian-surface w-full text-left"
              >
                <LogOut size={16} />
                {lang === "en" ? `Sign Out (${currentUser.name})` : `Toka (${currentUser.name})`}
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-gold font-body font-semibold border-b border-obsidian-surface"
              >
                <UserIcon size={16} />
                {lang === "en" ? "Login / Register" : "Ingia / Jisajili"}
              </Link>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleLangToggle}
                className="flex-1 py-2.5 rounded-full border border-gold/40 text-gold text-xs font-body font-semibold bg-gold/5"
              >
                {lang === "en" ? "🇹🇿 Switch to Swahili" : "🇬🇧 Switch to English"}
              </button>
              <button
                onClick={handleCurrencyToggle}
                className="flex-1 py-2.5 rounded-full border border-gold/40 text-gold text-xs font-body font-semibold bg-gold/5"
              >
                {currency === "USD" ? "🇹🇿 Switch to TZS" : "💵 Switch to USD"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

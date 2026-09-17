"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown, ShoppingBag, Search, Sun, Moon, User as UserIcon, MessageSquare, Truck, ShieldCheck, Store } from "lucide-react";
import type { Language, Currency } from "@/lib/data";
import { useStore } from "@/lib/store";

interface NavbarProps {
  lang: Language;
  currency: Currency;
  onLangChange: (l: Language) => void;
  onCurrencyChange: (c: Currency) => void;
}

const navLinks = {
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/artisans", label: "Artisans" },
    { href: "/culture", label: "Culture & Map" },
    { href: "/sell", label: "Sell with Us" },
    { href: "/delivery", label: "Track Delivery" },
    { href: "/chat", label: "Artisan Chat" },
  ],
  sw: [
    { href: "/", label: "Nyumbani" },
    { href: "/products", label: "Duka" },
    { href: "/artisans", label: "Mafundi" },
    { href: "/culture", label: "Utamaduni & Ramani" },
    { href: "/sell", label: "Uza Nasi" },
    { href: "/delivery", label: "Fuatilia Mzigo" },
    { href: "/chat", label: "Mazungumzo" },
  ],
};

export default function Navbar({ lang, currency, onLangChange, onCurrencyChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, currentUser, cart } = useStore();

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
            {/* Theme Toggle Switcher */}
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
              onClick={() => onLangChange(lang === "en" ? "sw" : "en")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-gold/20 hover:border-gold/50 text-earth-cream/70 hover:text-gold text-xs font-body font-medium transition-all"
              id="lang-toggle"
            >
              <Globe size={11} />
              {lang === "en" ? "🇬🇧 EN" : "🇹🇿 SW"}
            </button>

            {/* Currency Toggle */}
            <button
              onClick={() => onCurrencyChange(currency === "USD" ? "TZS" : "USD")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-gold/20 hover:border-gold/50 text-earth-cream/70 hover:text-gold text-xs font-body font-medium transition-all"
              id="currency-toggle"
            >
              {currency === "USD" ? "$ USD" : "TZS"}
            </button>

            {/* Auth / Dashboard Button */}
            <Link
              href={currentUser ? "/dashboard" : "/login"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs font-body font-semibold transition-all"
              id="nav-user-btn"
            >
              <UserIcon size={13} />
              <span>{currentUser ? currentUser.role.toUpperCase() : "LOGIN"}</span>
            </Link>

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

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-gold font-body font-semibold border-b border-obsidian-surface"
            >
              <Store size={16} />
              Artisan & Admin Dashboard
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-gold font-body font-semibold border-b border-obsidian-surface"
            >
              <UserIcon size={16} />
              Login / Switch Role ({currentUser ? currentUser.role : "Guest"})
            </Link>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => onLangChange(lang === "en" ? "sw" : "en")}
                className="flex-1 py-2 rounded-full border border-gold/30 text-gold text-xs font-body"
              >
                {lang === "en" ? "🇹🇿 Swahili" : "🇬🇧 English"}
              </button>
              <button
                onClick={() => onCurrencyChange(currency === "USD" ? "TZS" : "USD")}
                className="flex-1 py-2 rounded-full border border-gold/30 text-gold text-xs font-body"
              >
                {currency === "USD" ? "Switch to TZS" : "Switch to USD"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

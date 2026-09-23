"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { formatPriceCombined } from "@/lib/data";
import {
  ShoppingBag,
  Truck,
  Clock,
  CheckCircle2,
  Heart,
  User,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { currentUser, orders, products, lang, setLang, currency, setCurrency, logout } = useStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let active = currentUser;
    if (!active && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("afriverse_active_session");
        if (raw) active = JSON.parse(raw);
      } catch {}
    }
    if (!active) {
      router.push("/login");
      return;
    }
    setAuthChecked(true);
  }, [currentUser, router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center text-[#D4AF37]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-body tracking-wider uppercase">Loading Customer Portal...</p>
        </div>
      </div>
    );
  }

  const activeCustomer = currentUser || {
    id: "u-cust",
    name: "Baraka Edward",
    email: "baraka@afriverse.co.tz",
    role: "customer",
    phone: "+255 714 223 344",
  };

  return (
    <main className="min-h-screen bg-[#0F0F12] text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        {/* Customer Profile Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#141419] via-[#1A1A22] to-[#121216] border border-[#D4AF37]/30 p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-[#D4AF37] p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#0F0F12] rounded-2xl flex items-center justify-center text-2xl font-bold font-display text-sky-300">
                {activeCustomer.name ? activeCustomer.name.slice(0, 2).toUpperCase() : "BE"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {activeCustomer.name || "Customer Member"}
                </h1>
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold">
                  Verified Buyer
                </span>
              </div>
              <p className="text-xs text-earth-cream/70 mt-1">
                {activeCustomer.email} • {activeCustomer.phone || "+255 714 223 344"} • Arusha Delivery Zone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold shadow-gold"
            >
              Explore Crafts →
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-red-950/40 text-earth-cream/70 hover:text-red-400 border border-white/10 text-xs font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#D4AF37]" />
              Your Order History & Live Boda Boda Tracking
            </h3>
            <Link href="/delivery" className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1">
              <Truck size={14} /> Open Live Map Tracker
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-earth-cream/60 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Delivery To</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-semibold">{o.id}</td>
                    <td className="py-3.5 px-4 text-white">{o.items?.length || 1} craft(s)</td>
                    <td className="py-3.5 px-4 text-earth-cream/70">{o.deliveryLocation}</td>
                    <td className="py-3.5 px-4 font-mono text-white font-bold">
                      {formatPriceCombined(o.totalPriceUSD, currency)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border bg-sky-950/60 text-sky-300 border-sky-500/30">
                        <Clock size={10} /> {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href="/delivery"
                        className="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                      >
                        Track Boda Boda <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Crafts */}
        <div className="rounded-3xl bg-[#141418] border border-white/10 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#D4AF37]" /> Handpicked Authentic Crafts from Arusha Artisans
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-2xl bg-[#0F0F12] border border-white/10 p-3 space-y-2">
                <div className="text-sm font-bold text-white line-clamp-1">{p.name}</div>
                <div className="text-xs text-[#D4AF37] font-mono font-bold">
                  {formatPriceCombined(p.priceUSD, currency)}
                </div>
                <Link
                  href={`/products/${p.id}`}
                  className="text-[11px] text-earth-cream/70 hover:text-[#D4AF37] underline block"
                >
                  View Details & Reviews →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}

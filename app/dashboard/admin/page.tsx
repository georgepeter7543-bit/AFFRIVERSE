"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { formatPriceCombined, Order } from "@/lib/data";
import {
  ShieldCheck,
  Crown,
  Package,
  Truck,
  Users,
  DollarSign,
  CheckCircle2,
  QrCode,
  Printer,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    products,
    orders,
    sealAfriverseLabel,
    dispatchBodaBoda,
    markOrderDelivered,
    lang,
    setLang,
    currency,
    setCurrency,
  } = useStore();

  const [authChecked, setAuthChecked] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [riderName, setRiderName] = useState("Juma Kassim");
  const [riderPhone, setRiderPhone] = useState("+255768432109");
  const [plateNumber, setPlateNumber] = useState("MC 452 ABC");
  const [dispatchSuccess, setDispatchSuccess] = useState("");

  // Admin route guard
  useEffect(() => {
    let active = currentUser;
    if (!active && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("afriverse_active_session");
        if (raw) active = JSON.parse(raw);
      } catch {}
    }

    if (!active || active.role !== "admin") {
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
          <p className="text-sm font-body tracking-wider uppercase">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  const totalSalesUSD = orders.reduce((sum, o) => sum + o.totalPriceUSD, 0) + 12850;

  const handleDispatch = (orderId: string) => {
    dispatchBodaBoda(orderId, riderName, riderPhone, plateNumber);
    setDispatchSuccess(`Boda Boda Rider (${riderName}) dispatched for order ${orderId}!`);
    setTimeout(() => setDispatchSuccess(""), 4000);
  };

  return (
    <main className="min-h-screen bg-[#0F0F12] text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Admin Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#16161D] via-[#1A1A24] to-[#121216] border border-[#D4AF37]/30 p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-700 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#0F0F12] rounded-2xl flex items-center justify-center text-[#D4AF37]">
                <Crown size={28} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">AFRIVERSE Admin Control</h1>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                  MASTER HUB
                </span>
              </div>
              <p className="text-xs text-earth-cream/70 mt-1">
                Arusha Headquarters • Boda Boda Logistics Engine • Fair Trade Artisan Oversight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/artisan"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] transition"
            >
              View Artisan Studio View →
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold hover:bg-amber-400 transition"
            >
              Full Dashboard →
            </Link>
          </div>
        </div>

        {dispatchSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{dispatchSuccess}</span>
          </div>
        )}

        {/* High-level Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-5 shadow-lg">
            <span className="text-xs text-earth-cream/60">Platform Gross Volume</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {formatPriceCombined(totalSalesUSD, currency)}
            </div>
          </div>
          <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-5 shadow-lg">
            <span className="text-xs text-earth-cream/60">Active Catalog Products</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">{products.length} Items</div>
          </div>
          <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-5 shadow-lg">
            <span className="text-xs text-earth-cream/60">Total Orders</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">{orders.length + 84} Orders</div>
          </div>
          <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-5 shadow-lg">
            <span className="text-xs text-earth-cream/60">Boda Boda Fleet</span>
            <div className="text-2xl font-bold font-mono text-green-400 mt-1">12 Active Riders</div>
          </div>
        </div>

        {/* Orders Table with Quick Dispatch Action */}
        <div className="rounded-3xl bg-[#141418] border border-[#D4AF37]/20 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold font-display text-white">Live Platform Orders</h3>
            <span className="text-xs text-earth-cream/60 font-mono">Arusha Central Dispatch</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-earth-cream/60 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">AFRIVERSE Label</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-semibold">{o.id}</td>
                    <td className="py-3.5 px-4 font-medium text-white">{o.customerName}</td>
                    <td className="py-3.5 px-4 text-earth-cream/70">{o.deliveryLocation}</td>
                    <td className="py-3.5 px-4 font-mono text-white font-bold">
                      {formatPriceCombined(o.totalPriceUSD, currency)}
                    </td>
                    <td className="py-3.5 px-4">
                      {o.afriverseLabelApplied ? (
                        <span className="text-green-400 font-bold flex items-center gap-1">✓ Sealed</span>
                      ) : (
                        <button
                          onClick={() => sealAfriverseLabel(o.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/40 transition"
                        >
                          Seal Label
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-semibold">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {o.status === "Delivered" ? (
                        <span className="text-emerald-400 font-medium">Completed</span>
                      ) : o.status === "Boda Boda Dispatched" ? (
                        <button
                          onClick={() => markOrderDelivered(o.id)}
                          className="px-2 py-1 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 text-[10px] font-bold border border-green-500/30 transition"
                        >
                          Mark Delivered
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDispatch(o.id)}
                          className="px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-[10px] font-bold border border-sky-500/30 transition flex items-center gap-1"
                        >
                          <Truck size={10} /> Dispatch Rider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}

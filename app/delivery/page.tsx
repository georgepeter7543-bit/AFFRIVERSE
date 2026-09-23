"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { Order } from "@/lib/data";
import {
  Truck,
  Search,
  CheckCircle,
  Package,
  MapPin,
  Phone,
  MessageSquare,
  QrCode,
  AlertCircle,
  Clock,
  Send,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function DeliveryPage() {
  const { orders, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const [searchQuery, setSearchQuery] = useState("AFR-8882-01");
  const [selectedDistrict, setSelectedDistrict] = useState("Njiro Complex, Arusha");

  // Find matched order
  const matchedOrder = orders.find((o) => o.id.toLowerCase() === searchQuery.trim().toLowerCase()) || orders[0];

  const [smsSent, setSmsSent] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);

  const handleSendSMS = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 4000);
  };

  const handleUpdateLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setLocationUpdated(true);
    setTimeout(() => setLocationUpdated(false), 3000);
  };

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
            <Truck size={14} className="text-gold" />
            <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
              Arusha Local Boda Boda Tracking
            </span>
          </div>
          <h1 className="section-heading text-4xl lg:text-5xl mb-4">
            Live Order <span className="shimmer-text">& Delivery Status</span>
          </h1>
          <p className="text-earth-cream/70 font-body text-base max-w-xl mx-auto">
            Track your order sealed with the official Afriverse label and dispatched via Arusha Boda Boda riders.
          </p>
        </div>

        {/* Search Order Bar */}
        <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 mb-8 max-w-2xl mx-auto shadow-luxury">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID e.g. AFR-8882-01"
                className="w-full bg-obsidian-surface border border-gold/30 rounded-2xl px-4 py-3.5 pl-11 text-sm text-gold font-mono focus:outline-none focus:border-gold"
              />
              <Search size={18} className="absolute left-4 top-4 text-gold/60" />
            </div>
            <button
              type="button"
              className="btn-gold px-6 py-3.5 rounded-2xl text-xs font-body font-bold"
            >
              Track Order
            </button>
          </div>
        </div>

        {matchedOrder ? (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Status Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-gold/30 shadow-luxury">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-6">
                  <div>
                    <div className="text-xs text-earth-cream/60 font-body">Tracking Order ID</div>
                    <div className="font-mono text-gold font-bold text-xl">{matchedOrder.id}</div>
                  </div>
                  <span className="bg-gold/20 text-gold text-xs font-body font-bold px-3 py-1 rounded-full border border-gold/40">
                    STATUS: {matchedOrder.status}
                  </span>
                </div>

                {/* Vertical Timeline */}
                <div className="space-y-6 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gold/30">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-earth-cream">1. Order Placed & Confirmed</h4>
                      <p className="text-xs text-earth-cream/70 font-body">Buyer order placed. Payment confirmed via {matchedOrder.paymentMethod}.</p>
                      <span className="text-[10px] text-gold/80 font-mono">{matchedOrder.createdAt}</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow ${
                      matchedOrder.afriverseLabelApplied ? "bg-green-600 text-white" : "bg-amber-600 text-black animate-pulse"
                    }`}>
                      {matchedOrder.afriverseLabelApplied ? "✓" : "2"}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-earth-cream">2. Boxed & Sealed with Afriverse Label</h4>
                      <p className="text-xs text-earth-cream/70 font-body">
                        {matchedOrder.afriverseLabelApplied
                          ? "Artisan has packaged product in box and applied official Afriverse verification seal."
                          : "Artisan is packaging product and attaching Afriverse label."}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow ${
                      matchedOrder.status === "Boda Boda Dispatched" || matchedOrder.status === "Delivered"
                        ? "bg-green-600 text-white"
                        : "bg-obsidian-surface border border-gold/40 text-gold"
                    }`}>
                      {matchedOrder.status === "Boda Boda Dispatched" || matchedOrder.status === "Delivered" ? "✓" : "3"}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-earth-cream">3. Dispatched via Arusha Boda Boda</h4>
                      <p className="text-xs text-earth-cream/70 font-body">
                        {matchedOrder.bodaBodaRider
                          ? `Rider ${matchedOrder.bodaBodaRider.name} (${matchedOrder.bodaBodaRider.plateNumber}) picked up package.`
                          : "Pending Boda Boda rider pickup at Arusha Maasai Market."}
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow ${
                      matchedOrder.status === "Delivered" ? "bg-green-600 text-white" : "bg-obsidian-surface border border-gold/40 text-earth-cream/40"
                    }`}>
                      {matchedOrder.status === "Delivered" ? "✓" : "4"}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-earth-cream">4. Delivered to Destination</h4>
                      <p className="text-xs text-earth-cream/70 font-body">
                        {matchedOrder.status === "Delivered"
                          ? "Package successfully delivered in Arusha."
                          : `En route to ${matchedOrder.deliveryLocation}.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SMS Notification Trigger Button */}
                <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-gold">
                      {isEn ? "SMS Live Dispatch Alerts" : "Taarifa za Papo Hapo kwa SMS"}
                    </div>
                    <div className="text-[11px] text-earth-cream/70">
                      {isEn
                        ? `Send instant delivery updates to buyer at ${matchedOrder.customerPhone || "+255714223344"}.`
                        : `Tuma taarifa za usafirishaji kwa mnunuzi ${matchedOrder.customerPhone || "+255714223344"}.`}
                    </div>
                  </div>
                  <button
                    onClick={handleSendSMS}
                    className="btn-gold px-5 py-2.5 rounded-full text-xs font-body font-bold flex items-center gap-2"
                  >
                    <Send size={14} /> {isEn ? "Send SMS Update" : "Tuma SMS ya Taarifa"}
                  </button>
                </div>

                {smsSent && (
                  <div className="mt-3 bg-green-950/80 border border-green-500/50 text-green-300 text-xs font-body rounded-xl p-3 text-center animate-bounce">
                    📱 <strong>SMS Sent to {matchedOrder.customerPhone || "+255714223344"}:</strong> "AFRIVERSE Delivery Update: Order #{matchedOrder.id} status is {matchedOrder.status}. Courier: {matchedOrder.bodaBodaRider?.name || 'Juma Kassim'} ({matchedOrder.bodaBodaRider?.phone || '+255768432109'}). Support Hotline: +255754998882."
                  </div>
                )}
              </div>
            </div>

            {/* Right: Delivery Settings & Boda Boda Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Boda Boda Rider Card */}
              <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 bg-sky-950/20 shadow-luxury space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white text-2xl shadow">
                    🏍️
                  </div>
                  <div>
                    <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                      {isEn ? "Assigned Local Courier" : "Msafirishaji wa Boda Boda"}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      {matchedOrder.bodaBodaRider?.name || "Juma Kassim"}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-body text-earth-cream/80 border-t border-sky-500/20 pt-3">
                  <div className="flex justify-between">
                    <span>{isEn ? "Rider Direct Phone:" : "Simu ya Msafirishaji:"}</span>
                    <span className="font-mono font-bold text-gold">
                      {matchedOrder.bodaBodaRider?.phone || "+255768432109"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isEn ? "Motorcycle Plate:" : "Namba ya Boda Boda:"}</span>
                    <span className="font-mono font-bold text-sky-300">
                      {matchedOrder.bodaBodaRider?.plateNumber || "MC 452 ABC"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isEn ? "Payment Status:" : "Hali ya Malipo:"}</span>
                    <span className="font-bold text-green-400">
                      {isEn ? "Paid Directly by Artisan ✅" : "Imelipwa na Msanii Moja kwa Moja ✅"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <a
                    href={`tel:${matchedOrder.bodaBodaRider?.phone || "+255768432109"}`}
                    className="flex-1 btn-gold py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> {isEn ? "Call Rider" : "Piga Simu ya Rider"}
                  </a>
                  <Link
                    href="/chat"
                    className="flex-1 btn-outline-gold py-2.5 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={14} /> {isEn ? "In-App Chat" : "Meseji"}
                  </Link>
                </div>
              </div>

              {/* Afriverse Official Hotline Card */}
              <div className="glass-card rounded-3xl p-6 border-2 border-gold/40 bg-gold/5 shadow-luxury space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold font-bold uppercase tracking-wider">
                      {isEn ? "24/7 Arusha Support Hotline" : "Msaada wa Arusha 24/7"}
                    </span>
                    <h4 className="font-display font-bold text-base text-earth-cream">
                      Afriverse Concierge Team
                    </h4>
                  </div>
                </div>
                <p className="text-earth-cream/70 text-xs font-body leading-relaxed">
                  {isEn
                    ? "Need help with order sealing, escrow verification, or delivery questions? Speak directly to our Arusha operations desk."
                    : "Unahitaji msaada kuhusu oda yako au uthibitisho wa bidhaa? Wasiliana na timu yetu ya Arusha."}
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="font-mono font-bold text-gold text-sm">+255754998882</span>
                  <a
                    href="tel:+255754998882"
                    className="btn-outline-gold px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  >
                    <Phone size={12} /> {isEn ? "Call Admin Hotline" : "Piga Simu ya Msaada"}
                  </a>
                </div>
              </div>

              {/* Delivery Location Settings */}
              <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 shadow-luxury space-y-4">
                <div className="flex items-center gap-2">
                  <Navigation size={18} className="text-gold" />
                  <h3 className="font-display font-bold text-lg text-earth-cream">
                    Delivery Location Settings
                  </h3>
                </div>

                <form onSubmit={handleUpdateLocation} className="space-y-3">
                  <div>
                    <label className="block text-xs font-body font-bold text-gold uppercase mb-1">
                      Arusha Delivery District / Address
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-3 py-2.5 text-xs text-earth-cream font-body"
                    >
                      <option value="Njiro Complex, Arusha">Njiro Complex, Arusha</option>
                      <option value="Sakina Area, Namanga Road">Sakina Area, Namanga Road</option>
                      <option value="Clock Tower Plaza, Arusha CBD">Clock Tower Plaza, Arusha CBD</option>
                      <option value="Sanawari Market Area">Sanawari Market Area</option>
                      <option value="Usa River Coffee Estate Area">Usa River Coffee Estate Area</option>
                    </select>
                  </div>

                  {locationUpdated && (
                    <div className="text-[11px] text-green-400 font-body">
                      ✓ Location updated for Boda Boda rider!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-outline-gold py-2.5 rounded-xl text-xs font-bold"
                  >
                    Update Delivery Location
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle size={40} className="text-gold mx-auto mb-3" />
            <p className="text-earth-cream/70 font-body text-sm">No order found with ID "{searchQuery}". Try "AFR-8882-01".</p>
          </div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}

"use client";

import { paymentMethods, shippingPartners } from "@/lib/data";
import { Shield, Truck, Phone, CheckCircle, MapPin } from "lucide-react";
import type { Language } from "@/lib/data";

interface PaymentBadgesProps {
  lang: Language;
}

export default function PaymentBadges({ lang }: PaymentBadgesProps) {
  const isEn = lang === "en";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-card rounded-3xl border border-gold/15 p-8 lg:p-12">
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Payments with crisp SVG visual icons */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} className="text-gold" />
              <span className="section-label">{isEn ? "Secure Mobile Money & Card Payments" : "Malipo Salama ya Simu na Kadi"}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* M-Pesa */}
              <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3 flex items-center gap-2.5 hover:border-red-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs shadow">
                  M
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-body">M-Pesa</div>
                  <div className="text-red-300 text-[9px]">Vodacom TZ</div>
                </div>
              </div>

              {/* Tigo Pesa */}
              <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-3 flex items-center gap-2.5 hover:border-sky-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-black text-white text-xs shadow">
                  T
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-body">Tigo Pesa</div>
                  <div className="text-sky-300 text-[9px]">Tigo TZ</div>
                </div>
              </div>

              {/* Airtel Money */}
              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2.5 hover:border-rose-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center font-black text-white text-xs shadow">
                  A
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-body">Airtel Money</div>
                  <div className="text-rose-300 text-[9px]">Airtel TZ</div>
                </div>
              </div>

              {/* Visa */}
              <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3 flex items-center gap-2.5 hover:border-blue-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center font-black text-amber-400 text-xs italic shadow">
                  VISA
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-body">Visa Card</div>
                  <div className="text-blue-300 text-[9px]">Global Card</div>
                </div>
              </div>

              {/* Mastercard */}
              <div className="bg-stone-900 border border-orange-500/30 rounded-xl p-3 flex items-center gap-2.5 hover:border-orange-400 transition-all">
                <div className="w-8 h-8 rounded-lg bg-stone-950 flex items-center justify-center relative shadow">
                  <div className="w-4 h-4 rounded-full bg-red-500 absolute left-1" />
                  <div className="w-4 h-4 rounded-full bg-amber-500 absolute right-1 opacity-80" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-body">Mastercard</div>
                  <div className="text-orange-300 text-[9px]">Credit / Debit</div>
                </div>
              </div>

              {/* Direct Arusha Payouts */}
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-gold" />
                <span className="text-gold text-[10px] font-bold font-body">Instant Arusha Payouts</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-32 bg-gold/10 mx-auto" />

          {/* Shipping */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Truck size={18} className="text-gold" />
              <span className="section-label">{isEn ? "Direct Arusha Delivery & Express Shipping" : "Usafirishaji wa Haraka Arusha"}</span>
            </div>
            <div className="space-y-3">
              {shippingPartners.map((partner) => (
                <div key={partner} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                  <span className="text-earth-cream/70 text-sm font-body font-medium">{partner}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-gold">
              <Phone size={14} />
              <span className="text-xs font-body font-semibold">
                Arusha Support Hotline: +255754998882
              </span>
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="luxury-divider my-8" />
        <div className="flex flex-wrap justify-center gap-6 text-center">
          {[
            { icon: "🔒", text: isEn ? "256-bit SSL Encrypted Payouts" : "Malipo Yaliyosimbwa SSL" },
            { icon: "🏷️", text: isEn ? "Sealed with Official Afriverse Labels" : "Hati Halisi ya Afriverse" },
            { icon: "🏍️", text: isEn ? "Arusha Local Boda Boda Dispatch" : "Usafirishaji wa Boda Boda Arusha" },
            { icon: "📍", text: isEn ? "Arusha Artisan Direct Guarantee" : "Uhakika wa Mafundi wa Arusha" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-earth-cream/70 text-xs font-body font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

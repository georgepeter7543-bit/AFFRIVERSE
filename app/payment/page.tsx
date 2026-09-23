"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentBadges from "@/components/PaymentBadges";
import AIRecommendations from "@/components/AIRecommendations";
import { useStore } from "@/lib/store";
import { paymentMethods, formatPrice, formatPriceCombined } from "@/lib/data";
import { ShieldCheck, CheckCircle2, Phone, CreditCard, Lock, Sparkles, Printer, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  const { cart, createOrder, clearCart, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const [selectedMethod, setSelectedMethod] = useState<string>("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("+255714223344");
  const [cardNumber, setCardNumber] = useState("4532 8890 1234 5678");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("882");
  const [deliveryLocation, setDeliveryLocation] = useState("Njiro Complex, Arusha");
  const [customerName, setCustomerName] = useState("Baraka Edward");

  const [processing, setProcessing] = useState(false);
  const [ussdPrompt, setUssdPrompt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Cart total calculations
  const totalUSD = cart.length > 0 ? cart.reduce((sum, i) => sum + i.product.priceUSD * i.quantity, 0) : 120;
  const totalTZS = Math.round(totalUSD * 2580);

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    if (selectedMethod === "mpesa" || selectedMethod === "tigopesa" || selectedMethod === "airtelmoney") {
      setUssdPrompt(true);
      setTimeout(() => {
        const order = createOrder({
          customerName,
          customerPhone: phoneNumber,
          deliveryLocation,
          items: cart.length > 0
            ? cart.map((i) => ({ productName: i.product.name, price: i.product.priceUSD, quantity: i.quantity }))
            : [{ productName: "Authentic Maasai Shuka Cloth", price: 65, quantity: 1 }, { productName: "Maasai Shuka Beaded Jewelry Set", price: 55, quantity: 1 }],
          totalPriceUSD: totalUSD,
          totalPriceTZS: totalTZS,
          paymentMethod: `${selectedMethod.toUpperCase()} (${phoneNumber})`,
        });
        setCompletedOrder(order);
        setProcessing(false);
        setUssdPrompt(false);
        clearCart();
      }, 2500);
    } else {
      setTimeout(() => {
        const order = createOrder({
          customerName,
          customerPhone: phoneNumber,
          deliveryLocation,
          items: cart.length > 0
            ? cart.map((i) => ({ productName: i.product.name, price: i.product.priceUSD, quantity: i.quantity }))
            : [{ productName: "Authentic Maasai Shuka Cloth", price: 65, quantity: 1 }, { productName: "Maasai Shuka Beaded Jewelry Set", price: 55, quantity: 1 }],
          totalPriceUSD: totalUSD,
          totalPriceTZS: totalTZS,
          paymentMethod: `${selectedMethod.toUpperCase()} (*${cardNumber.slice(-4)})`,
        });
        setCompletedOrder(order);
        setProcessing(false);
        clearCart();
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
            <Lock size={14} className="text-gold" />
            <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
              256-bit Encrypted Checkout
            </span>
          </div>
          <h1 className="section-heading text-4xl lg:text-5xl mb-4">
            Official <span className="shimmer-text">Payment Gateway</span>
          </h1>
          <p className="text-earth-cream/70 font-body text-base max-w-xl mx-auto">
            Pay securely with M-Pesa, Tigo Pesa, Airtel Money, Visa, or Mastercard. Direct payouts to Arusha artisans.
          </p>
        </div>

        {completedOrder ? (
          /* Receipt Card */
          <div className="glass-card rounded-3xl border-2 border-gold/40 p-8 sm:p-12 shadow-luxury space-y-6 max-w-3xl mx-auto bg-gold/5">
            <div className="text-center space-y-3">
              <CheckCircle2 size={56} className="text-green-400 mx-auto" />
              <h2 className="font-display font-bold text-3xl text-white">
                Payment Successful!
              </h2>
              <p className="text-earth-cream/80 text-sm font-body">
                Order <strong className="text-gold">#{completedOrder.id}</strong> has been confirmed and sent to the Arusha artisan for package sealing & Boda Boda dispatch.
              </p>
            </div>

            <div className="bg-obsidian-surface rounded-2xl p-6 border border-gold/20 space-y-4 text-xs font-body">
              <div className="flex justify-between border-b border-gold/10 pb-3">
                <span className="text-earth-cream/60">Transaction ID:</span>
                <span className="font-mono font-bold text-gold">TXN-MP-998822</span>
              </div>
              <div className="flex justify-between border-b border-gold/10 pb-3">
                <span className="text-earth-cream/60">Customer Name:</span>
                <span className="font-bold text-earth-cream">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-gold/10 pb-3">
                <span className="text-earth-cream/60">Delivery Location in Arusha:</span>
                <span className="font-bold text-earth-cream">{completedOrder.deliveryLocation}</span>
              </div>
              <div className="flex justify-between border-b border-gold/10 pb-3">
                <span className="text-earth-cream/60">Payment Method:</span>
                <span className="font-bold text-gold">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-cream/60">{isEn ? "Total Paid:" : "Jumla Iliyolipwa:"}</span>
                <span className="font-bold text-gold text-base">
                  {formatPriceCombined(completedOrder.totalPriceUSD, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button
                onClick={() => window.print()}
                className="btn-gold px-8 py-3.5 rounded-full text-xs font-body font-bold inline-flex items-center gap-2"
              >
                <Printer size={16} /> Print Receipt
              </button>
              <Link
                href="/delivery"
                className="btn-outline-gold px-8 py-3.5 rounded-full text-xs font-body font-bold inline-flex items-center gap-2"
              >
                Track Boda Boda Delivery →
              </Link>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Payment Method Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-gold/30 shadow-luxury">
                <h3 className="font-display font-bold text-xl text-earth-cream mb-4">
                  Select Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* M-Pesa */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("mpesa")}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      selectedMethod === "mpesa" ? "bg-red-950/80 border-red-500 shadow-gold" : "glass-card border-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-red-600 text-white font-black text-xs flex items-center justify-center">M</span>
                      <div className="text-left">
                        <div className="font-bold text-white text-xs">M-Pesa</div>
                        <div className="text-[10px] text-red-300">Vodacom Tanzania</div>
                      </div>
                    </div>
                  </button>

                  {/* Tigo Pesa */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("tigopesa")}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      selectedMethod === "tigopesa" ? "bg-sky-950/80 border-sky-500 shadow-gold" : "glass-card border-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-sky-600 text-white font-black text-xs flex items-center justify-center">T</span>
                      <div className="text-left">
                        <div className="font-bold text-white text-xs">Tigo Pesa</div>
                        <div className="text-[10px] text-sky-300">Tigo Tanzania</div>
                      </div>
                    </div>
                  </button>

                  {/* Airtel Money */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("airtelmoney")}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      selectedMethod === "airtelmoney" ? "bg-rose-950/80 border-rose-500 shadow-gold" : "glass-card border-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-red-700 text-white font-black text-xs flex items-center justify-center">A</span>
                      <div className="text-left">
                        <div className="font-bold text-white text-xs">Airtel Money</div>
                        <div className="text-[10px] text-rose-300">Airtel Tanzania</div>
                      </div>
                    </div>
                  </button>

                  {/* Visa / Mastercard */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("card")}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      selectedMethod === "card" ? "bg-blue-950/80 border-blue-500 shadow-gold" : "glass-card border-gold/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-amber-400" />
                      <div className="text-left">
                        <div className="font-bold text-white text-xs">Visa / Mastercard</div>
                        <div className="text-[10px] text-blue-300">Global Card</div>
                      </div>
                    </div>
                  </button>
                </div>

                <form onSubmit={handlePayNow} className="space-y-4">
                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">
                      Delivery Location in Arusha *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Njiro Complex, Sakina, Clock Tower CBD"
                      className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-body"
                    />
                  </div>

                  {selectedMethod !== "card" ? (
                    <div>
                      <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">
                        Mobile Money Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-mono"
                        />
                        <Phone size={16} className="absolute right-4 top-3.5 text-gold/60" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-body font-semibold text-gold uppercase mb-1">CVC Code</label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-obsidian-surface border border-gold/30 rounded-xl px-4 py-3 text-sm text-earth-cream font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {ussdPrompt && (
                    <div className="bg-amber-950/80 border border-amber-500/60 rounded-2xl p-4 text-center text-xs font-body text-amber-200 animate-pulse">
                      📲 <strong>USSD Push Request Sent to {phoneNumber}:</strong> Please check your mobile phone and enter your Mobile Money PIN to approve TZS {totalTZS.toLocaleString()}.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full btn-gold py-4 rounded-xl text-base font-body font-bold shadow-gold-lg mt-4"
                  >
                    {processing
                      ? (isEn ? "Processing Encrypted Payment..." : "Inachakata Malipo Yaliyolindwa...")
                      : `${isEn ? "Pay Now" : "Lipa Sasa"} — ${formatPrice(currency === "TZS" ? totalTZS : totalUSD, currency)} (${formatPrice(currency === "TZS" ? totalUSD : totalTZS, currency === "TZS" ? "USD" : "TZS")}) →`}
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-3xl p-6 border-2 border-gold/30 shadow-luxury">
                <h3 className="font-display font-bold text-xl text-earth-cream mb-4">
                  {isEn ? "Order Summary" : "Muhtasari wa Oda"}
                </h3>

                <div className="space-y-3 mb-6">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs font-body border-b border-gold/10 pb-2">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span className="font-mono font-bold text-gold">
                          {formatPrice(currency === "TZS" ? item.product.priceTZS * item.quantity : item.product.priceUSD * item.quantity, currency)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between text-xs font-body border-b border-gold/10 pb-2">
                        <span>1x Authentic Maasai Shuka Cloth</span>
                        <span className="font-mono font-bold text-gold">
                          {formatPrice(currency === "TZS" ? 65 * 2580 : 65, currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs font-body border-b border-gold/10 pb-2">
                        <span>1x Maasai Shuka Beaded Jewelry Set</span>
                        <span className="font-mono font-bold text-gold">
                          {formatPrice(currency === "TZS" ? 55 * 2580 : 55, currency)}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-sm font-body font-bold pt-2 border-t border-gold/30">
                    <span>{isEn ? `Total (${currency}):` : `Jumla (${currency}):`}</span>
                    <span className="text-gold font-mono text-base font-bold">
                      {formatPrice(currency === "TZS" ? totalTZS : totalUSD, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-body text-earth-cream/60">
                    <span>{isEn ? `Equivalent in ${currency === "USD" ? "TZS" : "USD"}:` : `Sawa na ${currency === "USD" ? "TZS" : "USD"}:`}</span>
                    <span className="font-mono">
                      {formatPrice(currency === "TZS" ? totalUSD : totalTZS, currency === "TZS" ? "USD" : "TZS")}
                    </span>
                  </div>
                </div>

                <div className="bg-gold/10 rounded-2xl p-4 border border-gold/20 text-xs font-body space-y-2">
                  <div className="flex items-center gap-2 text-gold font-bold">
                    <ShieldCheck size={16} /> Official Afriverse Seal Guarantee
                  </div>
                  <p className="text-earth-cream/70 leading-relaxed">
                    Direct payout is released to the Arusha artisan immediately upon Boda Boda dispatch. Support Hotline: <strong>+255754998882</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Cultural Recommendations for Checkout */}
        <div className="mt-16">
          <AIRecommendations
            cartProductIds={cart.map((i) => i.product.id)}
            lang={lang}
            currency={currency}
            title={isEn ? "Complete Your Order with Authentic Cultural Pairings" : "Kamilisha Oda Yako na Bidhaa Sambamba za Arusha"}
          />
        </div>
      </section>

      <PaymentBadges lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

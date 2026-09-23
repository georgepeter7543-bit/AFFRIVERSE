"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import AIRecommendations from "@/components/AIRecommendations";
import { useStore } from "@/lib/store";
import { formatPriceWithSecondary, artisans } from "@/lib/data";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  CheckCircle,
  BookOpen,
  Sparkles,
  MapPin,
  Award,
  Layers,
  PieChart,
  Check,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { products, addToCart, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const product = products.find((p) => p.id === productId) || products[0];
  const artisan = artisans.find((a) => a.id === product?.artisanId) || artisans[0];

  // Resolve the best available image source:
  // 1. imageUrl / image — a Data-URL stored when the artisan uploaded a photo from the dashboard
  // 2. /images/{imageKey}.jpg — static fallback for default catalogue products
  const resolvedImageSrc =
    product?.imageUrl ||
    product?.image ||
    `/images/${product?.imageKey || "maasai-beadwork"}.jpg`;



  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"heritage" | "materials" | "cost" | "uses">("heritage");
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-obsidian text-earth-cream flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products" className="btn-gold px-6 py-3 rounded-full text-sm font-body font-semibold">
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  const priceData = formatPriceWithSecondary(product.priceUSD, currency);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/payment");
  };

  const cost = product.costBreakdown || {
    artisanDirectPercent: 74,
    materialsPercent: 14,
    logisticsPercent: 7,
    communityFundPercent: 5,
  };

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      {/* Breadcrumbs & Navigation */}
      <section className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-body text-earth-cream/60">
          <Link href="/" className="hover:text-gold transition-colors">
            {isEn ? "Home" : "Mwanzo"}
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">
            {isEn ? "Shop" : "Duka"}
          </Link>
          <span>/</span>
          <span className="text-gold font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </section>

      {/* Main Product Showcase */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual Asset Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border-2 border-gold/30 shadow-luxury group">
              <Image
                src={resolvedImageSrc}
                alt={product.name}
                fill
                priority
                unoptimized={resolvedImageSrc.startsWith("data:")}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-black/20 pointer-events-none" />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.featured && (
                  <span className="bg-gold text-obsidian text-xs font-body font-bold px-3 py-1 rounded-full shadow-gold">
                    ★ {isEn ? "Featured Arusha Craft" : "Kazi Teule ya Arusha"}
                  </span>
                )}
                {product.inStock ? (
                  <span className="glass-dark text-green-400 text-xs font-body font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-green-500/30">
                    <CheckCircle size={12} />
                    {isEn ? "In Stock in Arusha" : "Ipo Stoo Arusha"}
                  </span>
                ) : (
                  <span className="glass-dark text-earth-cream/40 text-xs font-body px-3 py-1 rounded-full">
                    {isEn ? "Out of Stock" : "Imekwisha"}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-earth-cream/80 hover:text-red-400 transition-colors z-10 border border-gold/20"
                title="Save to Wishlist"
              >
                <Heart size={18} className={liked ? "text-red-500 fill-red-500" : ""} />
              </button>

              {/* Authenticity Certificate Overlay Pill */}
              <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl p-3 border border-gold/30 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-gold" />
                  <span className="text-xs font-body text-earth-cream font-medium">
                    {isEn ? "100% Authentic Arusha Artisan-Made" : "Uhalisi 100% wa Kazi za Mikono Arusha"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gold font-bold">
                  AFRIVERSE CERTIFIED
                </span>
              </div>
            </div>

            {/* Thumbnail Preview strip — single thumb for uploaded images, multi-angle for catalogue products */}
            {product.imageUrl || product.image ? (
              // Artisan-uploaded product: show only the one real uploaded image
              <div className="grid grid-cols-4 gap-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border-2 border-gold shadow-gold cursor-pointer">
                  <Image
                    src={resolvedImageSrc}
                    alt={product.name}
                    fill
                    unoptimized={resolvedImageSrc.startsWith("data:")}
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-obsidian/80 text-[10px] font-mono text-gold px-1.5 py-0.5 rounded">01</div>
                </div>
                {/* Filler slots to maintain grid layout */}
                {[2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-obsidian-surface border-2 border-gold/10 flex items-center justify-center"
                  >
                    <span className="text-[10px] text-earth-cream/20 font-mono">0{i}</span>
                  </div>
                ))}
              </div>
            ) : (
              // Default catalogue product: show 4 angle thumbnails
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className={`relative aspect-square rounded-2xl overflow-hidden glass-card border-2 cursor-pointer transition-all ${
                      idx === 1 ? "border-gold shadow-gold" : "border-gold/15 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={resolvedImageSrc}
                      alt={`${product.name} view ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-obsidian/80 text-[10px] font-mono text-gold px-1.5 py-0.5 rounded">
                      0{idx}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Pricing, Artisan, and Purchase Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-body font-bold mb-3">
                <Sparkles size={12} />
                <span>{product.category}</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-earth-cream leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-earth-cream/70 font-body text-sm leading-relaxed">
                {product.description[lang]}
              </p>
            </div>

            {/* Artisan Credential Card */}
            <div className="glass-card rounded-2xl p-4 border border-gold/25 bg-gold/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${artisan.imageColor} border-2 border-gold flex items-center justify-center font-display font-bold text-lg text-gold shadow`}>
                  {artisan.initials}
                </div>
                <div>
                  <div className="text-xs text-earth-cream/60 font-body">{isEn ? "Master Artisan" : "Msanii Bingwa"}</div>
                  <div className="font-display font-bold text-gold text-base">{artisan.name}</div>
                  <div className="text-[11px] text-earth-cream/60 flex items-center gap-1">
                    <MapPin size={11} className="text-gold" />
                    <span>{artisan.location} ({artisan.district})</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-gold text-xs font-bold justify-end">
                  <Star size={12} className="fill-gold" />
                  <span>{artisan.rating}</span>
                </div>
                <div className="text-[10px] text-earth-cream/50 font-body">
                  {artisan.yearsActive} {isEn ? "yrs craft experience" : "miaka ya uzoefu"}
                </div>
              </div>
            </div>

            {/* Price Presentation Block (Task 01 Standardized Price Rendering) */}
            <div className="glass-card rounded-2xl p-5 border-2 border-gold/30 bg-obsidian-surface/80 shadow-gold">
              <div className="text-xs font-body font-semibold text-gold uppercase tracking-wider mb-1">
                {isEn ? "Direct Artisan Fair Price" : "Bei ya Haki ya Msanii"}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-gold">
                  {priceData.primary}
                </span>
                <span className="font-mono text-earth-cream/60 text-sm font-semibold">
                  ({priceData.secondary})
                </span>
              </div>
              <div className="text-[11px] text-earth-cream/60 mt-1 font-body">
                {isEn
                  ? "Guaranteed 70%+ goes straight to the local Arusha artisan via direct mobile money payout."
                  : "Zaidi ya 70% inalipwa moja kwa moja kwa msanii wa Arusha kupitia M-Pesa."}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <label className="text-xs font-body font-bold text-gold uppercase tracking-wider">
                  {isEn ? "Quantity:" : "Idadi:"}
                </label>
                <div className="flex items-center border border-gold/30 rounded-xl overflow-hidden bg-obsidian">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-gold hover:bg-gold/10 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-mono font-bold text-earth-cream">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-gold hover:bg-gold/10 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-4 px-6 rounded-2xl text-sm font-body font-bold transition-all flex items-center justify-center gap-2 ${
                    added
                      ? "bg-green-600 text-white shadow"
                      : "btn-gold shadow-gold-lg hover:scale-[1.02]"
                  }`}
                  id="add-to-cart-detail"
                >
                  {added ? (
                    <>
                      <CheckCircle size={18} />
                      {isEn ? "Added to Cart!" : "Imeongezwa Kwenye Kikapu!"}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      {isEn ? `Add (${quantity}) to Cart` : `Weka (${quantity}) Kikapuni`}
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-outline-gold py-4 px-6 rounded-2xl text-sm font-body font-bold text-center hover:scale-[1.02] transition-all"
                  id="buy-now-detail"
                >
                  {isEn ? "Buy Now · Express Checkout" : "Nunua Sasa Moja kwa Moja"}
                </button>
              </div>
            </div>

            {/* Delivery & Boda Boda Note */}
            <div className="rounded-2xl p-4 bg-obsidian-surface/60 border border-gold/20 space-y-2 text-xs font-body text-earth-cream/70">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <Truck size={15} />
                <span>{isEn ? "Arusha Local Boda Boda & Global Dispatch" : "Usafirishaji wa Boda Boda & Kimataifa"}</span>
              </div>
              <p>
                {isEn
                  ? "Dispatched locally via dedicated Boda Boda in Arusha or shipped globally via DHL Express with official Afriverse anti-tamper security label."
                  : "Inasafirishwa kwa Boda Boda Arusha au duniani kote kwa DHL ikiwa imefungwa kwa lebo rasmi ya Afriverse."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Background, Artisan Story, Material Authenticity, and Cost Breakdown Tabs (Tasks 05 & 09) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="cultural-story">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-gold/30 shadow-luxury">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gold/20 pb-4 mb-8">
            <button
              onClick={() => setActiveTab("heritage")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-bold transition-all flex items-center gap-2 ${
                activeTab === "heritage"
                  ? "bg-gold text-obsidian shadow-gold"
                  : "text-earth-cream/70 hover:text-gold border border-gold/15"
              }`}
            >
              <BookOpen size={14} />
              {isEn ? "Cultural Background & Heritage" : "Historia & Utamaduni"}
            </button>

            <button
              onClick={() => setActiveTab("materials")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-bold transition-all flex items-center gap-2 ${
                activeTab === "materials"
                  ? "bg-gold text-obsidian shadow-gold"
                  : "text-earth-cream/70 hover:text-gold border border-gold/15"
              }`}
            >
              <ShieldCheck size={14} />
              {isEn ? "Material Authenticity" : "Uhalisi wa Vifaa"}
            </button>

            <button
              onClick={() => setActiveTab("uses")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-bold transition-all flex items-center gap-2 ${
                activeTab === "uses"
                  ? "bg-gold text-obsidian shadow-gold"
                  : "text-earth-cream/70 hover:text-gold border border-gold/15"
              }`}
            >
              <Layers size={14} />
              {isEn ? "Recommended Uses" : "Matumizi Yanayopendekezwa"}
            </button>

            <button
              onClick={() => setActiveTab("cost")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-bold transition-all flex items-center gap-2 ${
                activeTab === "cost"
                  ? "bg-gold text-obsidian shadow-gold"
                  : "text-earth-cream/70 hover:text-gold border border-gold/15"
              }`}
            >
              <PieChart size={14} />
              {isEn ? "Transparent Cost Breakdown" : "Mgawanyo wa Bei"}
            </button>
          </div>

          {/* Tab 1: Heritage & Story */}
          {activeTab === "heritage" && (
            <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
                  <BookOpen size={14} />
                  <span>{isEn ? "Artisan Workshop Story" : "Historia ya Karakarana"}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-earth-cream">
                  {isEn ? "The Hands Behind the Craft" : "Mikono Inayounda Kazi Hii"}
                </h3>
                <p className="text-earth-cream/80 text-sm font-body leading-relaxed">
                  {product.artisanStory[lang]}
                </p>
                <div className="pt-2">
                  <div className="text-xs text-gold font-semibold mb-1">
                    {isEn ? "Workshop Location:" : "Eneo la Karakarana:"}
                  </div>
                  <div className="text-xs text-earth-cream/70 font-body flex items-center gap-1.5">
                    <MapPin size={13} className="text-gold" />
                    <span>{artisan.location} ({artisan.district})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-obsidian-surface/60 p-6 rounded-2xl border border-gold/20">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
                  <Award size={14} />
                  <span>{isEn ? "Cultural Significance in Northern Tanzania" : "Umuhimu wa Kitamaduni"}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-earth-cream">
                  {isEn ? "Living Traditions of Arusha" : "Tamaduni Hai za Arusha"}
                </h3>
                <p className="text-earth-cream/80 text-sm font-body leading-relaxed">
                  {product.culturalBackground[lang]}
                </p>
                <div className="pt-3 border-t border-gold/15 flex items-center gap-2 text-xs text-green-400 font-medium font-body">
                  <CheckCircle size={14} />
                  <span>
                    {isEn
                      ? "Directly supports cultural preservation in Arusha craft communities."
                      : "Inasaidia moja kwa moja kudumisha utamaduni na jamii za mafundi wa Arusha."}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Material Authenticity */}
          {activeTab === "materials" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="section-label">{isEn ? "Ethical Sourcing Guarantee" : "Uhakika wa Vifaa"}</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-earth-cream mt-1 mb-3">
                  {isEn ? "Material Authenticity & Craft Ethics" : "Uhalisi na Viwango vya Vifaa"}
                </h3>
                <p className="text-earth-cream/80 text-sm font-body leading-relaxed">
                  {product.materialAuthenticity[lang]}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-obsidian-surface border border-gold/20">
                  <div className="text-xl mb-1">🌿</div>
                  <h4 className="font-display font-bold text-gold text-sm mb-1">
                    {isEn ? "Locally Sourced" : "Vifaa vya Ndani"}
                  </h4>
                  <p className="text-earth-cream/70 text-xs font-body">
                    {isEn
                      ? "Natural materials gathered or woven directly in the Arusha and Meru regions."
                      : "Vifaa asilia vilivyovunwa au kusukwa moja kwa moja mkoani Arusha."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-surface border border-gold/20">
                  <div className="text-xl mb-1">⚖️</div>
                  <h4 className="font-display font-bold text-gold text-sm mb-1">
                    {isEn ? "Fair Trade Certified" : "Biashara ya Haki"}
                  </h4>
                  <p className="text-earth-cream/70 text-xs font-body">
                    {isEn
                      ? "Guaranteed fair wages set independently by the artisan cooperative."
                      : "Malipo ya haki yaliyopangwa na ushirika wenyewe wa mafundi."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-surface border border-gold/20">
                  <div className="text-xl mb-1">📦</div>
                  <h4 className="font-display font-bold text-gold text-sm mb-1">
                    {isEn ? "Tamper-Evident Seal" : "Lebo ya Usalama"}
                  </h4>
                  <p className="text-earth-cream/70 text-xs font-body">
                    {isEn
                      ? "Each package is sealed with an individual QR-coded Afriverse label for delivery."
                      : "Kila kifurushi hufungwa kwa lebo rasmi ya QR ya Afriverse kabla ya kusafirishwa."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Recommended Uses */}
          {activeTab === "uses" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="section-label">{isEn ? "Versatile Styling & Usage" : "Matumizi"}</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-earth-cream mt-1 mb-3">
                  {isEn ? "Recommended Uses for Collectors" : "Jinsi ya Kutumia na Kupamba"}
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {product.recommendedUses.map((use, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-obsidian-surface border border-gold/20 flex flex-col justify-between">
                    <div className="text-gold font-bold text-xs uppercase tracking-wider mb-2">
                      {isEn ? `Recommendation #0${i + 1}` : `Matumizi #0${i + 1}`}
                    </div>
                    <p className="font-body font-semibold text-earth-cream text-sm leading-relaxed">
                      {use[lang]}
                    </p>
                    <div className="mt-4 pt-3 border-t border-gold/10 text-[11px] text-green-400 flex items-center gap-1">
                      <Check size={12} />
                      {isEn ? "Stylist approved" : "Imependekezwa"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Cost Breakdown (Task 09 Transparent Cost Breakdown) */}
          {activeTab === "cost" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="max-w-2xl">
                <span className="section-label">{isEn ? "Radical Transparency" : "Uwazi wa Bei"}</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-earth-cream mt-1 mb-2">
                  {isEn ? "Where Does Your Money Go?" : "Pesa Yako Inaenda Wapi?"}
                </h3>
                <p className="text-earth-cream/70 text-xs sm:text-sm font-body">
                  {isEn
                    ? "AFRIVERSE operates with 100% price transparency. Below is the exact allocation of this purchase price."
                    : "AFRIVERSE inafanya kazi kwa uwazi kamili wa bei. Hapa chini ni mgawanyo halisi wa ununuzi huu."}
                </p>
              </div>

              <div className="grid sm:grid-cols-4 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-gold/10 border-2 border-gold shadow-gold text-center">
                  <div className="font-display font-black text-4xl text-gold mb-1">
                    {cost.artisanDirectPercent}%
                  </div>
                  <div className="text-xs font-body font-bold text-earth-cream uppercase mb-2">
                    {isEn ? "Artisan Payout" : "Malipo ya Msanii"}
                  </div>
                  <p className="text-[11px] text-earth-cream/70 font-body">
                    {isEn
                      ? "Direct mobile money payout (M-Pesa) sent straight to the creator upon order."
                      : "Pesa ya moja kwa moja inayolipwa kwa msanii kupitia M-Pesa."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-obsidian-surface border border-gold/20 text-center">
                  <div className="font-display font-bold text-3xl text-earth-cream mb-1">
                    {cost.materialsPercent}%
                  </div>
                  <div className="text-xs font-body font-bold text-earth-cream/80 uppercase mb-2">
                    {isEn ? "Raw Materials" : "Vifaa Asilia"}
                  </div>
                  <p className="text-[11px] text-earth-cream/60 font-body">
                    {isEn
                      ? "Organic cotton, glass beads, volcanic pigments, and local botanical washes."
                      : "Gharama za ununuzi wa shanga, vitambaa au udongo asilia."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-obsidian-surface border border-gold/20 text-center">
                  <div className="font-display font-bold text-3xl text-earth-cream mb-1">
                    {cost.logisticsPercent}%
                  </div>
                  <div className="text-xs font-body font-bold text-earth-cream/80 uppercase mb-2">
                    {isEn ? "Logistics & Eco Box" : "Usafirishaji & Kasha"}
                  </div>
                  <p className="text-[11px] text-earth-cream/60 font-body">
                    {isEn
                      ? "Local Boda Boda dispatch fee and Afriverse tamper-proof luxury packaging."
                      : "Nauli ya Boda Boda Arusha na lebo rasmi ya kufunga boksi."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-obsidian-surface border border-gold/20 text-center">
                  <div className="font-display font-bold text-3xl text-earth-cream mb-1">
                    {cost.communityFundPercent}%
                  </div>
                  <div className="text-xs font-body font-bold text-earth-cream/80 uppercase mb-2">
                    {isEn ? "Community Fund" : "Mfuko wa Jamii"}
                  </div>
                  <p className="text-[11px] text-earth-cream/60 font-body">
                    {isEn
                      ? "Reinvested into youth craft apprenticeships in Arusha craft centers."
                      : "Inarejeshwa kufundisha vijana ufundi wa mikono huko Arusha."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Customer Product Reviews Component (Task 04) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ProductReviews product={product} lang={lang} />
      </section>

      {/* AI Recommendation Engine Module (Task 06) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <AIRecommendations
          currentProductId={product.id}
          lang={lang}
          currency={currency}
          title={isEn ? "You May Also Love (AI Heritage Match)" : "Kazi Nyingine Zinazolingana (AI)"}
          subtitle={isEn ? `AI selected these authentic Arusha crafts based on ${product.artisanName}'s style and materials.` : `Uchaguzi wa AI kulingana na kazi za ${product.artisanName}.`}
        />
      </section>

      <Footer lang={lang} />
    </main>
  );
}

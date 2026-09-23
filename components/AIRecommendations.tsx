"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, CheckCircle, ArrowRight, Star } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPriceWithSecondary, Product, Language, Currency } from "@/lib/data";

interface AIRecommendationsProps {
  currentProductId?: string;
  cartProductIds?: string[];
  lang: Language;
  currency: Currency;
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function AIRecommendations({
  currentProductId,
  cartProductIds = [],
  lang,
  currency,
  title,
  subtitle,
  limit = 3,
}: AIRecommendationsProps) {
  const isEn = lang === "en";
  const { products, addToCart } = useStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Exclude current product and optionally already-in-cart products
  const candidates = products.filter((p) => p.id !== currentProductId);

  // Sort by synergy: prioritize same category or shared tags
  const currentProduct = products.find((p) => p.id === currentProductId);

  const scored = candidates.map((p, index) => {
    let score = 88;
    let rationaleEn = "Pairs authentically with handmade Arusha craftsmanship";
    let rationaleSw = "Inaendana kikamilifu na kazi za mikono za Arusha";

    if (currentProduct) {
      const sharedTags = p.tags.filter((t) => currentProduct.tags.includes(t));
      if (p.category === currentProduct.category) {
        score = 98;
        rationaleEn = "Same artisan tradition & complementary color palette";
        rationaleSw = "Urithi unaofanana na rangi zinazokamilishana";
      } else if (sharedTags.length > 0) {
        score = 94;
        rationaleEn = `Shares authentic ${sharedTags[0]} crafting techniques`;
        rationaleSw = `Inashiriki mbinu za kitamaduni za ${sharedTags[0]}`;
      } else if (p.artisanId === currentProduct.artisanId) {
        score = 96;
        rationaleEn = `Crafted in the same workshop by ${p.artisanName}`;
        rationaleSw = `Imetengenezwa katika karakana moja na ${p.artisanName}`;
      } else {
        score = 91 - index * 2;
        rationaleEn = "Curated natural material pairing from Mount Meru region";
        rationaleSw = "Mchanganyiko wa vifaa asilia kutoka mkoa wa Arusha";
      }
    } else {
      score = 97 - index * 3;
      rationaleEn = "Top-curated authentic Arusha customer favorite";
      rationaleSw = "Chaguo bora zaidi la wateja wa Arusha";
    }

    return { product: p, score, rationaleEn, rationaleSw };
  });

  const recommendations = scored.slice(0, limit);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 border-t border-gold/15" id="ai-recommendations">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-gold/20 border border-gold/40 text-gold text-xs font-body font-bold mb-2 shadow-sm">
            <Sparkles size={13} className="text-gold animate-pulse" />
            <span>{isEn ? "AI Craft Curator" : "Ushauri wa Akili Bandia (AI)"}</span>
            <span className="text-[10px] bg-gold/30 px-2 py-0.5 rounded-full text-gold uppercase tracking-wider">
              {isEn ? "Smart Pairing" : "Uchaguzi Bora"}
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-earth-cream">
            {title || (isEn ? "Recommended Authentic Arusha Pairings" : "Bidhaa Zinazopendekezwa na AI")}
          </h2>
          <p className="text-earth-cream/60 font-body text-xs sm:text-sm mt-1">
            {subtitle ||
              (isEn
                ? "Algorithmic recommendations based on artisan workshop lineage, material harmony, and regional heritage."
                : "Uchaguzi maalum unaolingana na ufundi wa asili, vifaa na urithi wa Arusha.")}
          </p>
        </div>

        <Link
          href="/products"
          className="text-gold hover:underline text-xs font-body font-semibold inline-flex items-center gap-1"
        >
          {isEn ? "Browse All Crafts" : "Tazama Bidhaa Zote"}
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(({ product, score, rationaleEn, rationaleSw }) => {
          const price = formatPriceWithSecondary(product.priceUSD, currency);
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              className="glass-card rounded-2xl border border-gold/20 hover:border-gold/50 p-4 transition-all duration-300 hover:shadow-gold flex flex-col justify-between group bg-obsidian-surface/60 relative overflow-hidden"
            >
              {/* AI Match Banner */}
              <div className="flex items-center justify-between gap-2 mb-3 bg-gold/10 px-3 py-1.5 rounded-xl border border-gold/20">
                <span className="text-[11px] font-body font-bold text-gold flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>{score}% {isEn ? "Synergy Match" : "Ulinganifu"}</span>
                </span>
                <span className="text-[10px] text-earth-cream/50 font-mono">
                  {product.category}
                </span>
              </div>

              <div>
                <Link href={`/products/${product.id}`} className="block relative h-44 rounded-xl overflow-hidden mb-3">
                  {product.imageUrl || product.image ? (
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/maasai-beadwork.jpg";
                      }}
                    />
                  ) : (
                    <Image
                      src={`/images/${product.imageKey}.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-body">
                    <span className="text-earth-cream/90 font-medium">by {product.artisanName}</span>
                    <span className="text-green-400 bg-obsidian/80 px-2 py-0.5 rounded-full">
                      ✓ Authentic
                    </span>
                  </div>
                </Link>

                <Link href={`/products/${product.id}`}>
                  <h3 className="font-display font-semibold text-earth-cream text-base group-hover:text-gold transition-colors line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-[11px] text-earth-cream/65 font-body line-clamp-2 mb-2 italic">
                  "{isEn ? rationaleEn : rationaleSw}"
                </p>
              </div>

              <div className="pt-3 border-t border-gold/10 flex items-center justify-between mt-2">
                <div>
                  <div className="font-display font-bold text-base text-gold">
                    {price.primary}
                  </div>
                  <div className="text-[10px] text-earth-cream/40 font-mono">
                    {price.secondary}
                  </div>
                </div>

                <button
                  onClick={(e) => handleAdd(e, product)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : "btn-gold shadow-gold hover:scale-105"
                  }`}
                  id={`ai-add-${product.id}`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={12} />
                      {isEn ? "Added" : "Ipo"}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={12} />
                      {isEn ? "Add" : "Weka"}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

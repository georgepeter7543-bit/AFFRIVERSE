"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Truck, CheckCircle, BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { formatPriceWithSecondary } from "@/lib/data";
import type { Product, Language, Currency } from "@/lib/data";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  lang?: Language;
  currency?: Currency;
}

export default function ProductCard({ product, lang: propsLang, currency: propsCurrency }: ProductCardProps) {
  const store = useStore();
  const lang = propsLang || store.lang;
  const currency = propsCurrency || store.currency;
  const isEn = lang === "en";

  const [added, setAdded] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [liked, setLiked] = useState(false);

  const priceData = formatPriceWithSecondary(product.priceUSD, currency);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    store.addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
      : "5.0";

  // Dynamic image resolution
  const dynamicImageSrc =
    product.imageUrl ||
    product.image ||
    (product.imageKey ? `/images/${product.imageKey}.jpg` : "/images/maasai-beadwork.jpg");

  const isDirectImage = Boolean(
    product.imageUrl ||
    product.image ||
    dynamicImageSrc.startsWith("data:") ||
    dynamicImageSrc.startsWith("http") ||
    dynamicImageSrc.startsWith("blob:")
  );

  return (
    <div className="product-card glass-card rounded-2xl overflow-hidden border border-gold/15 hover:border-gold/40 group relative transition-all duration-300 hover:shadow-gold flex flex-col justify-between">
      <div>
        {/* Image Area */}
        <Link href={`/products/${product.id}`} className="block relative h-60 overflow-hidden cursor-pointer">
          {isDirectImage ? (
            <img
              src={dynamicImageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/maasai-beadwork.jpg";
              }}
            />
          ) : (
            <Image
              src={dynamicImageSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="img-overlay absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/20" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.featured && (
              <span className="bg-gold text-obsidian text-[10px] font-body font-bold px-2.5 py-0.5 rounded-full tracking-wide shadow">
                {isEn ? "★ Featured" : "★ Maarufu"}
              </span>
            )}
            {product.inStock ? (
              <span className="glass-dark text-green-400 text-[10px] font-body px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-green-400/20">
                <CheckCircle size={9} /> {isEn ? "In Stock" : "Ipo"}
              </span>
            ) : (
              <span className="glass-dark text-earth-cream/40 text-[10px] font-body px-2.5 py-0.5 rounded-full">
                {isEn ? "Out of Stock" : "Imekwisha"}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center text-earth-cream/70 hover:text-red-400 transition-colors z-10"
            title="Add to Wishlist"
          >
            <Heart size={14} className={liked ? "text-red-500 fill-red-500" : ""} />
          </button>

          {/* Category tag */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="glass-dark text-gold/90 text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full border border-gold/20">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="glass-dark text-gold text-[10px] font-body font-bold px-2 py-0.5 rounded-full border border-gold/20 flex items-center gap-1">
              <Star size={10} className="fill-gold" />
              <span>{avgRating}</span>
              {product.reviews && product.reviews.length > 0 && (
                <span className="text-earth-cream/50">({product.reviews.length})</span>
              )}
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4">
          <div className="mb-1">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-display font-semibold text-earth-cream text-base group-hover:text-gold transition-colors leading-tight line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>

          <p className="text-gold/70 text-xs font-body mb-2 font-medium">
            {isEn ? "by" : "na"} <span className="text-gold font-semibold">{product.artisanName}</span>
          </p>

          <p className="text-earth-cream/65 text-xs font-body leading-relaxed mb-3 line-clamp-2">
            {product.description[lang]}
          </p>

          {/* Cultural Heritage Quick Peek Toggle */}
          <button
            type="button"
            onClick={() => setShowStory(!showStory)}
            className="w-full mb-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gold/10 border border-gold/20 hover:border-gold/40 text-gold text-[11px] font-body transition-colors"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <BookOpen size={12} />
              {isEn ? "Artisan Story & Heritage" : "Historia & Utamaduni"}
            </span>
            {showStory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {/* Expandable Cultural Context */}
          {showStory && (
            <div className="mb-3 p-3 rounded-xl bg-obsidian-surface/90 border border-gold/20 text-xs font-body space-y-2 animate-fadeIn">
              <div>
                <span className="text-gold font-bold text-[10px] uppercase tracking-wider block">
                  {isEn ? "Artisan Lineage" : "Kazi ya Fundi"}
                </span>
                <p className="text-earth-cream/80 text-[11px] leading-relaxed mt-0.5">
                  {product.artisanStory[lang]}
                </p>
              </div>
              <div className="border-t border-gold/10 pt-1.5">
                <span className="text-gold font-bold text-[10px] uppercase tracking-wider block">
                  {isEn ? "Cultural Significance" : "Umuhimu wa Kitamaduni"}
                </span>
                <p className="text-earth-cream/80 text-[11px] leading-relaxed mt-0.5">
                  {product.culturalBackground[lang]}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-earth-cream/50 font-body bg-obsidian-surface px-2 py-0.5 rounded border border-gold/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price + CTA Row */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-gold/10">
          <div>
            <div className="font-display font-bold text-lg text-gold leading-tight">
              {priceData.primary}
            </div>
            <div className="text-earth-cream/50 text-[11px] font-body font-mono">
              {priceData.secondary}
            </div>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-body font-semibold transition-all ${
              added
                ? "bg-green-600 text-white shadow"
                : "btn-gold shadow-gold hover:scale-105"
            }`}
            id={`add-to-cart-${product.id}`}
          >
            {added ? (
              <>
                <CheckCircle size={13} />
                {isEn ? "Added!" : "Imeongezwa!"}
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                {isEn ? "Add to Cart" : "Ongeza"}
              </>
            )}
          </button>
        </div>

        {/* Shipping note */}
        <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-earth-cream/40 font-body">
          <span className="flex items-center gap-1">
            <Truck size={10} className="text-gold/70" />
            {isEn ? "Boda Boda Local / DHL Global" : "Boda Boda Arusha / DHL Kimataifa"}
          </span>
          <Link href={`/products/${product.id}`} className="text-gold/70 hover:text-gold underline font-semibold">
            {isEn ? "Details →" : "Maelezo →"}
          </Link>
        </div>
      </div>
    </div>
  );
}

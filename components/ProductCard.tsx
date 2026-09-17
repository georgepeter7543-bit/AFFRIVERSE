"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Truck, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { Product, Language, Currency } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  lang: Language;
  currency: Currency;
}

export default function ProductCard({ product, lang, currency }: ProductCardProps) {
  const isEn = lang === "en";
  const price = formatPrice(product.priceUSD, currency);

  return (
    <div className="product-card glass-card rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 group relative">
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`/images/${product.imageKey}.jpg`}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="img-overlay absolute inset-0" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gold text-obsidian text-[10px] font-body font-bold px-2.5 py-1 rounded-full tracking-wide">
              {isEn ? "Featured" : "Maarufu"}
            </span>
          )}
          {product.inStock ? (
            <span className="glass-dark text-green-400 text-[10px] font-body px-2.5 py-1 rounded-full flex items-center gap-1 border border-green-400/20">
              <CheckCircle size={9} /> {isEn ? "In Stock" : "Ipo"}
            </span>
          ) : (
            <span className="glass-dark text-earth-cream/40 text-[10px] font-body px-2.5 py-1 rounded-full">
              {isEn ? "Out of Stock" : "Imekwisha"}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark flex items-center justify-center text-earth-cream/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
          <Heart size={14} />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="glass-dark text-gold/70 text-[10px] font-body px-2 py-0.5 rounded border border-gold/15">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-earth-cream text-base group-hover:text-gold transition-colors leading-tight flex-1">
            {product.name}
          </h3>
        </div>

        <p className="text-gold/60 text-xs font-body mb-2">
          {isEn ? "by" : "na"} {product.artisanName}
        </p>

        <p className="text-earth-cream/50 text-xs font-body leading-relaxed mb-3 line-clamp-2">
          {product.description[lang]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-earth-cream/35 font-body bg-obsidian-surface px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA Row */}
        <div className="flex items-center justify-between pt-3 border-t border-obsidian-surface">
          <div>
            <div className="font-display font-bold text-xl text-gold">{price}</div>
            {currency === "TZS" && (
              <div className="text-earth-cream/30 text-xs font-body">${product.priceUSD.toLocaleString()} USD</div>
            )}
          </div>
          <button
            className="btn-gold flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body font-semibold"
            id={`add-to-cart-${product.id}`}
          >
            <ShoppingBag size={12} />
            {isEn ? "Add to Cart" : "Ongeza"}
          </button>
        </div>

        {/* Shipping note */}
        <div className="flex items-center gap-1.5 mt-2">
          <Truck size={11} className="text-earth-cream/30" />
          <span className="text-earth-cream/30 text-[10px] font-body">
            {isEn ? "Ships via DHL · M-Pesa accepted" : "Inatumwa DHL · M-Pesa inakubaliwa"}
          </span>
        </div>
      </div>
    </div>
  );
}

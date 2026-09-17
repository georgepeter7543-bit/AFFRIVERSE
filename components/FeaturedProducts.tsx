"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useStore } from "@/lib/store";
import { Product, Language, Currency } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  lang: Language;
  currency: Currency;
}

export default function FeaturedProducts({ lang, currency }: FeaturedProductsProps) {
  const { products } = useStore();
  const isEn = lang === "en";
  const featured = products.filter((p: Product) => p.featured).slice(0, 4);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-products">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-3">
            {isEn ? "Authentic Arusha Crafts" : "Ubora Uliochaguliwa"}
          </p>
          <h2 className="section-heading text-4xl lg:text-5xl">
            {isEn ? "Featured" : "Bidhaa"}
            <br />
            <span className="shimmer-text">{isEn ? "Arusha Products" : "Zilizochaguliwa"}</span>
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:flex items-center gap-2 btn-outline-gold px-6 py-3 rounded-full text-sm font-body font-semibold"
        >
          {isEn ? "View All" : "Ona Zote"}
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product: Product) => (
          <ProductCard key={product.id} product={product} lang={lang} currency={currency} />
        ))}
      </div>

      <div className="text-center mt-10 sm:hidden">
        <Link href="/products" className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-body">
          {isEn ? "View All Products" : "Ona Bidhaa Zote"}
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

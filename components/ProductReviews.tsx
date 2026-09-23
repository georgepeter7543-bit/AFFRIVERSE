"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Lock,
  User,
  LogIn,
  UserPlus,
  X,
  ThumbsUp,
  Award,
} from "lucide-react";
import type { Product, Language } from "@/lib/data";
import { useStore } from "@/lib/store";

interface ProductReviewsProps {
  product: Product;
  lang: Language;
}

const RATING_LABELS: Record<number, { en: string; sw: string }> = {
  1: { en: "Poor", sw: "Hauridhishi" },
  2: { en: "Fair", sw: "Wastani" },
  3: { en: "Good", sw: "Nzuri" },
  4: { en: "Very Good", sw: "Nzuri Sana" },
  5: { en: "Exceptional Authentic Craft", sw: "Kazi ya Kipekee ya Jadi" },
};

export default function ProductReviews({ product, lang }: ProductReviewsProps) {
  const isEn = lang === "en";
  const { addReview, currentUser, products } = useStore();

  // Fetch live product from store to ensure reactive updates when review is appended
  const liveProduct = products.find((p) => p.id === product.id) || product;
  const reviews = liveProduct.reviews || [];

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Author and email automatically populated from logged-in user
  const reviewerName = currentUser?.name || "";
  const reviewerEmail = currentUser?.email || "";

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

  // Distribution counts
  const counts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, pct };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!currentUser) {
      setFormError(isEn ? "You must be signed in to submit a review." : "Lazima uingie ili kutoa maoni.");
      return;
    }

    if (!comment.trim()) {
      setFormError(isEn ? "Please provide detailed comments." : "Tafadhali andika maelezo ya maoni.");
      return;
    }

    // Add review with Verified Purchase tag
    addReview(product.id, {
      author: reviewerName || (isEn ? "Verified Buyer" : "Mnunuzi Aliyethibitishwa"),
      rating,
      title: title.trim() || (isEn ? "Verified Customer Feedback" : "Maoni ya Mteja"),
      comment: comment.trim(),
      verified: true,
      location: isEn ? "Verified Purchase" : "Ununuzi Uliothibitishwa",
    });

    // Show success toast & card
    setSubmitted(true);
    setShowToast(true);
    setTitle("");
    setComment("");
    setRating(5);

    // Auto-dismiss toast and form after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4500);

    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 3500);
  };

  return (
    <div className="py-12 border-t border-gold/15 relative" id="customer-reviews">
      {/* ── TOAST NOTIFICATION ────────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm rounded-2xl bg-gradient-to-r from-emerald-950 to-[#121216] border-2 border-emerald-500/60 p-4 text-emerald-300 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400">
            <CheckCircle2 size={22} />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Review Published
            </h4>
            <p className="text-xs text-emerald-300 font-medium">
              Your review has been published!
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-emerald-400/60 hover:text-white p-1"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-body font-semibold mb-3">
            <Sparkles size={12} />
            {isEn ? "Verified Customer Feedback" : "Maoni ya Wateja Walioidhinishwa"}
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-earth-cream">
            {isEn ? "Customer Reviews" : "Maoni ya Wateja"}
          </h2>
          <p className="text-earth-cream/60 font-body text-sm mt-1">
            {isEn
              ? "Authentic reviews from collectors, cultural travelers, and verified buyers worldwide."
              : "Maoni ya kweli kutoka kwa wanunuzi na wageni duniani kote."}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-gold px-6 py-3 rounded-full text-xs font-body font-bold shadow-gold inline-flex items-center gap-2 self-start md:self-auto"
        >
          <MessageSquare size={14} />
          {showForm
            ? isEn ? "Cancel Review" : "Ghairi Maoni"
            : isEn ? "Write a Customer Review" : "Andika Maoni Yako"}
        </button>
      </div>

      {/* ── REVIEW SUMMARY BREAKDOWN BOX ─────────────────────────────────── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/20 mb-10 bg-gold/5 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 text-center md:border-r md:border-gold/15 md:pr-8">
          <div className="font-display font-extrabold text-5xl sm:text-6xl text-gold mb-2">
            {avgRating}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={`${
                  star <= Math.round(Number(avgRating))
                    ? "text-gold fill-gold"
                    : "text-earth-cream/20"
                }`}
              />
            ))}
          </div>
          <p className="text-earth-cream/70 text-xs font-body font-medium">
            {isEn ? `Based on ${totalReviews} verified reviews` : `Kutokana na maoni ${totalReviews}`}
          </p>
          <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-green-400 font-body font-semibold">
            <ShieldCheck size={13} />
            {isEn ? "100% Certified Authentic Buyers" : "Wanunuzi Halisi 100%"}
          </div>
        </div>

        <div className="md:col-span-8 space-y-2.5">
          {counts.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3 text-xs font-body">
              <span className="w-12 text-earth-cream/70 font-semibold flex items-center gap-1">
                <span>{stars}</span>
                <Star size={11} className="text-gold fill-gold" />
              </span>
              <div className="flex-1 h-2.5 bg-obsidian-surface rounded-full overflow-hidden border border-gold/15">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-gold rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-16 text-right text-earth-cream/60 font-mono text-[11px]">
                {count} ({pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── WRITE REVIEW / AUTHENTICATION GUARD SECTION ─────────────────── */}
      {showForm && (
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* SCENARIO A: USER IS NOT LOGGED IN */}
          {!currentUser ? (
            <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-amber-500/30 text-center shadow-2xl bg-[#141418] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mx-auto mb-4 shadow-lg">
                <Lock size={26} />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                {isEn ? "Authentication Required" : "Utambulisho Unahitajika"}
              </h3>
              <p className="text-earth-cream/80 text-sm font-body max-w-md mx-auto mb-6 leading-relaxed">
                Want to share your feedback? Please{" "}
                <Link
                  href={`/login?redirect=/products/${product.id}&mode=login`}
                  className="text-gold font-bold underline hover:text-amber-300 transition"
                >
                  Sign In
                </Link>{" "}
                or{" "}
                <Link
                  href={`/login?redirect=/products/${product.id}&mode=register`}
                  className="text-gold font-bold underline hover:text-amber-300 transition"
                >
                  Create an Account
                </Link>{" "}
                to leave a review.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/login?redirect=/products/${product.id}&mode=login`}
                  className="btn-gold px-6 py-3 rounded-full text-xs font-body font-bold shadow-gold inline-flex items-center gap-2"
                >
                  <LogIn size={15} />
                  {isEn ? "Sign In to Review" : "Ingia ili Kutoa Maoni"}
                </Link>
                <Link
                  href={`/login?redirect=/products/${product.id}&mode=register`}
                  className="px-6 py-3 rounded-full text-xs font-body font-bold border border-gold/40 text-gold hover:bg-gold/10 transition inline-flex items-center gap-2"
                >
                  <UserPlus size={15} />
                  {isEn ? "Create Account" : "Fungua Akaunti"}
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-earth-cream/50 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-green-400" />
                {isEn
                  ? "Only verified AFRIVERSE members can submit authenticated reviews for Arusha artisans."
                  : "Wanachama walioidhinishwa tu wanaweza kutoa maoni kwa mafundi wa Arusha."}
              </div>
            </div>
          ) : (
            /* SCENARIO B: USER IS LOGGED IN — PLAY STORE STYLE REVIEW FORM */
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-gold/40 shadow-2xl bg-obsidian-surface/90 relative overflow-hidden">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-[#121216] border border-emerald-500/50 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white">
                    {isEn ? "Your review has been published!" : "Maoni yako yamechapishwa rasmi!"}
                  </h4>
                  <p className="text-emerald-300/90 text-xs font-body max-w-sm mx-auto leading-relaxed">
                    {isEn
                      ? `Thank you, ${reviewerName}! Your feedback with Verified Purchase status is now visible to the global community.`
                      : `Asante ${reviewerName}! Maoni yako yenye uthibitisho sasa yanaonekana kwa jamii nzima.`}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      ✓ Verified Purchase Attached
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Play Store Header: User Identity Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141418] border border-gold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-700 flex items-center justify-center font-display font-bold text-black text-sm shadow-md">
                        {reviewerName ? reviewerName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-body font-bold text-white text-sm flex items-center gap-2">
                          <span>{reviewerName}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-green-400 bg-green-950/80 border border-green-500/40 px-2 py-0.5 rounded-full font-semibold">
                            <ShieldCheck size={11} /> Verified Account
                          </span>
                        </div>
                        <span className="text-earth-cream/50 text-xs font-body font-mono block">
                          {reviewerEmail || "authenticated@afriverse.co.tz"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gold font-body font-semibold">
                      <Award size={14} />
                      <span>{isEn ? "Verified Purchase Tag Enabled" : "Lebo ya Mnunuzi Halisi"}</span>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Play Store Interactive 1-5 Star Rating */}
                  <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
                    <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider">
                      {isEn ? "Tap to Rate this Craft (1–5 Stars) *" : "Gusa Kupima Bidhaa Hii (Nyota 1–5) *"}
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1.5 text-gold transition-transform hover:scale-125 focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            size={28}
                            className={`${
                              star <= (hoverRating || rating)
                                ? "fill-gold text-gold drop-shadow-[0_0_8px_#D4AF3780]"
                                : "text-earth-cream/20 hover:text-gold/40"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-body font-bold text-gold">
                        {rating} ★ — {RATING_LABELS[hoverRating || rating]?.[lang] || RATING_LABELS[hoverRating || rating]?.en}
                      </span>
                    </div>
                  </div>

                  {/* Review Headline & Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-1">
                        {isEn ? "Review Headline (Optional)" : "Kichwa cha Maoni (Si lazima)"}
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={isEn ? "e.g. Masterful Maasai beadwork & authentic Arusha craftsmanship" : "Mfano: Kazi nzuri sana ya mikono"}
                        className="w-full bg-[#141418] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-earth-cream font-body focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold text-gold uppercase tracking-wider mb-1">
                        {isEn ? "Your Feedback & Experience *" : "Maelezo Yako Kamili *" }
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={isEn ? "Describe the craft texture, cultural story, packaging, and delivery experience..." : "Eleza ubora wa kazi ya mikono, usafirishaji, na hisia zako..."}
                        className="w-full bg-[#141418] border border-white/15 rounded-xl p-4 text-sm text-earth-cream font-body focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                    <span className="text-[11px] text-earth-cream/60 flex items-center gap-1.5 self-start sm:self-auto">
                      <CheckCircle size={13} className="text-green-400" />
                      {isEn ? "Will be published with Verified Purchase badge" : "Itawekwa na alama ya Mnunuzi Halisi"}
                    </span>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 rounded-full text-xs font-body font-semibold text-earth-cream/70 hover:text-white transition"
                      >
                        {isEn ? "Cancel" : "Ghairi"}
                      </button>
                      <button
                        type="submit"
                        className="btn-gold px-8 py-3 rounded-full text-xs font-body font-bold shadow-gold flex items-center gap-2"
                      >
                        <ThumbsUp size={14} />
                        {isEn ? "Submit Review" : "Tuma Maoni"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── REVIEWS LIST ─────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-gold/15">
            <MessageSquare size={32} className="text-gold/40 mx-auto mb-2" />
            <p className="text-earth-cream/70 font-body text-sm">
              {isEn
                ? "No reviews yet. Be the first verified buyer to leave a review!"
                : "Bado hakuna maoni. Kuwa wa kwanza kutoa maoni!"}
            </p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-gold/15 hover:border-gold/30 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-display font-bold text-xs text-gold">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body font-bold text-earth-cream text-sm flex items-center gap-2">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-green-400 bg-green-950/60 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle size={10} />
                          {isEn ? "Verified Purchase" : "Ununuzi Uliothibitishwa"}
                        </span>
                      )}
                    </div>
                    {rev.location && (
                      <span className="text-earth-cream/40 text-[11px] font-body block">
                        {rev.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`${
                          star <= rev.rating ? "text-gold fill-gold" : "text-earth-cream/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-earth-cream/40 text-xs font-mono">{rev.date}</span>
                </div>
              </div>

              <h4 className="font-display font-semibold text-gold text-sm mb-1 mt-2">
                {rev.title}
              </h4>
              <p className="text-earth-cream/75 text-xs sm:text-sm font-body leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

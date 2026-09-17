"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight, Store, Package, CreditCard, Truck } from "lucide-react";
import type { Language } from "@/lib/data";

interface SellerOnboardingProps {
  lang: Language;
  compact?: boolean;
}

const steps = {
  en: [
    {
      icon: Store,
      title: "Create Your Shop",
      desc: "Register your artisan profile or business. Add your NIDA number, cooperative ID, or business license.",
      time: "5 minutes",
    },
    {
      icon: Package,
      title: "List Your Products",
      desc: "Upload photos and describe your crafts in English or Swahili. Our AI helps translate and optimize listings for global buyers.",
      time: "10 minutes",
    },
    {
      icon: CreditCard,
      title: "Connect Payments",
      desc: "Link your M-Pesa, Tigo Pesa, Airtel Money, or bank account. Receive international payments in TZS directly.",
      time: "3 minutes",
    },
    {
      icon: Truck,
      title: "Start Selling Globally",
      desc: "We handle customs documentation and connect you with DHL, FedEx, and Aramex for international shipping.",
      time: "Ongoing",
    },
  ],
  sw: [
    {
      icon: Store,
      title: "Unda Duka Lako",
      desc: "Jisajili wasifu wako wa ufundi au biashara. Ongeza nambari yako ya NIDA, kitambulisho cha ushirika, au leseni ya biashara.",
      time: "Dakika 5",
    },
    {
      icon: Package,
      title: "Orodhesha Bidhaa Zako",
      desc: "Pakia picha na elezea bidhaa zako kwa Kiingereza au Kiswahili. AI yetu husaidia kutafsiri na kuboresha orodha kwa wanunuzi wa kimataifa.",
      time: "Dakika 10",
    },
    {
      icon: CreditCard,
      title: "Unganisha Malipo",
      desc: "Unganisha M-Pesa, Tigo Pesa, Airtel Money, au akaunti yako ya benki. Pokea malipo ya kimataifa kwa TZS moja kwa moja.",
      time: "Dakika 3",
    },
    {
      icon: Truck,
      title: "Anza Kuuza Kimataifa",
      desc: "Tunashughulikia hati za forodha na kukuunganisha na DHL, FedEx, na Aramex kwa usafirishaji wa kimataifa.",
      time: "Inaendelea",
    },
  ],
};

export default function SellerOnboarding({ lang, compact = false }: SellerOnboardingProps) {
  const isEn = lang === "en";
  const [activeStep, setActiveStep] = useState(0);
  const stepsData = steps[lang];

  if (compact) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stepsData.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="glass-card rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Icon size={18} className="text-gold group-hover:text-obsidian transition-colors" />
                </div>
                <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center">
                  <span className="text-gold text-xs font-body font-bold">{i + 1}</span>
                </div>
              </div>
              <h4 className="font-display font-bold text-earth-cream mb-2">{step.title}</h4>
              <p className="text-earth-cream/50 text-sm font-body leading-relaxed mb-3">{step.desc}</p>
              <span className="text-gold/50 text-xs font-body">{step.time}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Steps List */}
      <div className="space-y-3">
        {stepsData.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === i;
          const isDone = i < activeStep;

          return (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              id={`seller-step-${i + 1}`}
              className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 ${
                isActive
                  ? "border-gold/50 bg-gold/5 shadow-gold"
                  : isDone
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-gold/10 glass-card hover:border-gold/25"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive ? "bg-gold shadow-gold" : isDone ? "bg-green-500/20" : "bg-obsidian-surface"
                }`}>
                  {isDone ? (
                    <CheckCircle size={20} className="text-green-400" />
                  ) : (
                    <Icon size={20} className={isActive ? "text-obsidian" : "text-earth-cream/40"} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-display font-bold text-base ${isActive ? "text-gold" : "text-earth-cream/70"}`}>
                      {step.title}
                    </h4>
                    <ChevronRight size={16} className={`flex-shrink-0 transition-transform ${isActive ? "text-gold rotate-90" : "text-earth-cream/20"}`} />
                  </div>
                  {isActive && (
                    <p className="text-earth-cream/55 text-sm font-body leading-relaxed mt-2 pr-4">{step.desc}</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="lg:sticky lg:top-24">
        <div className="glass-card rounded-3xl border border-gold/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center shadow-gold-lg">
              {(() => {
                const Icon = stepsData[activeStep].icon;
                return <Icon size={26} className="text-obsidian" />;
              })()}
            </div>
            <div>
              <div className="text-gold/60 text-xs font-body uppercase tracking-wider mb-1">
                {isEn ? `Step ${activeStep + 1} of 4` : `Hatua ${activeStep + 1} kati ya 4`}
              </div>
              <h3 className="font-display font-bold text-earth-cream text-xl">{stepsData[activeStep].title}</h3>
            </div>
          </div>
          <p className="text-earth-cream/60 font-body leading-relaxed mb-6">{stepsData[activeStep].desc}</p>

          <div className="flex items-center justify-between mb-6 text-sm">
            <span className="text-earth-cream/40 font-body">
              ⏱ {isEn ? "Estimated time:" : "Muda unaokadiriwa:"} <span className="text-gold">{stepsData[activeStep].time}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-earth-cream/30 font-body mb-2">
              <span>{isEn ? "Progress" : "Maendeleo"}</span>
              <span>{Math.round(((activeStep + 1) / 4) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-obsidian-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            {activeStep < 3 ? (
              <button
                onClick={() => setActiveStep((s) => Math.min(s + 1, 3))}
                className="flex-1 btn-gold py-3 rounded-xl text-sm font-body font-semibold"
              >
                {isEn ? "Continue →" : "Endelea →"}
              </button>
            ) : (
              <button className="flex-1 btn-gold py-3 rounded-xl text-sm font-body font-semibold">
                {isEn ? "Apply to Sell 🎉" : "Omba Kuuza 🎉"}
              </button>
            )}
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
                className="btn-outline-gold px-5 py-3 rounded-xl text-sm font-body"
              >
                ←
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

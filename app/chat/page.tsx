"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { ChatThread, ChatMessage } from "@/lib/data";
import { MessageSquare, Send, Phone, UserCheck, ShieldCheck, CheckCircle2, Truck, Package, Info, MapPin } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const { chatThreads, activeThreadId, setActiveThreadId, sendMessage, currentUser, lang, setLang, currency, setCurrency } = useStore();
  const isEn = lang === "en";

  const [inputMessage, setInputMessage] = useState("");

  const activeThread = chatThreads.find((t) => t.id === activeThreadId) || chatThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputMessage);
    setInputMessage("");
  };

  const sendPreset = (text: string) => {
    if (!activeThread) return;
    sendMessage(activeThread.id, text);
  };

  return (
    <main className="min-h-screen bg-obsidian text-earth-cream">
      <Navbar lang={lang} currency={currency} onLangChange={setLang} onCurrencyChange={setCurrency} />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-3">
            <MessageSquare size={14} className="text-gold" />
            <span className="text-gold text-xs font-body font-bold uppercase tracking-wider">
              Direct Artisan & Buyer Messenger
            </span>
          </div>
          <h1 className="section-heading text-3xl lg:text-4xl">
            Arusha In-App <span className="shimmer-text">Artisan Chat</span>
          </h1>
          <p className="text-earth-cream/70 font-body text-xs sm:text-sm max-w-lg mx-auto">
            Discuss delivery locations, custom Maasai shuka colors, package sealing, and Boda Boda rider pickups directly with Arusha craftspeople.
          </p>
        </div>

        {/* Chat Interface Grid */}
        <div className="glass-card rounded-3xl border-2 border-gold/30 shadow-luxury overflow-hidden grid lg:grid-cols-12 min-h-[560px]">
          {/* Threads Sidebar */}
          <div className="lg:col-span-4 border-r border-gold/20 p-4 space-y-3 bg-obsidian-surface/40">
            <div className="text-xs font-body font-bold text-gold uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
              <span>Active Artisan Threads</span>
              <span className="bg-gold/20 text-gold px-2 py-0.5 rounded-full font-mono text-[10px]">{chatThreads.length}</span>
            </div>

            {chatThreads.map((thread) => {
              const isActive = thread.id === activeThread.id;
              const lastMsg = thread.messages[thread.messages.length - 1];

              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isActive
                      ? "bg-gold/15 border-gold shadow"
                      : "glass-card border-gold/10 hover:border-gold/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-display font-bold text-earth-cream text-sm flex items-center gap-1.5">
                      {thread.artisanName}
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-gold font-mono">{lastMsg?.timestamp}</span>
                  </div>

                  <div className="text-xs text-gold/80 font-body font-medium truncate mb-1">{thread.topic}</div>
                  <div className="text-xs text-earth-cream/60 font-body truncate">{lastMsg?.text}</div>
                </button>
              );
            })}

            <div className="pt-4 border-t border-gold/15 px-2">
              <div className="text-[11px] text-earth-cream/60 font-body space-y-1">
                <div>💬 Active Role: <strong className="text-gold">{currentUser?.name || "Customer"}</strong></div>
                <div>📞 Arusha Hotline: <strong className="text-gold">+255754998882</strong></div>
              </div>
            </div>
          </div>

          {/* Main Chat Conversation View */}
          <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-obsidian/80">
            {/* Header */}
            <div className="border-b border-gold/20 pb-4 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-display font-bold text-obsidian text-sm shadow">
                  {activeThread.artisanName[0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-earth-cream flex items-center gap-2">
                    {activeThread.artisanName}
                    <span className="bg-green-900/80 text-green-300 text-[10px] px-2 py-0.5 rounded-full font-body font-bold border border-green-500/30">
                      Verified Arusha Artisan
                    </span>
                  </h3>
                  <div className="text-xs text-gold/80 font-body">Topic: {activeThread.topic} | Artisan Direct: +255768432109</div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="tel:+255768432109"
                  className="btn-outline-gold px-3.5 py-1.5 rounded-full text-xs font-body font-semibold flex items-center gap-1"
                >
                  <Phone size={12} /> Call Artisan
                </a>
                <Link
                  href="/delivery"
                  className="btn-gold px-3.5 py-1.5 rounded-full text-xs font-body font-bold flex items-center gap-1 shadow"
                >
                  <Truck size={12} /> Track Order
                </Link>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 max-h-[340px]">
              {activeThread.messages.map((msg) => {
                const isMe = msg.senderRole === currentUser?.role || msg.senderName === currentUser?.name;

                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className="text-[10px] text-earth-cream/50 mb-1 font-body">
                      {msg.senderName} ({msg.senderRole}) • {msg.timestamp}
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs font-body leading-relaxed shadow ${
                        isMe
                          ? "bg-gold text-obsidian font-semibold rounded-tr-none"
                          : "glass-card text-earth-cream border-gold/20 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Preset Buttons */}
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => sendPreset("Is the package boxed and sealed with the official Afriverse label?")}
                className="text-[11px] bg-obsidian-surface border border-gold/20 hover:border-gold/50 text-gold px-3 py-1.5 rounded-full font-body transition-all"
              >
                🏷️ Is package sealed with Afriverse label?
              </button>

              <button
                type="button"
                onClick={() => sendPreset("Please dispatch via Boda Boda to Njiro Complex, Arusha.")}
                className="text-[11px] bg-obsidian-surface border border-gold/20 hover:border-gold/50 text-gold px-3 py-1.5 rounded-full font-body transition-all"
              >
                🏍️ Dispatch via Boda Boda to Njiro
              </button>

              <button
                type="button"
                onClick={() => sendPreset("Thank you! I will receive the Boda Boda rider at the main gate.")}
                className="text-[11px] bg-obsidian-surface border border-gold/20 hover:border-gold/50 text-gold px-3 py-1.5 rounded-full font-body transition-all"
              >
                ✅ Ready for Boda Boda pickup
              </button>
            </div>

            {/* Input Box */}
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message to the Arusha artisan..."
                className="flex-1 bg-obsidian-surface border border-gold/30 rounded-2xl px-4 py-3 text-xs text-earth-cream placeholder-earth-cream/40 focus:outline-none focus:border-gold font-body"
              />
              <button
                type="submit"
                className="btn-gold px-5 py-3 rounded-2xl text-xs font-body font-bold flex items-center gap-1.5 shadow-gold"
              >
                <Send size={14} /> Send
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}

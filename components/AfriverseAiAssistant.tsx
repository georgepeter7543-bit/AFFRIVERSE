"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";

type Msg = { from: "assistant" | "user"; text: string };

const QUICK_ACTIONS = ["Explore Maasai Crafts", "Track My Order", "Meet Our Artisans", "Delivery Info"];

// ── Keyword-based fallback reply logic ──────────────────────────────────────
function getFallbackReply(text: string): string {
  const t = text.toLowerCase();

  // Join / buy / products
  if (t.includes("kujiunga") || t.includes("join") || t.includes("buy") || t.includes("product")) {
    return (
      "Welcome to AFRIVERSE! We offer authentic Tanzanian artisan crafts including hand-beaded Maasai jewelry, "
      + "colourful shuka textiles, carved wood art, and single-origin Mount Meru coffee. "
      + "Browse our product catalog or click \"Explore Maasai Crafts\" above to get started!"
    );
  }

  // Delivery / shipping / boda
  if (t.includes("delivery") || t.includes("shipping") || t.includes("boda")) {
    return (
      "We offer fast Boda Boda local delivery within Arusha (1-3 days) and international shipping worldwide (7-14 days). "
      + "Head to your Dashboard > Orders to track your delivery in real time, or share your order ID here!"
    );
  }

  // Artisan
  if (t.includes("artisan") || t.includes("maker") || t.includes("craftsman")) {
    return (
      "AFRIVERSE works with over 50 verified Arusha artisans, including Maasai beadwork masters, Meru woodcarvers, "
      + "and shuka weavers. Visit the Artisans page to read their stories and shop their collections directly!"
    );
  }

  // Order tracking
  if (t.includes("order") || t.includes("track") || t.includes("agiza")) {
    return (
      "To track your order, visit your Dashboard > Orders, or share your order ID (e.g. AFR-8882-XX) here "
      + "and I will pull the latest status for you right away!"
    );
  }

  // Price / cost
  if (t.includes("price") || t.includes("cost") || t.includes("bei")) {
    return (
      "All prices are shown in your selected currency (USD, TZS, EUR or GBP). "
      + "Use the currency switcher in the top navigation bar to change your preferred currency at any time."
    );
  }

  // Craft types
  if (t.includes("maasai") || t.includes("shuka") || t.includes("beadwork") || t.includes("coffee") || t.includes("wood")) {
    return (
      "Our top categories include Maasai Beadwork, Shuka Textiles, Mount Meru Fine Art, Carved Wood Sculptures, "
      + "and single-origin Arusha Coffee. Each piece is ethically sourced and artisan-certified!"
    );
  }

  // Default fallback
  return (
    "Jambo! I am your AFRIVERSE assistant. "
    + "How can I help you explore authentic Tanzanian crafts, connect with local artisans, or track your order today?"
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AfriverseAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "assistant",
      text: "Jambo! I am your AFRIVERSE AI Assistant. How can I help you discover authentic Arusha crafts, track deliveries, or connect with local artisans today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMsg = (from: Msg["from"], text: string) =>
    setMessages((p) => [...p, { from, text }]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    addMsg("user", text.trim());
    setInput("");
    setLoading(true);
    try {
      // Attempt an AI API call (replace URL/key as needed).
      // Falls back gracefully if the endpoint is unavailable.
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      addMsg("assistant", data.reply ?? getFallbackReply(text));
    } catch {
      // Always respond — never show a raw error to the user.
      addMsg("assistant", getFallbackReply(text));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Launcher Button ──────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#0F0F12] border-2 border-[#D4AF37] shadow-lg hover:shadow-[0_0_24px_#D4AF3766] transition-shadow"
        aria-label="Open AFRIVERSE AI Assistant"
      >
        <MessageSquare size={22} className="text-[#D4AF37]" />
        <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
      </button>

      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex flex-col w-[380px] h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 bg-[#0F0F12]">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F0F12] border-b border-[#D4AF37]/15">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <h2 className="text-sm font-semibold text-[#D4AF37] tracking-wide">AFRIVERSE AI Assistant</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2 px-3 pt-3 pb-1">
            {QUICK_ACTIONS.map((chip) => (
              <button
                key={chip}
                onClick={() => send(chip)}
                className="px-3 py-1 text-xs rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "assistant"
                      ? "bg-[#1E1E24] text-white rounded-tl-none"
                      : "bg-[#D4AF37] text-black font-medium rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1E1E24] rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-[#D4AF37]/15 bg-[#0F0F12]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about products, artisans, or delivery..."
              className="flex-1 rounded-full bg-[#1A1A20] border border-[#D4AF37]/25 text-sm text-white placeholder:text-white/30 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
            <button
              onClick={() => send(input)}
              disabled={loading}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37] hover:bg-[#c9a32f] disabled:opacity-50 transition"
            >
              <Send size={15} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

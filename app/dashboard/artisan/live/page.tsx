"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Camera, Mic, RotateCcw, Heart } from "lucide-react";

export default function ArtisanLiveStudio() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [pinnedProductId, setPinnedProductId] = useState<string>("");
  const [hearts, setHearts] = useState<number[]>([]);
  const heartIdRef = useRef(0);

  // Initialize camera on mount
  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (e) {
        console.error("Camera error", e);
      }
    }
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Simulated viewer count & chat when live
  useEffect(() => {
    if (!isLive) return;
    const viewerInterval = setInterval(() => {
      setViewerCount((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    const chatInterval = setInterval(() => {
      const msgs = [
        "Great piece!",
        "Love the colors!",
        "Where is this made?",
        "Can I get a custom size?",
        "🧡",
        "Amazing craftsmanship!",
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setChatMessages((prev) => [...prev, `Viewer${Math.floor(Math.random() * 1000)}: ${randomMsg}`]);
    }, 2500);
    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, [isLive]);

  const startLive = () => {
    if (!stream) return;
    const options = { mimeType: "video/webm; codecs=vp9" };
    const mr = new MediaRecorder(stream, options);
    const chunks: Blob[] = [];
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mr.onstop = () => {
      setRecordedChunks(chunks);
    };
    mr.start();
    setRecorder(mr);
    setIsLive(true);
  };

  const endLive = () => {
    recorder?.stop();
    setIsLive(false);
    // Download recorded video
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "artisan_live.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
    setRecorder(null);
    setRecordedChunks([]);
  };

  const toggleHeart = () => {
    const id = heartIdRef.current++;
    setHearts((prev) => [...prev, id]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 2000);
  };

  const closeStudio = () => {
    setIsLive(false);
    stream?.getTracks().forEach((t) => t.stop());
    router.push("/dashboard/artisan");
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F12] text-[#D4AF37] flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between p-3 bg-[#0F0F12] border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-xs font-bold text-[#0F0F12]">AK</div>
          <span className="font-medium">Amina Kessy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">LIVE</span>
          <span className="px-2 py-0.5 rounded-full bg-[#0F0F12] border border-[#D4AF37]/30 text-xs">{viewerCount} viewers</span>
        </div>
        <button onClick={closeStudio} className="p-1 hover:text-red-400"><X size={20} /></button>
      </div>

      {/* Video Container */}
      <div className="relative w-full flex-1 max-w-2xl" style={{ aspectRatio: "9 / 16" }}>
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
          <div className="flex gap-2">
            <button className="p-1 bg-[#0F0F12]/60 rounded-full hover:bg-[#0F0F12]/80"><Camera size={20} /></button>
            <button className="p-1 bg-[#0F0F12]/60 rounded-full hover:bg-[#0F0F12]/80"><Mic size={20} /></button>
            <button className="p-1 bg-[#0F0F12]/60 rounded-full hover:bg-[#0F0F12]/80"><RotateCcw size={20} /></button>
          </div>
          <button onClick={isLive ? endLive : startLive} className={`px-4 py-2 rounded-full text-sm font-bold ${isLive ? "bg-red-600 hover:bg-red-700" : "bg-[#D4AF37] text-[#0F0F12] hover:bg-[#c49f2e]"}`}>
            {isLive ? "End Live" : "Go Live"}
          </button>
        </div>

        {/* Heart Button */}
        <button onClick={toggleHeart} className="absolute right-2 top-2 p-1 bg-[#0F0F12]/60 rounded-full hover:bg-[#0F0F12]/80"><Heart size={24} className="text-pink-500" /></button>
        {/* Floating Hearts */}
        {hearts.map((id) => (
          <div key={id} className="absolute right-2 bottom-12 text-pink-500 text-2xl animate-float" style={{ animationDuration: "2s" }}>❤️</div>
        ))}

        {/* Chat Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent overflow-y-auto p-2 text-xs">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="mb-1">{msg}</div>
          ))}
        </div>
      </div>

      {/* Pinned Product Banner */}
      <div className="w-full max-w-2xl p-3 bg-[#0F0F12] border-t border-[#D4AF37]/30 flex items-center justify-between">
        <select value={pinnedProductId} onChange={(e) => setPinnedProductId(e.target.value)} className="bg-[#0F0F12] border border-[#D4AF37]/30 text-xs text-[#D4AF37] p-1 rounded">
          <option value="">Select product to pin</option>
          <option value="p1">Maasai Beaded Necklace – 65,000 TZS</option>
          <option value="p2">Wooden Carved Mask – 120,000 TZS</option>
        </select>
        {pinnedProductId && (
          <button className="px-3 py-1 bg-[#D4AF37] text-[#0F0F12] rounded text-xs font-bold">Buy Now</button>
        )}
      </div>
    </div>
  );
}

/* Tailwind animation for floating hearts */
/* Add this to your global CSS */
/* @keyframes floatUp { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-80px) scale(1.5); } } */
/* .animate-float { animation-name: floatUp; animation-timing-function: ease-out; } */

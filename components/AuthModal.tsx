"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function AuthModal({ isOpen, onClose, children }: AuthModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-card rounded-3xl p-8 border-2 border-[#D4AF37]/30 shadow-luxury space-y-6 bg-[#141418] relative max-w-lg w-full">
        {/* Accessible Close (X) Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-earth-cream/70 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 transition-all z-10"
          aria-label="Close auth portal"
          title="Close auth portal"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

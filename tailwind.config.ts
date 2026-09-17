import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F0CC6E",
          dark: "#9A7A2E",
          muted: "#C9A84C33",
        },
        tanzanite: {
          DEFAULT: "#1B2A6B",
          light: "#3D5AFE",
          deep: "#0D1640",
          muted: "#1B2A6B33",
        },
        obsidian: {
          DEFAULT: "#0D0D0D",
          light: "#1A1A1A",
          mid: "#252525",
          surface: "#2E2E2E",
        },
        earth: {
          DEFAULT: "#8B5E3C",
          light: "#C17F4A",
          dark: "#5C3D20",
          cream: "#F5F0E8",
          sand: "#E8DCC8",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #F0CC6E 50%, #C9A84C 100%)",
        "tanzanite-gradient": "linear-gradient(135deg, #0D1640 0%, #1B2A6B 50%, #3D5AFE 100%)",
        "obsidian-gradient": "linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%)",
        "luxury-gradient": "linear-gradient(135deg, #0D0D0D 0%, #1B2A6B 50%, #0D0D0D 100%)",
        "hero-overlay": "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 60%, rgba(13,13,13,0.95) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(201, 168, 76, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201, 168, 76, 0.25)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.4)",
        tanzanite: "0 4px 24px rgba(27, 42, 107, 0.4)",
        luxury: "0 20px 60px rgba(0,0,0,0.5)",
        card: "0 4px 20px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

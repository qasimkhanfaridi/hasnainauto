import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#0c0f17",
          900: "#121722",
          850: "#181e2b",
          800: "#20283a",
          750: "#293349",
          700: "#34415c",
        },
        graphite: {
          600: "#3b4761",
          500: "#526284",
          400: "#7c8ea8",
          300: "#a3b2cb",
          200: "#cbd5e6",
        },
        silver: {
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
        },
        red: {
          brand: "#ef4444",
          dark: "#dc2626",
          deep: "#991b1b",
          accent: "#f87171",
          light: "#fee2e2",
        },
        amber: {
          glow: "#ffbe1a",
          brand: "#e5a93c",
          vibrant: "#f59e0b",
          dark: "#b45309",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#128C7E",
          hover: "#20bd5a",
          light: "#dcf8c6",
        },
      },
      backgroundImage: {
        "carbon-mesh": "radial-gradient(#293349 1px, transparent 1px)",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(239,68,68,0.22), transparent 70%)",
        "red-glow-radial": "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.18) 0%, transparent 60%)",
        "card-gradient": "linear-gradient(145deg, rgba(32,40,58,0.85) 0%, rgba(18,23,34,0.95) 100%)",
        "metallic-sheen": "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        "red-racing": "linear-gradient(90deg, #dc2626, #ef4444, #f87171)",
      },
      boxShadow: {
        "red-glow": "0 0 25px -4px rgba(239, 68, 68, 0.45)",
        "red-glow-sm": "0 0 14px -2px rgba(239, 68, 68, 0.35)",
        "whatsapp-glow": "0 0 25px -3px rgba(37, 211, 102, 0.45)",
        "card-dark": "0 10px 30px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
        "card-hover": "0 20px 40px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(239,68,68,0.45)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

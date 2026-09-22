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
        // ─── Light theme surface hierarchy ───
        surface: {
          50:  "#ffffff",
          100: "#f9fafb",
          200: "#f3f4f6",
          300: "#e5e7eb",
          400: "#d1d5db",
        },
        // ─── Carbon blacks (for text & dark elements) ───
        carbon: {
          950: "#0c0f17",
          900: "#111827",
          850: "#1f2937",
          800: "#374151",
          750: "#4b5563",
          700: "#6b7280",
        },
        // ─── Brand red ───
        red: {
          brand:  "#dc2626",
          dark:   "#b91c1c",
          deep:   "#991b1b",
          accent: "#ef4444",
          light:  "#fee2e2",
          soft:   "#fecaca",
        },
        // ─── Premium gold / yellow (as in reference) ───
        amber: {
          brand:   "#f59e0b",
          vibrant: "#d97706",
          glow:    "#fbbf24",
          dark:    "#92400e",
          light:   "#fef3c7",
        },
        // ─── WhatsApp green ───
        whatsapp: {
          DEFAULT: "#25D366",
          dark:    "#128C7E",
          hover:   "#20bd5a",
          light:   "#dcf8c6",
        },
        // ─── Neutral grays for typography ───
        gray: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // ─── Kept for backward compat in shadow utils ───
        silver: {
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
        },
      },
      backgroundImage: {
        "hero-red":      "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)",
        "hero-dark-red": "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
        "red-stripe":    "linear-gradient(90deg, #dc2626, #ef4444)",
        "gold-stripe":   "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)",
        "card-hover":    "linear-gradient(145deg, #fff5f5 0%, #ffffff 100%)",
      },
      boxShadow: {
        "sm-clean":     "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card":         "0 2px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-hover":   "0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(220,38,38,0.15)",
        "red-glow":     "0 0 20px -4px rgba(220, 38, 38, 0.40)",
        "red-glow-sm":  "0 0 12px -2px rgba(220, 38, 38, 0.30)",
        "header":       "0 2px 12px rgba(0,0,0,0.09)",
        "whatsapp-glow":"0 0 20px -3px rgba(37, 211, 102, 0.40)",
      },
      animation: {
        "pulse-slow":   "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle":"bounce 1.5s ease-in-out infinite",
        "slide-up":     "slideUp 0.3s ease-out",
        "fade-in":      "fadeIn 0.25s ease-out",
        "shimmer":      "shimmer 2s infinite linear",
      },
      keyframes: {
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

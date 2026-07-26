import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D6A4F",
          50: "#E8F5EE",
          100: "#C6E6D5",
          200: "#A3D7BC",
          300: "#80C8A3",
          400: "#5DB98A",
          500: "#2D6A4F",
          600: "#286047",
          700: "#22543D",
          800: "#1C4833",
          900: "#163C29",
        },
        secondary: {
          DEFAULT: "#1B4965",
          50: "#E6EFF5",
          100: "#C0D6E5",
          200: "#9ABDD5",
          300: "#74A4C5",
          400: "#4E8BB5",
          500: "#1B4965",
          600: "#18415B",
          700: "#14384F",
          800: "#112F43",
          900: "#0D2637",
        },
        accent: "#E9C46A",
        background: "#F8F9FA",
        surface: "#FFFFFF",
        "text-primary": "#1A1A2E",
        "text-secondary": "#6C757D",
        success: "#40916C",
        warning: "#E76F51",
        error: "#D62828",
        border: "#DEE2E6",
        muted: "#ADB5BD",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
        slideDown: "slideDown 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

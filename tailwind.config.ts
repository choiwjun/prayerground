import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF5",
        surface: "#FFFFFF",
        border: "#E0E0E0",
        foreground: "#1A1A1A",
        muted: "#666666",
        primary: {
          DEFAULT: "#8B4513",
          light: "#A0522D",
          dark: "#654321"
        },
        secondary: {
          DEFAULT: "#2E7D32",
          light: "#4CAF50",
          dark: "#1B5E20"
        },
        status: {
          error: "#D32F2F",
          warning: "#F57C00",
          success: "#388E3C",
          info: "#1976D2"
        }
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px"
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px"
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.07)",
        lg: "0 10px 15px rgba(0,0,0,0.1)"
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;

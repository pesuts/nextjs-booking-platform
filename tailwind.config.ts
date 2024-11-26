import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "ell": {
          950: "#20308B",
          900: "#25409C",
          800: "#3951A5",
          700: "#4C62AE",
          600: "#6074B7",
          500: "#7485C0",
          400: "#8796C9",
          300: "#9BA7D2",
          200: "#AFB9DB",
          100: "#C2CAE3",
          50: "#D6DBEC",
          25: "#EAECF5",
        },
        "form": "#667085",
        // "ell-900": "#25409C",
        // "ell-800": "#3951A5",
        // "ell-700": "#4C62AE",
        // "ell-600": "#6074B7",
        // "ell-500": "#7485C0",
        // "ell-400": "#8796C9",
        // "ell-300": "#9BA7D2",
        // "ell-200": "#AFB9DB",
        // "ell-100": "#C2CAE3",
        // "ell-50": "#D6DBEC",
        // "ell-25": "#EAECF5",
      },
    },
  },
  plugins: [],
} satisfies Config;

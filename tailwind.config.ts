import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Warm paper + ink palette for a printed-journal feel.
        ink: {
          DEFAULT: "#23201b",
          soft: "#555047",
          faint: "#8c857a",
        },
        paper: {
          DEFAULT: "#f7f3ea",
          panel: "#efe9dc",
          line: "#e0d8c8",
        },
        accent: {
          DEFAULT: "#8a3a2c",
          soft: "#e7d6c8",
        },
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        reading: "38rem",
        feed: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;

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
        // Aged paper + ink palette, like a yellowed old book.
        ink: {
          DEFAULT: "#211c14",
          soft: "#4a4334",
          faint: "#8a7d63",
        },
        paper: {
          DEFAULT: "#ece2c9",
          panel: "#e3d8bb",
          line: "#cdbf9d",
        },
        accent: {
          DEFAULT: "#8a3a2c",
          soft: "#dcc9ad",
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

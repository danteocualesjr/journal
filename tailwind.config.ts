import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#1f2430",
          soft: "#4b5160",
          faint: "#8a90a0",
        },
        paper: {
          DEFAULT: "#fbfaf7",
          panel: "#f3f1ec",
          line: "#e7e4dc",
        },
        accent: {
          DEFAULT: "#b4632f",
          soft: "#e9d8c8",
        },
      },
    },
  },
  plugins: [],
};

export default config;

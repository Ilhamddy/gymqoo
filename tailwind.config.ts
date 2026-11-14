import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        surface: "#11131A",
        surfaceHover: "#181B26",
        borderDark: "#232738",
        brand: {
          neon: "#CCFF00", // Athletic Volt / Electric Lime
          neonHover: "#B8E600",
          cyan: "#00F0FF",
          red: "#FF334B",
          amber: "#FFB020",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

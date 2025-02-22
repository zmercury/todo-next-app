import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#f0e7db",
        dark: "#2c2b3c",
        accent: "#ff6f61",
        textLight: "#4a4a4a",
        textDark: "#d4d4d4",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;

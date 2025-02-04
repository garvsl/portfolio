import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        garvFont: ["var(--garv-font)"],
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        containerClamp: "clamp(1.5rem,2.3vw,3rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;

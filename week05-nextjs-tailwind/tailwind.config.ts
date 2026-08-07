import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 22px 50px -28px rgb(15 23 42 / 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

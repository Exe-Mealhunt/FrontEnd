import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fffad6",
        secondary: "#fd5a03",
      },
      fontFamily: {
        cormorant: ["Cormorant", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bloom: {
          canvas:   '#faf8f5',
          surface:  '#f2ede6',
          primary:  '#8b2d3a',
          gold:     '#c4923a',
          text:     '#1a1208',
          muted:    '#6b5c4e',
          border:   '#e0d6cc',
          whatsapp: '#25d366',
        },
      },
    },
  },
  plugins: [],
};
export default config;

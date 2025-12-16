/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tutonaranja: "var(--color-tutonaranja)",
        tutogris: "var(--color-tutogris)", 
        oscuro: "var(--color-oscuro)",
        claro: "var(--color-claro)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-luckiest)",
      },
    },
  },
  plugins: [],
};
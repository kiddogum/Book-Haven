/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "PT-Serif": ["PT Serif", "serif"],
        "Daito-Normal": ["Daito Normal", "serif"],
      },
      colors: {
        primary: "#F9F8F6",
        secondary: "#0C1220",
      },
    },
  },
  plugins: [],
};

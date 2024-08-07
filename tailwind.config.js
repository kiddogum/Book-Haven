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
      screens: {
        lg: { max: "1439px" },
        md: { max: "1023px" },
        sm: { max: "767px" },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        topbar: "rgba(var(--topbar))",
        buttonHover: "rgba(var(--buttonHover))",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      backgroundImage: {
        "custom-gradient": "var(--custom-gradient)",
      },
      dropShadow: {
        slogan: "8px -8px 5px rgba(0, 0, 0, 0.6)",
        topbar: "0 3px 4px rgba(0, 0, 0, 0.3)",
      },
      height: {
        'card': '550px'
      }
    },
  },
  variants: {},
  plugins: [],
};

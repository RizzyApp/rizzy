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
      backgroundColor: {
        "glassy": "rgba(255, 255, 255, 0.5)"
      },
      boxShadow:{
        'inset-custom': '0 0 0 35px inset var(--c)'
      },
      borderImage: {
        'conic-custom': 'conic-gradient(var(--c) 0 0) 50% / calc(50% - 15px)'
      },
      clipPath:{
        'circle': 'circle()'
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

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
      aspectRatio: {
        '1/2': '1/2',
        '4/3': '4/3',
        '9/16': '9/16',
        '3/2': '3/2',
        '4/5': '4/5',
        '2/3': '2/3',
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



/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'topbarpink': '#BE467C',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #ED4170, #904B89 72%)',
      },
      dropShadow:
      {
        'slogan' : '8px -8px 5px rgba(0, 0, 0, 0.6)',
        'topbar': '0 3px 4px rgba(0, 0, 0, 0.3)'
      },
    },
  },
  plugins: [],
}


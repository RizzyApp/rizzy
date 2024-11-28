/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chat: {
          backgroundPrimary: "rgba(var(--chat-background-primary), <alpha-value>)",
          backgroundSecondary: "rgba(var(--chat-background-secondary), <alpha-value>)",
          bubbleSent: "rgba(var(--chat-bubble-sent), <alpha-value>)",
          bubbleReceived: "rgba(var(--chat-bubble-received), <alpha-value>)",
          textSent: "rgba(var(--chat-text-sent), <alpha-value>)",
          textReceived: "rgba(var(--chat-text-received), <alpha-value>)",
          "card-hover": "rgba(var(--chat-card-hover), <alpha-value>)",
        },
        text: {
          primary: "rgba(var(--text-primary), <alpha-value>)",
          secondary: "rgba(var(--text-secondary), <alpha-value>)",
          contrast: "rgba(var(--text-contrast), <alpha-value>)",
        },
        accent: {
          primary: "rgba(var(--accent-primary), <alpha-value>)",
          secondary: "rgba(var(--accent-secondary), <alpha-value>)",
        },
        button: {
          background: "rgba(var(--button-background), <alpha-value>)",
          hover: "rgba(var(--button-hover), <alpha-value>)",
          turnedOff: "rgba(var(--button-turned-off), <alpha-value>)",
          turnedOffHover: "rgba(var(--button-turned-off-hover), <alpha-value>)"
        },
        input: {
          background: "rgba(var(--input-background), <alpha-value>)",
          text: "rgba(var(--input-text), <alpha-value>)",
          placeholder: "rgba(var(--input-placeholder), <alpha-value>)",
        },
        border:{
          primary: "rgba(var(--border-primary-color),<alpha-value>)",
          secondary: "rgba(var(--border-secondary-color),<alpha-value>)",
        },
        topbar: "rgba(var(--topbar))",
        buttonHover: "rgba(var(--buttonHover))",
      },
      aspectRatio: {
        '1/2': '1 / 2',
        '4/3': '4 / 3',
        '9/16': '9 / 16',
        '3/2': '3 / 2',
        '4/5': '4 / 5',
        '2/3': '2 / 3',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      backgroundImage: {
        "custom-gradient": "var(--custom-gradient)",
      },
      backgroundColor: {
        "glassy": "rgba(255, 255, 255, 0.5)",
      },
      dropShadow: {
        slogan: "8px -8px 5px rgba(0, 0, 0, 0.6)",
        topbar: "0 3px 4px rgba(0, 0, 0, 0.3)",
      },
      height: {
        'card-big': '550px',
        'card-normal': '400px',
        'card-small': '200px',
        "11/12": '91%',
        '10/12': '84%'
      },
      textShadow: {
        'outline': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      },
    },
  },
  variants: {},
  plugins: [],
};

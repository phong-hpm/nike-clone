const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "nike-tg": ["nike-tg"],
      "nike-futura": ["nike-futura"],
    },
    extend: {
      flexGrow: {
        1: 1,
        2: 2,
      },
      screens: {
        sm: "600px",
        md: "768px",
        lg: "960px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
      },
      colors: {
        "gray-main": "#757575",
        "gray-middle": "#F7F7F7",
        "gray-light": "#cccccc",
        error: "#d43f21",
        accent: "#fa5400",
        success: "#128a09",
      },
      spacing: {
        15: "3.75rem",
        65: "16.25rem",
        94: "23.5rem",
        360: "90rem",
      },
      minWidth: {
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "8xl": "88rem",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      maxWidth: {
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "7.5xl": "84rem",
        "8xl": "88rem",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      maxHeight: {
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      zIndex: {
        1000: "1000",
        900: "900", // Navigation
        800: "800", // Modal
        700: "700", // Autofixed
        600: "600",
        500: "500", // Menu
        400: "400",
        300: "300",
        200: "200",
        100: "100",
      },
      transitionProperty: {
        transform: "transform",
        "border-color": "border-color",
        padding: "padding",
        height: "height",
        width: "width",
        background: "background",
        "z-index": "z-index",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      minHeight: {
        ...defaultTheme.spacing,
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("is-fixed", ".is-fixed &");
    },
  ],
};

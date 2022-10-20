const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        "gray-main": "#757575",
        "gray-light": "#cccccc",
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
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      maxHeight: {
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      zIndex: {
        1000: "1000", // AutoFixed
        900: "900", // Navigation
        800: "800",
        700: "700",
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
      addVariant("is-fixed", ".is-fixed &");
    },
  ],
};

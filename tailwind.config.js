const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-main": "#757575",
        "gray-light": "#cccccc",
      },
      spacing: {
        15: "3.75rem",
      },
      zIndex: {
        1000: "1000", // HeaderSub
        900: "900", // Header
        800: "800", // Product Header
      },
      transitionProperty: {
        transform: "transform",
        "border-color": "border-color",
        padding: "padding",
        height: "height",
        background: "background",
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

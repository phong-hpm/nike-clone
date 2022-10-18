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
        65: "16.25rem",
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
    },
  ],
};

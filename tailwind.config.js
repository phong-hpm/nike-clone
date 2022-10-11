/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-main": "#757575",
      },
      spacing: {
        15: "3.75rem",
      },
      transitionProperty: {
        "border-color": "border-color",
        padding: "padding",
      },
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
  },
  plugins: [],
};

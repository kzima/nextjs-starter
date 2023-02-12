/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-gray": colors.blueGray,
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};

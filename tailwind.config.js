/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          grey: "#e9f1f2",
          blue: "#5eacff",
          red: "#fccfcf",
        },
        dark: {
          grey: "#808080",
          blue: "#29276e",
          red: "#cc1d1d",
        },
      },
    },
  },
  plugins: [],
}

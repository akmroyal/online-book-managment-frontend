/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0D0842',
        'blackBG': '#F3F3F3',
        'favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Nunito Sans", "sans-serif"],
        'secondary': ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}


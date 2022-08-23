/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter'],
    },
    extend: {
      colors: {
        primary: '#2d2d2d',
        secondary: '#111315',
        navajo: '#ffdead',
        cornsilk: '#fff8dc'
			},
    },
  },
  plugins: [],
}

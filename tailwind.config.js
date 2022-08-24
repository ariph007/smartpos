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
        primary: '#111315',
        secondary: '#2d2d2d',
        danger: '#df4759',
        warning: '#ffc107',
        success: '#42ba96'
			},
    },
  },
  plugins: [],
}

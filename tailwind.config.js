/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
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
        success: '#42ba96',
        navajo: '#FFDEAD',
        chiffon: '#FFFACD'
			},
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hide': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}
			}
			)
		})
  ],
}

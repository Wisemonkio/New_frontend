/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#2684ff',
        },
        grey: {
          300: '#abadb1',
          400: '#85878D',
          500: '#626368',
          600: '#404145',
          700: '#222224',
          200: '#d3d4d6',
        },
        background: {
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


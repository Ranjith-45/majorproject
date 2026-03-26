/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          bg: '#0d1117',
          panel: '#161b22',
          border: '#30363d',
          neon: '#58a6ff', // GitHub blue
          accent: '#7ee787' // GitHub green (neon)
        }
      },
      boxShadow: {
        'neon': '0 0 10px rgba(88, 166, 255, 0.5), 0 0 20px rgba(88, 166, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#5A4FFF',
          'purple-light': '#EEF0FF',
          'purple-hover': '#4A3FEF',
          yellow: '#B88A1E',
          'yellow-light': '#FFF4D6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

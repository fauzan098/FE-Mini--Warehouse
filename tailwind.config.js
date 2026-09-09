/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'monday-blue': '#1053D5',
        'monday-black': '#292D32',
        'monday-gray': '#6A7686',
        'monday-border': '#E8E8E8',
        'monday-red': '#FF5070',
        'monday-background': '#F3F5F9',
        'monday-gray-background': '#F3F3F3',
        'monday-lime-green': '#CBEE5A',
        'monday-lime-green-char': '#DEFF6E',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {

    extend: {
      screens: {
        'ipad': '900px'
      },
      width: {
        tabauou: 'calc(15vw - 55px)'
      },
      colors: {
        'fbblue': '#1877f2',
        'unactive': '#6F7174',
      },
      boxShadow: {
        'fb': '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
      },
    },
    plugins: [],
  }
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      zIndex: {
        "100": 100,
        "10": 10,
      }
    },
  },
  plugins: [],
}

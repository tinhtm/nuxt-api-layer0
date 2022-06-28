module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '480px',
      'md': '640px',
      'lg': '880px',
      'xl': '1280px',
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          chicken: '#e11d48',
          startup: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}

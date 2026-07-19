/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#64748B',
        surface: '#F8FAFC',
        line: '#E2E8F0',
        brand: '#2563EB',
        'brand-dark': '#1D4ED8',
      },
    },
  },
  plugins: [],
}

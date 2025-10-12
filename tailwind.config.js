/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        card: 'var(--card)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)'
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
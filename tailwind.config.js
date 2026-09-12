/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        volt: {
          100: '#f2ffd1',
          200: '#e6ffa3',
          300: '#d6ff66',
          400: '#c3f83f',
          500: '#a8e81f',
          600: '#86c410',
        },
        aqua: {
          300: '#6ff2d4',
          400: '#34e0bb',
          500: '#14c4a3',
        },
        iris: {
          300: '#b3a6ff',
          400: '#8b7bff',
          500: '#6d5cf0',
        },
        ink: {
          700: '#1a1d24',
          800: '#12151b',
          900: '#0b0d12',
          950: '#06070a',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'var(--font-display)',
          'Inter Tight',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        'float-slow': 'float 22s ease-in-out infinite',
        orb: 'orb 18s ease-in-out infinite',
        marquee: 'marquee 45s linear infinite',
        'marquee-rev': 'marquee-rev 55s linear infinite',
        shimmer: 'shimmer 3.2s linear infinite',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 22s linear infinite',
        rise: 'rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) backwards',
        fade: 'fade 0.6s ease-out backwards',
        bar: 'bar 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        blink: 'blink 1.6s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        orb: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.95)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        rise: {
          from: { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bar: {
          from: { transform: 'scaleY(0.02)' },
          to: { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0.25' },
        },
      },
    },
  },
  plugins: [],
}

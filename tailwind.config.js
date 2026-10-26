/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F3EDE4',
          300: '#EAE0D3',
          400: '#D6C6B4',
        },
        blush: {
          50: '#FFF7F8',
          100: '#FDF2F3',
          200: '#F7DFE1',
          300: '#E8B4B8',
          400: '#DC999E',
        },
        rosewood: {
          400: '#D49498',
          500: '#C28285',
          600: '#9E5A63',
          700: '#7D3C46',
          800: '#5C2831',
          900: '#361F25',
          950: '#231217',
        },
        lavenderdust: {
          50: '#FBF9FD',
          100: '#F6F2F8',
          200: '#EDE4F0',
          300: '#DDD0E6',
          400: '#C5B1D3',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft-glow': '0 0 35px -5px rgba(232, 180, 184, 0.35)',
        'paper': '0 4px 25px -4px rgba(54, 31, 37, 0.08), 0 2px 10px -2px rgba(54, 31, 37, 0.04)',
        'paper-lg': '0 12px 40px -8px rgba(54, 31, 37, 0.12), 0 4px 16px -4px rgba(54, 31, 37, 0.06)',
        'wax': '0 3px 12px rgba(125, 60, 70, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

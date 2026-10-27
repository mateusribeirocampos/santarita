/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2B2420',
          soft: '#6B6155',
        },
        parchment: {
          DEFAULT: '#F6F1E4',
          dim: '#EFE7D4',
        },
        wine: {
          DEFAULT: '#6E1F2B',
          dark: '#541620',
          light: '#F3E4E2',
        },
        gold: {
          DEFAULT: '#96702F',
          light: '#E9DCC0',
        },
        line: '#DDD2B8',
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '3px',
      },
    },
  },
  plugins: [],
};

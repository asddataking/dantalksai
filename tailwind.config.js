/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          dark: '#5548C9',
        },
        secondary: {
          DEFAULT: '#9363f9',
          dark: '#734dd2',
        },
        accent: '#00bcd4',
      },
      boxShadow: {
        glow: '0 0 20px rgba(108, 99, 255, 0.5)',
      },
    },
  },
  plugins: [],
};

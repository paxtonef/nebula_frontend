/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefaff',
          100: '#d9f2ff',
          200: '#b8e8ff',
          300: '#85d9ff',
          400: '#4cc3ff',
          500: '#1aa7ff',
          600: '#0086f0',
          700: '#006ccc',
          800: '#0059a7',
          900: '#064b87',
          950: '#042f55',
        },
        secondary: {
          50: '#fdf2ff',
          100: '#fae5ff',
          200: '#f5cbff',
          300: '#f0a0ff',
          400: '#e767ff',
          500: '#d935ff',
          600: '#c217eb',
          700: '#a60cc2',
          800: '#89109e',
          900: '#701181',
          950: '#4a0059',
        },
        accent: {
          50: '#efffef',
          100: '#d7ffd9',
          200: '#b2ffb7',
          300: '#79ff83',
          400: '#3dff4a',
          500: '#14f024',
          600: '#05d115',
          700: '#07a316',
          800: '#0c8018',
          900: '#0e6a19',
          950: '#003c09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

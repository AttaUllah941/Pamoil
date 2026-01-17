/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5ca',
          300: '#8fd1a6',
          400: '#5ab47a',
          500: '#36995a',
          600: '#287a48',
          700: '#22623b',
          800: '#1f4e32',
          900: '#1a412a',
        },
        herbal: {
          50: '#faf8f3',
          100: '#f4efe0',
          200: '#e7dcc0',
          300: '#d6c299',
          400: '#c2a570',
          500: '#b08d4f',
          600: '#9d7a44',
          700: '#82623a',
          800: '#6a5034',
          900: '#58432d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: {
            50: '#e6f3ff',
            100: '#cce7fd',
            200: '#99cfec',
            300: '#66b8db',
            400: '#33a0ca',
            500: '#0088b9',
            600: '#007ab0',
            700: '#006c9e',
            800: '#005d8c',
            900: '#004f7a',
          },
          sky: '#e0f7fa',
          skyLight: '#f3fbfc',
          navy: '#1a365d',
          error: '#ff8fab'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backdropBlur: {
        xs: '1px',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      screens: {
        'xs': '480px',   // Pantallas muy pequeñas
        'sm': '640px',   // Teléfonos
        'md': '768px',   // Tablets
        'lg': '1024px',  // Escritorio pequeño
        'xl': '1280px',  // Escritorio grande
        '2xl': '1536px', // Monitores 4K
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
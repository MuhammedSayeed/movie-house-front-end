/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        blob: 'blob 7s infinite',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(260deg, transparent, #1a204438, #111832)'
      },
      colors: {
        'primary': '#1c163d',
        'second': '#6366F1',
        'second-dark': '#6e4be9',
        'second-extra-dark': '#5e3ed4',

      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // for Internet Explorer and Edge
          'scrollbar-width': 'none',   // for Firefox
        },
      });
    },
    require("tailwindcss-animate")
  ],
};

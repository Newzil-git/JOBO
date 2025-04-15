/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'raw': '(max-aspect-ratio: 9/16)'},
        'mobile-landscape': {'raw': '(min-aspect-ratio: 9/16)'},
      },
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        secondary: {
          DEFAULT: '#2196F3',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #4CAF50, #2196F3)',
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          500: '#4CAF50',
          600: '#43A047'
        }
      }
    }
  }
}
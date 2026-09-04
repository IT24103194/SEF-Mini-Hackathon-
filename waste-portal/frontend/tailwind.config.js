/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1F4B3F',
          dark: '#183B31',
          light: '#2A5F4F',
        },
        turmeric: {
          DEFAULT: '#E8A33D',
          dark: '#D4921F',
          light: '#F0B657',
        },
        terracotta: '#C9543A',
        paper: {
          DEFAULT: '#F1F4EE',
          dark: '#1A1F1E',
        },
        mist: {
          DEFAULT: '#D8E0D3',
          dark: '#2A3532',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#F8F9FA',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(31, 75, 63, 0.3)',
        'glow-yellow': '0 0 20px rgba(232, 163, 61, 0.3)',
      },
    },
  },
  plugins: [],
};
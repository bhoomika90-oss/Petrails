/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#080A0B',
        surface: {
          DEFAULT: '#111416',
          elevated: '#181C1E',
          higher: '#22272B',
          border: '#1F2428',
          borderLight: '#2D343A'
        },
        brand: {
          teal: '#19C3AE',
          tealDark: '#139C8B',
          spruce: '#0D7266',
          tealGlow: 'rgba(25, 195, 174, 0.15)',
          ivory: '#F4EFE6',
          ivoryMuted: '#D8D1C5',
        },
        risk: {
          low: '#10B981',
          lowBg: 'rgba(16, 185, 129, 0.12)',
          lowBorder: 'rgba(16, 185, 129, 0.3)',
          medium: '#F59E0B',
          mediumBg: 'rgba(245, 158, 11, 0.12)',
          mediumBorder: 'rgba(245, 158, 11, 0.3)',
          high: '#EF4444',
          highBg: 'rgba(239, 68, 68, 0.12)',
          highBorder: 'rgba(239, 68, 68, 0.3)',
        },
        petText: {
          primary: '#F7F7F8',
          secondary: '#C5CBD0',
          muted: '#949B9F',
          dim: '#626A70'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.35)',
        'elevated': '0 8px 30px rgba(0, 0, 0, 0.5)',
        'cinematic': '0 20px 50px -10px rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}

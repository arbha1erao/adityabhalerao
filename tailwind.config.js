/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0f172a',
          secondary: '#1e293b',
          accent: '#8b5cf6',
          text: '#f8fafc',
          muted: '#94a3b8',
          border: '#334155',
          card: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}


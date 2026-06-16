/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#108542',
        secondary: '#108542',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        display: ['KanopiBrazil', 'sans-serif'],
        body: ['BlueHighway', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

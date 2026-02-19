/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      fontSize: {
        'clamp-title': ['clamp(2rem, 5vw, 3rem)', '1.1'],
      },
      colors: {
        accent: "rgb(var(--accent-color))",
        surface: "rgb(var(--surface-color))",
        border: "rgba(var(--border-color), var(--border-opacity))",
        'text-primary': "rgb(var(--text-primary))",
        'text-secondary': "rgb(var(--text-secondary))",
      },
      backgroundColor: {
        background: "var(--bg-color)",
      },
      borderColor: {
        'border-strong': 'rgba(var(--border-color), 0.2)',
      }
    },
  },
  plugins: [],
}

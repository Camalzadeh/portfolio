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
        background: "var(--bg-color)",
        accent: "var(--accent-color)",
        surface: "var(--surface-color)",
        border: "var(--border)",
        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
      },
      backgroundColor: {
        'surface-hover': 'var(--surface-hover)',
      }
    },
  },
  plugins: [],
}

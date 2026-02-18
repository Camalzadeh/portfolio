/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '4rem',
      screens: {
        '2xl': '1600px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      fontSize: {
        'clamp-title': ['clamp(3rem, 5vw, 4rem)', '1.1'],
      },
      colors: {
        accent: "var(--accent-color)",
        surface: "var(--surface-color)",
        border: "var(--border-color)",
      },
      backgroundColor: {
        background: "var(--bg-color)",
      }
    },
  },
  plugins: [],
}

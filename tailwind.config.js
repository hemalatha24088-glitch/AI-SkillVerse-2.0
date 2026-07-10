/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        // Brand accent — deep amber/ochre
        amber: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5dba8',
          300: '#efc06d',
          400: '#e8a03a',
          500: '#C77D30',  // Primary CTA
          600: '#a5621f',
          700: '#834c18',
          800: '#5f3711',
          900: '#3d2409',
        },
        // Paper-tone backgrounds
        paper: '#FAF7F2',
        'paper-dark': '#F2EDE4',
        ink: '#1A1714',
        'ink-muted': '#5C5347',
        // Surface for cards
        surface: '#FFFFFF',
        'surface-raised': '#F5F1EB',
        // Functional
        success: '#2C5F4A',
        'success-light': '#EAF4EF',
        error: '#B33A3A',
        'error-light': '#FDEAEA',
        warning: '#C77D30',
        'warning-light': '#FDF0E3',
        // Dark mode surfaces
        dark: {
          bg:     '#18150F',
          paper:  '#1F1B14',
          card:   '#2A2318',
          border: '#3D3427',
          muted:  '#8A7A6A',
        },
      },
      borderRadius: {
        DEFAULT: '0.5rem',  // Consistent: 8px everywhere
        'sm': '0.375rem',
        'lg': '0.75rem',    // For panels/cards
        'xl': '1rem',       // For modals only
        'full': '9999px',   // Pills only
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(26,23,20,0.08), 0 1px 2px -1px rgba(26,23,20,0.06)',
        'card-hover': '0 4px 12px 0 rgba(26,23,20,0.12), 0 2px 4px -1px rgba(26,23,20,0.08)',
        'elevated': '0 8px 24px 0 rgba(26,23,20,0.10)',
        'focus': '0 0 0 3px rgba(199,125,48,0.25)',
      },
      animation: {
        'thinking': 'thinking 1.4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s ease-out forwards',
      },
      keyframes: {
        thinking: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // semantic colors that read from CSS vars
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-muted': 'hsl(var(--bg-muted) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        'text-muted': 'hsl(var(--text-muted) / <alpha-value>)',

        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        '2xl': '1.25rem', // keep a big one for hero cards
      },
      boxShadow: {
        sm: 'var(--shadow-1)',
        DEFAULT: 'var(--shadow-2)',
      },
      fontSize: {
        xs: 'var(--font-xs)',
        sm: 'var(--font-sm)',
        base: 'var(--font-base)',
        lg: 'var(--font-lg)',
        xl: 'var(--font-xl)',
        '2xl': 'var(--font-2xl)',
        '3xl': 'var(--font-3xl)',
      },
    },
  },
  plugins: [],
} satisfies Config

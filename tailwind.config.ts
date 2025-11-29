import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '.dark'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'cursive'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        'input-background': 'var(--color-input-background)',
        ring: 'var(--color-ring)',
        chart: {
          '1': 'var(--color-chart-1)',
          '2': 'var(--color-chart-2)',
          '3': 'var(--color-chart-3)',
          '4': 'var(--color-chart-4)',
          '5': 'var(--color-chart-5)',
        },
        sidebar: {
          DEFAULT: 'var(--color-sidebar)',
          foreground: 'var(--color-sidebar-foreground)',
          primary: 'var(--color-sidebar-primary)',
          'primary-foreground': 'var(--color-sidebar-primary-foreground)',
          accent: 'var(--color-sidebar-accent)',
          'accent-foreground': 'var(--color-sidebar-accent-foreground)',
          border: 'var(--color-sidebar-border)',
          ring: 'var(--color-sidebar-ring)',
        },
        amber: {
          50: 'var(--color-amber-50)',
          200: 'var(--color-amber-200)',
          400: 'var(--color-amber-400)',
        },
        emerald: {
          50: 'var(--color-emerald-50)',
          100: 'var(--color-emerald-100)',
          200: 'var(--color-emerald-200)',
          600: 'var(--color-emerald-600)',
          700: 'var(--color-emerald-700)',
        },
        gray: {
          100: 'var(--color-gray-100)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          900: 'var(--color-gray-900)',
        },
        black: 'var(--color-black)',
        white: 'var(--color-white)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      spacing: {
        spacing: 'var(--spacing)',
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--text-xs--line-height)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--text-sm--line-height)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--text-base--line-height)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--text-lg--line-height)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--text-xl--line-height)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--text-2xl--line-height)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--text-3xl--line-height)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--text-4xl--line-height)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--text-5xl--line-height)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--text-6xl--line-height)' }],
        '7xl': ['var(--text-7xl)', { lineHeight: 'var(--text-7xl--line-height)' }],
      },
      maxWidth: {
        md: 'var(--container-md)',
        xl: 'var(--container-xl)',
        '2xl': 'var(--container-2xl)',
        '3xl': 'var(--container-3xl)',
        '4xl': 'var(--container-4xl)',
        '5xl': 'var(--container-5xl)',
        '6xl': 'var(--container-6xl)',
      },
      blur: {
        sm: 'var(--blur-sm)',
        '3xl': 'var(--blur-3xl)',
      },
      transitionDuration: {
        DEFAULT: 'var(--default-transition-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--default-transition-timing-function)',
      },
      lineHeight: {
        relaxed: 'var(--leading-relaxed)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
      },
    },
  },
}

export default config


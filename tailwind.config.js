/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — theme-aware (CSS vars switch on data-theme)
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)',
          offset: 'var(--color-surface-offset)',
        },
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          faint: 'var(--color-text-faint)',
          inverse: 'var(--color-text-inverse)',
        },
        // Primary — semantic + full numbered palette
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          subtle: 'var(--color-primary-subtle)',
          50: '#f0f5fe',
          100: '#dde8fd',
          200: '#b8d0f8',
          300: '#8ab4f3',
          400: '#6998ed',
          500: '#4a7fe8',
          600: '#3a6fd8',
          700: '#2a5fc8',
          800: '#1c4ca8',
          900: '#133a80',
        },
        // Error — semantic + full numbered palette
        error: {
          DEFAULT: 'var(--color-error)',
          subtle: 'var(--color-error-subtle)',
          50: '#fef5f5',
          100: '#fde8e8',
          200: '#fbc3c3',
          300: '#f79090',
          400: '#f06060',
          500: '#e84a4a',
          600: '#d33535',
          700: '#b82020',
          800: '#961515',
          900: '#710d0d',
        },
        // Success — semantic + full numbered palette
        success: {
          DEFAULT: 'var(--color-success)',
          50: '#f0fdf7',
          100: '#d5faea',
          200: '#a4f4cf',
          300: '#6ae8af',
          400: '#4ae8a4',
          500: '#1db870',
          600: '#169a5c',
          700: '#0f7a49',
          800: '#0a5c36',
          900: '#063d24',
        },
        // Warning — full numbered palette
        warning: {
          50: '#fffbf0',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fbd04a',
          400: '#f9ba1a',
          500: '#e8a01a',
          600: '#c98010',
          700: '#a0600a',
          800: '#7a4806',
          900: '#5a3304',
        },
        // Neutral — full numbered palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        badge: {
          world: 'var(--color-badge-world)',
          france: 'var(--color-badge-france)',
          economy: 'var(--color-badge-economy)',
          science: 'var(--color-badge-science)',
          tech: 'var(--color-badge-tech)',
          environment: 'var(--color-badge-environment)',
        },
        white: '#ffffff',
        black: '#000000',
      },
      boxShadow: {
        'focus-primary': '0 0 0 3px rgba(74, 127, 232, 0.15)',
        'focus-error': '0 0 0 3px rgba(232, 74, 74, 0.15)',
      },
      fontSize: {
        badge: ['11px', { lineHeight: '1' }],
      },
      letterSpacing: {
        badge: '0.08em',
      },
    },
  },
}

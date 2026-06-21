/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          subtle: 'var(--color-primary-subtle)',
        },
        badge: {
          world: 'var(--color-badge-world)',
          france: 'var(--color-badge-france)',
          economy: 'var(--color-badge-economy)',
          science: 'var(--color-badge-science)',
          tech: 'var(--color-badge-tech)',
          environment: 'var(--color-badge-environment)',
        },
        success: 'var(--color-success)',
        error: {
          DEFAULT: 'var(--color-error)',
          subtle: 'var(--color-error-subtle)',
        },
      },
    },
  },
}

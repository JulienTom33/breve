/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
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
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          subtle: 'var(--color-primary-subtle)',
        },
        content: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          faint: 'var(--color-text-faint)',
          inverse: 'var(--color-text-inverse)',
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        badge: {
          monde: 'var(--color-badge-monde)',
          france: 'var(--color-badge-france)',
          economie: 'var(--color-badge-economie)',
          science: 'var(--color-badge-science)',
          techno: 'var(--color-badge-techno)',
          enviro: 'var(--color-badge-enviro)',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'sans-serif'],
        body: ['Satoshi', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        md: 'var(--shadow-md)',
      },
    },
  },
};

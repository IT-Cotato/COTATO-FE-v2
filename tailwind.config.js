/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        hover: 'var(--color-hover)',
        active: 'var(--color-active)',
        'text-disabled': 'var(--color-text-disabled)',
        alert: 'var(--color-alert)',
        'neutral-50': 'var(--color-neutral-50)',
        'neutral-100': 'var(--color-neutral-100)',
        'neutral-200': 'var(--color-neutral-200)',
        'neutral-300': 'var(--color-neutral-300)',
        'neutral-400': 'var(--color-neutral-400)',
        'neutral-500': 'var(--color-neutral-500)',
        'neutral-600': 'var(--color-neutral-600)',
        'neutral-700': 'var(--color-neutral-700)',
        'neutral-800': 'var(--color-neutral-800)',
      },
    },
  },
  plugins: [],
};

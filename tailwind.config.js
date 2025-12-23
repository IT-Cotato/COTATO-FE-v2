/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        hover: 'var(--color-hover)',
        active: 'var(--color-active)',
        'text-disabled': 'var(--color-text-disabled)',
        alert: 'var(--color-alert)',
        neutral50: 'var(--color-neutral-50)',
        neutral100: 'var(--color-neutral-100)',
        neutral200: 'var(--color-neutral-200)',
        neutral300: 'var(--color-neutral-300)',
        neutral400: 'var(--color-neutral-400)',
        neutral500: 'var(--color-neutral-500)',
        neutral600: 'var(--color-neutral-600)',
        neutral700: 'var(--color-neutral-700)',
        neutral800: 'var(--color-neutral-800)',
      },
    },
  },
  plugins: [],
};

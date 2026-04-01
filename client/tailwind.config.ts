import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8f4',
          100: '#e7efe4',
          600: '#3f6b46',
          700: '#2f5235',
          900: '#1f2f22'
        }
      },
      boxShadow: {
        panel: '0 12px 30px rgba(31, 47, 34, 0.08)'
      }
    },
  },
  plugins: [],
} satisfies Config;

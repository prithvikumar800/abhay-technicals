import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0D0E11',          // Logo Jet Black (Sidebar / Dark surfaces)
          'primary-hover': '#18191E',
          accent: '#E52521',           // Logo Crimson Red (Active tabs, buttons, highlights)
          'accent-hover': '#C61E1A',   // Deep Crimson Red
          'accent-bg': '#FEF2F2',      // Soft red badge background
          whatsapp: '#25D366',
          'whatsapp-hover': '#1EBE5B',
        },
        surface: {
          base: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F5F9',
          muted: '#E2E8F0',
        },
        border: {
          subtle: '#E2E8F0',
          strong: '#CBD5E1',
        },
        content: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          inverse: '#FFFFFF',
        },
        status: {
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
          info: '#2563EB',
          'info-bg': '#DBEAFE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

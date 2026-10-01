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
          primary: '#E52521',          // Official Logo Crimson Red
          'primary-hover': '#C61E1A',  // Deep Crimson Hover
          secondary: '#0D0E11',        // Logo Jet Black
          'secondary-hover': '#1F2937',
          accent: '#E52521',           // Red Accent
          'accent-bg': '#FEF2F2',      // Soft red surface
          dark: '#0D0E11',             // Logo Jet Black
          'dark-surface': '#18181B',   // Dark Slate
          whatsapp: '#25D366',         // WhatsApp Green
          'whatsapp-dark': '#1EBE5D',
        },
        surface: {
          base: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F5F9',
        },
        border: {
          subtle: '#F1F5F9',
          base: '#E2E8F0',
          focus: '#E52521',
        },
        content: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          inverse: '#FFFFFF',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#E52521',
          info: '#0284C7',
          sale: '#E52521',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;

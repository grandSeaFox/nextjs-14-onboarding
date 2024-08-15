import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx,css}',
    './src/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      xs: '250px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1535px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#d3aef1',
          foreground: 'hsl(var(--primary-foreground))',
          backgroundColor: 'hsl(var(--primary-backgroundColor))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        fill: {
          1: 'rgba(255, 255, 255, 0.10)',
        },
        appGradient: '#623fff',
        indigo: {
          25: '#f0f0f6',
          100: '#cfcfee',
          500: '#6172F3',
          700: '#3538CD',
          900: '#1e22d0',
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          300: '#6fda91',
          600: '#039855',
          700: '#027A48',
          900: '#054F31',
        },
        pink: {
          25: '#FEF6FB',
          100: '#FCE7F6',
          500: '#EE46BC',
          600: '#DD2590',
          700: '#C11574',
          900: '#851651',
        },
        blue: {
          25: '#F5FAFF',
          100: '#D1E9FF',
          500: '#2E90FA',
          600: '#1570EF',
          700: '#175CD3',
          900: '#194185',
        },
        sky: {
          1: '#F3F9FF',
        },
        black: {
          1: '#00214F',
          2: '#344054',
        },
        gray: {
          25: '#FCFCFD',
          200: '#EAECF0',
          300: '#D0D5DD',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          900: '#101828',
        },
      },
      boxShadow: {
        form: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        profile: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        'ibm-plex-serif': 'var(--font-ibm-plex-serif)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      bg: {
        popover: '#FCFCFD',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

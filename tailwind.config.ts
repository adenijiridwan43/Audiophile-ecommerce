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
        primary: '#D87D4A',
        'primary-hover': '#FBAF85',
        dark: '#101010',
        'dark-gray': '#4C4C4C',
        'light-gray': '#F1F1F1',
        'very-light-gray': '#FAFAFA',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        butler: ['Butler', 'serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        'helvetica-neue': ['Helvetica Neue', 'sans-serif'],
      },
      colors: {
        primary: {
          red: '#fb1b1f',
          purple: '#5b00b6',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #fb1b1f, #5b00b6)',
        hero: "url('/assets/Bg.png')",
      },
    },
  },
  plugins: [],
}
export default config


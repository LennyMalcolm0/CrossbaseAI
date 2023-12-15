import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xl': '1536px',

      'xl': '1320px',

      'lg': '1100px',

      'md': '924px',

      'sm': '700px',
    },
    
    extend: {
      colors: {
        "primary-100": "#FEC25D",
        "primary-200": "#FF4343",
        "primary-300": "#5DFE80",
        "primary-400": "#8E5901",

        "light-100": "#FFFFFF",
        "light-200": "#F4F4F4",
        "light-300": "#D8D8D8",
        "light-400": "#727272",

        "dark-100": "#3C3C3C",
        "dark-200": "#1E1E1E",
        "dark-300": "#111111",
        "dark-400": "#000000",
      }
    },
  },
  plugins: [],
}
export default config

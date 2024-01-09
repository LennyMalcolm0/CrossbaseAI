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
      /** Light Mode */
      colors: {
        "primary-100": "#FEC25D",
        "primary-200": "#FF4343",
        "primary-300": "#12D13C",
        "primary-400": "#8E5901",
        "primary-500": "#F7EFE3",

        "light-100": "#727272",
        "light-200": "#D8D8D8",
        "light-300": "#F4F4F4",
        "light-400": "#FFFFFF",

        "dark-100": "#000000",
        "dark-200": "#242424",
        "dark-300": "#333333",
        "dark-400": "#3C3C3C",
      }

      /** Dark Mode */
      // colors: {
      //   "primary-100": "#8E5901",
      //   "primary-200": "#FF4343",
      //   "primary-300": "#12D13C",
      //   "primary-400": "#FEC25D",
      //   "primary-500": "#3C2602",

      //   "light-100": "#D8D8D8",
      //   "light-200": "#3C3C3C",
      //   "light-300": "#000000",
      //   "light-400": "#333333",

      //   "dark-100": "#F4F4F4",
      //   "dark-200": "#D8D8D8",
      //   "dark-300": "#F4F4F4",
      //   "dark-400": "#FFFFFF",
      // }
    },
  },
  plugins: [],
}
export default config

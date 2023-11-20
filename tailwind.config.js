/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        vsm: "360px",
        csm: "400px",
        sm: "640px",
        md: "768px",
        slg: "990px",
        lg: "1024px",
        sxl: "1120px",
        xl: "1280px",
        xxl: "1365px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
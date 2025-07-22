/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'site-green': '#00DC64',
        'site-green-50': 'rgba(0, 220, 99, 0.5)'
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],   // 전역 기본
        pretendard: ["Pretendard", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        interblack: ["InterBlack"],
      }
    },
  },
  plugins: [],
}


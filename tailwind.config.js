/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s',
        'ping-slow': 'ping 16s',
      }
    },
  },
  plugins: [],
}
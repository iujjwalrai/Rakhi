/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-delay-100': 'bounce 1s infinite 0.1s',
        'bounce-delay-200': 'bounce 1s infinite 0.2s',
        'bounce-delay-300': 'bounce 1s infinite 0.3s',
        'bounce-delay-400': 'bounce 1s infinite 0.4s',
        'bounce-delay-500': 'bounce 1s infinite 0.5s',
      },
    },
  },
  plugins: [],
}
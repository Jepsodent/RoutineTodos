// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html", // Pastikan ini juga ada
    ],
    theme: {
      extend: {
        fontFamily: {
          // Definisikan 'mono' untuk Space Mono
          mono: ['"Space Mono"', 'monospace'], 
          // Anda juga bisa mengganti default font sans jika mau
          // sans: ['"Space Mono"', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  }
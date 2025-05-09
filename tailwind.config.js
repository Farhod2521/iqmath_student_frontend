/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      fontFamily: {
        // myriad: 'Myriad Pro', // Add your custom font
        sf: ['SF Pro Display', 'sans-serif'],
        bicubik: ['Bicubik', 'sans-serif']
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '16px', // Mobil ekranlar uchun kichik padding
          sm: '24px', // Kichik ekranlar (640px) uchun
          md: '32px', // O'rta ekranlar (768px) uchun
          lg: '48px', // Katta ekranlar (1024px) uchun
          xl: '64px', // Juda katta ekranlar (1280px) uchun
          '2xl': '120px' // Eng katta ekranlar (1440px+) uchun
        }
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px'
      }
    }
  },
  plugins: [heroui()]
}

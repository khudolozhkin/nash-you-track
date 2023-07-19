/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    colors: {
      transparent: 'transparent',
      'general-background': '#f9f9f9',
      'general-background-dark': '#1f1f1f',
      'brand-background': '#fff',  
      'brand-background-dark': '#282828',
      'hover-item': '#f9f9f9',  
      'hover-item-dark': '#1f1f1f',
      'primary': '#0d0d0d',
      'primary-dark': '#fff',
      'secondary': '#606060',
      'secondary-dark': '#aaa',
      'disabled': '#909090',
      'disabled-dark': '#717171',
      'call-to-action': '#7858A6',
      'call-to-action-dark': '#7858A6',
      'themed-color': '#540b73',
      'themed-color-dark': '#540b73',
    },
    extend: {
      backdropBlur: {
        sm: '1px',
      },
      maxWidth: {
        'xl': '1360px',
      }
    },
  },
  plugins: [],
}

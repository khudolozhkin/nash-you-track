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
      'general-background': '#ffffff',
      'general-background-dark': '#0f0f0f',
      'brand-background': '#f2f2f2',  
      'brand-background-dark': '#272727',
      'hover-item': '#e5e5e5',  
      'hover-item-dark': '#383838',
      'border': '#a5a5a5a1',
      'border-dark': '#333333',
      'primary': '#0d0d0d',
      'primary-dark': '#fff',
      'secondary': '#606060',
      'secondary-dark': '#aaa',
      'disabled': '#909090',
      'disabled-dark': '#717171',
      'call-to-action': '#7858A6',
      'call-to-action-dark': '#7858A6',
      'themed-color': '#632dc1',
      'themed-color-dark': '#632dc1',
      'delete': '#dc2626',
      'delete-dark': '#b31f1f',
    },
    keyframes: {
      slideDownAndFade: {
        from: { opacity: 0, transform: 'translateY(-12px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      slideLeftAndFade: {
        from: { opacity: 0, transform: 'translateX(12px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      slideUpAndFade: {
        from: { opacity: 0, transform: 'translateY(12px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      slideRightAndFade: {
        from: { opacity: 0, transform: 'translateX(-12px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      fadeBackground: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      spin: {
        from: { rotate: '0deg'},
        to: { rotate: '360deg'},
      },
      scale: {
        from: { scale: '0%', opacity: '0%' },
        to: { scale: '100%', opacity: '100%' },
      },
      scaleIn: {
        from: { opacity: 0, transform: 'scale(0.8) translateX(-50%) translateY(-20%)', left: `20%` },
        to: { opacity: 1, transform: 'scale(1) translateX(-50%) translateY(0%)', left: `50%` },
      },
      toasterIn: {
        '0%': { opacity: 0, transform: 'scale(0.8) translateY(200px)' },
        '100%': { opacity: 1, transform: 'scale(1) translateY(0px)' },
      },
      toasterOut: {
        '0%': { opacity: 1, transform: 'scale(1) translateY(0px)' },
        '100%': { opacity: 0, transform: 'scale(0.8) translateY(200px)' },
      }
    },
    animation: {
      slideDownAndFade: 'slideDownAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndFade: 'slideLeftAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideUpAndFade: 'slideUpAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndFade: 'slideRightAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      fadeBackground: 'fadeBackground 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      spin: 'spin 1s linear infinite',
      scale: 'scale 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      scaleIn: 'scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      toasterIn: 'toasterIn 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      toasterOut: 'toasterOut 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    extend: {
      backdropBlur: {
        sm: '1px',
      },
      maxWidth: {
        'xl': '1360px',
      }
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
}

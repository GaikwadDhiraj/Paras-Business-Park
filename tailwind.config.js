/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
  	extend: {
  		animation: {
  			spotlight: 'spotlight 2s ease .75s 1 forwards'
  		},
  		keyframes: {
  			spotlight: {
  				'0%': {
  					opacity: 0,
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			}
  		},
  		colors: {
  			primary: '#bd6b38',
  			primary_lite: '#f3cd91',
  			secondary: '#05163d'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

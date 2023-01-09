/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        backGround:'#f7f7f7'
      },
      backgroundImage: {
        'my_bg_image' : "url('../pages/assets/images/darkBlack.jpeg')",
        'login_form' : "url('../pages/assets/images/web3.jpeg')"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-15deg)'},
          '50%': {transform: 'rotate(15deg)'}
        },
        text: {
          '0%, 100%': {
             'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
             'background-size':'200% 200%',
              'background-position': 'right center'
          }
      }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        text:'text 5s ease infinite'
      },
    },
  },
  plugins: [],
};

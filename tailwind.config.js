module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens: {
    //   'xs': {'min': '250px', 'max': '639px'},
    //   'sm': {'min': '640px', 'max': '767px'},
    //   'md': {'min': '768px', 'max': '1023px'},
    //   'lg': {'min': '1024px', 'max': '1279px'},
    //   'xl': {'min': '1280px', 'max': '1535px'},
    //   '2xl': {'min': '1536px'},
    // },
    fontFamily: {
      'archivoBlack': ['Archivo Black', 'sans-serif']
    },
    screens: {
      'xs': '250px',
      'sm': '640px',
      'c_sm': '672px',
      'md': '768px',
      'c_lg': '988px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: theme => ({
        'bg-landing-dev': `url("./pages/assets/bg2_0.jpg")`,
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

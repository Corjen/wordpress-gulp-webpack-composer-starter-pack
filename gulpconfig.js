/**
 * Gulp configuration
 */

var config = {
  'build': 'public/wp-content/themes/coolideasacademy',
  'dist': 'dist',
  src: {
    php: 'src/**/*.php',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    icons: 'src/icons/*.svg',
    svg: 'src/img/**/*.svg',
    png: 'src/img/**/*.png',
    jpg: 'src/img/**/*.jpg'
  }
}

module.exports = config

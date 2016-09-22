/**
 * Gulp configuration
 */

var config = {
  'build': 'public/wp-content/themes/molenaar',
  'webpackPublicPath': 'public/wp-content/themes/molenaar/js',
  'proxy': 'http://molenaarv2.dev/',
  'dist': 'dist',
  src: {
    php: 'src/**/*.php',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    icons: 'src/icons/*.svg',
    svg: 'src/img/**/*.svg',
    png: 'src/img/**/*.png',
    jpg: 'src/img/**/*.jpg',
    fonts: 'src/fonts/*'
  }
}

module.exports = config

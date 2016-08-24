/**
 * Watch files changes
 */

const gulp = require('gulp')
const config = require('../gulpconfig.js')

gulp.task('default', ['browsersync'], () => {
  gulp.watch(config.src.php, ['theme-php-build'])
  gulp.watch(config.src.scss, ['scss-build'])
  gulp.watch(config.src.icons, ['icons-build'])
  gulp.watch(config.src.jpg, ['jpg-build'])
  gulp.watch(config.src.png, ['png-build'])
  gulp.watch(config.src.svg, ['svg-build'])
  gulp.watch('src/vendor/**/*', ['theme-composer-build'])
  // gulp.watch('src/composer.lock', ['theme-composer-lock-build'])
  gulp.watch('src/lib/assets/**', ['theme-assets-build'])
})

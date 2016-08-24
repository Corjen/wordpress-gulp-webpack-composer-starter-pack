/**
 * Build and watch the app with webpack
 */

const gulp = require('gulp')
const webpack = require('gulp-webpack')
const config = require('../gulpconfig.js')

gulp.task('app-watch', () => {
  return gulp.src('src/app/main.js')
    .pipe(webpack({
      watch: true,
      hot: true,
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      ouput: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest(config.build + '/js/'))
})

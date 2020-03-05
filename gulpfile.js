const { src, dest } = require('gulp')
const uglify = require('gulp-uglify-es').default

function mjs() {
  return src('tmp/**/*.js')
    .pipe(uglify({
      ecma: 2018,
      keep_classnames: true,
      keep_fnames: true
    }))
    .pipe(dest('dist/'))
}

exports.default = mjs

const gulp = require('gulp');

const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const stripdebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const uglifyes = require('gulp-uglify-es').default;

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('js', () => {

  return gulp.src('./src/js/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'))
    .pipe(uglifyes())
    .pipe(gulp.dest('./build/js/'));

});


gulp.task('css', () => {
  const postCssOpts = [
    autoprefixer({ browsers: ['last 5 versions', '> 2%']}),
    cssnano
  ];

  return gulp.src('./src/css/styles.css')
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest('./build/css/'));

});

gulp.task('run', ['js', 'css']);





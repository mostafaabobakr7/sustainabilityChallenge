// include plug-ins:
// html + img
const htmlclean = require('gulp-htmlclean');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
// css
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassnewer = require('gulp-newer-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const uncss = require('gulp-uncss');
const postcssPresetEnv = require('postcss-preset-env');
const fontMagician = require('postcss-font-magician');
const colorfunction = require('postcss-color-function');
const rgbafallback = require('postcss-color-rgba-fallback');
const easingradients = require('postcss-easing-gradients');
// js
const uglify = require('gulp-uglify-es').default;
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const babel = require('gulp-babel');
const babelenv = require('babel-preset-env');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// other
const merge = require('merge-stream');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const gzip = require('gulp-gzip');
const pump = require('pump');
const gulpIgnore = require('gulp-ignore');
const del = require('del');
const webpackConfig = require('./webpack.config.js');
// src and build :
const htmlSrc = './src/html/**/*.html';
const htmlDest = './';
const sassSrc = './src/scss/**/*.scss';
const sassDest = './src/css';
const cssSrc = './src/css/style.css';
const cssDest = './css';
const jsSrc = './src/js/components/script.js';
const jsFolder = './src/js/components/**/*.js';
const jsDest = './js/';
const imgSrc = './src/img/*';
const imgDest = './img';
// functions
function serverStart() {
  browserSync.init({ server: './src', });
}

function minifySass() {
  const plugins = [postcssPresetEnv, autoprefixer, cssnano,];
  return gulp
    .src(sassSrc)
    .pipe(newer('./src/css/style.css'))
    .pipe(sourcemaps.init({ loadMaps: true, }))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: false,
    }).on('error', sass.logError))

    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(sassDest))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream());
}


function minifyHtml() {
  return gulp
    .src('./src/html/*.html')
    .pipe(plumber(function (error) {
      console.error('ERROR', error.message);
      gulp.emit('finish');
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(gulp.dest('./src/'))
    // .pipe(newer(htmlDest))
    .pipe(htmlclean({
      protect: /<!--%fooTemplate\b.*?%-->/g,
      edit(html) {
        return html.replace(/\begg(s?)\b/gi, 'omelet$1');
      },
    }))
    .pipe(gulp.dest(htmlDest))
    .pipe(browserSync.stream());
}

function minifyJs() {
  return gulp
    .src(jsSrc)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./src/js/'))
    .pipe(gulp.dest('./js/'))
    .pipe(size({
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gzip())
    .pipe(gulp.dest('./src/js/'))
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.stream());
}

function minifyImg() {
  return gulp
    .src(imgSrc)
    .pipe(plumber(function (error) {
      console.error(error.message);
      gulp.emit('finish');
    }))
    .pipe(newer(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.stream());
}

gulp.task('html', minifyHtml);
gulp.task('minify-img', minifyImg);
gulp.task('sass', minifySass);
gulp.task('serve', ['sass',], serverStart);
gulp.task('scripts', minifyJs);
// watch .....................................


function watchChange() {
  gulp.watch(sassSrc, ['sass',]);
  gulp.watch(jsFolder, ['scripts',]);
  gulp.watch(imgSrc, ['minify-img',]);
  gulp.watch(htmlSrc, ['html',]);
}

gulp.task('default', ['html', 'minify-img', 'scripts', 'serve',], watchChange);
// ...............................................................

// include plug-ins:
// SERVE: BrowserSync
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// html + img
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
// css
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const fontMagician = require('postcss-font-magician');
const colorfunction = require('postcss-color-function');
const rgbafallback = require('postcss-color-rgba-fallback');
const easingradients = require('postcss-easing-gradients');
// other
const fs = require('fs');
const path = require('path');
const size = require('gulp-size');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
// js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
// FOLDERS :
var srcHTML = './src/html/*.html';
var srcSASS = './src/scss/style.scss';
var srcJS = './src/js/components/index.js';
var srcIMG = './src/img/**/*';
var outSASS = './src/css';
var outJS = './src/js';
var watchHTML = './src/html/**/*';
var watchSASS = './src/scss/**/*.scss';
var watchJS = './src/js/components/**/*.js';
var destHTML = './docs';
var destCSS = './docs/css';
var destJS = './docs/js';
var destIMG = './docs/img';
// ERROR function
function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}
function serverStart() {
  browserSync.init({
    server: './src',
  });
}

function minifySass() {
  const plugins = [postcssPresetEnv, autoprefixer({grid: "autoplace"}), cssnano,];
  return gulp
    .src(srcSASS)
    .pipe(newer({ dest: outSASS, ext: '.css', extra:watchSASS }))
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
    .pipe(gulp.dest(outSASS))
    .pipe(gulp.dest(destCSS))
    .pipe(browserSync.stream());
}

function getHtmlData(){
  return JSON.parse(fs.readFileSync('./src/data.json'));
}
function minifyHtml() {
  return gulp
    .src(srcHTML)
    .pipe(data(getHtmlData))
    .pipe(nunjucksRender({path: './src/html'}))
    .on('error', swallowError)
    .pipe(gulp.dest('./src/'))
    .pipe(htmlclean({
      protect: /<!--%fooTemplate\b.*?%-->/g,
      edit(html) {
        return html.replace(/\begg(s?)\b/gi, 'omelet$1');
      },
    }))
    .pipe(gulp.dest(destHTML))
    .pipe(browserSync.stream());
}

function minifyJs() {
  return gulp
    .src(srcJS)
    .pipe(webpackStream(webpackConfig), webpack)
    .on('error', swallowError)
    .pipe(gulp.dest(outJS))
    .pipe(gulp.dest(destJS))
    .pipe(size({
      showFiles: true,
      showTotal: false,
    }))
    .pipe(browserSync.stream());
}

function minifyImg() {
  return gulp
    .src(srcIMG)
    .pipe(plumber(function (error) {
      console.error(error.message);
      gulp.emit('finish');
    }))
    .pipe(newer(destIMG))
    .pipe(imagemin())
    .on('error', swallowError)
    .pipe(gulp.dest(destIMG))
    .pipe(browserSync.stream());
}

gulp.task('html', minifyHtml);
gulp.task('minify-img', minifyImg);
gulp.task('sass', minifySass);
gulp.task('serve', serverStart);
gulp.task('scripts', minifyJs);
// watch .....................................


function watchChange() {
  gulp.watch(watchHTML, ['html',reload]);
  gulp.watch('./src/data.json', ['html',reload]);
  gulp.watch(watchSASS, ['sass',reload]);
  gulp.watch(watchJS, ['scripts',reload]);
  gulp.watch(srcIMG, ['minify-img',reload]);
}

gulp.task('default', ['html', 'minify-img', 'scripts', 'sass', 'serve',], watchChange);
// ...............................................................

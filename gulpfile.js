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
const gzip = require('gulp-gzip');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
// js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
// src and build :
const htmlSrc = './src/html/**/*';
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

function getHtmlData(){
  return JSON.parse(fs.readFileSync('./src/data.json'));
}
function minifyHtml() {
  return gulp
    .src('./src/html/*.html')
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
    .pipe(gulp.dest(htmlDest))
    .pipe(browserSync.stream());
}

function minifyJs() {
  return gulp
    .src(jsSrc)
    .pipe(webpackStream(webpackConfig), webpack)
    .on('error', swallowError)
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
    .on('error', swallowError)
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.stream());
}

gulp.task('html', minifyHtml);
gulp.task('minify-img', minifyImg);
gulp.task('sass', minifySass);
gulp.task('serve', serverStart);
gulp.task('scripts', minifyJs);
// watch .....................................


function watchChange() {
  gulp.watch(sassSrc, ['sass',reload]);
  gulp.watch(jsFolder, ['scripts',reload]);
  gulp.watch(imgSrc, ['minify-img',reload]);
  gulp.watch(htmlSrc, ['html',reload]);
  gulp.watch('./src/data.json', ['html',reload]);
}

gulp.task('default', ['html', 'minify-img', 'scripts', 'sass', 'serve',], watchChange);
// ...............................................................

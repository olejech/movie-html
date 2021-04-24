const gulp = require('gulp')
const gulpIf = require('gulp-if')
const postcss = require('gulp-postcss')
const postcssImport = require('postcss-import')
const postcssNested = require('postcss-nested')
const autoPrefixer = require('autoprefixer')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssCsso = require('postcss-csso')
const postCssCustomMedia = require('postcss-custom-media')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync')
const htmlMin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const webpackStream = require('webpack-stream')
const { webpackDevConfig, webpackProdConfig } = require('./webpack.config.js')

const env = process.env.NODE_ENV
const reload = browserSync.reload

const path = {
  src: {
    // From
    css: './src/css/*.css',
    html: './src/*.html',
    js: './src/js/*.js',
  },
  build: {
    // Where
    css: './build/css',
    html: './build',
    js: './build/js',
  },
  watch: {
    css: './src/css/**/*.css',
    html: './src/**/*.html',
    js: './src/**/*.js',
  },
}

gulp.task('css', () => {
  const plugins = [
    postcssImport,
    postcssNested,
    postcssCustomProperties,
    postCssCustomMedia,
    autoPrefixer(),
    postcssCsso,
  ]

  return gulp
    .src(path.src.css)
    .pipe(gulpIf(env === 'development', sourcemaps.init()))
    .pipe(postcss(plugins))
    .pipe(gulpIf(env === 'development', sourcemaps.write()))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }))
})

gulp.task('html', () => {
  return gulp
    .src(path.src.html)
    .pipe(htmlMin())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }))
})

gulp.task('js', () => {
  console.log('js')
  return gulp
    .src(path.src.js)
    .pipe(
      webpackStream(
        gulpIf(env === 'development', webpackDevConfig, webpackProdConfig)
      )
    )
    .pipe(gulpIf(env === 'production', uglify()))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }))
})

gulp.task('watch', () => {
  browserSync.init({ server: './build' })

  gulp.watch(path.watch.css, gulp.series('css'))
  gulp.watch(path.watch.html, gulp.series('html'))
  gulp.watch(path.watch.js, gulp.series('js'))
})

gulp.task(
  'dev',
  gulp.series(gulp.series('css', 'html', 'js'), gulp.parallel('watch'))
)
gulp.task('build', gulp.series('css', 'html', 'js'))

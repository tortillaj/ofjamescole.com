'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var bower = require('main-bower-files');
var notify = require('gulp-notify');
var path = require('path');
var Hexo = require('hexo');
var hexo = new Hexo(path.resolve(process.cwd(), '../../'), {});
var runSequence = require('gulp-run-sequence');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('cssnano');
var argv = require('yargs').argv;
var gulpIf = require('gulp-if');
var buildSourceMaps = !!argv.sourcemaps;

var project = {
  dest: {
    css: 'source/css',
  },
  hexo: {
    root: '../../',
    public: '../../public',
    source: ['../../source/**/*.md', '../../_config.yml', '_config.yml'],
    template: 'layout/**/*.ejs',
  },
  scss: 'source/_scss/**/*.scss',
};

gulp.task('sass:build', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 version', '> 5%', 'IE 9']}),
    mqpacker({sort: true}),
    flexibility(),
    cssnano({
      discardComments: {
        removeAll: true
      }
    })
  ];

  return gulp.src(project.scss)
    .pipe(sassGlob())
    .pipe(gulpIf(buildSourceMaps, sourcemaps.init({debug: true})))
    .pipe(sass())
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(postcss(processors))
    .pipe(gulpIf(buildSourceMaps, sourcemaps.write()))
    .pipe(gulp.dest(project.dest.css))
    .pipe(gulp.dest(project.hexo.public + '/css/'))
    .pipe(browserSync.stream());
});

gulp.task('hexo:build', function() {
  return hexo.init()
    .then(function() {
      return hexo.call('generate', {watch: false});
    })
    .then(function() {
      return hexo.exit();
    })
    .catch(function(err) {
      console.log(err)
    });
});

gulp.task('hexo:generate', function() {
  return hexo.call('generate', {watch: false})
    .then(function() {
      hexo.exit();
    })
    .catch(function(err) {
      console.log(err);
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass:build', 'hexo:build'], function() {
  // init starts the server
  browserSync.init({
    server: {
      baseDir: project.hexo.public,
    },
    logLevel: "debug"
  });

  gulp.watch(project.scss, ['sass:build']);
  gulp.watch([project.hexo.source, project.hexo.template], function() {
    runSequence(['hexo:generate'], browserSync.reload);
  });
});

gulp.task('default', ['serve']);

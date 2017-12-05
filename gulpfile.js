const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');

gulp.task('clean', function () {
	return del(['dist/**/*']);
});

gulp.task('styles-core', function() {
     gulp.src("src/ibm-grid.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('ibm-grid.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs'))
      .pipe(cleanCSS({
        level: 2
      }))
      .pipe(rename('ibm-grid.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs/css'));
});

gulp.task('styles-all', function() {
     gulp.src("src/ibm-grid-all.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('ibm-grid-all.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs'))
      .pipe(cleanCSS({
        level: 2
      }))
      .pipe(rename('ibm-grid-all.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs/css'));
});

gulp.task('build-test-files', function(){
  gulp
    .src([
      './test-src/index.html', 
      './test-src/test-heights.html',
      './test-src/test-bleed.html',
      './test-src/test-hiding-columns.html'
    ])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulp.dest('./docs/test'))
  ;
});

gulp.task('type', function () {
	gulp.src("node_modules/@ibm/type/dist/**/*")
		.pipe(gulp.dest('docs/css/@ibm/type'));
});

gulp.task('watch',function() {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });

    gulp.watch('src/**/*.scss', ['styles-core', 'styles-all']);
    gulp.watch("dist/**/*").on("change", browserSync.reload);
    gulp.watch("docs/**/*").on("change", browserSync.reload);
    gulp.watch("test-src/*.html", ['build-test-files']);
});

gulp.task('styles', ['styles-core', 'styles-all']);
gulp.task('default', ['clean', 'type', 'styles']);
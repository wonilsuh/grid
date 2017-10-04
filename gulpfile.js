const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('clean', function () {
	return del(['dist/**/*']);
});

gulp.task('styles', function() {
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

    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch("dist/**/*").on("change", browserSync.reload);
    gulp.watch("docs/**/*").on("change", browserSync.reload);
});

gulp.task('default', ['clean', 'type', 'styles', 'grid']);
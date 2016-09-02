var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');

// browserSync - live-reload and cross-platform synchronization
var browserSync = require('browser-sync').create();
browserSync.init({ server: './build' });
browserSync.stream();

// default task - watch files and perform relevant tasks on change
gulp.task('default', ['styles', 'scripts', 'html'], function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('build/**/*.html').on('change', browserSync.reload);
  gulp.watch('build/**/*.hbs').on('change', browserSync.reload);
});

// styles task - compile sass styles
gulp.task('styles', function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', notify.onError(function (error) {
      return 'SASS Compilation Error: \n' + error.message.split('sass/')[1].split('scss')[0] + 'scss line ' + error.message.split('on line')[1].split(' of ')[0];})))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

// scripts task - lint and uglify js
gulp.task('scripts', function(){
  return gulp.src(['src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

// html task - copy over html
gulp.task('html', function(){
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('./build'));
});

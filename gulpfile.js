var gulp    = require('gulp'),
    jasmine = require('gulp-jasmine');

gulp.task('test', function () {
  return gulp.src('spec/*.spec.js')
    .pipe(jasmine());
});

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var streamqueue  = require('streamqueue');

gulp.task('build', function() {
  return streamqueue({ objectMode: true },
    gulp.src('src/html/header.html'),
    gulp.src('src/html/*/*.html'),
    gulp.src('src/html/footer.html')
  )
  .pipe(concat('index.html'))
  .pipe(gulp.dest('src/'));
});

gulp.task('watch', function(){
  //watch task
  gulp.watch('src/html/**/*.html', ['build']);
});

gulp.task('default', ['build']);

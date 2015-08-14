'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var stream_queue  = require('streamqueue');

//----------
// build
//----------
// html
gulp.task('build-html', function() {
  return stream_queue({ objectMode: true },
    gulp.src('src/html/header.html'),
    gulp.src('src/html/*/*.html'),
    gulp.src('src/html/footer.html')
  )
  .pipe(concat('index.html'))
  .pipe(gulp.dest('src/'));
});

//----------
// watch
//----------
gulp.task('watch', function(){
  gulp.watch('src/html/**/*.html', ['build-html']);
});


//----------
// default
//----------
gulp.task('default', ['build-html']);


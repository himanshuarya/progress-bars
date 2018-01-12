var gulp = require('gulp');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    useref = require('gulp-useref');
    uglify = require('gulp-uglify');
    gulpIf = require('gulp-if');
    cssnano = require('gulp-cssnano');
    del = require('del');
    runSequence = require('run-sequence');
    jshint = require('gulp-jshint');
 
var Server = require('karma').Server;

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
    
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('test', function (done) {
  Server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(code) {
    if (code === 1){
        console.log('Unit Test failures, exiting process');
           done('Unit Test Failures');
    } else {
        console.log('Unit Tests passed');
        done();
    }
  });
}); 

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'lint', 'test', 'useref', 
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  );
});

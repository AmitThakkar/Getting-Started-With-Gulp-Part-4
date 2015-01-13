/**
 * Created by Amit Thakkar on 08/01/15.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'), // Requiring gulp-concat task.
    livereload = require('gulp-livereload'), // Requiring gulp-livereload task.
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    open = require("gulp-open");

function errorLog(error) {
    console.error(error);
    this.emit('end');
}

// Scripts Task
// Uglify
gulp.task('scripts', function () {
    gulp.src('public/scripts/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(concat('all.js')) // Adding concat task here
        .pipe(gulp.dest('build/scripts'))
        .pipe(livereload()); // Adding livereload task here. Which creates a livereload server.
});

// HTMLs Task
// Uglify
gulp.task('htmls', function () {
    gulp.src('public/*html')
        .pipe(livereload());
});

// Watch Task
// Watches JS
gulp.task('watch', function () {
    livereload.listen(); // Calling lister on livereload task, which will start listening for livereload client.
    gulp.watch('public/scripts/*.js', ['scripts']);
    gulp.watch('public/*.html', ['htmls']);
});

// JSHint Task
gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint());
});

// NodeJS Runner Task
gulp.task('nodejs', function () {
    livereload.listen(); // Calling lister on livereload task, which will start listening for livereload client.
    nodemon({script: 'app.js', ext: 'js', ignore: ['build/', 'public/']})
        .on('change', ['lint'])
        .on('restart', function () {
            console.log('restarted!')
        });
});

gulp.task('open', function () {
    var options = {
        url: 'http://localhost:3000'
    };
    gulp.src('./public/index.html')
        .pipe(open("", options));
});

gulp.task('default', ['scripts', 'watch', 'lint', 'nodejs', 'open']);
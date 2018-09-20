
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var copy = require('gulp-contrib-copy');
var concat = require('gulp-concat');

gulp.task('js', function (cb) {
    gulp.src([
            'lib/jquery/dist/jquery.js',
            'lib/jquery-ui/jquery-ui.js',
            'lib/tether/dist/js/tether.js',
            'lib/bootstrap/dist/js/bootstrap.js',
            'lib/underscore/underscore.js',
            'assets/js/webvideoedit.js'
        ])
        .pipe( concat('js_app.js') )
        .pipe( uglify() )
        .pipe( rename('app.min.js') )
        .pipe( gulp.dest('assets/js') );
});

gulp.task('watch', function (cb) {

    gulp.watch('assets/js/*', ['js']);

});

gulp.task('default', ['js']);

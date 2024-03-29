const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

function libs(cb) {
    // src('app/resources/js/libs/*.js')
    src(['app/resources/js/libs/jquery.min.js',
        'app/resources/js/libs/jquery.dataTables.min.js',
        'app/resources/js/libs/jquery.dataTables.select.min.js',
        'app/resources/js/libs/buttons.dataTables.min.js',
        'app/resources/js/libs/bootstrap*',
        'app/resources/js/libs/moment.min.js',
        'app/resources/js/libs/video7.js',
        'app/resources/js/libs/*.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('public/js'))
        ;

    cb();
}

function main(cb) {
    src(['app/resources/js/main.js',
        'app/resources/js/triggers.js',
        'app/resources/js/rangeslider.js',
        'app/resources/js/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('public/js'))
        ;

    cb();
}

function css(cb) {
    src(['app/resources/css/*'])
        .pipe(dest('public/css'))
        ;
	src(['app/resources/css/libs/*'])
        .pipe(dest('public/css/libs'))
        ;

    cb();
}

function images(cb) {
    src(['app/resources/images/*'])
        .pipe(dest('public/images'))
        ;

    cb();
}

exports.default = series(libs, main, css, images);

var gulp = require('gulp');
var toolbox = require('gulp-toolbox');

var config = {
    production: true,
    assets: {
        enabled: true,
        origin: 'app/resources',
        target: 'public',
        glob: [
            'fonts/**',
            'images/**',
            'css/**',
            'js/**/*.swf'
        ]
    },
    js: {
        enabled: true,
        libs: {
            origin: 'app/resources/js/libs',
            target: 'public/js',
            glob: [
                'jquery.min.js',
                'moment.min.js',
                'bootstrap*',
                '*.js'
            ]
        },
        src: {
            origin: 'app/resources/js',
            target: 'public/js',
            glob: [
                '*.js'
            ]
        }
    },
    sync: {
        enabled: true,
        glob: [
            'app/resources/templates/**/*',
            'public/css/**/*',
            'public/fonts/**/*',
            'public/js/**/*'
        ]
    }
};

toolbox.init(gulp, config);

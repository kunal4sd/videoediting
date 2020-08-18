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
            'js/libs/lang/*'
        ]
    },
    js: {
        enabled: true,
        libs: {
            origin: 'app/resources/js/libs',
            target: 'public/js',
            glob: [
                'jquery.min.js',
                'jquery.dataTables.min.js',
                'jquery.dataTables.select.min.js',
                'buttons.dataTables.min.js',
                'bootstrap*',
                'moment.min.js',
                'video7.js',
                '*.js'
            ]
        },
        src: {
            origin: 'app/resources/js',
            target: 'public/js',
            glob: [
                'main.js',
                'triggers.js',
                'rangeslider.js',
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

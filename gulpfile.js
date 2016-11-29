'use strict';

const gulp = require('gulp');
const gulpNgConfig = require('gulp-ng-config');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('config', function () {
    gulp.src('./public/app/config.json')
        .pipe(gulpNgConfig('app.config', {
            environment: 'local'
        }))
        .pipe(concat('./public/app/app.js'))
});

gulp.task('config:build', function () {
    gulp.src('./public/app/config.json')
        .pipe(gulpNgConfig('app.config', {
            environment: process.env.NODE_ENV || 'local'
        }))
        .pipe(concat('./public/app/app.js'))
});


gulp.task('serve', ['config','watch'], function () {

});
// http://paulsalaets.com/posts/setting-angular-config-with-gulp
// http://stackoverflow.com/questions/24591854/using-gulp-to-concatenate-and-uglify-files
gulp.task('js:build', function () {
    return gulp.src('/public/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(rename('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
});

// gulp.task('serve:dist', ['config:build', 'build'], function () {
//
// });

gulp.task('build', ['config:build', 'js:build']);

gulp.task('default',['build']);
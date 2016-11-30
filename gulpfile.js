'use strict';

const gulp = require('gulp');
const gulpNgConfig = require('gulp-ng-config');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('config', function () {
    gulp.src('./public/app/config.json')
        .pipe(gulpNgConfig('app.config', {
            environment: 'local'
        }))
        .pipe(gulp.dest('./public/app'))
});

gulp.task('config:build', function () {
    gulp.src('./public/app/config.json')
        .pipe(gulpNgConfig('app.config', {
            environment: 'production'
        }))
        .pipe(gulp.dest('./public/app'))
});


gulp.watch('./public/**/*.js',['js:build'], function (event) {
    console.log('Event type: ' + event.type); // added, changed, or deleted
    console.log('Event path: ' + event.path); // The path of the modified file

});

gulp.task('serve', ['config','watch'], function () {

});
// http://paulsalaets.com/posts/setting-angular-config-with-gulp
// http://stackoverflow.com/questions/24591854/using-gulp-to-concatenate-and-uglify-files
gulp.task('js:build', function () {
    return gulp.src(['./public/app/*.js','./public/app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

// gulp.task('serve:dist', ['config:build', 'build'], function () {
//
// });

gulp.task('build', ['js:build','config:build']);

gulp.task('default',['build']);
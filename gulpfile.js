/**
 * Module Dependencies
 */

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    timeRequire = require("time-require");

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true,
        browser: "google chrome"
    });
});


gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
            script: 'app.js',
/*            env: {
                'NODE_ENV': 'development',
                'DEBUG':'*'
            },*/
            ignore: [
                'gulpfile.js',
                'node_modules/'
            ]
        })
        .on('start', function() {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function() {
            setTimeout(function() {
                reload({
                    stream: false
                });
            }, 1000);
        });
});

gulp.task('default', ['browser-sync'], function() {
    // gulp.watch(['public/*.html'], reload);
    gulp.watch("{routes/*.js,views/*.pug,public/**/*.{ttf,woff,eof,svg,html,css,js,png,jpg}}").on('change', browserSync.reload);

});
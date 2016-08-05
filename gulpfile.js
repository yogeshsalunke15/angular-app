'use strict';

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    gutil       = require('gulp-util'),
    clean       = require('gulp-clean'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    cleanCSS    = require('gulp-clean-css'),
    browserify  = require('gulp-browserify'),
    browserSync = require('browser-sync'),
    mainBowerFiles = require('main-bower-files');

var config = {
        host: '127.0.0.1',
        port: '8080',
        path: 'www'     
};

var path = {
        scripts: [  'app/js/*.js', 
                    'app/js/controllers/*.js','app/js/services/*.js',
                    'app/js/directives/*.js'
                 ],
        minjs:  ['bower_components/angular/angular.min.js',
                    'bower_components/angular/angular.min.js.map',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.min.js.map',
                    'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
                    'bower_components/spin.js/spin.min.js',
                    'bower_components/angular-spinner/angular-spinner.min.js'
                ],
        mincss: [   'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/angular-toastr/dist/angular-toastr.min.css',
                    'bower_components/font-awesome/css/font-awesome.min.css'
                ],
        css: 'app/css/*.css',
        fonts: 'bower_components/font-awesome/fonts/*',
        images: 'app/images/*'
    };





    gulp.task('clean', function () {
        return gulp.src('www', {read: false})
            .pipe(clean());
    });

    // gulp.task('bowerCopy', function() {
    //     return gulp.src(mainBowerFiles({ paths: './' }))
    //     .pipe(gulp.dest('www/bower_dependencies'));
    // });

    gulp.task('minifyjs', function() {
      return gulp.src(path.scripts)
        .pipe(browserify())
        .pipe(uglify({mangle:false}))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js'))
    });

    gulp.task('markup', function() {
      return gulp.src('app/**/*.html')
            .pipe(gulp.dest('www'));
    });

     gulp.task('minifycss', function() {
        return gulp.src(path.css)
            .pipe(cleanCSS())
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest('www/css'))
    });

    gulp.task('copyMinifiedJs', function() {
      return gulp.src(path.minjs)
            .pipe(gulp.dest('www/js/resources'))
    });

    gulp.task('copyMinifiedCss', function() {
      return gulp.src(path.mincss)
        .pipe(cleanCSS())
        .pipe(gulp.dest('www/css'))
    });
    
    gulp.task('copyfonts', function() {
        return gulp.src(path.fonts)
            .pipe(gulp.dest('www/fonts'))
    });

    gulp.task('copyimages', function(){
        return gulp.src(path.images)
            .pipe(gulp.dest('www/images'))
    });

    /* minify and then copy the  */
    // gulp.task('bowerCopy', ['compile-ts'], function () {
    //     return gulp.src($.mainBowerFiles({ paths: config.source }), { read: true })
    //             .pipe(gulp.dest(path.join(buildBase, config.BowerDependencies)));
    // });
    
    gulp.task('browserSync', function () {
        browserSync({
            host: config.host,
            open: 'external',
            port: config.port,
            server: {
                 baseDir: config.path
            }
        });
    });

    gulp.task('watch', function () {
        browserSync.reload();
        gulp.watch(['app/**/*.html'], ['start', browserSync.reload]);
        gulp.watch(['app/**/**/*.js'], ['start', browserSync.reload]);
        gulp.watch(['app/**/*.css'], ['start', browserSync.reload]);
    });

    gulp.task('start', function() {
        runSequence('clean','minifyjs','minifycss','markup','copyMinifiedJs','copyMinifiedCss',
                        'copyfonts',
                        'copyimages'
                    );

        gulp.start('browserSync');
        gulp.start('watch');
    });
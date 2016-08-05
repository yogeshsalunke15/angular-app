'use strict';

var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')({
       pattern: [
         'gulp-*',
         'main-bower-files',
         'rimraf',
         'streamqueue',
         'uglify-save-license',
         'wiredep',
         'yargs',
         'browser-sync'
       ]
    }),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config.js'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserSync = require('browser-sync'),
    ngConstant = require('gulp-ng-constant'),
    args = require('yargs').argv,
    isProd = $.yargs.argv.stage === 'prod',
    print = require('gulp-print'),
    concat = require('gulp-concat');
    

    
var config = new Config();
//Path Variables:

var appBase = path.join(config.source, config.sourceApp),
    appScripts = path.join(appBase, (config.AllFiles + config.Period + config.JS)),
    appStyles = path.join(appBase, (config.AllFiles + config.Period+ config.CSS)),
    appFonts = path.join(appBase, config.Fonts, config.AllFiles),
    appImages = path.join(appBase, config.Images, config.AllFiles),
    appMarkup = path.join(appBase, (config.AllFiles + config.Period + config.HTML)),
    appTypeScripts = path.join(appBase, (config.AllFiles + config.Period + config.TS)),
    buildBase = path.join(config.source, config.buildBase),
    buildScripts = path.join(buildBase, config.JS),
    buildStyles = path.join(buildBase, config.CSS),
    buildFonts = path.join(buildBase, config.Fonts),
    buildImages = path.join(buildBase, config.Images),
    buildMarkup = path.join(buildBase, config.Views),
    scripts = path.join(appBase, config.scripts, config.AllFiles),
    bowerdependencies = path.join(buildBase, config.BowerDependencies, config.slash);



/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
 gulp.task('gen-ts-refs', function () {
     var target = gulp.src(path.join(appBase, config.TypeScriptReferenceFile));
     var sources = gulp.src([appTypeScripts], { read: false });
     return target.pipe(inject(sources, {
         starttag: '//{',
         endtag: '//}',
         transform: function (filepath) {
             return '/// <reference path="../..' + filepath + '" />';
         }
     })).pipe(gulp.dest(path.join(config.source,config.Typings)));
 });

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(appTypeScripts).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', ['clean'], function () {
    var sourceTsFiles = [appTypeScripts,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files

    //console.log('inside compiler:' + JSON.stringify(sourceTsFiles));

    var tsResult = gulp.src(sourceTsFiles)
                     .pipe(sourcemaps.init())
                     .pipe(tsc(tsProject));


    //console.log('inside compiler, after compile:' + tsResult);
    //gulp.dest(buildScripts)
    tsResult.dts.pipe(gulp.dest(buildScripts));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe($.if(isProd, $.angularFilesort()))
                    .pipe($.if(isProd, $.ngAnnotate()))
                    .pipe($.if(isProd, $.uglify()))
                    .pipe($.if(isProd, $.rev()))
                    .pipe(gulp.dest(buildScripts));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
    //var typeScriptGenFiles = [
    //                            path.join(buildScripts,'/**/*.js'),    // path to all JS files auto gen'd by editor
    //                            path.join(buildScripts, '/**/*.js.map'), // path to all sourcemap files auto gen'd by editor
    //                            '!' + config.buildDir + '/lib'
    //];

    // delete the files
    return $.rimraf(buildBase,cb);
});

gulp.task('markup', ['clean'], function () {
    return gulp.src([
      appMarkup
    ])
       .pipe(gulp.dest(buildMarkup));
});


// compile styles and copy into build directory
gulp.task('styles', ['clean'], function () {
	var cssFilter = $.filter(appStyles);
	return gulp.src([
      appStyles
    ])
/*      .pipe($.if(isProd, $.cssmin()))
      .pipe($.rev())
      .pipe(concat('style.min.css'))*/
      .pipe(gulp.dest(buildStyles))
	  .pipe(cssFilter.restore());
});

// copy fonts from Bower and custom fonts into build directory
gulp.task('fonts', ['clean'], function () {
    var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff}');
    return gulp.src(
        $.mainBowerFiles().concat([appFonts]))
      .pipe(fontFilter)
      .pipe(gulp.dest(buildFonts))
      .pipe(fontFilter.restore());
});

// copy and optimize images into build directory
gulp.task('images', ['clean'], function () {   
    return gulp.src(appImages)
      .pipe($.if(isProd, $.imagemin()))
      .pipe(gulp.dest(buildImages));
});
// copy and optimize external js into build directory
gulp.task('scripts', ['clean'], function () {
    return gulp.src(scripts)
            .pipe(gulp.dest(buildScripts))
});

// copy bower components into build directory
gulp.task('bowerCopy', ['compile-ts', 'markup', 'styles', 'images', 'fonts', 'scripts', 'Inject-Image-chosen-sprite'], function () {
    return gulp.src($.mainBowerFiles({ paths: config.source }), { read: true })
            .pipe(gulp.dest(path.join(buildBase, config.BowerDependencies)));
});


gulp.task('constant', ['clean'], function () {
    var hostName = 'localhost';
    var selectedConstant = args.stage || 'dev'; // if --env is not declared, assume dev
    var constants = {
        dev: {
            envConfig: {
            	'ApiHost':'http://' + hostName + '/KSPS.Client.WebApi/',
                'apiUrl': 'http://' + hostName + '/KSPS.Client.WebApi/api/',
            }
        },
        prod: {
            envConfig: {
                'apiUrl': '',
            }
        },
        stage: {
            envConfig: {
                'apiUrl': '',
            }
        },
        qa: {
            envConfig: {
                'apiUrl': '',
            }
        }
    }
    return ngConstant({
        name: 'KochFdc.envConfigConstant', // name of your module
        constants: constants[selectedConstant],
        stream: true
    })
    .pipe(gulp.dest(buildConfig.buildENVConfigConstant));
});

// inject custom CSS and JavaScript into index.html
gulp.task('inject', ['bowerCopy'], function () {
    var jsFilter = $.filter(path.join(buildScripts, config.AllFiles));
    var cssFilter = $.filter(path.join(buildStyles, config.AllFiles));
    return gulp.src(path.join(config.source,'index.html'))
            .pipe($.inject(gulp.src([
                path.join(buildScripts, config.AllFiles),
                path.join(buildStyles, config.AllFiles),
                '!' + path.join(buildBase, config.BowerDependencies, config.AllFiles)
                //,'!' + path.join(buildStyles, config.Dependencies, config.AllFiles)
            ])
      .pipe(jsFilter)
      .pipe($.angularFilesort())
      .pipe(jsFilter.restore()), {
          addRootSlash: false,
          ignorePath: buildBase
      }))
         .pipe($.wiredep.stream({
             fileTypes: {
                 html: {
                     replace: {
                         css: function (filePath) {
                             return '<link rel="stylesheet" href="' + path.join(config.BowerDependencies, filePath.split('/').pop()).replace(/\\/g, '/') + '">';
                         },
                         js: function (filePath) {
                             return '<script src="' + path.join(config.BowerDependencies, filePath.split('/').pop()).replace(/\\/g, '/') + '"></script>';
                         }
                     }
                 }
             }
         }))
      .pipe(gulp.dest(buildBase));
});


// inject bower components into index.html
gulp.task('bowerInject', ['bowerCopy'], function () {
    if (isProd) {
        return gulp.src(path.join(config.source, 'index.html'))
          .pipe($.inject(gulp.src([
            path.join(buildScripts, 'vendor*.css'),
            path.join(buildStyles,'vendor*.js')
          ], {
              read: false
          }), {
              starttag: '<!-- bower:{{ext}} -->',
              endtag: '<!-- endbower -->',
              addRootSlash: false,
              ignorePath: buildBase
          }))
          .pipe($.htmlmin({
              collapseWhitespace: true,
              removeComments: true
          }))
          .pipe(gulp.dest(buildBase));
    } else {
        return gulp.src(path.join(config.source, 'index.html'))
          .pipe($.wiredep.stream({
              fileTypes: {
                  html: {
                      replace: {
                          css: function (filePath) {
                              return '<link rel="stylesheet" href="' + buildStyles.replace(buildBase, '') +
                                filePath.split('/').pop() + '">';
                          },
                          js: function (filePath) {
                              return '<script src="' + buildScripts.replace(buildBase, '') +
                                filePath.split('/').pop() + '"></script>';
                          }
                      }
                  }
              }
          }))
          .pipe(gulp.dest(buildBase));
    }
});


gulp.task('watch', function () {
   //gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
   $.browserSync.reload();
  gulp.watch([path.join(config.sourceApp,'**/*')], ['build', $.browserSync.reload]);
});


gulp.task('browserSync', function () {
  $.browserSync({
    host: config.host,
    open: 'external',
    port: config.port,
    server: {
      baseDir: path.join(config.buildBase,config.slash)
    }
  });
});

gulp.task('Inject-Image-chosen-sprite', ['clean'], function () {
    return gulp.src(path.join(appBase, config.Images, config.chosensprite)).pipe(gulp.dest(bowerdependencies));
});

gulp.task('build', ['ts-lint', 'inject']);

gulp.task('dev', ['build'], function () {
    gulp.start('browserSync');
    gulp.start('watch');
});
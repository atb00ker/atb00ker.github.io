var gulp = require('gulp'),
    makeCSS = require('gulp-sass'),
    minifyCSS = require('gulp-csso'),
    htmlmin = require('gulp-html-minifier'),
    browserSync = require('browser-sync').create();

/** Declaring all the paths **/
var paths = {
  styles: {
    main: 'statics/scss/main.scss',
    src: 'statics/scss/*.scss',
    dest: './../assets/css/'
  },
  scripts: {
    src: 'statics/js/*.js',
    dest: './../assets/js/'
  },
  html: {
    src: 'templates/**/*.html',
    dest: '../'
  }
};

gulp.task('scss', function(){
    return gulp.src(paths.styles.main)
    .pipe(makeCSS())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('init-browser-sync', function() {
    browserSync.init({
        server: { baseDir: paths.html.dest }
    });
});

gulp.task('minify-html', function() {
    return gulp.src(paths.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('watch', function(){
    gulp.start("init-browser-sync");
    gulp.watch(paths.styles.src, ['scss', browserSync.reload]);
    gulp.watch(paths.html.src, ['minify-html', browserSync.reload]);
});

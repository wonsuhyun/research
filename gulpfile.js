var gulp = require('gulp');
var del = require('del');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

var root = './html';
var path = {
    in: {
        html: root,
        html_page: root + '/*.html',
        html_include: root + '/include',
    },
    out: {
        html: root + '/view',
    }
};

function browserOpen(done) {
    browserSync.init({
        server: {
            baseDir: root
        },
        directory: true,
        port: 3000
    });
    done();
}

function clean() {
    return del([ path.out.html ], { force: true });
}

function html() {
    return gulp
        .src(path.in.html_page)
        .pipe(fileInclude({
            basepath: path.in.html_include
        }))
        .pipe(gulp.dest(path.out.html));
}

function watchFiles() {
    gulp.watch(path.in.html_page, html ).on('change', browserSync.reload);
}

var build = gulp.series(clean, gulp.parallel(html));
var watch = gulp.series(build, browserOpen, watchFiles);

exports.html = html;
exports.clean = clean;
exports.build = build;
exports.view = browserOpen;
exports.default = watch;
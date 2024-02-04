const gulp = require('gulp');


const fileInclude = require('gulp-file-include');
gulp.task('html', function(){
    return gulp.src('./src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))

        .pipe(gulp.dest('./dist/'));
});


const sass = require('gulp-sass')(require('sass'));
gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
});


const fs = require('fs');
const clean = require('gulp-clean');
gulp.task('clean', function(done){

    if(!fs.existsSync('./dist')){
        return gulp.src('./dist/', {read: false})
            .pipe(clean({farce: true}))
    }

    done();
})


gulp.task('images', function(){
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
});

const server = require('gulp-server-livereload');
gulp.task('server', function(){
    return gulp.src('./dist')
        .pipe(server({
            livereload: true,
            open: true
        }))
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'images'),
    gulp.parallel('server')
))
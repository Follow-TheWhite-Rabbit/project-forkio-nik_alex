
// import gulp from'gulp';
// import concat from'gulp-concat';
// import clean from'gulp-clean';
// import imagemin from'gulp-imagemin';
// import BS from 'browser-sync';
// const  browserSync = BS.create();
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';
// const sass = gulpSass(dartSass);
//
//
// const concatJsFunc = () => gulp.src('src/js/**/*')
//     .pipe(concat("all.js"))
//     .pipe(gulp.dest('dist/js'));
//
//
// const convertCss = () => gulp.src('src/scss/**/*', { nodir: true })
//     .pipe(sass())
//     .pipe(concat('styles.min.css'))
//     .pipe(gulp.dest('dist/css'));
//
//
// const minifyImages = () => gulp.src('src/img/**/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img'))
//
//
// const cleanDist = () => gulp.src('dist/*', {read: false}).pipe(clean())
//
//
// gulp.task('concatJs', concatJsFunc);
// gulp.task('convertCss', convertCss);
// gulp.task('minifyImages', minifyImages);
// gulp.task('cleanDist', cleanDist);
// gulp.task('build', gulp.series('cleanDist','concatJs','convertCss','minifyImages'));
// gulp.task('buildCreatingProject', gulp.series(cleanDist, convertCss, concatJsFunc, minifyImages));
//
//
//
// const startWatching = () => {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
//     gulp.watch('src/**/*').on('change', gulp.series(convertCss,concatJsFunc,minifyImages, browserSync.reload))
//
// }
//
// gulp.task('dev', startWatching);


const gulp = require('gulp')
const sass = require('gulp-sass') (require('sass'))
const clean = require('gulp-clean')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const minifyjs = require('gulp-js-minify')
const concat = require('gulp-concat')

// import gulp from 'gulp'
// import imagemin from 'gulp-imagemin'

const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline



///////////////////////////////////////////////////////////////////////////////////////   (рабочие задания в самом низу)

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./src/js/**/*.js', browserSync.reload);
})

gulp.task('delete', function () {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean())
})

// exports.default = () => (
//     gulp.src('./src/scss/**/*.scss')
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(gulp.dest('./dist/css'))
// )

gulp.task('default', function () {
    return gulp.src('./dist/css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('minify-css', () => {
    return gulp.src('./dist/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('minify-js', function(){
    gulp.src('./dist/js/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'))
})

// export default () => (
//     gulp.src('./src/img/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'))
// )

gulp.task('img', function () {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

})

gulp.task('compress', function () {
    return pipeline(
        gulp.src('./src/js/**/*.js'),
        uglify(),
        gulp.dest('./dist/js')
    )
})



//////////////////////////////////     рабочие задания       ////////////////////////////////////////////////



gulp.task('build', gulp.series('delete', 'sass', 'default', 'minify-css', 'scripts', 'img'))

gulp.task('dev', gulp.series('browser-sync', 'watch'))


import gulp from'gulp';
import concat from'gulp-concat';
import clean from'gulp-clean';
import imagemin from'gulp-imagemin';
import BS from 'browser-sync';
const  browserSync = BS.create();
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);


const concatJsFunc = () => gulp.src('src/js/**/*')
    .pipe(concat("all.js"))
    .pipe(gulp.dest('dist/js'));


const convertCss = () => gulp.src('src/scss/**/*', { nodir: true })
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css'));


const minifyImages = () => gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))


const cleanDist = () => gulp.src('dist/*', {read: false}).pipe(clean())


gulp.task('concatJs', concatJsFunc);
gulp.task('convertCss', convertCss);
gulp.task('minifyImages', minifyImages);
gulp.task('cleanDist', cleanDist);
gulp.task('build', gulp.series('cleanDist','concatJs','convertCss','minifyImages'));
gulp.task('buildCreatingProject', gulp.series(cleanDist, convertCss, concatJsFunc, minifyImages));



const startWatching = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/**/*').on('change', gulp.series(convertCss,concatJsFunc,minifyImages, browserSync.reload))

}

gulp.task('dev', startWatching);
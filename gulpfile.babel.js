import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins({
  DEBUG: true,
  camelize: true,
});
const reload = browserSync.reload;

gulp.task('sass', () => {
  return gulp.src('app/public/scss/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', () => {
  return gulp.src(['app/public/scripts/**/*.js', '!app/public/scripts/sw/sw.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(reload({stream:true}));
});

gulp.task('sw', () => {
  return gulp.src('app/public/scripts/sw/sw.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./build"
    });
});

gulp.task('watch', function() {
  gulp.watch('app/public/scss/*.scss', ['sass']);
  gulp.watch('app/public/scripts/**/*.js', ['scripts']);
  gulp.watch('app/*.html', ['copy:html']);
})

gulp.task('copy:html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
})

gulp.task('clean', function() {
  del(['build']).then(() => {
    console.log('Cleaned build directory.')
  });
})

gulp.task('serve', function() {
  runSequence('clean', ['sass', 'scripts', 'sw', 'copy:html'], ['browser-sync', 'watch'])
})

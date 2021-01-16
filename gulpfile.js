const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const configured_typescript = typescript.createProject("tsconfig.json");

const rimraf = require('rimraf');

gulp.task('clean', (cb) => {
	rimraf('product', cb);
});

gulp.task('compile', () => {
	return gulp.src([
		'app.ts',
	], {base: './'})
		.pipe(sourcemaps.init())
		.pipe(configured_typescript())
		.js
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series('clean', 'compile'), () => {

});





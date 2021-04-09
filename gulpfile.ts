const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const configured_typescript = typescript.createProject("server_tsconfig.json");

gulp.task('compile', () => {
	return gulp.src([
		'app.ts',
		'models/**/*.ts',
		'routes/**/*.ts',
	], {base: './'})
		.pipe(sourcemaps.init())
		.pipe(configured_typescript())
		.js
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));
});

gulp.task('build', () => {

	return gulp.src([
		'bin/www',
		'public/**/*.js',
		'public/**/*.css',
		'public/**/*.html',
		'public/images/**/*.*',
		'public/iconfont/**/*.*',
		'public/favicon/**/*.*',
		'models/**/*.js',
		'routes/**/*.js',
		'views/**/*.jade',
		'app.js',
		'package.json',
		'package-lock.json',
	], {base: './', allowEmpty: true})
		.pipe(gulp.dest('product'));

});

gulp.task('default', gulp.series('compile', 'build'), () => {

});





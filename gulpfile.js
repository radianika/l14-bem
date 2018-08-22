var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
	},
	src: {
		html: 'src/*.html',
		js: 'src/script/main.js',
		style: 'src/css/main.scss',
		img: 'src/img/'
	},
	watch: {
		html: 'src/*.html',
		js: 'src/sctipt/**/*.js',
		style: 'src/css/**/*.scss',
		img: 'src/img',
	},
};
gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
});
gulp.task('img:build', function(){
	gulp.src(path.src.img)
	.pipe(gulp.dest(path.build.img))
});
gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest(path.build.css))
});
gulp.task('js:build', function () {
	gulp.src(path.src.js)
.pipe(gulp.dest(path.build.js))
});
gulp.task('browser-sync', function () { 
	browserSync({ 
		server: { 
			baseDir: 'build'
		},
		notify: false 
	});
});

gulp.task('watch', ['browser-sync', 'style:build'], function () {
	gulp.watch('src/css/*.scss', ['style:build']);
	gulp.watch('src/css/*.css', ['style:build']);
	gulp.watch('src/img/', ['img:build']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('src/script/*.js', browserSync.reload);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
]);

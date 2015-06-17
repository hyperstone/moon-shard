var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var source = require('vinyl-source-stream');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var download = require('gulp-download');
var runSequence = require('run-sequence');

var path = {
	HTML: 'web/src/index.html',
	
	OUT: 'build.js',
	MINIFIED_OUT: 'build.min.js',
	
	DEST: 'web/dist',
	DEST_BUILD: 'web/dist/build',
	DEST_SRC: 'web/dist/src',
	ENTRY_POINT: 'web/src/components/main.jsx',

	IMAGES: ['web/src/images/**/*'],
	DEST_IMAGES: 'web/dist/images',

	DOWNLOADS: 'web/lib',

	semanticUI: 'web/lib/semantic.min.js',
	jQuery: 'web/lib/jquery.min.js'
};

var url = {
	semanticUI: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.12.3/semantic.min.js',
	jQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js'
};

var browserifyArguments = {
	transform: [reactify],
	shim: {
		'jQuery': {
			path: path.jQuery,
			exports: '$'
		},
		'semantic-ui': {
			path: path.semanticUI,
			exports: null,
			depends: {
				jQuery: 'jquery'
			}
		}
	}
};

gulp.task('copyHTML', function () {
	return gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});

gulp.task('copyImages', function () {
	return gulp.src(path.IMAGES)
		.pipe(gulp.dest(path.DEST_IMAGES));
});

gulp.task('downloadSemantic', function () {
	return download(url.semanticUI)
		.pipe(gulp.dest(path.DOWNLOADS));
});

gulp.task('downloadJQuery', function () {
	return download(url.jQuery)
		.pipe(gulp.dest(path.DOWNLOADS));
});

gulp.task('build', function () {
	return gulp.src(path.ENTRY_POINT)
		.pipe(browserify(browserifyArguments))
		// .pipe(streamify(uglify()))
		.pipe(rename(function (path) {
			path.basename = 'app';
			path.extname = '.js';
		}))
		.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildUgly', function () {
	return gulp.src(path.ENTRY_POINT)
		.pipe(browserify(browserifyArguments))
		.pipe(streamify(uglify()))
		.pipe(rename(function (path) {
			path.basename = 'app';
			path.extname = '.js';
		}))
		.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('production', function (callback) {
	runSequence(
		['copyHTML', 'copyImages'],
		['downloadSemantic', 'downloadJQuery'],
		'buildUgly',
		callback
	);
});

gulp.task('default', function (callback) {
	runSequence(
		['copyHTML', 'copyImages'],
		['downloadSemantic', 'downloadJQuery'],
		'build',
		callback
	);
});

// var watchify = require('watchify');
// gulp.task('watch', function () {
// 	gulp.watch(path.HTML, ['copy']);

// 	var watcher = watchify(browserify({
// 		entries: [path.ENTRY_POINT],
// 		transform: [reactify],
// 		debug: true,
// 		cache: {},
// 		packageCache: {},
// 		fullPaths: true
// 	}));

// 	watcher.on('update', function () {
// 		watcher.bundle()
// 			.pipe(source(path.OUT))
// 			.pipe(gulp.dest(path.DEST_SRC));
// 		console.log('updated');
// 	})
// 		.bundle()
// 		.pipe(source(path.OUT))
// 		.pipe(gulp.dest(path.DEST_SRC));
// });

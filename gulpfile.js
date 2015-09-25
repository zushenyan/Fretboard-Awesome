"use strict";
// dependences
var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var maps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var babelify = require("babelify");
var browserSync = require("browser-sync").create();
var del = require("del");

// variables
var version = "0.1.0";
var appName = "FretboardAwesome" + "-" + version;
var debug = true;

// paths
var sassFiles = "src/sass/**/*.scss";
var sassMainFile = "src/sass/Main.scss";
var cssDirPath = "src/css/";
var cssDirAllFiles = cssDirPath + "*";
var cssBundleFile = appName + ".css";
var cssBundleFilePath = cssDirPath + cssBundleFile;

var babelFiles = "src/babel/**/*.js";
var babelMainFile = "src/babel/Main.js";
var jsDirPath = "src/js/";
var jsDirAllFiles = jsDirPath + "*";
var jsBundleFile = appName + ".js";
var jsBundleMinFile = appName + ".min.js";
var jsBundleMinFilePath = jsDirPath + jsBundleMinFile;

var testFiles = "src/test/**/*.js";
var htmlFiles = "src/**/*.html";

var distPath = "dist/";
var distAppPath = distPath + appName + "/";
var distCssPath = distAppPath + "css/";
var distJsPath = distAppPath + "js/";

function errorHandler(err){
	console.log(err.toString());
	gutil.beep();
	this.emit("end");
}

gulp.task("clean", function(){
	return del([cssDirPath, jsDirPath, distPath]);
});

gulp.task("compileSass", function(){
	return gulp.src(sassMainFile)
		.pipe(rename(cssBundleFile))
		.pipe(maps.init())
		.pipe(sass().on("error", errorHandler))
		.pipe(maps.write("."))
		.pipe(gulp.dest(cssDirPath));
});

gulp.task("compileBabel", function(){
	return browserify(babelMainFile, { debug: debug }) // produce source map by enabling debug = true
		.transform(babelify)
		.bundle()
		.on("error", errorHandler)
		.pipe(source(jsBundleFile))
		.pipe(gulp.dest(jsDirPath));
});

gulp.task("minifyJs", ["compileBabel"], function(){
	return gulp.src(jsDirPath + "/" + jsBundleFile)
		.pipe(uglify())
		.pipe(rename(jsBundleMinFile))
		.pipe(gulp.dest(jsDirPath));
});

gulp.task("watch",  ["clean", "compileSass", "compileBabel"], function(){
	browserSync.init({
		server: "./"
	});
	gulp.watch(sassFiles, ["compileSass"]).on("change", browserSync.reload);
	gulp.watch(babelFiles, ["compileBabel"]).on("change", browserSync.reload);
	gulp.watch(htmlFiles, browserSync.reload);
	gulp.watch(testFiles, browserSync.reload);
})

gulp.task("build", ["clean", "compileSass", "minifyJs"]);

gulp.task("product", ["build"], function(){
	gulp.src(jsDirAllFiles)
	.pipe(gulp.dest(distJsPath));
	gulp.src(cssDirAllFiles)
	.pipe(gulp.dest(distCssPath));
});

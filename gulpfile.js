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

// paths
var sassPath = "src/sass";
var sassFiles = "src/sass/**/*.scss";
var sassMainFile = "src/sass/fretboard-awesome.scss";
var compiledSassPath = "src/css";

var babelFiles = "src/babel/**/*.js";
var babelMainFile = "src/babel/fretboard-awesome.js";
var compiledBabelPath = "src/js";
var jsBundleFile = "fretboard-awesome.js";
var jsBundleMinFile = "fretboard-awesome.min.js";

var testFiles = "src/test/**/*.js";
var htmlFiles = "src/*.html"

var debug = true;

function errorHandler(err){
	console.log(err.toString());
	gutil.beep();
	this.emit("end");
}

gulp.task("clean", function(){
	return del([compiledSassPath, compiledBabelPath]);
});

gulp.task("compileSass", function(){
	return gulp.src(sassMainFile)
		.pipe(maps.init())
		.pipe(sass().on("error", errorHandler))
		.pipe(maps.write("."))
		.pipe(gulp.dest(compiledSassPath));
});

gulp.task("compileBabel", function(){
	return browserify(babelMainFile, { debug: debug }) // produce source map by enabling debug = true
		.transform(babelify)
		.bundle()
		.on("error", errorHandler)
		.pipe(source(jsBundleFile))
		.pipe(gulp.dest(compiledBabelPath));
});

gulp.task("minifyJs", ["compileBabel"], function(){
	return gulp.src(compiledBabelPath + "/" + jsBundleFile)
		.pipe(uglify())
		.pipe(rename(jsBundleMinFile))
		.pipe(gulp.dest(compiledBabelPath));
});

gulp.task("watch",  ["clean", "compileSass", "compileBabel"], function(){
	browserSync.init({
		server: "./"
	})
	gulp.watch(sassFiles, ["compileSass"]).on("change", browserSync.reload);
	gulp.watch(babelFiles, ["compileBabel"]).on("change", browserSync.reload);
	gulp.watch(htmlFiles, browserSync.reload);
	gulp.watch(testFiles, browserSync.reload);
})

gulp.task("build", ["clean", "compileSass", "minifyJs"]);

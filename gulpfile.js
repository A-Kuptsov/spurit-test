const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const server = require("browser-sync").create();

gulp.task("css:build", function() {
  return gulp
    .src("src/css/*.css")
    .pipe(concat("style.css"))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css/"));
});

gulp.task("js:build", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js/"));
});

gulp.task("fonts", function() {
  return gulp.src("src/fonts/**/*.*").pipe(gulp.dest("dist/fonts/"));
});
gulp.task("img", function() {
  return gulp.src("src/img/**/*.*").pipe(gulp.dest("dist/img/"));
});
gulp.task("html", function() {
  return gulp.src("src/**/*.html").pipe(gulp.dest("dist"));
});

gulp.task("clean", function(callback) {
  rimraf("dist/*", callback);
});

gulp.task("server", function() {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp
    .watch("src/css/*.css", gulp.series("css:build"))
    .on("change", server.reload);
  gulp.watch("src/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task(
  "build",
  gulp.series("clean", "html", "img", "fonts", "js:build", "css:build")
);

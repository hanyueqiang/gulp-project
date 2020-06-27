const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const del = require("del");

gulp.task("clean", async () => {
  await del("./dist");
});

// 压缩html代码
gulp.task("html", async () => {
  await gulp
    .src("./*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("./dist"));
});

// 压缩image
// gulp.task("image", async () => {
//   await gulp.src("./*.png").pipe(imagemin()).pipe(gulp.dest("./dist"));
// });

// Images打包压缩代码
gulp.task("images", function () {
  return gulp.src("./*.png").pipe(cache(imagemin())).pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("clean", gulp.parallel("html", "images")));

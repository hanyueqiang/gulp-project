const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css"); // 压缩css
const sass = require("gulp-sass");
const del = require("del");

// clean任务，清空dist目录
gulp.task("clean", async () => {
  await del(["./dist"]);
});

// sass任务 实现scss文件编译/合并/压缩
gulp.task("sass", async () => {
  await gulp
    .src(["./main.scss", "./a.scss", "./b.scss"])
    .pipe(sass())
    .pipe(concat("scss.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("./"));
});

// css任务，压缩/合并
gulp.task("css", async () => {
  await gulp
    // .src(["./*.css"])
    .src(["./scss.css", "./main.css"])
    .pipe(concat("vender.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("./dist"));
});

gulp.task("mixCss", async () => {
  await gulp
    .src(["./*.scss", "./*.css"])
    .pipe(sass())
    .pipe(concat("style.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("./dist"));
});

// 先执行clean任务,并行执行sass和css任务
gulp.task("default", gulp.series("clean", "mixCss"));

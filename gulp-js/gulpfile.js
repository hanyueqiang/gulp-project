const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const eslint = require("gulp-eslint");
const uglife = require("gulp-uglify");
const del = require("del");

// 合并压缩文件
const jsFile = ["./main.js", "./a.js", "./b.js"];

// eslint任务，代码检测和基础格式化
gulp.task("eslint", async () => {
  await gulp
    .src(jsFile)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// clean任务，清空dist文件
gulp.task("clean", async () => {
  await del(["./dist"]);
});

// jsCompress任务，js转换/合并/压缩
gulp.task("jsCompress", async () => {
  await gulp
    .src(jsFile)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(uglife())
    .pipe(gulp.dest("./dist/"));
});

// 串行执行clean/eslint/jsCompress任务
gulp.task("default", gulp.series("clean", "eslint", "jsCompress"));

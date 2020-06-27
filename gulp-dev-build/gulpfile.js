const gulp = require("gulp");
const babel = require("gulp-babel"); // es6转为es5语法
const eslint = require("gulp-eslint"); // eslint代码检测
const concat = require("gulp-concat"); // 文件合并
const uglify = require("gulp-uglify"); // js压缩
const sass = require("gulp-sass"); // sass编译
const htmlmin = require("gulp-htmlmin"); // html压缩
const connect = require("gulp-connect"); // 起server服务
const imagemin = require("gulp-imagemin"); // 图片压缩
const del = require("del"); // 清空目录
const cleanCss = require("gulp-clean-css"); // css压缩

gulp.task("clean", async () => {
  await del(["./dist"]);
});

gulp.task("htmlMin", async () => {
  await gulp
    .src("./index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("./dist"));
});

// html:dev task 开发环境自动刷新
gulp.task("html:dev", async () => {
  await htmlmin().pipe(connect.reload());
});

// html:dev task 开发环境自动刷新
gulp.task("html:build", async () => {
  await htmlmin();
});

// sass压缩合并
const cssMin = () => {
  return gulp
    .src(["./css/main.scss", "./css/*.css"])
    .pipe(sass())
    .pipe(concat("style.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("./dist/css"));
};

// css任务，用于开发环境
gulp.task("css:dev", async () => {
  await cssMin().pipe(connect.reload());
});

// css任务，用于开发环境
gulp.task("css:build", async () => {
  await cssMin();
});

// js lint检测/babel转化/合并/压缩
const jsMin = () => {
  return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
};

// js:dev任务
gulp.task("js:dev", async () => {
  await jsMin().pipe(connect.reload());
});

// js:build任务
gulp.task("js:build", async () => {
  await jsMin();
});

// 图片压缩公共函数

const imageMin = () => {
  return gulp.src("./img/*.png").pipe(imagemin()).pipe(gulp.dest("./dist/img"));
};

// image:dev任务
gulp.task("image:dev", async () => {
  await imageMin().pipe(connect.reload());
});

// image:build任务
gulp.task("image:build", async () => {
  await imageMin();
});

// server任务，目录dist,入口dist/index.html, port 8080
gulp.task("server", () => {
  connect.server({
    root: "./dist",
    port: 8080,
    livereload: true,
  });
});

// watch任务，监听源文件变化
gulp.task("watch", () => {
  gulp.watch(["./css/*.css", "./css/*.scss"], gulp.series("css:dev"));
  gulp.watch("./js/*.js", gulp.series("js:dev"));
  gulp.watch("./index.html", gulp.series("html:dev"));
  gulp.watch("./img/*.png", gulp.series("image:dev"));
});

// dev任务，启动开发环境
gulp.task("dev", gulp.series(gulp.parallel("watch", "server")));

// build任务，生产环境打包压缩
gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("html:build", "js:build", "css:build", "image:build")
  )
);

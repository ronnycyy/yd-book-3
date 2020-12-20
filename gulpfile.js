const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

// 拿到所有js，作为入口
let entry = './src/server/**/*.js';
let cleanEntry = './src/server/config/index.js';

// 开发环境 es6模块化语法编译转commonjs
function builddev() {
  return watch(
    entry,
    {
      ignoreInitial: false,
    },
    () =>
      gulp
        .src(entry)
        .pipe(plumber())
        .pipe(
          babel({
            babelrc: false, //不使用根目录下的.babelrc文件
            // 使用babel插件编译模块语法为commonjs
            plugins: ['@babel/plugin-transform-modules-commonjs'],
          })
        )
        .pipe(gulp.dest('dist'))
  );
  // .dest('dist'): 打包到dist目录
}

// 线上环境 es6模块化语法编译转commonjs
function buildprod() {
  gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false, //不使用根目录下的.babelrc文件
        ignore: [cleanEntry],
        // 使用babel插件编译模块语法为commonjs
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('dist'));
}

// 代码清洗
function buildconfig() {}

// 根据执行环境，切换任务
let build = gulp.series(builddev);
if (process.env.NODE_ENV === 'production') {
  /** .series: 串行执行任务 */
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build);

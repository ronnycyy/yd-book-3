const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

// 拿到所有js，作为入口
let entry = './src/server/**/*.js';
// 单独进行代码清洗的js
// 希望线上环境时只出现线上配置代码，删除开发配置代码
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
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false, //不使用根目录下的.babelrc文件
        // 忽略清洗代码，统一到buildconfig处理
        ignore: [cleanEntry],
        // 使用babel插件编译模块语法为commonjs
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('dist'));
}

// 代码清洗
function buildconfig() {
  return (
    gulp
      .src(entry)
      .pipe(
        rollup({
          // 指定要清洗的js代码
          input: cleanEntry,
          // 指定输出格式为commonjs
          output: {
            format: 'cjs'
          },
          plugins: [
            replace({
              'process.env.NODE_ENV': JSON.stringify('production'),
            })
          ]
        })
      )
      .pipe(gulp.dest('./dist'))
  );
}

// 根据执行环境，切换任务
let build = gulp.series(builddev);
if (process.env.NODE_ENV === 'production') {
  /** .series: 串行执行任务 */
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build);

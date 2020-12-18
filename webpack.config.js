const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const { sync } = require('glob');

// 容错处理，如果读取失败，使用development
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const files = sync('./src/web/views/**/*.entry.js'); //匹配所有入口文件
let _entry = {};
for (let item of files) {
  if (/([a-zA-Z]+-[a-zA-Z]+).entry.js/.test(item)) {
    const key = RegExp.$1;
    _entry[key] = item;
  }
}
console.log(_entry);

const webpackConfig = {};
module.exports = merge(webpackConfig, _mergeConfig);

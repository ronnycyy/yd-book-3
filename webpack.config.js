const { argv } = require('yargs');
const { merge } = require('webpack-merge');

// 容错处理，如果读取失败，使用development
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const webpackConfig = {};
module.exports = merge(webpackConfig, _mergeConfig);

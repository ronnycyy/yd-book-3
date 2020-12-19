const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const { sync } = require('glob');
// 打包组件的html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 容错处理，如果读取失败，使用development
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const files = sync('./src/web/views/**/*.entry.js'); //匹配所有入口文件
let _entry = {};
let _plugins = [];
for (let item of files) {
  if (/([a-zA-Z]+-[a-zA-Z]+).entry.js/.test(item)) {
    const key = RegExp.$1; /** 'books-create', ..  */
    _entry[
      key
    ] = item; /** './src/web/views/books/books-create.entry.js', ..  */
    const [dist, template] = key.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html` /** 打包后的目录 */,
        template: `./src/web/views/${dist}/pages/${template}.html`,
        chunks: ['rumtime', key],
        // inject: false
      })
    );
  }
}

const webpackConfig = {
  entry: _entry /** 配置组件的入口文件 */,
  optimization: {
    runtimeChunk: 'single' /** 提取公共的运行时代码 */,
  },
  plugins: [..._plugins],
};

module.exports = merge(webpackConfig, _mergeConfig);

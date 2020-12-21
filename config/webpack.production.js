// 标准化配置路径  windows:\  unix:/
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;

module.exports = {
  output: {
    // __dirname 代表项目根目录
    path: join(__dirname, '../dist/assets'),
    // 增加哈希值, xx.123456abc.bundle.js
    // 默认5位哈希值
    filename: 'scripts/[name].[contenthash:5].bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: join(__dirname, '../src/web/views/layouts/layout.html'), //此处相对于 根/config 目录
          to: '../views/layouts/layout.html', //此处相对于 根/dist/assets
        },
        {
          from: join(__dirname, '../src/web/components/**/*.html'),
          to: '../components',
          transform(content, absoluteFrom) {
            // content: buffer, minify need string
            // 代码压缩
            let result = minify(content.toString('utf-8'), {
              // 配置打包成一行
              collapseWhitespace: true
            })
            return result;
          },
          transformPath(targetPath, absolutePath) {
            return targetPath.replace('src/web/components', '');
          },
        },
      ],
    }),
  ],
};

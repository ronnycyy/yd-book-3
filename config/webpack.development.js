// 标准化配置路径  windows:\  unix:/
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    // __dirname 代表项目根目录
    path: join(__dirname, '../dist/assets'),
    filename: 'scripts/[name].bundle.js',
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
          transformPath(targetPath, absolutePath) {
            return targetPath.replace('src/web/components', '');
          },
        },
      ],
    }),
  ],
};

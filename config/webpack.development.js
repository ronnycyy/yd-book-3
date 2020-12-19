// 标准化配置路径  windows:\  unix:/
const { join } = require('path');

module.exports = {
  output: {
    // __dirname 代表项目根目录
    path: join(__dirname, '../dist/assets'),
    filename: 'scripts/[name].bundle.js',
  },
};

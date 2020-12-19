const HtmlWebpackPlugin = require('html-webpack-plugin');
// 手写webpack插件
const pluginName = 'HtmlAfterPlugin';

// 拼接script标签
const assetHelp = (data) => {
  let js = [];
  for (let item of data.js) {
    /**
      data.js = [
        '../../../assets/scripts/runtime.bundle.js',
        '../../../assets/scripts/books-list.bundle.js'
      ]
    */
    js.push(`<script src="${item}"></script>`);
  }
  return {
    js,
  };
};

class HtmlAfterPlugin {
  constructor() {
    console.log('I am constructor');
    this.jsArr = [];
  }

  // webpack的核心complier
  // 跑在构建之前
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      console.log('webpack 构建开始');

      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html;
          _html = data.html.replace('<!-- injectjs -->', this.jsArr.join(''));
          _html = _html.replace(/@components/g, '../../../components');
          _html = _html.replace(/@layouts/g, '../../layouts');

          data.html = _html;
          cb(null, data);
        }
      );

      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          const { js } = assetHelp(data.assets);
          this.jsArr = js;
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlAfterPlugin;

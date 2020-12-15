// 使用闭包，内部定义的变量不会污染外层，适合编写工具类
(function () {
  // 判断当前环境（浏览器(window self) | node (global)）
  // 现在有一个新的变量 globalThis，浏览器或服务端都可以访问
  var root =
    (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global) ||
    this ||
    {};

  // 导出一个'_'，使用的时候直接_.xx就可以了，这是编写工具库的常规写法
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // 自己实现each方法
  _.each = function(arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
      fn(arr[i], arr);
    }

    return arr;
  };

  // 挂载到全局
  root._ = _;
})();

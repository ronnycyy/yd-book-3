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
  _.each = function (arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
      fn(arr[i], arr);
    }

    return arr;
  };

  // 挂载节流函数
  _.throttle = function (cb, t) {
    let isFirst = true;
    let execTime;
    let timer = null;
    return function () {
      if (isFirst) {
        cb();
        execTime = +new Date();
        isFirst = false;
      } else {
        let passTime = +new Date() - execTime;  //距离上一次执行经过了多少时间
        let waitTime = t - passTime;
        if (passTime < t) {
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            cb();
            execTime = +new Date();
          }, waitTime);
        } else {
          cb();
          execTime = +new Date();
        }
      }
    };
  };

  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = function (obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      // 拿到对应的工具函数
      var func = (_[name] = obj[name]);

      // _([1,2,3]).each((item) => {});
      _.prototype[name] = function () {
        var args = [this._wrapped];
        Array.prototype.push.apply(args, arguments);
        return func.apply(_, args);
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // 挂载到全局
  root._ = _;
})();

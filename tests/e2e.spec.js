const Rize = require('rize');

// 简单测试一下: 页面标题是否为’图书列表‘，并且页面中有‘test’文本
const rize = new Rize();
rize
  .goto('http://localhost:3000/books/list')
  .assertTitle('图书列表')
  .assertSee('test')
  .end()  // Don't forget to call `end` function to exit browser!
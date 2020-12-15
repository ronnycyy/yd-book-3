// // node本身带的断言库
// const assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

// 请求图书接口：期望返回200，数据长度5，结束时打印数据
const request = require('supertest');
const expect = require('chai').expect;
// describe是mocha提供的
describe('nodejs api test', function () {
  it('图书接口测试', function () {
    request('http://localhost:3000')
      .get('/api/getBooksList')
      .expect(200)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.data.length).equal(5)
        // console.log(res.body.data);
      });
  });
});

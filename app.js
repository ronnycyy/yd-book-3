// const Koa = require("koa"); // commonJS语法 require
// const co = require('co');
// const config = require('./config');
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');
// const initController = require('./controllers');  // 初始化路由
// const errorHandler = require('./middlewares/errorHandler');
// const staticServer = require('koa-static');  //静态资源（网页）
// var render = require('koa-swig');
// const log4js = require("log4js");

// es6模块化
import Koa from 'koa';
import co from 'co';
import config from './config';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import initController from './controllers';
import errorHandler from './middlewares/errorHandler';
import staticServer from 'koa-static';
import render from 'koa-swig';
import log4js from 'log4js';

const app = new Koa();

// 错误日志记录
log4js.configure({
  appenders: { globalError: { type: 'file', filename: './logs/error.log' } },
  categories: { default: { appenders: ['globalError'], level: 'error' } },
});

const logger = log4js.getLogger('globalError');

// swig 模板
app.context.render = co.wrap(
  render({
    root: config.viewDir,
    cache: config.cache, // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'], //修改{{}}模板，避免和vue模板冲突
  })
);

// 中间件
app.use(staticServer(config.staticDir));
// 路由重定向，白名单中的路由不需要重定向到根
app.use(historyApiFallback({ index: '/', whiteList: ['/api', '/books'] }));
errorHandler.error(app, logger);

initController(app);

app.listen(config.port, () => {
  console.log('server is running at http://localhost:' + config.port);
});

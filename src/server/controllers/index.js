import Router from "@koa/router";
import IndexController from "./IndexController";
import BooksController from "./BooksController";
import ApiController from "./ApiController";

//注意实例化控制器
const indexController = new IndexController();   
const booksController = new BooksController();  // 页面路由
const apiController = new ApiController();  // 接口路由
const router = new Router();

// user touch directly
// the 'c' in mvc
function initController(app) {
  router.get("/", indexController.actionIndex);
  router.get("/api", apiController.actionIndex);
  router.get("/api/getBooksList", apiController.actionBooksList);
  router.get("/books/list", booksController.actionBooksList);
  router.get("/books/create", booksController.actionBooksCreate);

  app.use(router.routes()).use(router.allowedMethods());
}
export default initController;

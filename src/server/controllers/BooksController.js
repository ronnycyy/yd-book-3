import Controller from "./Controller";
import BooksModel from "../models/BooksModel";

class BooksController extends Controller {
  constructor() {
    super();
  }

  async actionBooksList(ctx) {
    const booksModel = new BooksModel();
    const result = await booksModel.getBooksList();
    // 服务端渲染 由于异步加载，需要使用await
    // data会传到页面上，使用swig模版加载
    ctx.body = await ctx.render('books/list', {
      data: result.data
    });
  }
}
export default BooksController;

import Controller from "./Controller";
import BooksModel from "../models/BooksModel";

// route in api (data)
class ApiController extends Controller {
  constructor() {
    super();
  }

  async actionIndex(ctx) {
    ctx.body = await ctx.render("index", {
      message: "welcome to the API",
    });
  }

  // getBooksList返回的数据是异步的，需要用async await
  async actionBooksList(ctx) {
    const booksModel = new BooksModel();
    const result = await booksModel.getBooksList();
    ctx.body = {
      data: result.data,
    };
  }
}
export default ApiController;

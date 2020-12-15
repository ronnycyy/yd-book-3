import axios from 'axios';

// 页面中的所有请求，都走这个入口
class SafeRequest {
  static fetch(url) {
    let result = {
      code: 0,
      message: '',
      data: null,
    };
    return new Promise((resolve) => {
      axios(url)
        .then((res) => {
          result.data = res.data;
          resolve(result);
        })
        .catch((e) => {
          result.code = -1;
          result.message = e.message;
          resolve(result);
        });
    });
  }
}

export default SafeRequest;

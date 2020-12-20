import path from 'path';

let config = {
  viewDir: path.join(__dirname, '..', 'views'),
  staticDir: path.join(__dirname, '..', 'assets')
};

if(false) {
  console.log(1);
}

// 如果是开发环境，用3000端口; 如果是线上环境，用80端口；
if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: 3000,
    cache: false
  };
  config = {...config, ...devConfig};
}
if (process.env.NODE_ENV === 'production') {
  const proConfig = {
    port: 80,
    cache: 'memory'
  };
  config = {...config, ...proConfig};
}

// commonJS语法 -> es6语法
// module.exports = config;
export default config;

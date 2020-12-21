# 前后端分离

- 前端代码用 webpack 打包

#### notes

- package.json

  - 生命周期
    添加一条命令，名字为在原命令前增加'pre'，执行原命令时，该脚本会在原命令前执行（predemo）
  - 串并行执行
    串行：npm run cmd1 && npm run cmd2，按顺序执行
    并行：npm run cmd1 & npm run cmd2，执行顺序无法保证
  - 内部命令
    start、build 等内部命令，不需要 run

- scripty 管理你的脚本命令

  - client:dev 对应 scripts/client/dev.sh
  - 集群编译（快速编译）
    - 服务器 A 负责编译 vue，服务器 B 负责编译 node 代码，编译完成再拷贝回主服务器
    - 解决痛点：项目大了之后，打包时间会很长（比如打包 1h，编译调试就太耗时间了）
  - npm run build
    - npm run client:prod & npm run server:prod, 并行打包客户端和服务端
  - chmod -R +x scripts/
    - chmod:修改权限 -R:递归方式 +x:赋予执行权限(r:read, w:write) scripts/:目标文件夹

- npm run env 查看环境变量 包含了在 package.json 中定义的变量（config.port）

  - $变量 获取环境变量中的值，如$npm_package_config_port、$npm_package_name(项目名称)

- jscpd

  - 代码重复率检查
  - -l 重复行
  - -k 重复字符
  - 生成报表网页

- webpack

  - 不要把配置都写在 webpack.config.js
    应该区分开发环境和生产环境:
    webpack.development.js
    webpack.produciton.js
    为什么写全了开发和生产的单词呢？因为后面要用 --mode development 构造文件名
  - yargs
    - 将 process.argv 转成 json 形式
    - 取得开发/生产环境，只需.mode 即可
  - webpack-merge
    - 合并'公共的'和'开发/生产的'webpack 配置文件
  - glob
    - sync 读取文件名

- MPA

  - Multi-page Application 多页面应用
  - 最传统的网页设计，使用者体验比较差，整体流畅度扣分。但进入门槛低
  - html -> node -> 数据灌进去 -> 吐给浏览器
  - 纯服务端渲染

- 两套模版引擎

  - swig

    - 最直接的展示 html
    - 模板语法({% block xx %}{% endblock %})，填充多页(todo)
    - 插入 js 和 css 时，使用注释占位(如，<!-- injectjs -->)，
      后面 webpack 打包时，通过正则匹配到，把文件插进去
    - {% include "../../../components/banner/banner.html" %}
      引入组件，那组件的 js css 怎么办？
      通过 webpack 打包，再灌回 html

  - vue
    - 为 dom 服务
    - 组件通过 webpack 产生 bundle.js(.css)，再引回 index.html，恢复组件功能

- travis

  - 自动化测试

- 手写 webpack 插件
  - 注意 HtmlWebpackPlugin 的生命周期
  - chunk 生成途径
    - 入口
    - 异步产生
    - 代码分割

### 服务端代码整理（打包）

#### gulp

- 根据环境切换任务
  - gulp.series 执行任务（串行(默认)、并行）
- 开发环境
  - gulp-watch 监听文件变化？热替换？
  - gulp-babel 语法编译
- 线上环境
  - 不需要 gulp-watch
  - 语法编译
  - 代码清洗
    - gulp-rollup
      比如说 const a = 0; if(a === 1) {...}, 那 if 这一段就会删掉（清洗）
    - @rollup/plugin-replace
      替换指定的代码
  - rollup 清洗地还不是很彻底，还有一个更彻底的包：prepack
    - 激进的清洗(直接删除无用代码)
    - npx prepack（npx: 使用项目中安装的包）
      - npx prepack ./prepackDemo/entry.js --out ./prepackDemo/output.js

#### 全部配置完成，启动项目

- 将 components 和 layouts 拷贝过来
  - copy-webpack-plugin，线上环境时，拷贝要做压缩处理（开发环境就不用了）
- _.bundle.js 增加内容哈希值 _.57224.bundle.js
  - 如果更新了，打上 hash 值，就知道哪些更新了哪些没有更新。用户访问时，没有更新的直接在缓存里读就行，提升速度
  - 有 3 种 hash 类型
    - hash 如果一个文件改动，所有文件的 hash 值都会变化，用户缓存全部失效
    - chunkhash
      - js 中引入 css，这样会打包出两个 bundle：js 的 bundle、css 的 bundle
      - 如果改变了 css，因为两个文件是一个 chunk，js 的 hash 也会变化
    - contenthash
      - 改变了哪个文件，就只改变它的 hash，不影响其他的

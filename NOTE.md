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

- npm run env 查看环境变量 包含了在package.json中定义的变量（config.port）
  - $变量 获取环境变量中的值，如$npm_package_config_port、$npm_package_name(项目名称)

- jscpd
  - 代码重复率检查
  - -l 重复行
  - -k 重复字符
  - 生成报表网页

- webpack
  - 不要把配置都写在webpack.config.js
    应该区分开发环境和生产环境: 
      webpack.development.js
      webpack.produciton.js
    为什么写全了开发和生产的单词呢？因为后面要用 --mode development构造文件名
  - yargs
    - 将process.argv转成json形式
    - 取得开发/生产环境，只需.mode即可
  - webpack-merge
    - 

### 学习时间点

1:14:24

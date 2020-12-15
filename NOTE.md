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

### 学习时间点

48:57

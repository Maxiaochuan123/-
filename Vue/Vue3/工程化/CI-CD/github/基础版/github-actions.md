<!--
 * @Date: 2022-08-22
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-05
 * @Description: 
-->
### 视频教程
  * [github新功能actions全方位讲解！！](https://www.bilibili.com/video/BV1RE411R7Uy?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

### 配置 githubActions 私有变量
  1. 进入 github 项目
  2. 选择 Settings -> Secrets -> Actions 点击 New repository secret 添加私有 actions 变量
    * PRIVATE_KEY：
      1. 云服务器面板 -> 密钥对 创建后下载 打开 复制
      2. 宝塔面板 -> 安全 点击 SSH安全管理 开启《SSH密钥登录》《是否允许root登录》复制下方的 SSH 密钥
      3. 登录进入服务器 -> cat ~/.ssh/id_rsa.pub 复制
    * REMOTE_HOST：服务器公网地址
    * REMOTE_USER：服务器登录用户


  * 遇到了一个问题，一直提示
  ``` bash
  ⚠️ [Rsync] stderr:  Warning: Permanently added '***' (ECDSA) to the list of known hosts.
  ***@***: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
  ```

  于是我一直绕在里面，以为密钥不正确，重新创建还是不对，最后才发现是 authorized_keys 与 id_rsa.pub 不一致导致的
  解决方法：将公钥重新写入文件
  > cat id_rsa.pub >> authorized_keys


### 配置 githubActions 工作流
  1. 选择 Actions -> 点击 New workflow
  2. 点击 set up a workflow yourself 从零编写工作流，或者在搜索常用模板
  3. 配置模板 以如下 node ssh 配置为例

  * 遇到了一个问题，提示 pnpm build 命令不存在，需要注意的是此时的 build 执行的是 script 中的命令，所以要与其对应，比如 script中定义的是
  build:prod 表示打包生产环境，所以 run: pnpm run build 要与其对应 改为 run: pnpm run build:prod

``` yml
name: vueApp upload to TencentCloud

on:
  push:
    branches: "master"

jobs:
  install:

    runs-on: ubuntu-latest

    steps:
      - name: checkout code
        uses: actions/checkout@v3

      - name: install node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16.17.0

      - name: install pnpm
        uses: pnpm/action-setup@v2.2.2
        with:
          version: 7.9.5

      - name: pnpm switch Taobao image source
        run: pnpm config set registry https://registry.npmmirror.com/

      - name: install
        run: pnpm install

      - name: build
        run: pnpm build:prod

      - name: upload to TencentCloud
        uses: easingthemes/ssh-deploy@v2.2.11
        with:
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          REMOTE_HOST:  ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          SOURCE: "dist/*"
          TARGET: "/www/wwwroot/http"
          ARGS: "-avzr --delete"

```
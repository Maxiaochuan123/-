<!--
 * @Date: 2022-08-28
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-02
 * @Description: 
-->
#### 前言
这篇教程将会帮助你了解 githubActions + docker + nginx 如何自动化部署你的网页。
你可以看看下面我推荐的几个视频快速了解 githubActions、docker、dockerfile、nginx，当然这些都是帮助你快速入门了解，讲的比较浅显易懂。
所以请不要有太重的心智负担。
我的例子是 腾讯云，你可以根据你自己实际的云服务器厂商进行配置
* [Github Action进行自动化部署前端项目](https://www.bilibili.com/video/BV1Ca411h7rx?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
* [Docker 10分钟快速入门](https://www.bilibili.com/video/BV1s54y1n7Ev?spm_id_from=333.999.0.0&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
* [Dockerfile用法全解析](https://www.bilibili.com/video/BV1k7411B7QL?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
* [nginx 部署前端项目](https://www.bilibili.com/video/BV1fG4y1a7Sv?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### 第一步 - 编写 `dockerfile`
* 在项目根目录 创建 `Dockerfile` 文件
```dockerfile
# 基于 node:16.17.0-alpine 定制镜像
FROM node:16.17.0-alpine as builder

# 为后续命令指定运行的工作目录
WORKDIR /vueApp

# 当前目录所有文件 copy 到工作目录
COPY . .

# 安装 pnpm
RUN npm install pnpm -g

# 切换腾讯镜像源
RUN pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# # 由于 node-sass 报错 无法下载 linux_musl-x64-93_binding.node，所以自行下载并完成下面 3步
# # 1.创建 node-sass 目录
# RUN mkdir -p /vueApp/node-sass
# # 2. 将当前目录中的 binding.node 拷贝到镜像的 node-sass 目录中
# COPY binding.node /vueApp/node-sass
# # 3. node-sass 能通过 SASS_BINARY_PATH 自行配置路径，所以将路径指向创建的目录
# ENV SASS_BINARY_PATH /vueApp/node-sass/binding.node

# 安装依赖
RUN pnpm install

# 打包
RUN pnpm build:prod

# 基于 nginx:1.22.0-alpine 定制镜像
FROM nginx:1.22.0-alpine

# 将 node builder 阶段得到的 dist 下的文件拷贝到 nginx/html 中
COPY --from=builder /vueApp/dist /usr/share/nginx/html
```

#### 构建时运行时遇到的问题 在我 windows 本地遇到了这个问题，而后在 githubActions 跑的时候没这个问题，所以把这部分代码注释了
* node-sass 报错 无法下载 linux_musl-x64-93_binding.node
> #9 23.46 .../node_modules/node-sass install: Downloading binary from https://github.com/sass/node-sass/releases/download/v6.0.1/   linux_musl-x64-93_binding.node

* 试了很多种方法都没能成功，最终在这篇文章中得到解决方法 [啊！这磨人的小妖精 ！node-sass在docker镜像中安装的正确姿势](https://segmentfault.com/a/1190000021991474###)

* 所以到 https://github.com/sass/node-sass/releases/download/v6.0.1/ 中下载对应版本的 linux_musl-x64-93_binding.node，放入根目录并改名 binding.node


* 构建完毕后访问 http://localhost:3000/#/ 看看是否成功

#### 第二步 - 去腾讯云创建一个[镜像仓库](https://console.cloud.tencent.com/tcr/repository)
* 如果你不知道如何进入，你可以在顶部搜索栏搜索关键字 `容器镜像服务`即可进入

1. 创建命名空间
![1_命名空间.png](https://upload-images.jianshu.io/upload_images/6432928-40d60bcd99b665a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 创建镜像仓库
![2_镜像仓库.png](https://upload-images.jianshu.io/upload_images/6432928-e68816cd9beaccff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 点击快捷指令查看相关操作命令
![3_快捷指令.png](https://upload-images.jianshu.io/upload_images/6432928-12b8ba49f2ff1d72.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 得到如下命令
```shell
# 登录腾讯云容器镜像服务
docker login ccr.ccs.tencentyun.com --username=100002561283
# 将镜像进行构建并打包成 腾讯云镜像 tag
docker tag [imageId] ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:[tag]
# 将镜像 tag 推送至 腾讯云镜像仓库
docker push ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:[tag]
# 腾讯云镜像仓库 拉取镜像
docker pull ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:[tag]
```


#### 第三步 - 将 `dockerfile` 构建镜像并推送到 腾讯云镜像仓库

1. 构建镜像
```cmd
docker build -t [镜像名称] .
```

2. 登录腾讯云容器镜像服务
```cmd
docker login ccr.ccs.tencentyun.com --username=100002561283
```
* 输入password后提示 `Login Succeeded` 表示登录成功

3. 将镜像打包成 (腾讯云镜像 tag)
* 查看镜像获取 镜像id
```cmd
docker images
```
* 打包tag
```cmd
// 这里的 9c7fd91e7b15 是镜像的 id，也可以是镜像名字，但如果镜像名字太长粘贴进来一长串可能不如 id 简练
docker tag 9c7fd91e7b15 ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-container:vue-docker-tag-v1
```
* 再次执行命令 docker images 即可看到刚刚构建的 (腾讯云镜像 tag)

4. 将(腾讯云镜像 tag) 推送至 腾讯云镜像仓库
```cmd
docker pull ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-container:vue-docker-tag-v1
```

5. 点击腾讯云镜像仓库即可看到刚刚推送的镜像
![4_腾讯云docker镜像.png](https://upload-images.jianshu.io/upload_images/6432928-8ca26bbaddd44c85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 第四步 - 在服务器上安装 `docker`、`nginx`
* 首先需要配置腾讯云docker镜像加速，因为docekr官方服务器在国外访问太慢了，[腾讯云 docker 加速配置](https://cloud.tencent.com/document/product/1207/45596#.E4.BD.BF.E7.94.A8.E8.85.BE.E8.AE.AF.E4.BA.91-docker-.E9.95.9C.E5.83.8F.E6.BA.90.E5.8A.A0.E9.80.9F.E9.95.9C.E5.83.8F.E4.B8.8B.E8.BD.BD)

* 至于如何安装这里就不多介绍了，介绍几个相关命令

  * docker 命令
  ```cmd
  docker images //查看所有镜像

  docker ps -a //查看所有容器

  // 运行镜像
  docker run -d -p 80:5000 --name my-vue-container my-vue-image
  
  * -d 让容器在后台运行，这样容器的输出就不会直接显示在控制台上
  * --rm 当容器停止运行时，自动删除容器
  * -p 将宿主机端口映射到容器 这样才能从主机上访问容器中的 web 应用，前面的 左侧是宿主机上的端口，右侧是容器上的端口
    -p 80:5000
  * --name 指定容器名称如果不指定将会随机名称
    --name my-vue-container
  * 最后 my-vue-image 是镜像名称，当然如果镜像名称太长，可以以镜像 id 即可

  docker stop <容器id> //停止容器

  docker rm <容器id> //删除容器
  ```

  * nginx 命令
  ```cmd
  systemctl status nginx.service // 查看 nginx 状态

  netstat -antp | grep :80 // 查看端口占用情况 (指定端口 : 后面跟端口号即可)

  kill -s 9 11256 // 杀掉端口 11256：端口id

  systemctl start nginx.service // 启动 nginx

  pkill -9 nginx // 如果无法启动可以把 nginx 相关端口干掉再启动
  ```

#### 第五步 - 拉取刚刚上传到 腾讯云镜像仓库 的 镜像并启动
* 进入服务器终端拉取镜像
* 注意不要直接复制我这里的链接，/my-mxc-docker/vueapp-docker-image 表示 my-mxc-docker 命名空间下的 vueapp-docker-image 镜像仓库
```cmd
docker pull ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:[tag]
```

* 运行镜像
```cmd
// --name my-vue-container 是容器名称
// 9c7fd91e7b15 是镜像的id 也可以是名字
docker run -d -p 8000:80 --name my-vue-container 9c7fd91e7b15
```

#### 第六步 - 到这一步激动人心的时刻终于到了
* 记得提前到 云服务器控制面板的防火墙中开放 8000 端口
* 打开浏览器
* 在地址栏输入 云服务器公网ip: 8000

#### githubActions 工作流
* 以上 `六个步骤` 介绍了如何将页面通过 docker + nginx 部署到我们的云服务器上，但这并不是我们的最终目标，因为我们还需要手动到服务器上操作，没有达到自动化的效果，下面我们将开始进行部署自动化，但在这之前让我们先看看下面这段 yml 文件。

* 这段 yml 文件是一个完整的 githubActions 工作流，介绍了如何将项目代码通过 githubActions 自动化部署到腾讯云服务器上，但这只是我们的基础版本
``` yml
name: vueApp upload to Tencent cloud # 工作流名称

on:
  push:
    branches: "master" # 当 master 分支发生改变时触发工作流

jobs:
  install:

    runs-on: ubuntu-latest # 指定工作流运行的系统

    steps:
      - name: checkout code # 拉取代码
        uses: actions/checkout@v3

      - name: install node.js # 安装 node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16.17.0

      - name: install pnpm # 安装 pnpm 包管理器
        uses: pnpm/action-setup@v2.2.2
        with:
          version: 7.9.5

      - name: pnpm switch Taobao image source # pnpm 切换淘宝镜像源
        run: pnpm config set registry https://registry.npmmirror.com/

      - name: install # 安装依赖
        run: pnpm install

      - name: build # 打包
        run: pnpm build:prod

      - name: upload to Tencent cloud # 部署到服务器
        uses: easingthemes/ssh-deploy@v2.2.11
        env:
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          REMOTE_HOST:  ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          SOURCE: "dist/"
          TARGET: "/www/wwwroot/http"
          ARGS: "-avzr --delete"

```

* 以上 yml 中的 安装node.js，安装依赖，打包都是在 githubActions 中完成的，要想结合 docker + nginx 自动化部署 还需要下面几步
  1. 使用 docker 来完成 安装node.js，安装依赖，打包，复制打包后 dist 文件到 nginx/http 目录中
  2. 打包并上传 docker镜像 到服务器
  3. 登录服务器并部署 docker

* 我们已经完成了 dockerfile 的编辑，就是文章开头的那份，接下来让我们重新编写 githubActions workflows

#### 编写基于 docker、nginx 的 githubActions workflows
``` yml
name: vueApp upload to Tencent cloud # 工作流名称

on:
  push:
    branches: "master" # 当 master 分支发生改变时触发工作流

jobs:
  dockerActions:
    runs-on: ubuntu-latest # 指定工作流运行的系统

    steps:
      - name: checkout code # 拉取代码
        uses: actions/checkout@v3

      - name: build docker image # 打包 docker 镜像
        run: docker build -t ${{ secrets.DOCKER_IMAGE }} .

      - name: Login to Tencent cloud container image service # 登录腾讯云容器镜像服务
        run: docker login ccr.ccs.tencentyun.com --username=${{ secrets.DOCKER_USERNAME }} --password=${{ secrets.DOCKER_PASSWORD }}

      - name: build Tencent cloud container image tag # 将镜像进行构建并打包成 腾讯云镜像 tag
        run: docker tag ${{ secrets.DOCKER_IMAGE }} ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}

      - name: push docker image # 推送 docker 镜像
        run: docker push ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}

  deployDockerImage:
    needs: dockerActions # 等待 dockerActions 执行完毕
    runs-on: ubuntu-latest # 指定工作流运行的系统

    steps:
      - name: Login to Tencent cloud server # 登录腾讯云服务器
        uses: appleboy/ssh-action@master # 这里从 easingthemes/ssh-deploy@v2.2.11 换成了 appleboy/ssh-action@master
        with:
          username: ${{ secrets.REMOTE_USER }}
          key: ${{ secrets.PRIVATE_KEY }}
          host:  ${{ secrets.REMOTE_HOST }}
          script: |
            # 停止旧版容器
            docker stop ${{ secrets.DOCKER_CONTAINER }}

            # 删除旧版容器
            docker rm ${{ secrets.DOCKER_CONTAINER }}

            # 删除旧版镜像
            docker rmi ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}

            # 登录腾讯云容器镜像服务
            docker login ccr.ccs.tencentyun.com --username=${{ secrets.DOCKER_USERNAME }} --password=${{ secrets.DOCKER_PASSWORD }}
            
            # 拉取镜像
            docker pull ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}

            # 运行镜像
            docker run -d -p 8000:80 --name ${{ secrets.DOCKER_CONTAINER }} ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}

```
* 其中 ${{ secrets.XXXX}} 是在 github 当前项目 Settings > Secrets > Actions 中配置的变量，你肯定不希望你的敏感信息被暴露
* 运行腾讯云镜像需要 将链接与tag进行组合才是完整的镜像文件名 ccr.ccs.tencentyun.com/my-mxc-docker/vueapp-docker-image:${{ secrets.DOCKER_IMAGE_TAG }}，这里我被卡了一段时间，直到我询问腾讯云售后得到答案，所以，上面删除旧版镜像时也需要像这样写。

#### 完毕
* 至此我们完成了整个 githubActions 工作流
![1_完成工作流.png](https://upload-images.jianshu.io/upload_images/6432928-5c11c4db10ebfb61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![2_部署后的页面.png](https://upload-images.jianshu.io/upload_images/6432928-7cd853ed27113105.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

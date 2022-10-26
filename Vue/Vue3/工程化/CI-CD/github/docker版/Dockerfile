# 基于 node:16.17.0-alpine 定制镜像
FROM node:lts-alpine as builder

# 为后续命令指定运行的工作目录
WORKDIR /code

# 安装 pnpm
RUN npm install pnpm -g

# 切换腾讯镜像源
RUN pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# # 由于 node-sass 报错 无法下载 linux_musl-x64-93_binding.node，所以自行下载并完成下面 3步
# # 1.创建 node-sass 目录
# RUN mkdir -p /code/node-sass
# # 2. 将当前目录中的 binding.node 拷贝到镜像的 node-sass 目录中
# COPY binding.node /code/node-sass
# # 3. node-sass 能通过 SASS_BINARY_PATH 自行配置路径，所以将路径指向创建的目录
# ENV SASS_BINARY_PATH /code/node-sass/binding.node

# 单独分离 package.json, pnpm-lock.yaml 是为了安装依赖可最大限度利用缓存，当这两个文件没有发生变化，将不重新安装依赖
COPY ["package.json", "pnpm-lock.yaml", "/code/"]

# 安装依赖
RUN pnpm install

# 当前目录所有文件 copy 到工作目录
COPY . /code

# 打包
RUN pnpm build:prod

# 基于 nginx:1.22.0-alpine 定制镜像
FROM nginx:alpine

# 将 node builder 阶段得到的 dist 下的文件拷贝到 nginx/html 中
COPY --from=builder /code/dist /usr/share/nginx/html

# nginx.conf 配置了 80 端口，所以这里没有上传 nginx.conf，如果你有其他详细配置，则可以上传 nginx.conf 覆盖 服务端的 nginx.conf
# COPY /code/nginx.conf /etc/nginx/
# nginx 默认启动 80 端口, 如果是其他端口则需要 导出端口
# EXPOSE 3000
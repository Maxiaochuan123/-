<!--
 * @Date: 2022-08-27
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-07
 * @Description: 
-->
#### [GitLab CI/CD系列教程](https://www.bilibili.com/video/BV1iv41177zU/?spm_id_from=333.788&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### 基础概念
* image: docker 镜像
* runner: 执行流水线的环境
* jobs: 任务
  * stage：任务 id 
  * tags: 执行任务的 runner 名
* stages: 定义任务的执行的顺序，填写 stage 将会按照先后顺序执行
* cache: 缓存

#### gitlab-runner

* 安装 gitlab-runner
```shell
docker run -d --name gitlab-runner --restart always \
-v /srv/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:latest
```

* 注册 gitlab-runner
```shell
docker run --rm -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "https://gitlab.com/" \
  --registration-token "GR1348941L9mX8hsctc3xWT7V7sH8" \
  --description "vite-runner" \
  --tag-list "test-cicd" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```

* 在runner配置文件中配置 docker 命令
> cd /srv/gitlab-runner/config 双击 config.toml
volumes = ["/cache"] 添加
"/usr/bin/docker:/usr/bin/docker", "/var/run/docker.sock:/var/run/docker.sock"

``` yaml
image: docker

stages:
  - deploy

deploy:
  stage: deploy
  tags:
    - test-cicd
  script:
    # 根据项目根目录下的 Dockerfile 文件创建一个新的镜像
    - docker build -t vite-vue-app .
    # 这里是查看当前的服务器上有没有正在运行或者存在我们之前运行过的项目容器，如果有删除了
    - if [ $(docker ps -aq --filter name=vite-vue-app-main) ];then docker rm -f vite-vue-app-main;fi
    # 这里是运行我们刚才创建的新的镜像
    - docker run -d --rm -p 8001:80 --name vite-vue-app-container vite-vue-app
```
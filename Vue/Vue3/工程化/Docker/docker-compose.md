<!--
 * @Date: 2022-08-27
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-30
 * @Description: 
-->
#### [如何组织一个多容器项目docker-compose](https://www.bilibili.com/video/BV1Wt411w72h?spm_id_from=333.999.0.0&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### [为什么要使用 docker-compose？](https://www.bilibili.com/video/BV1ed4y1o7HF?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
  * 当我们部署一个网站时，通常需要部署 web服务、数据库、后台服务 等等。
  * 我们通常会选择一个应用部署一个容器，当 web服务挂了我们只需要修复 web容器即可，后台服务是正常运行的，这样可以极大的减轻运维负担。
  * 但每个应用都单独部署容器并且让容器之间互相联通是一件耗时长且麻烦的事情，这时候 docker-compose 就派上用场了，我们通过一个 docker-compose.yml 文件，就能快速地部署多个容器

#### [docker-compose文件结构语法解析](https://www.cnblogs.com/tingf/p/15048765.html)

#### dockerfile 中的 EXPOSE 与 docker-compose 中的 ports 有何不同?
  * dockerfile 中的 EXPOSE 是向容器暴露端口，或者暴露给同一个networks的容器，其他容器可以通过该端口访问其他容器
  * docker-compose 中的 ports 是向宿主机暴露端口，这样才能访问 docker

#### [docker-compose的ports、expose、links、depends_on的使用技巧](https://zhuanlan.zhihu.com/p/382779508)

#### [常用命令](https://zhuanlan.zhihu.com/p/139265347)
  * 构建镜像
  > docker-compose build

  * 下载镜像
  > docker-compose pull

  * 启动容器
  > docker-compose up
    * up 创建并启动容器
    * -d 后台运行
    * --build 启动容器前先构建镜像
<!--
 * @Date: 2022-08-27
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-30
 * @Description: 
-->
#### 视频教程
  * [Docker 10分钟快速入门](https://www.bilibili.com/video/BV1s54y1n7Ev?spm_id_from=333.999.0.0&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
  * [10分钟，快速学会docker](https://www.bilibili.com/video/BV1R4411F7t9?spm_id_from=333.999.0.0&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
  * #### [快速入门 Docker](https://www.bilibili.com/video/BV1H3411V7WY?spm_id_from=333.999.0.0&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### 相关文章
  * [1.我在B站学云原生之Docker容器技术基础知识介绍](https://www.bilibili.com/read/cv15180540)
  * [2.我在B站学云原生之Docker容器环境安装实践](https://www.bilibili.com/read/cv15181036)
  * [3.我在B站学云原生之Docker容器三大核心概念介绍](https://www.bilibili.com/read/cv15181760)
  * [4.我在B站学云原生之Docker容器数据持久化介绍与实践](https://www.bilibili.com/read/cv15182308)
  * [5.我在B站学云原生之Docker容器网络介绍与实践](https://www.bilibili.com/read/cv15185166)
  
#### 概念
  传统臃肿的虚拟机方式部署应用配置机器复杂，且占用大量资源，docker 用来替代的绝佳方案，开发人员可以通过 docker 来模拟复杂的线上部署环境

  1. 他非常的轻量级，每个容器是独立运行的，之间相互环境隔离
  2. docker容器包含了运行环境和可执行程序，可以跨平台和主机使用
  3. 快速部署和启动，虚拟机启动一般是分钟级，docker容器启动是秒级
  4. 虚拟机至少需要几个G的磁盘空间，docker容器可以减少到MB级 更节省空间
  5. 方便构建基于SOA架构或微服务架构的系统，通过服务编排，更好的松耦合
  6. 方便持续集成，通过与代码进行关联使持续集成非常方便

#### docker核心概念
  * Image：镜像 - 里面包含了你要部署的应用程序以及它所关联的所有库，通过镜像我们可以创建许多个不同的 Container
  * Container：容器 - 相当于一个个运行起来的虚拟环境，里面运行了你的应用程序，docker是虚拟环境 不是虚拟机
  * Dockerfile：脚本 - 用来创建镜像，这个过程就好比我们在虚拟机中安装操作系统和软件一样，只不过是通过 DockerFile 自动化脚本来完成的

#### [在 docker hub 中搜索现成的资源](https://hub.docker.com/)
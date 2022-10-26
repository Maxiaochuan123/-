<!--
 * @Date: 2022-08-27
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-31
 * @Description: 
-->
#### 视频讲解
  * [Dockerfile用法全解析](https://www.bilibili.com/video/BV1k7411B7QL?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### 命令详解
  * [Dockerfile文件详解](https://www.cnblogs.com/ilovebath/p/16271645.html)
  * [Dockerfile用法全解析](https://www.bilibili.com/video/BV1k7411B7QL?spm_id_from=333.337.search-card.all.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a))
  

#### 常用命令
  * FROM：功能是为后面的指令提供基础镜像，因此必须以 FROM 作为第一条非注释指令。从公共镜像库中拉取镜像很容易,基础镜像可以选择任何有效的镜像。
  docker build 会在docker宿主机上查找指定的文件，如未找到会自动去Docker Hub Registry上拉取，如果没找到对应的镜像就会返回错误信息

  * WORKDIR: 指定 [ RUN、CMD、ENTRYPOINT、COPY、ADD ] 这些命令的工作目录，例如 WORKDIR /app，如果没有将会自动创建 app 目录

  * COPY：将当前宿主机中的文件拷贝到镜像中去
  * ADD：类似于 COPY 指令，ADD 支持 tar 文件和 URL 路径。
  使用ADD构建镜像的大小比COPY构建的镜像要大，所以如果只是单纯的复制文件尽可能用 COPY

  * EXPOSE：指定镜像侦听的端口

  * VOLUME：将容器中的目录映射到宿主机的目录，运行容器时可以从本地主机或其他容器挂载数据卷，一般用来存放数据库和需要保持的数据等。
  可以当做是宿主机和不同容器的一个共享文件夹。
  总结:volume只是指定了一个目录，用以在用户忘记启动时指定-v参数也可以保证容器的正常运行。比如mysql，你不能说用户启动时没有指定-v，然后删了容器，就把mysql的数据文件都删了，那样生产上是会出大事故的，所以mysql的dockerfile里面就需要配置volume，这样即使用户没有指定-v，容器被删后也不会导致数据文件都不在了,还是可以恢复的。

  * RUN：构建镜像时运行的脚本 [ shell 或者 exec ]指定命令

  * ENV：环境变量 A 10 或者 A = 10
  * ARG：变量 A 10 或者 A = 10
  * ENV 与 ARG 的区别
    1. ENV 构建时，运行时都存在，他是系统环境变量
    2. ARG 只在构建时存在

  * CMD：启动容器指定默认要运行的程序或命令，可以写多条但以最后一条为准，此命令运行完毕容器的生命周期也将结束，[ shell 或者 exec ]指定命令
  * ENTRYPOINT: 与 CMD 类似，ENTRYPOINT 指定的命令可以在 run 的时候追加参数
  * CMD 与 ENTRYPOINT 的区别
    1. 如果 ENTRYPOINT 不是数组的形式 以 ENTRYPOINT 为准 CMD 无效
    2. 如果 ENTRYPOINT 和 CMD 都是 数组的形式，将会合并成一句命令
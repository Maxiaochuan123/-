<!--
 * @Date: 2022-08-30
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-31
 * @Description: 
-->
* 如果上一次没有正常退出 docker，那么使用docker相关命令是无效的，需要启动docker服务
> systemctl start docker.service


#### CentOS 安装 docker
  1. 卸载旧 docker (如果没有直接下一步)
    ```
    sudo yum remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine
    ```
  2. 安装 yum
  ```
  sudo yum install -y yum-utils
  ```
  
  2. 设置腾讯云镜像加速 (官方镜像太慢了)
  * [腾讯云 docker 加速配置](https://cloud.tencent.com/document/product/1207/45596#.E4.BD.BF.E7.94.A8.E8.85.BE.E8.AE.AF.E4.BA.91-docker-.E9.95.9C.E5.83.8F.E6.BA.90.E5.8A.A0.E9.80.9F.E9.95.9C.E5.83.8F.E4.B8.8B.E8.BD.BD)

  3. 安装前先更新yum软件包索引
  ```
  yum makecache fast
  ```

  4. 安装前先更新yum软件包索引
  ```
  yum makecache fast
  ```

  5. 安装docker-ce
  ```
  sudo yum install docker-ce docker-ce-cli containerd.io
  ```

  6. 安装 docker-compose
    * 使用 `python-pip` 安装 (适用于网络不好，无法拉取)
    ```
    yum install epel-release
    yum install python3-pip 
    pip3 install --upgrade pip 
    pip3 install docker-compose  

    这里会报错：ModuleNotFoundError: No module named 'setuptools_rust'
    解决方法：pip3 install -U pip setuptools
    
    ```
    * 查看 docker-compose 版本
    > docker-compose --version
  
  * 启动 docker
  ```
  sudo systemctl start docker
  ```

  * 开机启动 docker
  ```
  systemctl enable docker
  systemctl start docker
  systemctl restart docker
  systemctl stop docker
  systemctl status docker
  ```
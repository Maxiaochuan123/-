<!--
 * @Date: 2022-08-29
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-31
 * @Description: 
-->

#### 命令
  * 查看 nginx 版本
  > nginx -v

  * 查看 nginx 路径 (master process 后面的就是 nginx的目录)
  > ps  -ef | grep nginx

  * 查看 nginx 状态
  > systemctl status nginx.service
  
  * 查看 nginx 是否在运行
  > ps -ef | grep nginx

  * 启动 nginx
  > systemctl start nginx.service
  * 如果无法启动可以把 nginx 相关端口干掉再启动
  > pkill -9 nginx
  * 如果报错 Failed to start nginx.service: Unit not found.
  将以下内容粘贴进 /lib/systemd/system/nginx.service 文件
  再执行启动命令
  ``` shell
  [Unit]

  Description=nginx

  After=network.target

  [Service]

  Type=forking

  ExecStart=/usr/local/nginx/sbin/nginx

  ExecReload=/usr/local/nginx/sbin/nginx -s reload

  ExecStop=/usr/local/nginx/sbin/nginx -s quit

  PrivateTmp=true

  [Install]

  WantedBy=multi-user.target
  ```

  * 停止 nginx
  > systemctl stop nginx.service

  * 重载 nginx
  > systemctl reload nginx.service

  * 查看端口占用情况 (指定端口 : 后面跟端口号即可)
  > netstat -antp | grep :80
  > sudo lsof -i:80

  * 杀掉 端口
  > kill -s 9 11256

  * 测试 nginx.conf 配置是否正确
    * 找到 nginx.conf 路径
    > find / -name nginx.conf
    * nginx -t -c 查找到的nginx.conf路径

  * 设置开机自启动
  > systemctl enable nginx  

  * 取消开机自启动
  > systemctl disable nginx

#### 安装 nginx

  1. 安装前准备
    * 安装 gcc (需要 gcc 编译 nginx，一般 centOS7 是有的)
    查看 gcc 版本
    > gcc -v
    如果没有安装则需要安装
    > yum -y install gcc

    * 安装 pcre、pcre-devel (pcre是一个perl库，包括perl兼容的正则表达式库，nginx的http模块使用pcre来解析正则表达式，所以需要安装pcre库)
    > yum install -y pcre pcre-devel

    * 安装 zlib (zlib库提供了很多种压缩和解压缩方式nginx使用zlib对http包的内容进行gzip，所以需要安装)
    > yum install -y zlib zlib-devel
    
    * 安装 openssl (openssl是web安全通信的基石，没有openssl，可以说我们的信息都是在裸奔)
    > yum install -y openssl openssl-devel

  2. 创建目录
  > cd /usr/local
  > mkdir nginx
  > cd nginx

  3. 下载 nginx 压缩包
    * [nginx download](http://nginx.org/en/download.html)
    * Stable version: 表示稳定版
    * 右键复制 	nginx-1.22.0  pgp 链接地址 (http://nginx.org/download/nginx-1.22.0.tar.gz)
  
    * 下载 nginx 压缩包到目录下
    > wget http://nginx.org/download/nginx-1.22.0.tar.gz
    * 如果找不到 wget 命令则需要先安装
    > yum -y install wget

  4. 解压
  > tar -zxvf nginx-1.22.0.tar.gz
    * 解压完毕删除压缩包
    > rm -rf nginx-1.22.0.tar.gz

  5. 编译 nginx
    * 进入 nginx-1.22.0 目录
    > cd nginx-1.22.0
    * 执行 .configure (这一步是配置，一般用来生成 Makefile，为下一步的编译做准备)
    > .configure
      * 如果提示 ./configure:command not found 解决方法，执行下面两条命令
      > sh configure
      > chmod u+x configure
    * make 编译安装
    > make
    > make install

   6. 配置开机启动
      * 进入 systemd 目录
      > cd ~
      > cd /lib/systemd/system
      * 创建 nginx.service 文件
      > vim nginx.service
      * 将下面内容粘贴进去，再按 ESC键，输入 :wq 表示保存并退出
      ```
      [Unit]
      Description=nginx service
      After=network.target 
      
      [Service] 
      Type=forking 
      ExecStart=/usr/local/nginx/sbin/nginx
      ExecReload=/usr/local/nginx/sbin/nginx -s reload
      ExecStop=/usr/local/nginx/sbin/nginx -s quit
      PrivateTmp=true 
      
      [Install] 
      WantedBy=multi-user.target
      ```
      * 设置开机自启动
      > systemctl enable nginx

    7. 启动 nginx
    > systemctl daemon-reload
    > systemctl start nginx.service

#### 卸载 nginx
  * 查看 nginx 是否在运行
  > ps -ef | grep nginx

  * 如果在运行则先停止
  > systemctl stop nginx.service

  * 查找所有包含 nginx 名字的目录
  > find / -name nginx

  * 执行 rm -rf 路径 删除相关文件按
  > rm -rf 路径

  * 如果设置了Nginx开机自启动的话，可能还需要下面两步
  > chkconfig nginx off
  > rm -rf /etc/init.d/nginx

  * 卸载
  > yum remove nginx


  * 宝塔面板 nginx 卸载
  rm -rf /etc/rc.d/init.d/nginx
  rm -rf /usr/bin/nginx
  rm -rf /www/server/panel/vhost/template/nginx
  rm -rf /www/server/panel/vhost/open_basedir/nginx
  rm -rf /www/server/panel/vhost/nginx
  rm -rf /www/server/panel/install/nginx
  rm -rf /www/server/panel/rewrite/nginx
  rm -rf /www/server/nginx
  rm -rf /www/server/nginx/sbin/nginx
  yum remove nginx
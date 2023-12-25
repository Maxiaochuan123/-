<!--
 * @Date: 2022-09-02
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-02
 * @Description: 
-->

* 建议切换 腾讯源 速度最快 https://mirrors.cloud.tencent.com/npm/

* 安装 nrm
> npm install -g nrm

* 查看可选源
> nrm ls

* 查看当前源
> nrm current

* 切换源
> nrm use <registry>

* 添加源
> nrm add <registry> <url>

* 删除源
> nrm del <registry>

* 源测速
> nrm test npm

* 查看当前包管理工具源 比如 pnpm
> pnpm config get registry

* 设置当前包管理工具源 比如 pnpm
> pnpm config set registry <url>

[nrm 安装不成功，报错 const open = require('open');](https://blog.csdn.net/m0_66051368/article/details/130379902)
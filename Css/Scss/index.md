<!--
 * @Date: 2022-09-22
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-22
 * @Description: 
-->
#### 使用 dart-sass 代替 node-sass
*   node-sass 是用 node(调用 cpp 编写的 libsass)来编译 sass；
    dart-sass 是用 drat VM 来编译 sass；
*   node-sass是自动编译实时的，dart-sass需要保存后才会生效
    推荐 dart-sass 性能更好（也是 sass 官方使用的），而且 node-sass 因为国情问题经常装不上
*   基于 [libsass](https://github.com/sass/dart-sass) 的 node-sass 将被弃用，官方建议改用 [dart-sass](https://github.com/sass/dart-sass)。见 [LibSass is Deprecated](https://sass-lang.com/blog/libsass-is-deprecated)。 
*   Dart Sass 是我们对它的习惯称呼，最早它在 npm 上的确是以 dart-sass 的名字发布的，不过现在它已经更名为 sass 了。
*   放弃使用 (/deep/、 >>>) 使用 :deep 或者 :deep()

#### node-sass 诟病
*   node-sass的安装条件复杂：因为是调用c/c++进行的编译，所以在npm install的postinstall阶段需要根据不同的CPU和系统环境进行该环境下的编译可执行文件的获取，node-sass 不支持 node-v14 ，所以导致经常在安装包时 node-sass 报错。

#### 为什么要迁移？
*   官方宣布废弃：目前node-sass已经由于不支持新版本sass的一些特性等原因废弃（编译器API支持程度一定程度上抑制了sass的发展），官方推荐迁移到dart-sass。
*   一些新的 sass api node-sass中将无法使用

#### 安装 dart-sass
*   dart-sass 已经改名为 sass
```cmd
npm install sass-loader sass  --save-dev
```

#### sass 语法
*   [Vue组件库必备 Sass(Dart) 知识](https://segmentfault.com/a/1190000042316656?sort=votes)
*   [模块系统](https://sass-lang.com/blog/the-module-system-is-launched#future-plans)

#### 其他注意
*   @import 语法将在 最迟 2022 年 10 月 1 日 不可用，取而代之的是 @use
<!--
 * @Date: 2022-08-26
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-08-27
 * @Description: 
-->
### 使用 CDN 资源包 优化打包速度以及页面访问速度

### 两个速度飞快的 国内CDN 资源网站
* [bootcdn](https://www.bootcdn.cn/)
* [baomitu](https://cdn.baomitu.com/)

### npm 包最全的 国外CDN 资源网站，但速度较慢
* [jsdelivr](https://www.jsdelivr.com/)


### 相关文章
* [Vite中使用cdn来加载需要的库文件](https://blog.craftyun.cn/post/228.html)
* [Vue 不同构建版本的含义](http://www.icodebang.com/article/281128)


### vite-plugin-cdn-import 使用方式
* 只需要配置大文件
* [但目前遇到一点问题](https://github.com/MMF-FE/vite-plugin-cdn-import/issues/13)

```javascript
// 此插件基于  rollup-plugin-external-globals 插件二次封装
import importToCDN from 'vite-plugin-cdn-import';

return {
    plugins: [
        importToCDN({
            modules: [
                {
                    name: 'vue',
                    var: 'Vue',
                    path: 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.37/vue.global.prod.min.js'
                },
                {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.3/vue-router.global.prod.min.js'
                },
                {
                    name: 'element-plus',
                    var: 'ElementPlus',
                    path: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.13/index.full.min.js',
                    css: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.13/index.min.css'
                },
                {
                    name: 'qs',
                    var: 'Qs',
                    path: 'https://cdn.bootcdn.net/ajax/libs/qs/6.11.0/qs.min.js'
                }
            ]
        })
    ]
}
```
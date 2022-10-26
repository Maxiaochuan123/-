#### [diff详解 - 文章](https://www.toutiao.com/w/7125471748656467215/?app=news_article&timestamp=1659073111&use_new_style=1&wxshare_count=1&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_android&utm_campaign=client_share&share_token=c6ae26e9-cd8d-4967-b707-947fc93e4e0c&source=m_redirect&wid=1659168846126)

#### [Vue2原理 - 视频](https://www.bilibili.com/video/BV15D4y1o73Z?p=1&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

* 当数据发生变化时， vue 是怎么更新节点的？
  * 渲染真实 DOM 开销是很大的，会导致整个 DOM 树的重排，那么要怎样只更新需要修改的 DOM 呢？diff算法就是解决这件事，先根据 DOM 生成一颗 virtualDom：虚拟节点，当 virtualDom 某个节点的数据改变后会生成一个新的 Vnode：虚拟节点，然后 Vnode 和 oldVnode 做对比，发现有不一样的地方就直接修改在真实 DOM 上，然后使 Vnode 的值设置为 oldVnode。
  * diff的过程就是调用名为 patch 的函数，比较 新/旧 节点，一边比较一边给真实 DOM 打补丁

* 真实 DOM 和 virtualDom 的区别？
  * virtualDom 是将真实的 DOM 的数据抽取出来，以对象的形式模拟树形结构
  ```html
    <!-- 真实DOM -->
    <div>
        <p>哈哈</p>
    </div>
  ```
  ```javascript
    //virtualDom
    var Vnode = {
        tag: 'div',
        children: [
            { tag: 'p', text: '哈哈'}
        ]
    }
  ```

* diff的比较方式？
  * diff算法在比较 新/旧 节点的时候，只会进行同层级比较，不会跨层级比较
  ```html
    <!-- 第一层div相对比，第二层span与p对比 -->
    <div>
        <span>哈哈</span>
    </div>
    <div>
        <p>嘻嘻</p>
    </div>
  ```

* diff流程图
  * 基于发布订阅模式，当数据发生变化时，set 方法会让调用 Dep.notify 通知所有订阅者 Watcher，订阅者就会调用 patch 给真实的 DOM 打补丁，更新相应的视图。
  ![diff算法.png](https://upload-images.jianshu.io/upload_images/6432928-930a556af34f2bfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
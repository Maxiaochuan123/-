<!--
 * @Date: 2022-10-18
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-10-18
 * @Description: 
-->
* 注意，组件名称必须与路由name一致才行

```javascript
// router.js
{
    path: '/element',
    name: 'element-ui-test',
    meta: { keepAlive: true },
    component: () => import('@/components/ElementUI/index.vue')
}

// component
<script lang="ts" setup name="element-ui-test">
</script>
```


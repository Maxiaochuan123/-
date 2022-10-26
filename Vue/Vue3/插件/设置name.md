<!--
 * @Date: 2022-10-18
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-10-18
 * @Description: 
-->
* 由于 vue3 会自动将组件名作为 name, 但实际有时候我们并不想这样，比如使用 页面缓存 keep-alive 时，需要匹配组件名称，但我们往往使用 index.vue 所以这并不是我们想要的，这时可以通过插件来实现

* [vite-plugin-vue-setup-extend](https://github.com/vbenjs/vite-plugin-vue-setup-extend)


```javascript
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
})
```

```html
<template>
  <div>hello world {{ a }}</div>
</template>

<script lang="ts" setup name="App">
  const a = 1
</script>
```
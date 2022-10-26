<!--
 * @Date: 2022-08-07
 * @Author: 马晓川 maxc@dustess.com
 * @LastEditors: 马晓川 maxc@dustess.com
 * @LastEditTime: 2022-08-07
-->
* 父组件访问子组件中定义的函数
```javascript
    // 必须使用 defineExpose 将定义的函数导出，父组件才能够访问。
    defineExpose({ ... })
```
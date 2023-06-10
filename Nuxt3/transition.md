#### 必须给页面添加根元素包裹才能实现过渡动画, 否则会提示
    mponent inside <Transition> renders non-element root node that cannot be animated. 

#### 应该这样
```typescript
<template>
  <div>
    // 内容
  </div>
</template>
```
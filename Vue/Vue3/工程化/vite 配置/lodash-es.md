<!--
 * @Date: 2022-08-08
 * @Author: 马晓川 maxc@dustess.com
 * @LastEditors: 马晓川 maxc@dustess.com
 * @LastEditTime: 2022-08-08
-->

#### 为什么使用 lodash-es 而不是 lodash
因为 lodash-es 是最小化引入，打包会被 tree-shaking，即移除上下文中未引用的代码。
而 lodash 即使使用 import { cloneDeep } from "lodash"; 依然会全量打包。

#### 在 TypeScript 中引入
> pnpm add lodash-es -S
> pnpm add @types/lodash-es -D

#### 按需引入 lodash
  * 使用 lodash-es
  ```javascript
    import { cloneDeep } from "lodash-es";
  ```
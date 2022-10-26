<!--
 * @Date: 2022-08-09
 * @Author: 马晓川 maxc@dustess.com
 * @LastEditors: 马晓川 maxc@dustess.com
 * @LastEditTime: 2022-08-18
 * @Description: Css 常见问题
-->
#### BFC (Block Formatting Context)：块级格式化上下文
* [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 是 margin 重叠和高度塌陷等一些异常情况的理论和处理方法。

#### 如何触发 BFC
* 这里简单列举几个触发BFC使用的CSS属性
  * overflow: hidden
  * display: inline-block
  * position: absolute
  * position: fixed
  * display: table-cell
  * display: flex

* 通用样式解决 BFC 问题，解决外边距重叠用前两个属性，解决高度塌陷用三个属性。
```Css
    .BFC::before，.BFC::after{
        content:' ';
        display:table;
        clear:both;
    }
```
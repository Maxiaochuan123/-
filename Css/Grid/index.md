<!--
 * @Date: 2022-09-11
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-09-11
 * @Description: 
-->
#### 视频教程
[两分钟掌握 CSS Grid 布局](https://www.bilibili.com/video/BV18p411A7JB?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

#### 文章教程
[最强大的 CSS 布局 —— Grid 布局](https://juejin.cn/post/6854573220306255880)
[谈谈grid布局](https://juejin.cn/post/7017074528752762911)

#### 高级用法
* [repeat()](https://www.zhangxinxu.com/wordpress/2019/12/css-repeat/)

#### 语法
1. 基本
* display: grid; 开启 `grid` 布局

2. 块大小 (单位：px 固定、fr 网格轨道、auto 自适应、auto-fill 自动填充、minmax() 范围、repeat() 重复、)
* grid-template-rows: 定义行`高`度
* grid-template-columns: 定义列`宽`度

3. 块间距
* row-gap: 24px; 行间距
* column-gap: 24px; 列间距
* grid-gap: 24px; 统一设置列间距、行间距

4. 块中子元素对齐
* justify-items: 行对齐
  * stretch:占满整个空间(默认值)
  * start:靠左
  * center:居中
  * end:靠右

* align-items: 列对齐
  * stretch:占满整个空间(默认值)
  * start:顶部
  * center:居中
  * end:底部

* place-items: <justify-items> <align-items>

5. 块对齐
* justify-content: 行对齐
* align-content: 列对齐
* 基础参数与 子元素一致，多出了 3个属性 space-around | space-between | space-evenly
  * space-around: 项目两端间隔相等，项目之间间隔是两端间隔的两倍
  * space-between: 项目两端对齐，项目之间间隔相等
  * space-evenly: 项目间隔相等

6. 基于网格线定位
* grid-column-start: 列开始
* grid-column-end: 列结束
* grid-row-start: 行开始
* grid-row-end: 行结束 

7. 排列元素 (参考视频 01:04 ~ 01:20)
* grid-area: 给元素指定别名
* grid-template-areas: "" 排列元素拥有别名的元素

8. 排列顺序
* grid-auto-flow
  * row: 从左到右
  * column: 从上到下
  * row dense: 密集排列 从左到右
  * column dense: 密集排列 从上到下
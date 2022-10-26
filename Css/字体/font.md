<!--
 * @Date: 2022-08-18
 * @Author: 马晓川 maxc@dustess.com
 * @LastEditors: 马晓川 maxc@dustess.com
 * @LastEditTime: 2022-08-18
 * @Description: 
-->
### [Google Fonts](https://fonts.google.com/)
  * 需要梯子，所以国内无法使用在线链接的方式
    * 国内方案：[Google Fonts 中文网](https://www.googlefonts.cn/)
    * fonts.googleapis.com -> fonts.font.im
    * 但是中文网的 中文板块是烂的，所以搜索还是使用 外网网址，英文板块可以使用
  * 使用方式：替换 family 后的字体名称
  * [Google Fonts FAQ](https://developers.google.com/fonts/docs/css2)

```Css
@import url("https://fonts.googleapis.com/css?family=DynaPuff");
{
  font-family: "DynaPuff";
}
```

### 引入 font 文件
```Css
@font-face {
  font-family: MyFont;
  src: url("@/fonts/Lato-Light.ttf");
}

font-family: "MY";
```

### font-family 的最佳设置
```Css
{
  font-family:
    system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,
    Helvetica,Arial,
    sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
}
```
1. system-ui，使用各个支持平台上的默认系统字体
2. -apple-system， 在一些稍低版本 Mac OS X 和 iOS 上，它针对旧版上的 Neue 3. Helvetica 和 Lucida Grande 字体，升级使用更为合适的 San Francisco Fonts
3. BlinkMacSystemFont，针对一些 Mac OS X 上的 Chrome 浏览器，使用系统默认字体
4. segoe ui，在 Windows 及 Windows Phone 上选取系统默认字体
5. Roboto，面向 Android 和一些新版的的 Chrome OS
6. Helvetica,Arial，在针对不同操作系统不同平台设定采用默认系统字体后，针对一些低版本浏览器的降级方案
6. sans-serif，兜底方案，保证字体风格统一，至少也得是无衬线字体


上述 5 个字体族定义，优先级由高到底，可以看到，它们 5 个都并非某个特定字体，基本的核心思想都是选择对应平台上的默认系统字体。

涵盖了 iOS、MAC OS X、Android、Windows、Windows Phone 基本所有用户经常使用的主流操作系统。

使用系统默认字体的主要原因是性能。字体通常是网站上加载的最大/最重的资源之一。如果我们可以使用用户机器上已有的字体，我们就完全不需要再去获取字体资源，从而使加载时间明显加快。

并且系统字体的优点在于它与当前操作系统使用的相匹配，因此它的文本展示必然也是一个让人舒适展示效果。

当然，上述 font-family 的定义不一定是最佳的。譬如天猫在最前面添加了 "PingFang SC",miui,..必定也有他们的业务上的考虑。但是一些 fallback 方案向后兼容的思想都是一致的，值得参考学习。


### [字体显示平滑清晰](https://blog.csdn.net/SummerOfFoam/article/details/115563942)
```Css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```
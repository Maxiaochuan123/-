[解决方式视频](https://www.bilibili.com/video/BV1884y1V77d/?spm_id_from=333.1007.tianma.7-3-22.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)


### Grid 解决方案
``` css
这种情况下，我建议你用grid布局。
对父元素设置下面属性{
 display: grid;
 grid-template-columns: repeat(auto-fill, '子元素宽度')；
grid-gap: ''; //如果需要固定间隔
justify-content: center;
}
这样的话，子元素无论多少个都能自动排列，每一行还能居中和自动换行
```
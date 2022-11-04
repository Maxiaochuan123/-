<!--
 * @Date: 2022-08-18
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-10-26
 * @Description: 
-->
### vue 每次保存卡顿
* 原因是在执行 eslint 保存自动修复，我们可以把它设置为 false
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": false,
    "eslint.autoFixOnSave" : false
},
```

### [vsCode 目录改为非紧凑型](https://www.toutiao.com/article/7155303876651172367/?app=news_article&timestamp=1666545252&use_new_style=1&req_id=202210240114120101511990822063A5CB&group_id=7155303876651172367&wxshare_count=1&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_android&utm_campaign=client_share&share_token=0419fee3-88aa-4605-b936-e3fa5e73d632&source=m_redirect)
设置中输入 Compact Folders 找到  ExplorerL Compact Folders 取消勾选
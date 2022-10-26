### vue 每次保存卡顿
* 原因是在执行 eslint 保存自动修复，我们可以把它设置为 false
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": false,
    "eslint.autoFixOnSave" : false
},
```
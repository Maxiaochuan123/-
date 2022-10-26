```javascript
    //计算属性 —— 简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性 —— 完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
```
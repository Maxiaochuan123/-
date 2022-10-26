#### 定义：watch 显示指定依赖源，依赖源更新时执行回调函数。

#### 注意：
1. 数组清空不要使用 = []，因为直接 = 赋值数组在栈中的引用地址发生了变化，他指向了新的空数组，watch无法监听到，应该使用 arr.length = 0

2. 监听值是否有变化：直接监听(外层对象、内层对象、或明确指定属性)即可，但 watch 的 newVal、oldVal 是相等的，因为 Proxy 代理的是用一个地址
如果期望正确获取 oldVal，有以下两种处理方式。
   1. 监听的值是对象：需要使用箭头函数 () => person.info.name 返回具体需要监听的属性。
   2. 监听的值是数组，需要使用箭头函数解构 () => [...person.info.hobby] 返回具体需要监听的属性。

3. ref，reactive 定义的引用类型数据，默认自动开启了深度监听，但是如果被监听的属性值仍然是引用类型，需要开启深度监听 { deep: true }

4. 监听 ref 定义的基本类型数据，watch不需要.value，引用类型需要.value，但不推荐 ref 声明引用类型数据，因为 ref 定义的基本类型数据是 RefImpl，ref 定义的引用类型数据，实际是通过 reactive 函数进行了 Proxy 代理

```javascript
    // 监听单个 ref 创建的响应式数据
    let a = ref('a');
    let b = ref('b');

    watch(a, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });

    // 监听多个
    // 方式一
    watch(a, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });
    watch(b, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });

    // 方式二：数组，得到的 newVal, oldVal 也是数组
    watch([a, b], (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });


    // 监听 reactive 创建的响应式数据, 默认开启了深度监听 deep: true
    let person = reactive({ name: "张三", age: 18 });

    //方式一：监听多个
    watch(() => person.name, (newVal, oldVal) => { 
        console.log(newVal, oldVal);
    });
    watch(() => person.age, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });

    //方式二：监听多个
    watch([() => person.name, () => person.age], (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });
```
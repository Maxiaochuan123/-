* 在类中使用哈希前缀 # 将类字段设为私有，被 # 标记的字段都将被私有，子类实例将无法继承

```javascript
    class ClassWithPrivateField {
        #privateField;
        #privateMethod() {
            return 'hello world';
        }
        constructor() {
            thiss.#privateField = 42;
        }
    }

    const instance = new ClassWithPrivateField()
    console.log(instance.privateField); //undefined
    console.log(instance.privateMethod); //undefined

    // 可以看到，属性 privateField 和方法 privateMethod 都被私有化了，在实例中无法获取到
```
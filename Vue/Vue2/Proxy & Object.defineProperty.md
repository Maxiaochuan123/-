[Proxy 与 Object.defineProperty 对比 - 文章](https://blog.csdn.net/jieweiwujie/article/details/125809434)

* vue3 为什么要使用 Proxy 来替代 vue2 中的 Object.defineProperty
  * 1.Proxy 是对整个对象进行代理，而 Object.defineProperty 只能代理某个属性。
  * 2.Proxy 能监听到对象上新增属性，Object.defineProperty不能。
    * Object.defineProperty 需要遍历对每个属性进行劫持，深层对象还需要递归才能劫持到所有属性
  * 3.Proxy 能监听到数组新增的变更，Object.defineProperty不能。
    * Object.defineProperty：push、unshift 界面不会更新， 通过下表修改数组，界面不会自动更新
    * 在Vue2.x中，通过重写Array原型上的一系列方法解决的这个问题，可以调用 this.$set() 方法 
  * 4.若对象内部属性要全部递归代理，Proxy 可以只在调用的时候递归，而Object.defineProperty 需要一次完成所有递归，性能比 Proxy差。

  * Object.defineProperty
    * get(), set()
    ```javascript
        let obj = {}
        let temp;
        Object.defineProperty(obj, 'a', {
            get() {
                console.log('get')
                return temp;
            },
            set(newVal) {
                temp = newVal;
                console.log('set')
            }
        })
        obj.a = 10;
        console.log(obj.a)
        //劫持单个属性，触发 get()、set(), 但需要变量周转赋值
    ```

    * 封装函数 defineReactive 使用闭包 延长变量生命周期来解决
    ```javascript
        let obj = {}
        function defineReactive(data, key, val) {
            Object.defineProperty(data, key, {
                get() {
                    console.log('get')
                    return val;
                },
                set(newVal) {
                    console.log('set')
                    if(val == newVal) val = newVal;
                }
            })
        }
        defineReactive(obj, 'a', 1)
        obj.a = 10;
        console.log(obj.a)
    ```

  * 如果 obj 是多层级对象，我们要如何监听对象上的多个属性呢？我们可能想到遍历的方式，使用Object.keys(obj)进行遍历劫持对象的所有属性，但遍历访问 obj[key] 会触发 get()，这会导致栈溢出
    * 1.所以我们引出 Observer(观察者模式)：设置一个中转Obsever，来让get中return的值并不是直接访问obj[key]。
    ```javascript
    // 实现一个遍历函数Observer
    function Observer(obj) {
        Object.keys(obj).forEach((key) => {
            defineProperty(obj, key, obj[key])
        })
    }
    ```
    * 2.那么我们如何解决对象中嵌套一个对对象的情况呢？其实在上述代码的基础上，加上一个递归，就可以轻松实现啦~
    ```javascript
        function defineProperty(obj, key, val) {
            //如果某对象的属性也是一个对象，递归进入该对象，进行监听
            if(typeof val === 'object'){
                observer(val)
            }
            Object.defineProperty(obj, key, {
                get() {
                    console.log(`访问了${key}属性`)
                    return val
                },
                set(newVal) {
                    console.log(`${key}属性被修改为${newVal}了`)
                    val = newVal
                }
            })
        }
        //当然，我们也要在observer里面加一个递归停止的条件:
        function Observer(obj) {
            //如果传入的不是一个对象，return
            if (typeof obj !== "object" || obj === null) {
                return
            }
            // for (key in obj) {
            Object.keys(obj).forEach((key) => {
                defineProperty(obj, key, obj[key])
            })
            // }
        }
    ```
  
  Proxy 本质是构造函数，通过 new 即可产生对象，它接收两个参数：
    * target：表示的就是要拦截(代理)的目标对象
    * handler：是用来定制拦截行为
    ```javascript
    function reactive(obj) {
        return new Proxy(obj, {
            get(target, key) {
                //收集副作用函数
                track(target, key);
                return target[key]
            },
            set(target, key, val) {
                target[key] = val
                //执行副作用函数
                trigger(target, key)
            },
            deleteProperty(target, key) {
                return delete target[key]
            }
        })
    } 
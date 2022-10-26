### 定义：watchEffect 自动收集依赖源，依赖源更新时候重新执行自身。

### watchEffect 类的定义
```javascript
    function watchEffect(
        effect: (onInvalidate: InvalidateCbRegistrator) => void,
        options?: WatchEffectOptions
    ): StopHandle;

    interface WatchEffectOptions {
        flush?: "pre" | "post" | "sync";
        onTrack?: (event: DebuggerEvent) => void;
        onTrigger?: (event: DebuggerEvent) => void;
    }

    interface DebuggerEvent {
        effect: ReactiveEffect;
        target: any;
        type: OperationTypes;
        key: string | symbol | undefined;
    }

    type InvalidateCbRegistrator = (invalidate: () => void) => void;

    type StopHandle = () => void;
```

* watchEffect：不需要指定监听的属性，他会自动的收集依赖，只要我们回调中引用了响应式属性，那么当这些属性变更的时候，这个回调都会执行，他也没有 newVal、oldVal。

* watchEffect：类似 watch 开启了 { immediate: true }，默认会直接执行一次

* 接收一个函数 onInvalidate，用于清除副作用。
* 什么是副作用？
    比如： let UI = fn(n); 这个 UI 渲染函数，他的作用是渲染 UI 界面，但除此之外的一切不相关的东西，都被称之为副作用。
* promisex函数因该放置于 onInvalidate函数的下面
* onInvalidate 清除副作用函数的执行时机由 flush 控制
```javascript
    watchEffect(onInvalidate => {
        onInvalidate(() => { })
    },{
        flush: "pre"
        //'pre' 在组件更新更新前运行, 默认为'pre'
        //'post'在组件更新更新后运行
        //'sync'强制效果始终同步触发。然而这是低效的，应该很少需要。
    })
```
* watchPostEffect === flush: "post"
* watchSyncEffect === flush: "sync"

* 停止 watchEffect
    * 1.显式停止：watchEffect 会返回一个用于停止这个监听的函数
    ```javascript
        const stop = watchEffect(() => {
        /* ... */
        })

        // later
        stop()
    ```
    * 2.隐式停止：如果 watchEffect 是在 setup 或者 生命周期里面注册的话，在组件取消挂载的时候会自动的停止掉。

* 依赖追踪
    * 同步调用：追踪所有依赖
    * 异步调用：只有在第一个 await 正常工作前访问到的 property 才会被追踪。
      * 如下：只会追踪url.value作为依赖
        const response = await fetch(url.value)
        data.value = await response.json()

### 注意点
* 1.如果有多个负效应，不要粘合在一起，建议写多个 watchEffect。
```javascript
    watchEffect(() => {
        setTimeout(() => console.log(a.val + 1), 1000);
        setTimeout(() => console.log(b.val + 1), 1000);
    });

    // 这两个 setTimeout 是两个不相关的效应，不需要同时监听 a 和 b，分开写吧：
    watchEffect(() => {
        setTimeout(() => console.log(a.val + 1), 1000);
    });

    watchEffect(() => {
        setTimeout(() => console.log(b.val + 1), 1000);
    });
```
* 2.watchEffect 也可以放在其他生命周期函数内
```javascript
    // 比如你的副作用函数在首次执行时就要调用 DOM，你可以把他放在 onMounted 钩子里：
    onMounted(() => {
        watchEffect(() => {
            // access the DOM or template refs
        });
    }
```


#### 你可能会疑惑既然已经有 watch了，那么 watchEffect 的应用场景是什么？

【场景一】有一个用户详情页面，我们通过 id 的不同，来渲染不同的用户详情信息，我们通常通过 watch 来监听 id，然后 ajaxHandle 函数接收这个 id 来请求不同的用户详情数据，下面 getUserDetails 来模拟接口请求。
```javascript
    let id = ref<number>(1);
    let list = reactive<string[]>([]);
    const getUserDetails = (): Promise<string[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(["a", "b", "c"]);
            }, 3000);
        });
    };

    // watch
    watch(id.value, async(newVal, oldVal) => {
      if (newVal === oldVal) return false;
      let data = await getUserDetails(id.value);
      list.push(...data);
    });

    // watchEffect可以更简单
    watchEffect(async () => {
      let data = await getUserDetails(id.value);
      list.push(...data);
    })
```

【场景二】watch 监听 btnState，当点击按钮的时 btnState === true，setTimeout 每一秒对 num 进行累加。 
以往我们会在页面卸载的时候去清除这个定时器，使用 watchEffect 可以更简单，他将跨越生命周期。
```javascript
    let btnState = ref<boolean>(false);
    let num = ref<number>(0);
    let interval: number;
    const changeState = () => (btnState.value = !btnState.value);

    // watch
    watch(btnState, async (newVal) => {
        if (!newVal) return false;
        interval = window.setInterval(() => {
            num.value += 1;
        }, 1000);
    });

    onUnmounted(() => {
        clearInterval(interval);
    });

    // watchEffect可以更简单，他将自动监听发生改变的响应式属性，并且通过副作用函数 onInvalidate 来清除副作用。
    watchEffect((onInvalidate) => {
        interval = window.setInterval(() => {
            num.value += 1;
        }, 1000);

        onInvalidate(() => {
            clearInterval(interval);
        })
    })
```

【场景三】利用watchEffect作一个防抖节流（如取消请求）
```javascript
    const id = ref(13)
    watchEffect(onInvalidate => {
        // 异步请求
        const token = performAsyncOperation(id.value)
        // 如果id频繁改变，会触发失效函数，取消之前的接口请求
        onInvalidate(() => {
            // id has changed or watcher is stopped.
            // invalidate previously pending async operation
            token.cancel()
        })
    })
```

### 小结
  watchEffect 基本上是现象级拷贝了 React 的 useEffect；这里倒不是 diss Vue3，只是说 watchEffect 和 useEffect 的设计都源自于一个比较成熟的编程范式——FP。大家在看 Vue3 文档时，也不要只盯着某些 api 的用法，Vue 只是工具，解决问题才是终极目标；我们还是要把重点放在领悟框架的设计思想上；悟到了，才是真正掌握了解决问题的手段。最后以独孤求败的一句名人名言结尾：

  > 重剑无锋，大巧不工，四十岁前持之横行天下；四十岁后，不滞于物，草木竹石均可为剑。
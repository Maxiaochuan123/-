setup的两个注意点
  * setup执行的时机
    * 在 beforeCreated 之前执行一次，this 是 undefined。
  * setup的参数
    * props：值为对象，包含：组件外部传递过来，且组件内部声明接收的属性
    * context：上下文对象
      * attrs：值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性，相当于 this.$attrs。
      * slots：收到的插槽内容，相当于 this.$slots。
      * emit：分发自定义事件的函数，相当于 this.$emit。
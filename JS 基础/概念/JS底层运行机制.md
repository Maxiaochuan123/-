#### [讲解视频](https://www.bilibili.com/video/BV1j5411e7ZG?p=4&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
#### [文章 - 深入理解Javascript中的执行环境(Execution Context)和执行栈(Execution Stack)](https://blog.csdn.net/weixin_33957648/article/details/88590192?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5-88590192-blog-95221880.pc_relevant_multi_platform_whitelistv2_exp180w&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5-88590192-blog-95221880.pc_relevant_multi_platform_whitelistv2_exp180w&utm_relevant_index=10)
#### [文章 - 深入理解Javascript之Execution Context](https://www.jianshu.com/p/91020572b1f4)
#### [网站 - 查看代码在 JS引擎中运行过程](https://ui.dev/javascript-visualizer)
#### [V8-引擎解析过程](https://www.bilibili.com/video/BV1g54y1e77B/?spm_id_from=trigger_reload&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)
#### [JS-引擎运行过程](https://juejin.cn/post/6844903732790968334)


* JS底层运行机制：堆(Heap)，栈(Stack)内存
  * 执行环境栈：ECStack (ExecutionContextStack)
  * 执行上下文：EC (ExecutionContext)
  * 全局执行上下文：EC(G) (GlobalExecutionContext)
  * 全局对象：GO (GlobalObject)
  * 全局变量对象: VO (VariableObject)
  * 词法环境

  * GO：全局对象(堆内存)
    * 存放全局公共属性，和方法。

  * ECStack[Execution Context Stack]：执行环境栈(栈内存)
    * 浏览器提供代码执行的执行环境。
    * 他做了两件事情：
      * 1.它创建了一个全局对象 windows
      * 2.并且把 this 的值设置到全局对象 GO 中，所以可以通过 window.xxx 来调用公共属性和方法。

  * EC[Execution Context]：执行上下文
    * JS引擎为了区分代码所执行的范围，这个范围就是执行上下文。
    * 在其他编程语言中也被称为调用栈，它是一种LIFO（Last in, First out 后进先出）的结构，被用于在代码执行阶段存储所有创建过的执行环境。

  * EC(G)[Global Execution Context]：全局执行上下文
   * JS引擎首次运行时，它会创建一个全局执行环境，称为全局执行上下文。
   * 全局上下文只有一个，程序中其他任意的上下文都可以访问全局上下文。
   * 在全局执行上下文中，this的值指向全局对象，在浏览器中this的值指向window对象。

  * EC(L)[Local Execution Context]：局部执行上下文 / EC(F)[Function Execution Context]：函数执行上下文
   * 函数调用每一次都会创建一个新的局部执行上下文，因此局部执行上下文可以有无限多个，函数内部的所有声明都会放在这个上下文中，当前局部上下文以外无法直接访问内部声明的变量因为他是私有的。
   * 在函数执行上下文中，this的值取决于函数的调用方式，如果他被一个对象调用那么this的值设置为该对象，否则this的值被设置为全局对象或者 undefined(严格模式下)。

   * 关于this绑定
    1.在全局执行上下文中，this的值指向全局对象，在浏览器中this的值指向window对象。
    2.在函数执行上下文中，this的值取决于函数的调用方式，如果他被一个对象调用那么this的值设置为该对象，否则this的值被设置为全局对象或者 undefined(严格模式下)。
    ```javascript
        //结果为：undefind
        console.log(name);
        var name = '老马';
        //根据全局执行上下文不难理解，我们知道一个执行上下文会经历创建和执行两个阶段。
        //首先 JS 引擎为变量分配内存空间并存入全局对象中，var 的默认值就是 undefind，代码执行前扫描js代码，创建全局执行上下文，将 var name 提到代码顶部赋值undefind，然后压入执行栈中，一行一行执行代码，当执行到代码 console.log() 打印出初始值 undefind，再执行下面赋值操作 name = '老马'
    ```
    * var的这种特性经常会造成意想不到的结果，所以 ES6 引入了另一种变量定义方式let。let定义的变量在定义之前引用会抛出异常。这是怎么做到的呢？

    其实很简单。在执行上下文的创建阶段，let定义的变量也会存入环境对象中。不过，它的初始值为UnInitialized（未初始化）。在执行时，如果引用一个值为UnInitialized的变量，引擎直接抛出一个错误🥴。


  ※ 从ES5开始不再提 scope(范围) 这个概念，取而代之的是 Environment(环境)，实际两个是相同的概念，不同点在于 Environment 是由 环境记录规范中的 5种环境记录来实现的，它细化了 object 作用域名字列表的使用，词法环境规范的作用是使下层设计更加简单，指(ExecutionContext) 

  词法环境规范(属性描述符和属性标识符规范):
  ExecutionContext：执行上下文
    * ExecutionContext 有两个成员 
      * LexicalEnvironment：词法环境
        * 用于存储 函数声明和变量 (let、const)绑定
      * VariableEnvironment：变量环境
        * 用于存储 var 绑定

    LexicalEnvironment：词法环境
    * LexicalEnvironment 有两个成员 object：环境记录，outer：parent(上一层)

    环境记录规范：
    * DeclarativeEnvironmentRecord：声明环境记录
    * ObjectEnvironmentRecord：对象环境记录
    * GlobalEnvironmentRecord：全局环境记录
    * ModuleEnvironmentRecord：模块环境记录
    * FunctionEnvironmentRecord：函数环境记录

    ![词法环境](https://upload-images.jianshu.io/upload_images/6432928-1a30c4bcac536f70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    * 全局环境记录，模块环境记录，函数环境记录 这三种是可以直接执行的，而声明环境记录，对象环境记录就只是环境而已

  * 那么JS引擎如何让代码运行起来呢？
    在以上基础之上，JS引擎又规定了两个专门用于执行的组件 RunJobs()：任务队列 。
    * PromiseJobs
    * ScriptJob / TopModuleJob
    * 当 ExecutionContextStack：执行环境栈为空的时候，就会去 RunJobs()：任务队列中取
      ![RunJobs()](https://upload-images.jianshu.io/upload_images/6432928-6820dedda15022c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

      
  
  ### 执行环境的创建过程分为两个阶段。
  * 1.创建阶段
    * 执行环境是在创建阶段被创建出来的。在创建阶段会发生下面的事情：
    * 1.确定this的值，也被称为 This Binding。
    * 2.LexicalEnvironment(词法环境) 组件被创建。
    * 3.VariableEnvironment(变量环境) 组件被创建。
    
  * 1.1 词法环境
    官方定义(ECMAScript2015)：
    * 词法环境是一种规范类型，基于ECMAScript代码的词法嵌套结构来定义标识符与特定变量和函数的关联关系。
    * 词法环境由环境记录(environment record) 和可能为控引用(null)的外部词法环境组成。
    简而言之，词法环境是一个包含标识符变量映射的结构，（这里的标识符表示变量/函数的名称，变量是实际对象【包括函数类型对象】或原始值的引用）


    * 每一个词法环境都有两个组件 [环境记录，对外层环境的引用]
    * 1.环境记录
      * 环境记录又分为 “声明环境记录”，“对象环境记录”
        * 1.声明环境记录：
          * 1.1 它存储着变量和函数的声明。
          * 1.2 函数代码的词法环境包含一个声明环境记录。
        * 2.对象环境记录：
          * 2.1 全局代码的词法环境包含一个对象环境记录。
          * 2.2 对象环境记录除了记录变量和函数声明之外，也会存储全局绑定对象（浏览器中的window对象，它包含所有由浏览器给window对象的属性和方法）
        * ※ 注意对于函数执行上下文而言，环境记录还包含一个参数对象(arguments)，该对象包含了索引和传递给函数的参数之间的映射以及传递给函数的参数长度(数量)。例如，下面函数的arguments对象：
        ```javascript
            function foo(a, b) {
                var c = a + b;
            }
            foo(2, 3);
            // argument 对象
            Arguments: {0: 2, 1: 3, length: 2},
        ```
    抽象的说，词法环境伪代码看起来像这样：
    ```javascript
      GlobalExecutionContext = { //全局执行上下文
        LexicalEnvironment: { //词法环境
          EnvironmentRecord: { //环境记录
            Type: "Object", //全局环境
            outer: <null> //对外部环境的引用
          }
        }
      };

      FunctionExectionContext = { //函数执行上下文
        LexicalEnvironment: { //词法环境
          EnvironmentRecord: { //环境记录
            Type: "Declarative", //函数环境
            outer: <Global or outer function environment reference> //对外部环境的引用
          }
        }
      };
    ```
    * 2.对外部环境的引用
    * 对外部环境的引用意味着它可以访问外部的词法环境，这意味着如果他们在当前的词法环境中没有找到的话，JS引擎会到外面的环境里去寻找变量，直至找到这个变量，或undefind。

  * 1.2 变量环境
    * 变量环境是一个词法环境，因此它具有词法环境的所有属性。
    * 在ES6中，词法环境和变量环境的区别在于，前着用于存储函数声明和变量(let/const)绑定，而后者仅用于存储变量(var)绑定

    ```javascript
    let a = 20;
    const b = 30;
    var c;

    function multiply(e,f){
      var g = 20;
      return e * f * g;
    }

    c = multiply(20, 30);

    //执行上下文如下

    GlobalExecutionContext = {
      ThisBinding: <Global Object>,

      LexicalEnvironment: {
        EnvironmentRecord: {
          Type: "Object",
          a: <uninitialized>,
          b: <uninitialized>,
          multiply: <function>
        },
        outer: <null>
      },

      VariableEnvironment: {
        EnvironmentRecord: {
          Type: "Object",
          c: undefined
        },
        outer: <null>
      },

      FunctionExectionContext: {
        ThisBinding: <Glable Object>,
        LexicalEnvironment: {
          EnvironmentRecord: {
            Type: "Declarative",
            Arguments: { 0:20, 1:30, length:2 }
          },
          outer: <GlobalLexicalEnvironment>
        }
      },

      VariableEnvironment: {
        EnvironmentRecord: {
          Type: "Declarative",
          g: undefined
        },
        outer: <GlobalLexicalEnvironment>
      }
    }

    //此时只是进行环境声明，只有当调用 multiply() 函数时才会执行上下文。
    ```
    

  

  总结：
  浏览器为了能执行代码，在内存中开辟了两块内存，栈内存：1.ECStack执行环境栈(供JS代码执行)。
  2.堆内存：GO全局对象(为了让JS能直接调用浏览器提供的内置属性和方法，单独开辟出一块堆内存来存储这些属性和方法)。
  并且浏览器会创建一个全局对象 window指向GO，这样就可以通过 window.xxx来调用浏览器内置的属性和方法啦。
  
  Javascript 引擎在执行代码时会创建一个全局对象 GO(global object)
  1.在所有函数外层定义的变量都会保存在全局对象中。
  2.在函数内，未使用var，let或const修饰的变量定义也会将变量存储在全局对象中。

  接下来引擎开始解析代码，创建<main>函数包裹代码。
  然后，<main>函数执行。此时，Javascript 引擎首先会创建一个全局执行上下文。

  执行上下文的创建分为两个阶段：
  1.创建阶段(Creation Phase)：JS引擎首次运行时，会先扫描一遍代码，它会创建一个 EC(G)全局执行上下文，并解析生成词法环境，分为三个步骤。
    1.环境记录：变量和函数的声明将会被存储其中，以及传递给函数的参数以及索引
    2.this绑定：如果它是在对象引用中被调用，this的值就被设置为那个对象，否则 this 的值会被设置为全局对象或者是undefined（在严格模式中）

  定义的变量将被存储到 GO全局对象中(函数内未使用关键字定义的变量也会存储到全局对象中)，然后将代码推入 ECStack 中，action 和 event 都会被排队放入，等待代码执行。

  2.执行阶段(Execution Phase)：函数将生成 EC(L)局部执行上下文，创建局部执行上下文时也将经历创建，执行两个阶段
  
  ※ setTimeOut，setInterval 不受JavaScript引擎约束，是用操作系统线程实现的
  
  #### 思考下面的代码片段
  ```javascript
    //片段1
    let a = 12;
    let b = a;
    b = 13;
    console.log(a); //12

    //片段2
    let a = { n: 12 };
    let b = a;
    b['n'] = 13;
    console.log(b); //13

    //片段3
    let a = { n: 12 };
    let b = a;
    b = { n: 13 };
    console.log(a.n); //12
  ```
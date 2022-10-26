#### this
  * 在全局执行环境中，this的值指向全局对象。（在浏览器中，this指向window对象）
  * 在函数执行环境中，this的值依赖于函数的调用方式。如果它是在对象引用中被调用，this的值就被设置为那个对象，否则 this 的值会被设置为全局对象或者是undefined（在严格模式中）

#### 例子
```JavaScript
// this 指向当前对象， 结果为老马
let obj = {
    name: '老马',
    get: function () {
        console.log(this.name);
    }
}

// 为什么最终结果打印 undefined ?
let obj = {
    name: '老马',
    get: function () {
        console.log(this.name);
    }
}
let newObj = obj.get;
newObj();
// 因为只是把 obj 的 get方法赋值给了 newObj，并且newObj是在全局作用域中执行，全局作用域 window 中并没有 name属性 所以结果为 undefined，除非将 name属性赋值给 window

// 为什么最终结果打印 undefined ?
let obj = {
    name: '老马',
    get: function () {
        return function fnc() {
            return this.name;
        }
    }
}
console.log(obj.get()()); //undefined

// 因为 this 指向当前调用函数的对象，而 fnc 函数的执行环境是在全局作用域，所以 this 指向 window，而 window 中找不到 name属性，所以结果是 undefined

// 解决方法 1.指定 this
let obj = {
    name: '老马',
    get: function () {
        let _this = this
        return function fnc() {
            return _this.name
        }
    }
}
console.log(obj.get()()); //老马

// 解决方法 2. .bind(this)
let obj = {
    name: '老马',
    get: function () {
        return function fnc() {
            return this.name;
        }.bind(this)
    }
}
console.log(obj.get()()); //老马

// 解决方法 3. 箭头函数 () => {}
let obj = {
    name: '老马',
    get: function () {
        return fnc = () => {
            return this.name;
        }
    }
}
console.log(obj.get()()); //老马
```
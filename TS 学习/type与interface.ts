/*
 * @Date: 2022-08-17
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-10-22
 * @Description: 
 */

// https://www.bilibili.com/video/BV1S14y1b7Fp?spm_id_from=333.880.my_history.page.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a
// 类型别名 Type Aliases 给其他类型取个名字
type Name = string // 普通类型
type FalseLike = '' | 0 | false | null | undefined // 联合类型
type Point = { x:number, y:number } // 对象
type Points = Point[] // 对象数组
type FnHandle = (a:number, b:string) => number // 函数


// 声明接口 描述对象的属性 declare the shapes of objects
interface A { 
  name:string, 
  age:number, 
  hobby:string[],
  handle: (a:string, b:number) => number
}

/**
 * type 和 interface 都可以描述类型，那么为什么还要 interface 呢？
 * 因为 TS 迎合面向对象粉丝的需求，interface 更接近面向对象思想 它比 class 更轻量
 * interface 是把 type 能做的事情用面向对象的方式再描述一遍
 */


/**
 * type 与 interface 的区别
 * 1. interface 只描述对象，type 则描述所有数据
 * 2. type 只是别名，interface 则是类型声明
 */
type B = string;
type C = B; // 鼠标移入 C，显示 type C = string，直接跳过了 B 所以 type 描述的是别名

interface D extends Date{};
type E = D; // 鼠标移入 E，显示 type E = D，说明 interface 声明的是真名


// 技巧
// 嵌套对象 使用 [] 来减少层级
type PersonType = {
  info: {
    name: string;
    age: number;
  };
};
const person: PersonType["info"] = {
  name: "zs",
  age: 18
};

// https://www.toutiao.com/w/7156631120346402089/?app=news_article&timestamp=1666332321&use_new_style=1&wxshare_count=1&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_android&utm_campaign=client_share&share_token=65fd7388-2bfd-4cd5-93a8-2154f572d369&source=m_redirect
// interface 与 type 并不互斥，都可以相互扩展
// interface 通过 extends
type MyType = { x:number }
interface MyInterface extends MyType { y:number }

// type 通过 &
interface MyInterface2 { x:number }
type MyType2 = { y:number } & MyInterface2
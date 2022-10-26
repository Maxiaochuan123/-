/*
 * @Date: 2022-10-22
 * @Author: 马晓川 724503670@qq.com
 * @LastEditors: 马晓川 724503670@qq.com
 * @LastEditTime: 2022-10-22
 * @Description: 
 */

// https://www.toutiao.com/w/7156631120346402089/?app=news_article&timestamp=1666332321&use_new_style=1&wxshare_count=1&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_android&utm_campaign=client_share&share_token=65fd7388-2bfd-4cd5-93a8-2154f572d369&source=m_redirect

// keyof 类型索引类似于 Object.keys, 用于获取一个接口中 key 的联合类型
interface Button {
    type: string,
    text: string
}

type ButtonKeys = keyof Button
// type ButtonKeys = 'type' | 'text'


/* extends 类型约束，这里的 extends 不同于在 class后使用extends的继承作用，
 一般在泛型内使用，它的作用是对泛型加一约束
*/

type BaseType = string | number
// 表示 T 这个泛型的类型 只能在 BaseType 中
function copy<T extends BaseType>(arg: T): T {
    return arg
}

/* extends 经常与 keyof 一起使用，例如我们有一个 getValue方法用来获取对象的值，
 但是这个对象并不确定，我们就可以使用 extends 和 keyof 进行约束
*/
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
const obj = { a: 1 }
const a = getValue(obj, 'a')
const b = getValue(obj, 'b') // error


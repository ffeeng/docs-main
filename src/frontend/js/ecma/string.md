
## 基本原理
- 字符串和字符串对象通过装箱和拆箱进行转换，
- 字符串对象是类数组，
- 字符串可以for of遍历，也可以数组下标访问
![image-20210125104224901](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzqtd2oblj30bm0pyn09.jpg)

## 常用示例

### 创建
```javascript
console.log('ab')
console.log(new String('ab'))
console.log(String.fromCharCode(97, 98))
console.log(String.fromCodePoint(97, 98))
console.log(String.raw({raw: ['a','b','c']}, 1, 2))
```
### 编解码
```javascript
console.log("ab".charAt(0))
console.log("ab".charCodeAt(0))
console.log("ab".codePointAt(0))
```
### 修改
#### 大小写
```javascript
console.log("Ab".toLocaleLowerCase())
console.log("Ab".toLocaleUpperCase())
console.log("Ab".toLowerCase())
console.log("Ab".toUpperCase())
```
#### 替换
```javascript
console.log("aba".replace('a', '1'))
```
#### 填充 去空格
```javascript
console.log("ab".padEnd(5, '1'))
console.log("ab".padStart(5, '1'))
console.log(" A b ".trim()) /*? $.length */
console.log(" A b ".trimEnd())
```
#### 其他
```javascript
console.log(..."ab")
console.log("ab".concat('0'))
console.log("ab" + '0')
console.log("ab".normalize("NFC"))
console.log("ab".repeat(2))
console.log("ab".split(''))
```
### 判断 比较
```javascript
console.log("ab".endsWith('b'))
console.log("ab".startsWith('a'))
console.log("ab".includes('a'))
console.log("ab".localeCompare('ba'))
```
### 截取
```javascript
console.log("ab".slice(-2))
console.log("ab".substr(0, 2))
console.log("ab".substring(0, 2))
```
### 查询
```javascript
console.log("aba".match(/a/g))
console.log([..."aba".matchAll(/a/g)])
console.log("ab".indexOf('a'))
console.log("ab".lastIndexOf('a'))
console.log("ab".length)
console.log("ab".search('a'))
console.log("ab"[1])
```
### 显示
```javascript
console.log("Ab".toString())
console.log("ab".valueOf())
console.log([..."ab"[Symbol.iterator]()])
```
### html相关
```javascript
console.log("ab".anchor('a'))
console.log("ab".big())
console.log("ab".blink())
console.log("ab".bold())
console.log("ab".strike())
console.log("ab".italics())
console.log("ab".fixed())
console.log("ab".fontcolor('red'))
console.log("ab".fontsize(20))
console.log("ab".link('http://hao123.com'))
console.log("ab".small())
console.log("ab".sub())
```
## 运行截图
![image-20210125162136670](/Users/zego/Library/Application Support/typora-user-images/image-20210125162136670.png)


## 方法详解
### String.phototype.replace
  replace接收两个参数
1. 正则模式指定要替换的部分，
2. 替换逻辑函数
                 ![image-20210125173218028](https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vigdz9j30eh03lwen.jpg)

### String.phototype.match
![image-20210125173858513](https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vixso0j30gl028glo.jpg)



## 参考

- [MDN String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- [ECMA String](https://262.ecma-international.org/6.0/#sec-string-objects)


## 基本原理
![image-20210125175424726](/Users/zego/Library/Application Support/typora-user-images/image-20210125175424726.png)

## 常用示例
```javascript
console.log(1,2)
console.info(1,2)
console.warn(1,2)
console.debug(1,2)
console.error(1,2)
console.dir(1)
console.dirxml(1)
console.group('group')
console.groupEnd()
console.time('time')
console.timeEnd('time')
console.clear()
console.assert(false,'条件为false')
console.trace()
```

## 陌生而有用的方法
- console.assert
  断言，测试时用
- console.trace
  显示代码运行时路径，调式时用


## 参考
- [MDN String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [ECMA String](https://262.ecma-international.org/6.0/#sec-string-objects)



## 基本原理
![image-20210125182101016](/Users/zego/Library/Application Support/typora-user-images/image-20210125182101016.png)

## 匹配模式
| 简写 |    全名    |
| :--: | :--------: |
|  g   |   global   |
|  I   | ignoreCase |
|  m   | multiline  |
|  u   |  unicode   |
|  y   |   sticky   |


|    字段    |              含义              |
| :--------: | :----------------------------: |
|   flags    |          匹配模式标识          |
|   Source   |        正则表达式的文本        |
|   dotAll   | `.` 是否要匹配新行（newlines） |
|   Global   |          是否全部匹配          |
| ignoreCase |         是否忽略大小写         |
| multiline  |        是否进行多行搜索        |
|  unicode   |      Unicode 功能是否开启      |
|   sticky   |       搜索是否是 sticky        |


## 方法详解
### RegExp.prototype[@@search]()
```javascript
"baba".search(/ab/)
//等同于
/ab/[Symbol.search]('baba')
```

### RegExp.prototype[@@split]()
```javascript
/b/[Symbol.split]('aba')
//等同于
"aba".split(/b/)
```

### RegExp.prototype[@@replace]()
```javascript
/b/[Symbol.replace]('aba',1)
//等同于
"aba".replace(/b/,1)
```

### RegExp.prototype[@@match]()
```javascript
/b/[Symbol.match]('aba')
//等同于
"aba".match(/b/)
```

### String.phototype.match
![image-20210125173858513](https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vixso0j30gl028glo.jpg)

## 参考
- [MDN 正则入门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
- [MDN RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [ECMA RegExp](https://262.ecma-international.org/6.0/#sec-regexp-regular-expression-objects)



## Object原型
![image-20210121145123878](https://tva1.sinaimg.cn/large/008eGmZEgy1gmvimsnysvj30cx0jcq5s.jpg)

## 使用示例

```javascript
let obj = { name: 'tony', age: 20 };
console.log(Object.assign({}, obj));
console.log(Object.defineProperties(obj, {
  gender: {
    configurable: true,
    enumerable: true,
    value: 'man',
    writable: true
  }
}));
console.log(Object.defineProperty(obj,
  'gender', {
    configurable: true,
    enumerable: true,
    value: 'man',
    writable: true
  }));
console.log(Object.entries(obj));
console.log(Object.freeze(obj));
console.log(Object.fromEntries([['name', 'tony']]));
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
console.log(Object.getOwnPropertyDescriptors(obj));
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getPrototypeOf(obj) === Object.prototype);
console.log(Object.is('', ''));
console.log(Object.isExtensible(obj));
console.log(Object.isFrozen(obj));
console.log(Object.isSealed(obj));
console.log(Object.keys(obj));
console.log(Object.preventExtensions(obj));
console.log(Object.seal(obj));
console.log(Object.setPrototypeOf({}, Array.prototype));
console.log(Object.values(obj));
// Object.prototype上面的方法
console.log(({ name: 'feng' }).hasOwnProperty('name'));
console.log(Object.prototype.isPrototypeOf({}));
console.log(({ name: 'feng' }).propertyIsEnumerable('name'));
console.log(({ name: 'feng' }).toLocaleString());
console.log(({ name: 'feng' }).toString());
console.log(({ name: 'feng' }).valueOf());
```
## 运行截图
![image-20210121185653581](https://tva1.sinaimg.cn/large/008eGmZEgy1gmvimm34fhj30uq0njtef.jpg)

## PropertyDescriptor
```javascript
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
```
### 字段解释
- configurable 可否修改属性描述
- enumerable 可否 for in属性
- value 属性值（不能和 get set同时出现）
- writable 属性值可否修改
- get 去属性值时调用
- set 修改属性值时调用


## Object.getOwnPropertyDescriptor

对象属性描述方法Object.getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
返回定义在这个对象自己身上的属性（而不是继承来的属性）描述

```js

var obj = {
    x: 1,
    foo() {
        console.log(1);
    }
}
console.log(Object.getOwnPropertyDescriptor(obj,'x'));
console.log(Object.getOwnPropertyDescriptor(obj,'foo'));
console.log(Object.getOwnPropertyDescriptor(Array,'prototype'));

```
打印
```out
{ value: 1, writable: true, enumerable: true, configurable: true }
{
  value: [Function: foo],
  writable: true,
  enumerable: true,
  configurable: true
}
{value: Array(0), writable: false, enumerable: false, configurable: false}
```
### 字段的含义
- value<br/>
  对象的值
- writable<br/>
  属性值是否可以被修改,为true可以修改，为false此时修改无效
```js
const obj = {x:1}
console.log(Object.getOwnPropertyDescriptor(obj,'x'));
Object.defineProperty(obj,'x',{writable:false})
console.log(Object.getOwnPropertyDescriptor(obj,'x'));
obj.x = 2;
console.log(obj)

```
输出
```js
{value: 1, writable: true, enumerable: true, configurable: true}
{value: 1, writable: false, enumerable: true, configurable: true}
{x: 1}
```
- enumerable<br/>
  属性值是否可以被for in拿到
```js
for(let key in Array.prototype){
    console.log(key);
}
```
什么都不会打印，为什么什么都不打印,不是有forEach,map,reduce这些方法吗？查看下原型上方法的属性描述
`console.log(Object.getOwnPropertyDescriptor(Array.prototype,'forEach'));`
输出
`{writable: true, enumerable: false, configurable: true, value: ƒ}`
其中enumerable为false,表示该属性不能被for in遍历，修改enumerable为true,这样forEach方法就遍历出来

```js
Object.defineProperty(Array.prototype,'forEach',{enumerable:true})
for(let key in Array.prototype){
    console.log(key);
}
// 打印`forEach`
```

- configurable<br/>
  属性描述是否可以修改

执行Object.freeze(obj)就会将对象obj上面的属性描述configurable改成false
此时在定义Object.defineProperty(Obj,'x',{value:2})将会报错
```js
const obj = {x:1}
Object.freeze(obj)
Object.defineProperty(obj,'x',{value:2})

```

报错`Uncaught TypeError: Cannot redefine property: x`

下面这样定义时会报错

```
Object.defineProperty(data, 'name', {
	value: data.name,
    get() {
        return value;
    },
    set(val) {
        if (val !== value) {
            console.log('update')
            value = val;
        }
    },
});
```

TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,

## 参考
- [MDN-JavaScript标准内置对象-Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [ECMA-Object实现规范](https://tc39.es/ecma262/#sec-object-objects)


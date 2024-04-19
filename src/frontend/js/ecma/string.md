[//]: # ()
[//]: # (## 基本原理)

[//]: # (- 字符串和字符串对象通过装箱和拆箱进行转换，)

[//]: # (- 字符串对象是类数组，)

[//]: # (- 字符串可以for of遍历，也可以数组下标访问)

[//]: # (![image-20210125104224901]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gmzqtd2oblj30bm0pyn09.jpg&#41;)

[//]: # ()
[//]: # (## 常用示例)

[//]: # ()
[//]: # (### 创建)

[//]: # (```javascript)

[//]: # (console.log&#40;'ab'&#41;)

[//]: # (console.log&#40;new String&#40;'ab'&#41;&#41;)

[//]: # (console.log&#40;String.fromCharCode&#40;97, 98&#41;&#41;)

[//]: # (console.log&#40;String.fromCodePoint&#40;97, 98&#41;&#41;)

[//]: # (console.log&#40;String.raw&#40;{raw: ['a','b','c']}, 1, 2&#41;&#41;)

[//]: # (```)

[//]: # (### 编解码)

[//]: # (```javascript)

[//]: # (console.log&#40;"ab".charAt&#40;0&#41;&#41;)

[//]: # (console.log&#40;"ab".charCodeAt&#40;0&#41;&#41;)

[//]: # (console.log&#40;"ab".codePointAt&#40;0&#41;&#41;)

[//]: # (```)

[//]: # (### 修改)

[//]: # (#### 大小写)

[//]: # (```javascript)

[//]: # (console.log&#40;"Ab".toLocaleLowerCase&#40;&#41;&#41;)

[//]: # (console.log&#40;"Ab".toLocaleUpperCase&#40;&#41;&#41;)

[//]: # (console.log&#40;"Ab".toLowerCase&#40;&#41;&#41;)

[//]: # (console.log&#40;"Ab".toUpperCase&#40;&#41;&#41;)

[//]: # (```)

[//]: # (#### 替换)

[//]: # (```javascript)

[//]: # (console.log&#40;"aba".replace&#40;'a', '1'&#41;&#41;)

[//]: # (```)

[//]: # (#### 填充 去空格)

[//]: # (```javascript)

[//]: # (console.log&#40;"ab".padEnd&#40;5, '1'&#41;&#41;)

[//]: # (console.log&#40;"ab".padStart&#40;5, '1'&#41;&#41;)

[//]: # (console.log&#40;" A b ".trim&#40;&#41;&#41; /*? $.length */)

[//]: # (console.log&#40;" A b ".trimEnd&#40;&#41;&#41;)

[//]: # (```)

[//]: # (#### 其他)

[//]: # (```javascript)

[//]: # (console.log&#40;..."ab"&#41;)

[//]: # (console.log&#40;"ab".concat&#40;'0'&#41;&#41;)

[//]: # (console.log&#40;"ab" + '0'&#41;)

[//]: # (console.log&#40;"ab".normalize&#40;"NFC"&#41;&#41;)

[//]: # (console.log&#40;"ab".repeat&#40;2&#41;&#41;)

[//]: # (console.log&#40;"ab".split&#40;''&#41;&#41;)

[//]: # (```)

[//]: # (### 判断 比较)

[//]: # (```javascript)

[//]: # (console.log&#40;"ab".endsWith&#40;'b'&#41;&#41;)

[//]: # (console.log&#40;"ab".startsWith&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab".includes&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab".localeCompare&#40;'ba'&#41;&#41;)

[//]: # (```)

[//]: # (### 截取)

[//]: # (```javascript)

[//]: # (console.log&#40;"ab".slice&#40;-2&#41;&#41;)

[//]: # (console.log&#40;"ab".substr&#40;0, 2&#41;&#41;)

[//]: # (console.log&#40;"ab".substring&#40;0, 2&#41;&#41;)

[//]: # (```)

[//]: # (### 查询)

[//]: # (```javascript)

[//]: # (console.log&#40;"aba".match&#40;/a/g&#41;&#41;)

[//]: # (console.log&#40;[..."aba".matchAll&#40;/a/g&#41;]&#41;)

[//]: # (console.log&#40;"ab".indexOf&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab".lastIndexOf&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab".length&#41;)

[//]: # (console.log&#40;"ab".search&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab"[1]&#41;)

[//]: # (```)

[//]: # (### 显示)

[//]: # (```javascript)

[//]: # (console.log&#40;"Ab".toString&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".valueOf&#40;&#41;&#41;)

[//]: # (console.log&#40;[..."ab"[Symbol.iterator]&#40;&#41;]&#41;)

[//]: # (```)

[//]: # (### html相关)

[//]: # (```javascript)

[//]: # (console.log&#40;"ab".anchor&#40;'a'&#41;&#41;)

[//]: # (console.log&#40;"ab".big&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".blink&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".bold&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".strike&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".italics&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".fixed&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".fontcolor&#40;'red'&#41;&#41;)

[//]: # (console.log&#40;"ab".fontsize&#40;20&#41;&#41;)

[//]: # (console.log&#40;"ab".link&#40;'http://hao123.com'&#41;&#41;)

[//]: # (console.log&#40;"ab".small&#40;&#41;&#41;)

[//]: # (console.log&#40;"ab".sub&#40;&#41;&#41;)

[//]: # (```)

[//]: # (## 运行截图)

[//]: # (![image-20210125162136670]&#40;/Users/zego/Library/Application Support/typora-user-images/image-20210125162136670.png&#41;)

[//]: # ()
[//]: # ()
[//]: # (## 方法详解)

[//]: # (### String.phototype.replace)

[//]: # (  replace接收两个参数)

[//]: # (1. 正则模式指定要替换的部分，)

[//]: # (2. 替换逻辑函数)

[//]: # (                 ![image-20210125173218028]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vigdz9j30eh03lwen.jpg&#41;)

[//]: # ()
[//]: # (### String.phototype.match)

[//]: # (![image-20210125173858513]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vixso0j30gl028glo.jpg&#41;)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (## 参考)

[//]: # ()
[//]: # (- [MDN String]&#40;https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String&#41;)

[//]: # (- [ECMA String]&#40;https://262.ecma-international.org/6.0/#sec-string-objects&#41;)

[//]: # ()
[//]: # ()
[//]: # (## 基本原理)

[//]: # (![image-20210125175424726]&#40;/Users/zego/Library/Application Support/typora-user-images/image-20210125175424726.png&#41;)

[//]: # ()
[//]: # (## 常用示例)

[//]: # (```javascript)

[//]: # (console.log&#40;1,2&#41;)

[//]: # (console.info&#40;1,2&#41;)

[//]: # (console.warn&#40;1,2&#41;)

[//]: # (console.debug&#40;1,2&#41;)

[//]: # (console.error&#40;1,2&#41;)

[//]: # (console.dir&#40;1&#41;)

[//]: # (console.dirxml&#40;1&#41;)

[//]: # (console.group&#40;'group'&#41;)

[//]: # (console.groupEnd&#40;&#41;)

[//]: # (console.time&#40;'time'&#41;)

[//]: # (console.timeEnd&#40;'time'&#41;)

[//]: # (console.clear&#40;&#41;)

[//]: # (console.assert&#40;false,'条件为false'&#41;)

[//]: # (console.trace&#40;&#41;)

[//]: # (```)

[//]: # ()
[//]: # (## 陌生而有用的方法)

[//]: # (- console.assert)

[//]: # (  断言，测试时用)

[//]: # (- console.trace)

[//]: # (  显示代码运行时路径，调式时用)

[//]: # ()
[//]: # ()
[//]: # (## 参考)

[//]: # (- [MDN String]&#40;https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp&#41;)

[//]: # (- [ECMA String]&#40;https://262.ecma-international.org/6.0/#sec-string-objects&#41;)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (## 基本原理)

[//]: # (![image-20210125182101016]&#40;/Users/zego/Library/Application Support/typora-user-images/image-20210125182101016.png&#41;)

[//]: # ()
[//]: # (## 匹配模式)

[//]: # (| 简写 |    全名    |)

[//]: # (| :--: | :--------: |)

[//]: # (|  g   |   global   |)

[//]: # (|  I   | ignoreCase |)

[//]: # (|  m   | multiline  |)

[//]: # (|  u   |  unicode   |)

[//]: # (|  y   |   sticky   |)

[//]: # ()
[//]: # ()
[//]: # (|    字段    |              含义              |)

[//]: # (| :--------: | :----------------------------: |)

[//]: # (|   flags    |          匹配模式标识          |)

[//]: # (|   Source   |        正则表达式的文本        |)

[//]: # (|   dotAll   | `.` 是否要匹配新行（newlines） |)

[//]: # (|   Global   |          是否全部匹配          |)

[//]: # (| ignoreCase |         是否忽略大小写         |)

[//]: # (| multiline  |        是否进行多行搜索        |)

[//]: # (|  unicode   |      Unicode 功能是否开启      |)

[//]: # (|   sticky   |       搜索是否是 sticky        |)

[//]: # ()
[//]: # ()
[//]: # (## 方法详解)

[//]: # (### RegExp.prototype[@@search]&#40;&#41;)

[//]: # (```javascript)

[//]: # ("baba".search&#40;/ab/&#41;)

[//]: # (//等同于)

[//]: # (/ab/[Symbol.search]&#40;'baba'&#41;)

[//]: # (```)

[//]: # ()
[//]: # (### RegExp.prototype[@@split]&#40;&#41;)

[//]: # (```javascript)

[//]: # (/b/[Symbol.split]&#40;'aba'&#41;)

[//]: # (//等同于)

[//]: # ("aba".split&#40;/b/&#41;)

[//]: # (```)

[//]: # ()
[//]: # (### RegExp.prototype[@@replace]&#40;&#41;)

[//]: # (```javascript)

[//]: # (/b/[Symbol.replace]&#40;'aba',1&#41;)

[//]: # (//等同于)

[//]: # ("aba".replace&#40;/b/,1&#41;)

[//]: # (```)

[//]: # ()
[//]: # (### RegExp.prototype[@@match]&#40;&#41;)

[//]: # (```javascript)

[//]: # (/b/[Symbol.match]&#40;'aba'&#41;)

[//]: # (//等同于)

[//]: # ("aba".match&#40;/b/&#41;)

[//]: # (```)

[//]: # ()
[//]: # (### String.phototype.match)

[//]: # (![image-20210125173858513]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gn02vixso0j30gl028glo.jpg&#41;)

[//]: # ()
[//]: # (## 参考)

[//]: # (- [MDN 正则入门]&#40;https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions&#41;)

[//]: # (- [MDN RegExp]&#40;https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp&#41;)

[//]: # (- [ECMA RegExp]&#40;https://262.ecma-international.org/6.0/#sec-regexp-regular-expression-objects&#41;)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (## Object原型)

[//]: # (![image-20210121145123878]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gmvimsnysvj30cx0jcq5s.jpg&#41;)

[//]: # ()
[//]: # (## 使用示例)

[//]: # ()
[//]: # (```javascript)

[//]: # (let obj = { name: 'tony', age: 20 };)

[//]: # (console.log&#40;Object.assign&#40;{}, obj&#41;&#41;;)

[//]: # (console.log&#40;Object.defineProperties&#40;obj, {)

[//]: # (  gender: {)

[//]: # (    configurable: true,)

[//]: # (    enumerable: true,)

[//]: # (    value: 'man',)

[//]: # (    writable: true)

[//]: # (  })

[//]: # (}&#41;&#41;;)

[//]: # (console.log&#40;Object.defineProperty&#40;obj,)

[//]: # (  'gender', {)

[//]: # (    configurable: true,)

[//]: # (    enumerable: true,)

[//]: # (    value: 'man',)

[//]: # (    writable: true)

[//]: # (  }&#41;&#41;;)

[//]: # (console.log&#40;Object.entries&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.freeze&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.fromEntries&#40;[['name', 'tony']]&#41;&#41;;)

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;obj, 'name'&#41;&#41;;)

[//]: # (console.log&#40;Object.getOwnPropertyDescriptors&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.getOwnPropertyNames&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.getPrototypeOf&#40;obj&#41; === Object.prototype&#41;;)

[//]: # (console.log&#40;Object.is&#40;'', ''&#41;&#41;;)

[//]: # (console.log&#40;Object.isExtensible&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.isFrozen&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.isSealed&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.keys&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.preventExtensions&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.seal&#40;obj&#41;&#41;;)

[//]: # (console.log&#40;Object.setPrototypeOf&#40;{}, Array.prototype&#41;&#41;;)

[//]: # (console.log&#40;Object.values&#40;obj&#41;&#41;;)

[//]: # (// Object.prototype上面的方法)

[//]: # (console.log&#40;&#40;{ name: 'feng' }&#41;.hasOwnProperty&#40;'name'&#41;&#41;;)

[//]: # (console.log&#40;Object.prototype.isPrototypeOf&#40;{}&#41;&#41;;)

[//]: # (console.log&#40;&#40;{ name: 'feng' }&#41;.propertyIsEnumerable&#40;'name'&#41;&#41;;)

[//]: # (console.log&#40;&#40;{ name: 'feng' }&#41;.toLocaleString&#40;&#41;&#41;;)

[//]: # (console.log&#40;&#40;{ name: 'feng' }&#41;.toString&#40;&#41;&#41;;)

[//]: # (console.log&#40;&#40;{ name: 'feng' }&#41;.valueOf&#40;&#41;&#41;;)

[//]: # (```)

[//]: # (## 运行截图)

[//]: # (![image-20210121185653581]&#40;https://tva1.sinaimg.cn/large/008eGmZEgy1gmvimm34fhj30uq0njtef.jpg&#41;)

[//]: # ()
[//]: # (## PropertyDescriptor)

[//]: # (```javascript)

[//]: # (interface PropertyDescriptor {)

[//]: # (    configurable?: boolean;)

[//]: # (    enumerable?: boolean;)

[//]: # (    value?: any;)

[//]: # (    writable?: boolean;)

[//]: # (    get?&#40;&#41;: any;)

[//]: # (    set?&#40;v: any&#41;: void;)

[//]: # (})

[//]: # (```)

[//]: # (### 字段解释)

[//]: # (- configurable 可否修改属性描述)

[//]: # (- enumerable 可否 for in属性)

[//]: # (- value 属性值（不能和 get set同时出现）)

[//]: # (- writable 属性值可否修改)

[//]: # (- get 去属性值时调用)

[//]: # (- set 修改属性值时调用)

[//]: # ()
[//]: # ()
[//]: # (## Object.getOwnPropertyDescriptor)

[//]: # ()
[//]: # (对象属性描述方法Object.getOwnPropertyDescriptor&#40;o: any, p: PropertyKey&#41;: PropertyDescriptor | undefined;)

[//]: # (返回定义在这个对象自己身上的属性（而不是继承来的属性）描述)

[//]: # ()
[//]: # (```js)

[//]: # ()
[//]: # (var obj = {)

[//]: # (    x: 1,)

[//]: # (    foo&#40;&#41; {)

[//]: # (        console.log&#40;1&#41;;)

[//]: # (    })

[//]: # (})

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;obj,'x'&#41;&#41;;)

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;obj,'foo'&#41;&#41;;)

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;Array,'prototype'&#41;&#41;;)

[//]: # ()
[//]: # (```)

[//]: # (打印)

[//]: # (```out)

[//]: # ({ value: 1, writable: true, enumerable: true, configurable: true })

[//]: # ({)

[//]: # (  value: [Function: foo],)

[//]: # (  writable: true,)

[//]: # (  enumerable: true,)

[//]: # (  configurable: true)

[//]: # (})

[//]: # ({value: Array&#40;0&#41;, writable: false, enumerable: false, configurable: false})

[//]: # (```)

[//]: # (### 字段的含义)

[//]: # (- value<br/>)

[//]: # (  对象的值)

[//]: # (- writable<br/>)

[//]: # (  属性值是否可以被修改,为true可以修改，为false此时修改无效)

[//]: # (```js)

[//]: # (const obj = {x:1})

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;obj,'x'&#41;&#41;;)

[//]: # (Object.defineProperty&#40;obj,'x',{writable:false}&#41;)

[//]: # (console.log&#40;Object.getOwnPropertyDescriptor&#40;obj,'x'&#41;&#41;;)

[//]: # (obj.x = 2;)

[//]: # (console.log&#40;obj&#41;)

[//]: # ()
[//]: # (```)

[//]: # (输出)

[//]: # (```js)

[//]: # ({value: 1, writable: true, enumerable: true, configurable: true})

[//]: # ({value: 1, writable: false, enumerable: true, configurable: true})

[//]: # ({x: 1})

[//]: # (```)

[//]: # (- enumerable<br/>)

[//]: # (  属性值是否可以被for in拿到)

[//]: # (```js)

[//]: # (for&#40;let key in Array.prototype&#41;{)

[//]: # (    console.log&#40;key&#41;;)

[//]: # (})

[//]: # (```)

[//]: # (什么都不会打印，为什么什么都不打印,不是有forEach,map,reduce这些方法吗？查看下原型上方法的属性描述)

[//]: # (`console.log&#40;Object.getOwnPropertyDescriptor&#40;Array.prototype,'forEach'&#41;&#41;;`)

[//]: # (输出)

[//]: # (`{writable: true, enumerable: false, configurable: true, value: ƒ}`)

[//]: # (其中enumerable为false,表示该属性不能被for in遍历，修改enumerable为true,这样forEach方法就遍历出来)

[//]: # ()
[//]: # (```js)

[//]: # (Object.defineProperty&#40;Array.prototype,'forEach',{enumerable:true}&#41;)

[//]: # (for&#40;let key in Array.prototype&#41;{)

[//]: # (    console.log&#40;key&#41;;)

[//]: # (})

[//]: # (// 打印`forEach`)

[//]: # (```)

[//]: # ()
[//]: # (- configurable<br/>)

[//]: # (  属性描述是否可以修改)

[//]: # ()
[//]: # (执行Object.freeze&#40;obj&#41;就会将对象obj上面的属性描述configurable改成false)

[//]: # (此时在定义Object.defineProperty&#40;Obj,'x',{value:2}&#41;将会报错)

[//]: # (```js)

[//]: # (const obj = {x:1})

[//]: # (Object.freeze&#40;obj&#41;)

[//]: # (Object.defineProperty&#40;obj,'x',{value:2}&#41;)

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (报错`Uncaught TypeError: Cannot redefine property: x`)

[//]: # ()
[//]: # (下面这样定义时会报错)

[//]: # ()
[//]: # (```)

[//]: # (Object.defineProperty&#40;data, 'name', {)

[//]: # (	value: data.name,)

[//]: # (    get&#40;&#41; {)

[//]: # (        return value;)

[//]: # (    },)

[//]: # (    set&#40;val&#41; {)

[//]: # (        if &#40;val !== value&#41; {)

[//]: # (            console.log&#40;'update'&#41;)

[//]: # (            value = val;)

[//]: # (        })

[//]: # (    },)

[//]: # (}&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,)

[//]: # ()
[//]: # (## 参考)

[//]: # (- [MDN-JavaScript标准内置对象-Object]&#40;https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object&#41;)

[//]: # (- [ECMA-Object实现规范]&#40;https://tc39.es/ecma262/#sec-object-objects&#41;)

[//]: # ()

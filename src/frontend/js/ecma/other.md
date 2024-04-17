## ==

```javascript
undefined === undefined
```
## use strict

- 开启

  `“use strict";`

- 引入原因

  处理EcmaScript3中一些不规范的写法，不安全的活动将抛抛

- 对比
```js
  "use strict";

mistypedVaraible = 17; // 因为变量名拼写错误 没找到
// 这一行代码就会抛出 ReferenceError
// 给不可写属性赋值
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // 抛出TypeError错误

// 给只读属性赋值
var obj2 = { get x() { return 17; } };
obj2.x = 5; // 抛出TypeError错误

// 给不可扩展对象的新属性赋值
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // 抛出TypeError错误
```

- 参考
 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
  
## js精度  

`0.1+0.2!== 0.3`

js number 是 64位浮点数

原因是js 是用浮点数01二进制来表示0.1，它是个近似值

可以用  Number.toFixed(n) 指定进度来解决

- 参考 [JavaScript 浮点数运算的精度问题](https://www.css88.com/archives/7340#more-7340)



## 同步迭代器

```javascript
const obj={
  *[Symbol.iterator]() {
    yield 1;
    yield 2
  }
}

for(let x of obj){
  console.log(x);
}
```

## 异步迭代器

```javascript
 const obj = {
   async *[Symbol.asyncIterator]() {
      yield Promise.resolve(1);
      yield Promise.resolve(2); 
   }
 }
 for await(const x of obj) {
    console.log(x);
 }
 console.log(3);
```

## 高程demo


```javascript
class Emitter {
  constructor(max) {
    this.max = max;
    this.syncIdx = 0;
    this.asyncIdx = 0;
  }

  *[Symbol.iterator]() {
    while(this.syncIdx < this.max) {
      yield this.syncIdx++;
    }
  }

  async *[Symbol.asyncIterator]() {
    while(this.asyncIdx < this.max) {
      yield this.asyncIdx++;
    }
  }
}

const emitter = new Emitter(5);

function syncCount() {
  const syncCounter = emitter[Symbol.iterator]();

  for (const x of syncCounter) {
    console.log(x);
  }
}

async function asyncCount() {
  const asyncCounter = emitter[Symbol.asyncIterator]();
  
  for await(const x of asyncCounter) {
    console.log(x);
  }
}

syncCount();
// 0
// 1
// 2
// 3
// 4

asyncCount();
// 0
// 1
// 2
// 3
// 4
```



## 浅拷贝

- 解构方式实现
```js
let origin = [1,2,3];
const res = [...orgin];

let origin ={a:1,b:2};
const res = {...origin}

```

- 遍历方式
```js

const copy = function (origin){
    if(typeof origin !=='object') return origin;
    let res = origin instanceof Array?[]:{};
    for(let key in origin){
        if(origin.hasOwnPropertyKey(key)){
            res[key] = origin[key]
        }   
    }   
    return res;
}

```

- 使用ES自带方法
```js

let origin = [1,2,3];

const res = Object.assign([],origin);
const res = origin.contact();
const res = origin.slice();


let origin ={a:1,b:2};
const res = Object.assign({},origin);
```

### 深拷贝
- JSON实现
```js
let deepCopy = function(origin){
    return JSON.parse(JSON.stringify(origin))
}
```
#### 存在问题，以下情况拷贝无效
1. null undefined值的拷贝
2. 循环引用的拷贝
3. 日期 函数的拷贝

- lodash实现
```js
// 深拷贝 对于 Date Pettern Map Set Number的拷贝
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

```



## call apply bind手写实现
```javascript
function say(name) {
  console.log(name, this.age);
  return 1;
}

let call = (fn, _this, ...args) => {
  _this.fn = fn;
  const res = _this.fn(...args);
  delete _this.fn;
  return res;
};
console.log(call(say,{age:20},'feng'));


let apply = (fn, _this, args) => {
  _this.fn = fn;
  const res = _this.fn(...args);
  delete _this.fn;
  return res;
};
console.log(apply(say,{age:20},['feng']));

let bind = (fn,_this) => {
  _this.fn = fn;
  return (args)=>{
    return _this.fn(...args)
  }
};
console.log(bind(say, { age: 20 })(['feng']));

```

## new实现
```javascript
let _new = (clazz, ...args) => {
  let res = Object.create(null);
  res.__proto__ = clazz.prototype;
  const fn = clazz.prototype.constructor;
  console.log(args);
  let res2 = fn.call(res, ...args);
  return typeof res2 == 'object' ? res2 : res;
};

console.log(_new(Array, 5));
console.log(new Array(5));
```

## instanceof实现
```javascript
let _instanceof = (instance, clazz) => {
  while (instance !== null) {
    if (instance.__proto__ === clazz.prototype) {
      return true;
    }
    instance = instance.__proto__;
  }
  return false;
};
console.log([] instanceof Array);
console.log(_instanceof([], Array));
```

## deepClone实现
```javascript
let _instanceof = (instance, clazz) => {
  while (instance !== null) {
    if (instance.__proto__ === clazz.prototype) {
      return true;
    }
    instance = instance.__proto__;
  }
  return false;
};
console.log([] instanceof Array);
console.log(_instanceof([], Array));
```

## PromiseArray实现
```javascript
async function promiseArray(arr) {
  let a = arr.reduce((pre, cur) => {
    return pre.then((args) => {
      console.log(args);
      return cur;
    });
  });
  return a.then(args => console.log(args));
}


// test
let ps = [
  Promise.resolve(0),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }),

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    },2000);
  }),
  Promise.resolve(3)
];
(async () => {
   promiseArray(ps);
})();
```

## 事件发布订阅
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, ...args) {
    let cbs = this.events[eventName];
    cbs.forEach(cb => {
      cb(...args);
    });
  }

  on(eventName, cb) {
    let cbs = this.events[eventName] || [];
    cbs.push(cb);
    this.events[eventName] = cbs;
  }

  off(eventName, cb) {
    let cbs = this.events[eventName] || [];
    this.events[eventName] = cbs.filter(i => i!== cb);
  }

}

function say(msg) {
  console.log(msg);
}

let eventEmit = new EventEmitter();
eventEmit.on('aa', say);
eventEmit.on('aa', say);
eventEmit.emit('aa', 'hello');
eventEmit.off('aa', say);
eventEmit.emit('aa', 'hello');

```

## 事件循环过程

  1.先执行同步代码

  2.执行完所有的微任务

  3.执行一个宏任务

  ```javascript
  setTimeout(()=>{
      console.log('macrotask')
  },0);
  
  queueMicrotask(() => {
    /* 微任务中将运行的代码 */
    console.log('microTask1')
  });
  
  queueMicrotask(() => {
    /* 微任务中将运行的代码 */
    console.log('microTask2')
  });
  console.log('synchronize')
  //输出结果
  // synchronize
  // microTask1
  // microTask2
  // macrotask
  ```

- 事件循环六个阶段

  ![image-20210308174640516](https://tva1.sinaimg.cn/large/008eGmZEly1gocn3up72mj30lb0cyjrt.jpg)

- 参考

  [node事件循环](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

  [深入理解js事件循环机制（Node.js篇）](http://lynnelv.github.io/js-event-loop-nodejs)

  [nodejs中的event loop](https://www.jianshu.com/p/deedcbf68880)

## 二叉搜索树
```javascript
class BinarySearchTree {

  constructor(val = null) {
    this.val = val;
  }
  
  insert(val) {
    if (this.val == null) {
      this.val = val;
      return this;
    }
    let value = this.val;
    if (val <= value) {
      if (this.left) return this.left.insert(val);
      this.left = new BinarySearchTree(val);

    } else {
      if (this.right) return this.right.insert(val);
      this.right = new BinarySearchTree(val);
    }

  }

  search(val) {
    let value = this.val;
    if (val === value) {
      return true;
    } else if (val < value) {
      if (this.left) return this.left.search(val);
      return false;
    } else {
      if (this.right) return this.right.search(val);
      return false;
    }
  }
  
}

const tree = new BinarySearchTree();
tree.insert(3);
tree.insert(2);
tree.insert(4);
tree.insert(1);
tree.insert(5);
console.log(tree.search(5));

```

## deepCopy实现
```javascript

let isBaseType = () => {
  const types = [
    Number, String, Boolean, Date, RegExp
  ];
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  const clazz = types.find(i => i.name === type);
  return clazz;
};

let deepCopy = (obj, set = []) => {
  if (typeof obj !== 'object') return obj;
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  const res = type === 'Array' ? [] : {};
  set.push(obj);
  const clazz = isBaseType(obj);
  if (clazz) return new clazz(obj);
  if (type === 'Map') {
    return new Map(obj.entries());
  }
  if (type === 'Set') {
    return new Set(obj.values());
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object') {
        if (set.includes(value)) {
          res[key] = value;
        } else {
          set.push(value);
          res[key] = deepCopy(value, set);
        }

      } else {
        res[key] = value;
      }
    }
  }
  return res;
};

let obj = [1, 2, [2, 3]];
let obj = {
  a: 1,
  b: [2, 3]
};
obj.c = obj;
let obj = new Map([[1, 'a'], [2, 'b']]);
obj = new Set([1,2,3]);
obj = new Boolean(true);

console.log(obj);
console.log(deepCopy(obj));
```





## prototype
```javascript
String === String.prototype.constructor 构造函数指向类

//获取原型
Object.getPrototypeOf([])===Array.prototype ===[].__proto__
// true

Object.getOwnPropertyDescriptor(Array,'prototype')
//{value: Array(0), writable: false, enumerable: false, configurable: false}
//表示Array.prototype for in遍历不到，不可配置，不可修改


//类数组转数组 slice.apply( this, arguments )
```

查看定义在原型上的方法，以及类上面的方法

```
// 已知类Vue 直接找prototype
Vue Vue.prototype

// 是对象vm 查找__proto__和 __proto__.constructor
//指向类原型
vm.__proto__
//指向类
vm.__proto__.constructor == vm.constructor

```



## async await
### start
```js
async function f() {
    let a = await Promise.resolve(1);
    let b = await Promise.resolve(2);
    let c = await Promise.resolve(3);
    console.log(a,b,c)
}
f()
```
定义async函数并调用执行，输出 1,2,3

### 用bable编译
查看下async await的内部实现原理，编译结果如下

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    //运行迭代器的next方法
    var info = gen[key](arg);
    var value = info.value;

  } catch (error) {
    reject(error);
    return;
  }
    //判断是否迭代完成
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      //执行生成器函数，返回迭代器
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      // 调用next方法，往下执行
      _next(undefined);
    });
  };
}

function f() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = _asyncToGenerator(function* () {
    //定义的函数f转成生成器函数
    let a = yield Promise.resolve(1);
    let b = yield Promise.resolve(2);
    let c = yield Promise.resolve(3);
    console.log(a, b, c);
  });
  //运行生成器函数，返回promise
  return _f.apply(this, arguments);
}
```


## 继承

### 继承的实现方式

- 原型链
- 盗用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生式组合继承
- 通过原型链继承

### 继承实现

### 1.原型链

- 实现
```javascript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue=function(){
  return this.property;
}

function SubType(){
  this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
  return this.subproperty;
}
let instance = new SubType();
console.log(instance.getSuperValue()); //输出 false
```

![image-20201031163932739](/Users/zego/Library/Application Support/typora-user-images/image-20201031163932739.png)

- 存在问题

  原型中包含引用值的时候，引用值会在所有实例中共享。

  ```javascript
  function SuperType() {
    this.colors = ['red', 'blue', 'green'];
  }
  
  function SubType() {
    this.subproperty = false;
  }
  // 只调用了一次父类的构造函数，所以引用类型是共享的
  SubType.prototype = new SuperType();
  
  let instance1 = new SubType();
  instance1.colors.push('black');
  
  let instance2 = new SubType();
  console.log(instance2.colors);
  //输出 [ 'red', 'blue', 'green', 'black' ]
  ```

  ![image-20201031164107750](/Users/zego/Library/Application Support/typora-user-images/image-20201031164107750.png)

  子类型在实例化时不能给父类型的构造函数传参。

  子类的构造函数中没调用super(...args)函数，没给父类构造函数传参。

### 2.盗用构造函数（对象伪装、经典继承）

- 实现
```javascript
function SuperType() {
  this.colors = ['red', 'blue', 'green'];
}

function SubType() {
  // 继承 SuperType 在new每个子类时调用了父类的构造函数，所以各子类的引用类型是相互独立的
  SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push('black');

let instance2 = new SubType();
console.log(instance2.colors);
//输出 [ 'red', 'blue', 'green' ]
```
![image-20201031164242386](/Users/zego/Library/Application Support/typora-user-images/image-20201031164242386.png)

- 优点

  解决了原型包含引用值导致的问题，子类构造函数可以向父类构造函数传参

- 缺点

  必须在构造函数中定义方法，函数不能复用，子类不能访问父类原型上定义的方法

### 3.组合继承（伪经典继承）

#### 实现
综合了原型链和盗用构造函数，将两者的优点集中起来，使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性
```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log(this.age);
};


let instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'black' ]
instance1.sayName(); // Nicholas
instance1.sayAge();  // 29

let instance2 = new SubType('Greg', 27);
console.log(instance2.colors);  // [ 'red', 'blue', 'green' ]
instance2.sayName(); // Greg 
instance2.sayAge();  // 27
```

![image-20201031163840102](/Users/zego/Library/Application Support/typora-user-images/image-20201031163840102.png)

#### 优点
组合继承弥补了原型链和盗用构造函数的不足，同事保留了instanceof操作符和isPrototypeOf()方法识别对象的能力，是JavaScript中使用最多的继承模式。

#### 缺点

效率低，父类构造函数始终会被调用两次，一次是在创建子类原型时调用，另一次是在子类构造函数中调用
### 4. 原型式继承
- 实现
```javascript
//ECMAScript5 Object.create()实现了该功能，并做了增强
    function object(o) {
    function F() {
    }
    
    F.prototype = o;
    return new F();
    }
    
    
    let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Count', 'Van'],
    };
    
    let anotherPerson = object(person);
    anotherPerson.name = 'Greg';
    anotherPerson.friends.push('Rob');
    
    let yetAnotherPerson = object(person);
    yetAnotherPerson.name = 'Linda';
    yetAnotherPerson.friends.push('Barbie')
    
    console.log(person.friends);
// 输出 [ 'Shelby', 'Count', 'Van', 'Rob', 'Barbie' ]
```
![image-20201031160217268](/Users/zego/Library/Application Support/typora-user-images/image-20201031160217268.png)

- Object.create()

  ```javascript
  let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Count', 'Van'],
  };
  
  let anotherPerson = Object.create(person, {
    name: {
      value: 'Greg',
    },
  });
  
  console.log(anotherPerson);
  ```

![image-20201031160929293](/Users/zego/Library/Application Support/typora-user-images/image-20201031160929293.png)

- 注

  原型式继承适合在不需要单独创建构造函数，仍然需要在对象间共享信息的场合。和原型链模式一样，属性中的引用值在相关对象间共享


5. 寄生式继承
- 实现
  ```javascript
  function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
  }

  function createAnother(original) {
    let clone = object(original);
    clone.sayHi = function() {
      console.log('hi');
    };
    return clone;
  }

  let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van'],
  };
  let anotherPerson = createAnother(person);
  anotherPerson.sayHi();
  ```

  ![image-20201031163648961](/Users/zego/Library/Application Support/typora-user-images/image-20201031163648961.png)

- 注

  通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

6. 寄生式组合继承
- 实现
  ```javascript
  function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
  }
  
  function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  
  SuperType.prototype.sayName = function() {
    console.log(this.name);
  };
  
  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }
  
  inheritPrototype(SubType, SuperType);
  SubType.prototype.sayAge = function() {
    console.log(this.age);
  };
  let instance = new SubType('feng',20)
  ```

![image-20201031163521151](/Users/zego/Library/Application Support/typora-user-images/image-20201031163521151.png)

- 注
  寄生式组合继承是应用类型继承的最佳模式




## 数组

arguments是类数组

```javascript
{
  0: 1,
  1: 2,
  length: 2
}
```

### 数组

```javascript
[1,2]
//底层内部实现是类数组结构
{
  0: 1,
  1: 2,
  length: 2
}
new Array(2)
//返回
{
  length: 2
}
Object.keys(new Array(2))== []
Object.keys([1,2])== [0,1]
```

### 空坑问题

![image-20210330164753153](/Users/zego/Library/Application Support/typora-user-images/image-20210330164753153.png)

数组中空坑元素不会被`forEach map some every find reduce`遍历到

### 参考
- [Array构造的数组使用map为何失效？](https://cloud.tencent.com/developer/article/1563458)

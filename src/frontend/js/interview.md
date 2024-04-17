```javascript
undefined === undefined
```

# 浅拷贝

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

[TOC]

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




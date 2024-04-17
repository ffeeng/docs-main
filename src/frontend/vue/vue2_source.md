
# vue2源码解析
aa


## 三大框架响应式原理

1、vue2.js是 defineProperty

Vue3 是 Proxy

2、react是调用setState函数，修改状态并更新视图

微信小程序也是调用setState修改状态并更新视图

3、angular是脏值检测，拦截所有事件，事件触发后检测脏值，有值发生变化就更新视图 [脏检测](https://segmentfault.com/a/1190000023558780)




## 基本原理
 - defineProperty 
 - 搜集依赖
 - 更新试图


## vue事件发布订阅原理

在vue实例上定义一个_events属性，用来描述事件和回调函数的对应关系。

`vm._events = { on: [ f ] , once: [ f ]  };`

- $on时

  `Vue.prototype.$once = function (event: string, fn: Function): Component`

```js
(vm._events[event] || (vm._events[event] = [])).push(fn)
```

- $emit时

  ```js
  let cbs = vm._events[event]
  for (let i = 0, l = cbs.length; i < l; i++) {
  	 //调用回调函数
       invokeWithErrorHandling(cbs[i], vm, args, vm, info)
  }
  ```

- $off时

  `Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component`

```js
//没指定参数时，删除所有事件
if (!arguments.length) {
vm._events = Object.create(null)
return vm
}
//没指定回调函数时 删除该事件下的所有回调函数
if (!fn) {
vm._events[event] = null
return vm
}
//指定回调函数时，删除该事件下的该函数
const cbs = vm._events[event]
let i = cbs.length
while (i--) {
cb = cbs[i]
if (cb === fn || cb.fn === fn) {
cbs.splice(i, 1)
break
}
}
```





![vue事件发布订阅原理](\img\vue事件发布订阅原理.png)




## vue中render方法

当vue option 中有template，此时需要vue compiler的库，将template模板通过编译，代码生成得到render方法。

vue中的 插值表达式、 v-if 、v-for、 v-modul 、sync、 v-html 、v-text都在这里体现。

```html
<div id="app">
    {{show}}
    <h1 v-if="show">render</h1>
    <ul>
        <li :key="i" v-for="i of 3">{{i}}</li>
    </ul>
    <comp-a v-model="show"></comp-a>
    <comp-a :value.sync="show"></comp-a>
</div>
<script src="../../node_modules/vue/dist/vue.js"></script>
<script>
    const compA = {
        template: '<div>1</div>'
    };
    let vm = new Vue({
        el: '#app',
        components: {
            compA
        },
        data() {
            return {
                show: true,
            }
        },
    })
</script>
```

生成的render方法为

![render工具方法](../../images/vue/render工具方法.png)

```js
function createElement(
    // context,
    tag,
    data,
    children,
    // normalizationType,
    // alwaysNormalize
) {
}

function renderList(
    val,
    render
) {
}

function toString(val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val)
}

function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

const _s = toString;
const _c = createElement;
const _l = renderList;
const _v = createTextVNode;

function render(_c) {
    with (this) {
        return _c('div', {attrs: {"id": "app"}}, [
       		 //插值表达式原理
            _v("\n    " + _s(show) + "\n    "),
             //v-if原理
            (show) ? _c('h1', [_v("render")]) : _e(), _v(" "),
            //v-for原理
            _c('ul', _l((3), function (i) {
                return _c('li', {key: i}, [_v(_s(i))])
            }), 0),
            _v(" "),
            _c('comp-a', {
            //v-modal原理
                model: {
                    value: (show), callback: function ($$v) {
                        show = $$v
                    }, expression: "show"
                }
            }),
            _v(" "),
            _c('comp-a', {
            //sync原理
                attrs: {"value": show}, on: {
                    "update:value": function ($event) {
                        show = $event
                    }
                }
            })
        ], 1)
    }
}

```

编译模板生成render方法，并挂载到option.render上

```js
  var ref = compileToFunctions(template, {
      outputSourceRange: "development" !== 'production',
      shouldDecodeNewlines: shouldDecodeNewlines,
      shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
      delimiters: options.delimiters,
      comments: options.comments
  }, this);
  var render = ref.render;
  var staticRenderFns = ref.staticRenderFns;
  options.render = render;
```

组件更新时调用，传入创建元素函数，返回vnode

```js
updateComponent = function () {
     vm._update(vm._render(), hydrating);
};

Vue.prototype._render = function () {
	vnode = render.call(vm._renderProxy, vm.$createElement);
}

```



## patch过程
### Vue patch过程

```js
//第一次 用vnode创建dom dom创建过程是深度优先创建 大致过程如下
function createElm (
      vnode,
      parentElm,
    ){
    vnode.elm =  nodeOps.createElement(tag, vnode);
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i],  vnode.elm)
    }
    insert(parentElm, vnode.elm, refElm);

}
```
```html
<div id="app">
    <ul>
        <li></li>
    </ul>
    <input type="text" v-model="message">
</div>
<!--dom创建过程-->
<!--创建div>ul>li li插入ul ul插入到div-->
<div>
    <ul>
    	<li></li>
    </ul>
</div>

<div id="app">
    <ul>
   		 <li></li>
    </ul>
    <input type="text">
</div>

```

### dom diff过程

oldCh   []

newCh []

四个指针 头指针 尾指针

```js
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }
	//将老vnode 和新vnode进行比较
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        //头和头比较
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        //尾和尾比较
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
       //头和尾比较
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
       //将头移动到尾
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
       //尾和头比较
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        //将尾节点移动到头
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
      	//newStartVnode 在 old中的位置
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            //找到节点插在前面
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```

### 为什么不能用数组下标作为key
![key详解](https://juejin.im/post/5db6403ff265da4d104b7e2b)
```html
arr = [1,2,3]
<p key="index" v-for="(value,index) of arr"></p>
```
#### 当执行arr.reserve()时
oldVnode=[
{key:0,tag:'p',children:[{text:1}]},
{key:1,tag:'p',children:[{text:2}]},
{key:2,tag:'p',children:[{text:3}]},
]
newVnode=[
{key:0,tag:'p',children:[{text:3}]},
{key:1,tag:'p',children:[{text:2}]},
{key:2,tag:'p',children:[{text:1}]},
]

此时dom diff时
oldVnode[0]执行更新操作 text由1改成3
oldVnode[2]执行更新操作 text由3改成1
这与预期的不同，预期是交换0 2的位置

#### 当执行arr.splice(0,1)时
oldVnode=[
{key:0,tag:'p',children:[{text:1}]},
{key:1,tag:'p',children:[{text:2}]},
{key:2,tag:'p',children:[{text:3}]},
]
newVnode=[
{key:0,tag:'p',children:[{text:2}]},
{key:1,tag:'p',children:[{text:3}]},
]
此时dom diff时
oldVnode[0]执行更新操作 text由1改成2
oldVnode[1]执行更新操作 text由2改成3
oldVnode[2]执行删除操作
这与预期的不同，预期是直接删除oldVnode[0]




## vue源码中dom操作

### 基本dom操作
![基本Dom操作](../../images/broswer/基本Dom操作.png)

### vue中组件更新操作

![vue更新组件操作](../../images/vue/vue更新组件操作.png)





## vue nextTick原理

nextTick是基于promise，调用nextTick时，先给callbacks赋值，然后

const p = Promise.resolve()

p.then(flushCallbacks)

执行promise的then方法时，把回调函数拿出来执行

```js
const callbacks = []
let pending = false


export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  //收集回调函数
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    // 创建promise
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
 // 创建promise
const p = Promise.resolve()
timerFunc = () => {

	p.then(flushCallbacks)
}
// 执行回调函数
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```


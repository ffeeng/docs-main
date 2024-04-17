## commonJS模块化 require exports

commonJS是node的模块化标准。require的执行过程

## ES6模块化 import export

### 特点
- 自动采用严格模式，忽略'use strict'
- 每个ESM模块都是单独的私有作用域
- ESM通过CROS去请求外部JS模块
- ESM的script标签会延迟执行脚本

### 注意事项
- ES Modules 中可以导入CommonJS模块
- CommonJs中不能导入ES Modules模块
- CommonJS始终会导出一个默认成员
- 注意import不是解构导出对象

```
import { Store, } from './store'

export default {
  Store,
}

export {
	Store
}
```

- bable编译后
```
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _store.Store;
  }
});
exports.default = void 0;

var _store = require("./store");

var _default = {
  Store: _store.Store
};
exports.default = _default;
```

## webpack模块化
```js
function (modules) {
		//缓存以加载的模块 {id:module}  module={export:{},id:1,loaded：false}
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
                var module = installedModules[moduleId] = {
                    exports: {},
                    id: moduleId,
                    loaded: false

                };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    })
    (
        [
        //将模块代码包装成函数，并在require时执行，修改mudule.export的值
            (function (module, exports) {
                module.exports = function spread(callback) {
                    return function wrap(arr) {
                        return callback.apply(null, arr);
                    };
                };
            })
        ]
    )
```


## 性能优化
### 减少http链接
- css合并
- image base64 精灵图

### 减少流量
- nginx gzip
- 代码压缩
- tree sharking去掉无用代码

### DNS
- 解析时缓存

### 缓存
- 强制缓存 cache-control max-age expires
- 协商缓存 E-tag if-none-match  last-modified if-modified-since

### CDN加速

### 懒加载 懒执行
- async
- defer
- prefetech
- preload

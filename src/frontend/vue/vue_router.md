
## location
在浏览器地址栏输入的路径是修改href或者hash
![location](../../images/vue/location1.png)
为什么不对href的hash进行拦截，用defineProperty定义get set方法？
![location](../../images/vue/location2.png)
因为location的herf和hash属性都是不配置的，不能对其进行defineProperty定义get set方法

## hash路由
当hash发生改变时会触发window.onhashchange方法调用，传入HashChangeEvent事件
`window.onhashchange=function(e){console.log(e)}`
![location](../../images/vue/hashchange.png)


## history路由
当在浏览器地址栏点击前进后退时会触发window.onpopstate方法调用，传入PopStateEvent事件
调用history.go(1) history.forward() history.back()都会触发onpopstate方法调用。
![location](../../images/vue/popstate.png)

## vue-router原理
vue-router插件是基于vue，在vue原型上加了$route $router两个属性，全局注册两个组件

```js
 function install (Vue) {
    if (install.installed && _Vue === Vue) { return }
    install.installed = true;

    _Vue = Vue;

    var isDef = function (v) { return v !== undefined; };

    var registerInstance = function (vm, callVal) {
      var i = vm.$options._parentVnode;
      if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
        i(vm, callVal);
      }
    };

    Vue.mixin({
      beforeCreate: function beforeCreate () {
        if (isDef(this.$options.router)) {
          this._routerRoot = this;
          this._router = this.$options.router;
          this._router.init(this);
          Vue.util.defineReactive(this, '_route', this._router.history.current);
        } else {
          this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
        }
        registerInstance(this, this);
      },
      destroyed: function destroyed () {
        registerInstance(this);
      }
    });
    //在vue原型上 添加$router $route两个属性
    //vue页面取值时  只有get方法，不能被修改
    Object.defineProperty(Vue.prototype, '$router', {
      get: function get () { return this._routerRoot._router }
    });

    Object.defineProperty(Vue.prototype, '$route', {
      get: function get () { return this._routerRoot._route }
    });
    //注册两个全局组价
    Vue.component('RouterView', View);
    Vue.component('RouterLink', Link);

    var strats = Vue.config.optionMergeStrategies;
    // use the same hook merging strategy for route hooks
    strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
  }
```


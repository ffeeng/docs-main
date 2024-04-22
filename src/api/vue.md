# Vue入门


## vue
```
<script src="https://unpkg.com/vue@next"></script> 
 
const app = Vue.createApp({  
  data() {  
    return {  
      message: 'Hello, Vue!',  
    };  
  },  
});  
app.mount('#app');  

<div id="app">  
  <h1>{{ message }}</h1>  
</div>  
```


## vueRouter
```
<script src="https://unpkg.com/vue@next"></script>  
<script src="https://unpkg.com/vue-router@next"></script>  
// 创建组件  
const Home = { template: '<h2>Home</h2>' };  
const About = { template: '<h2>About</h2>' };  
  
// 创建路由实例  
const router = VueRouter.createRouter({  
  routes: [  
    { path: '/', component: Home },  
    { path: '/about', component: About },  
  ],  
});  
  
// 创建 Vue 实例  
const app = Vue.createApp({});  
  
// 使用路由实例  
app.use(router);  
app.mount('#app');  
// html模板中
<div id="app">  
  <h1>My App</h1>  
  <router-view></router-view>  
</div>  
```
### 常用api
```nashorn js
// 替换当前路由为一个新的路由  
router.replace('/contact');  
  
// 后退一页  
router.back();  
  
// 前进一页  
router.forward();  
  
// 在每次路由跳转之前执行的全局前置守卫  
router.beforeEach((to, from, next) => {  
  // 执行一些验证逻辑，然后调用 next() 继续路由跳转  
  next();  
});  
  
// 在每次路由跳转之前执行的全局解析守卫  
router.beforeResolve((to, from, next) => {  
  // 执行一些异步操作，然后调用 next() 继续路由跳转  
  next();  
});  
  
// 在每次路由跳转之后执行的全局后置钩子  
router.afterEach((to, from) => {  
  // 执行一些后置操作  
});  

// 获取当前路由信息  
console.log(router.currentRoute.value); // 当前路由信息  
console.log(router); // 当前路由实例  
```

## pinia
```nashorn js

import { createPinia } from 'pinia';  
  
const pinia = createPinia();  
  
export default pinia;  

```

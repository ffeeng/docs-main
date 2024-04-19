# 高扩展在前端的设计与实现
## vue框架
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
## Vue设计原理
vue的渐进式框架图
![img.png](img%2Fimg.png)
- Declarative Rendering 对应 vnode
- Component System 对应 vue
- Client-Side Routing 对应 vue-router
- Large Scale State Management对应 vuex
- Build System 对应 webpack(vue-loader sass-loader之类）
这个图中的每一部分是可以单独使用也可以聚合在一起使用，是一个可扩展的设计

## Vue扩展功能实现原理
vue只提供双向绑定MVVM进行响应式更新视图，并开放扩展能力通过Vue.use方法来扩展功能，
基本原理是在组件实例或组件的全局下文中注入对象来实现。

- Vue.use(VueRouter)  扩展路由功能
- Vue.use(Vuex)  扩展状态管理功能
- Vue.use(Element)  扩展elementUI组件
通过vue-loader和 webpack打包工具配合使用
• 扩展vue-router功能代码实现
```js
//  Vue use方法
Vue.use = function (plugin: Function | any) {
const installedPlugins =
this._installedPlugins || (this._installedPlugins = [])
if (installedPlugins.indexOf(plugin) > -1) {
return this
}

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args)
    } else if (isFunction(plugin)) {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
}

// Vue-Router的install方法
export function install (Vue) {
if (install.installed && _Vue === Vue) return
install.installed = true

_Vue = Vue

const isDef = v => v !== undefined

const registerInstance = (vm, callVal) => {
let i = vm.$options._parentVnode
if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
i(vm, callVal)
}
}

Vue.mixin({
beforeCreate () {
if (isDef(this.$options.router)) {
this._routerRoot = this
this._router = this.$options.router
this._router.init(this)
Vue.util.defineReactive(this, '_route', this._router.history.current)
} else {
this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
}
registerInstance(this, this)
},
destroyed () {
registerInstance(this)
}
})
// 给每个vue实例注入$router
Object.defineProperty(Vue.prototype, '$router', {
get () { return this._routerRoot._router }
})
// 给每个vue实例注入$router
Object.defineProperty(Vue.prototype, '$route', {
get () { return this._routerRoot._route }
})
// 注册全局组件 RouterView RouterLink
Vue.component('RouterView', View)
Vue.component('RouterLink', Link)

const strats = Vue.config.optionMergeStrategies
// use the same hook merging strategy for route hooks
strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```
通过调用Vue.use方法，给vue的每个实例注入$router,$route属性，并注册全局组件RouterView RouterLink，从而实现页面路由功能。

## el-from组件
el-from组件实现了对其中的表单项进行统一的校验，对表单项的数量、类型、校验规则没做任何限制是高度灵活、可扩展的组件设计。
## 使用实例
![img_1.png](img%2Fimg_1.png)
```vue
<el-form ref="form" :model="form" label-width="80px">
<el-form-item label="活动名称">
<el-input v-model="form.name"></el-input>
</el-form-item>
<el-form-item label="活动区域">
<el-select v-model="form.region" placeholder="请选择活动区域">
<el-option label="区域一" value="shanghai"></el-option>
<el-option label="区域二" value="beijing"></el-option>
</el-select>
</el-form-item>
<el-form-item label="活动时间">
<el-col :span="11">
<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
</el-col>
<el-col class="line" :span="2">-</el-col>
<el-col :span="11">
<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
</el-col>
</el-form-item>
<el-form-item label="即时配送">
<el-switch v-model="form.delivery"></el-switch>
</el-form-item>
<el-form-item label="活动性质">
<el-checkbox-group v-model="form.type">
<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
<el-checkbox label="地推活动" name="type"></el-checkbox>
<el-checkbox label="线下主题活动" name="type"></el-checkbox>
<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
</el-checkbox-group>
</el-form-item>
<el-form-item label="特殊资源">
<el-radio-group v-model="form.resource">
<el-radio label="线上品牌商赞助"></el-radio>
<el-radio label="线下场地免费"></el-radio>
</el-radio-group>
</el-form-item>
<el-form-item label="活动形式">
<el-input type="textarea" v-model="form.desc"></el-input>
</el-form-item>
<el-form-item>
<el-button type="primary" @click="onSubmit">立即创建</el-button>
<el-button>取消</el-button>
</el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
```
el-form实现原理
el-form组件的灵活性主要通过以下几种方式实现：
1. 插槽(slot)：el-form组件支持多个插槽(slot)，可以自定义表单项的排列方式和组合形式，同时还可以根据具体业务需要自定义表单项的展示方式和样式。
2. 校验规则根据字段自定义：el-form组件的校验规则可以根据不同的字段进行自定义设置，如设置字段的必填状态、数据类型、长度等等，从而满足不同表单项的校验需求。
3. 自定义表单项：el-form组件支持通过自定义表单组件的方式，实现对表单项的高度灵活性和扩展性，比如自定义一个时间选择器或者上传组件，就可以通过注册成一个表单组件，灵活应用在 el-form中。
4. 各种表单元素的支持：el-form组件内置了各种表单元素的支持，如输入框、下拉框、单选框、多选框、日期选择器等等，这些元素在使用时可以自由搭配，从而满足不同的表单需求。

• 实现思路
ElForm作为容器来管理维护ElFromItem数组
ElFromItem来处理具体的每一个表单项的校验规则，事件都在ELFormItem中来处理
ElInput ElSelect具体表单元素抛出 el.form.change el.form.blur事件
![img_2.png](img%2Fimg_2.png)

在ElForm的template中预留插槽，将ElFromItem作为他的子节点进行管理，并存放在在fields数组中。
```vue
// el-form 预留slot插槽 表单内容高度可定制
<form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
    ]">
    <slot></slot>
</form>

// el-from组件在创建时注册添加和删除formItem事件
created() {
this.$on('el.form.addField', (field) => {
if (field) {
this.fields.push(field);
}
});
/* istanbul ignore next */
this.$on('el.form.removeField', (field) => {
if (field.prop) {
this.fields.splice(this.fields.indexOf(field), 1);
}
});
},



// el-from-item 在挂载时 el-form添加该组件
mounted() {
if (this.prop) {
this.dispatch('ElForm', 'el.form.addField', [this]);

    let initialValue = this.fieldValue;
    if (Array.isArray(initialValue)) {
      initialValue = [].concat(initialValue);
    }
    Object.defineProperty(this, 'initialValue', {
      value: initialValue
    });

    this.addValidateEvents();
}
},
// el-from-item 在卸载时 el-form删除该组件
beforeDestroy() {
this.dispatch('ElForm', 'el.form.removeField', [this]);
}
```
el-from-item来管理具体的表单控件

```js
//el-form-item 在组件挂载时添加两个监听事件
addValidateEvents() {
const rules = this.getRules();

    if (rules.length || this.required !== undefined) {
      this.$on('el.form.blur', this.onFieldBlur);
      this.$on('el.form.change', this.onFieldChange);
    }
}

// el-input组件在值发生改变时触发el.form.change, 在失去焦点时触发el.form.blur
watch: {
value(val) {
this.$nextTick(this.resizeTextarea);
if (this.validateEvent) {
this.dispatch('ElFormItem', 'el.form.change', [val]);
}
},
}

handleBlur(event) {
this.focused = false;
this.$emit('blur', event);
if (this.validateEvent) {
this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
}
},
```
## 参考
- https://cloud.tencent.com/developer/news/453986
- https://element.eleme.cn/#/zh-CN/component/form
- https://github.com/ElemeFE/element/blob/dev/packages/form/src/form-item.vue

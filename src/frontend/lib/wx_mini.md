## 小程序存在问题

1. padding-right margin-right失效 =>要加上box-sizing:border-box;

2. 不支持计算属性
3. view不支持滚动
4. scroll-view不支持弹性布局
5. input textarea z-index穿透
6. input 在ios上有边距
7. 双向绑定model支持有限
8. {{}}不支持调用方法
9. 小程序连麦时打电话后没声音

## 小程序授权配置

- 在app.json中加入授权配置

```json
"permission": {
  "scope.userLocation": {
    "desc": "你的位置信息将用于小程序位置接口的效果展示"
  }
},
```

- 在js中代码

```js
wx.getLocation({
  success(res) {
    var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + res.latitude + ',' +res.longitude + "&key=" + '???' + "&get_poi=1";
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
      	console.log(res.data.result.address_component)
      }
    })
   		 console.log(res);
    }, fail(res) {
   		 console.log(res);
  }
})
```

- 注释
1. wx.getLocation拿到坐标位置
2. http://apis.map.qq.com/ws/geocoder/v1/






## 小程序插件
很多api在程序中可以用，在插件里不能用
### api替代方案
- wx.createSelectorQuery()
  改为 this.createSelectorQuery()

- miniProgram

- 在页面中使用 behaviors

  > 基础库 2.9.2 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。
  >

  改成不用behaviors方式

- observers不支持

  改用属性的observer(newVal, oldVal, changedPath){}

- 分包下navigationStyle:custom失效

- pageLifetimes要2.6.6开始支持 基础库
- 双向绑定2.9开始支持




## 双线程模型

![img](https://res.wx.qq.com/wxdoc/dist/assets/img/4-1.ad156d1c.png)

### 混合渲染

1. webview
2. 原生组件
  - [`camera`](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)
  - [`canvas`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)
  - [`input`](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)（仅在focus时表现为原生组件）
  - [`live-player`](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)
  - [`live-pusher`](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
  - [`map`](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)
  - [`textarea`](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html)
  - [`video`](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)

## 小程序性能优化

1. 数据预加载
2. 分包加载按需加载（普通分包、独立分包，分包预加载）
3. 压缩代码
4. onLoadz中请求数据 不是onRead show
5. setData优化（只处理视图用到的数据）
6. 防抖节流 频繁调用的逻辑要简单
7. 显示骨架图
8. 使用缓存

### 参考
- [小程序性能优化](https://developers.weixin.qq.com/community/develop/article/doc/000008b94c41387644dadb61a58413)
- [微信小程序性能优化技巧](https://cloud.tencent.com/developer/article/1561515)

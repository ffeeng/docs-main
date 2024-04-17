- 直接编辑页面<br/>
`document.designMode='on'`

- 获取文档路径<br/>
`document.URL == document.documentURI ==location.href`

- 监听动画事件
```js
//.box 是添加了 animation动画
let box = document.getElementById("box");

box.onanimationstart = function(event) {
log("Animation started", event);
}

box.onanimationend = function(event) {
log("Animation stopped", event);
}; 
```


## 常用domApi

- 获取元素的位置left top，及元素的大小<br/>
  `let {left, top, width，height} = el.getBoundingClientRect();`

- 判断元素是否有子元素<br/>
  `parent.contains(child)`

- 获取鼠标坐标
  let {clientX, clientY，screenX，screenY} = e;


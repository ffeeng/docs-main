# whistle代理用法

## 安装启动
```bash
npm install -g whistle
w2 start -H 127.0.0.1 
w2 start -n fengqian -w Feng@61759875
```
## 常用操作

- 修改header
km.wps.cn reqHeaders://{test-reqHeaders.json}
km.wps.cn resHeaders://{test-reqHeaders.json}
```test-reqHeaders.json
ab: 111
```

- 代理接口
- 


## 替换文件
local.zhiliao.wps.cn/1.html html://E:\xx\test\test.html
local.zhiliao.wps.cn/1.js js://E:\xx\test\test.js
local.zhiliao.wps.cn/1.css css://E:\xx\test\test.css
## 跨域 gzip
web.docer.wpscdn.cn resCors://*
web.docer.wpscdn.cn enable://gzip

## 种Cookie
wwo.wps.cn resCookies://weboffice_branch=opf-amd-func-fp-fulltext-exporter
## 修改接口返回值
``` test.json
{
"code": 0,
"msg": "ok",
"data": []
}
```
local.zhiliao.wps.cn replaceStatus://200
https://local.zhiliao.wps.cn/a resBody://{test.json}

## 接口延迟
## https://local.zhiliao.wps.cn/api/zl/space/square/list  reqDelay://1000
## https://local.zhiliao.wps.cn/api/zl/space/square/list  resDelay://1000

## 修改js
``` test.js
alert(1);
```
local.zhiliao.wps.cn/1.js jsAppend://{test.js}

## 修改css
```test.css
body{
	background:red;
}
```
local.zhiliao.wps.cn/1.css cssAppend://{test.css}


## 前端页面走本地代码，接口走后端
km.wps.cn/api km.wps.cn/api
km.wps.cn localhost:8080


## 使用本地页面
local.zhiliao.wps.cn 127.0.0.1:8081

## 打印日志
testapi-zl.wps.cn log://
## host
120.92.124.158 testapi-zl.wps.cn

## 修改ua
local.zhiliao.wps.cn ua://Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36

/wos.wps.cn/ filter://hide
local.zhiliao.wps.cn ua://{aa}
local.zhiliao.wps.cn js://{js-test}
local.zhiliao.wps.cn log://{log-test}
local.zhiliao.wps.cn referer://https://vk.com/
local.zhiliao.wps.cn reqHeaders://{req-headers}

## https://local.zhiliao.wps.cn/api  https://10.90.129.185:9002/api
## 跨域
``` test1.json
origin: https://open-woa.wps.cn/
methods: POST
headers: x-csrftoken
credentials: true
maxAge: 300000
```
https://open-xz.wps.cn  resCors://{test1.json}
https://plussvr.wps.cn resCors://https://local.zhiliao.wps.cn


## 参考
https://wproxy.org/whistle/

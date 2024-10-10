#!/usr/bin/env zx


// 华为 1vCPUs | 2GiB | 带宽 1 Mbit/s
// 1.94.67.135 root/Root@123  一年 大陆 2025/4/28


(async ()=>{
  $.verbose = true
  cd('D:\\webStormProject\\temp')
  await $`ssh root@1.94.67.135`
  await $`Root@123`

})()






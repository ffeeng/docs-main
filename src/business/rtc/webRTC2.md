[TOC]

## 协议
- 建立连接
- 会话生命周期

## 流媒体采集
- [navigator.mediaDevices.getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
- 采集摄像头数据并播放
```html
<video style="width:800px;height: 800px;"></video>

<script>
  // 想要获取一个最接近 1280x720 的相机分辨率
  let constraints = { audio: true, video: { width: 1280, height: 720 } };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      let video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
</script>

```

## rtmp

Flv

## srcObject
## StreamMedia
```javascript
// 麦克风
getAudioTracks(): MediaStreamTrack[];
// 摄像头
getVideoTracks(): MediaStreamTrack[];
localStream.getTracks();
```
- 获取媒体设备 navigator.mediaDevices.enumerateDevices()
- RTCPeerConnection
- peerConnection.addTrack(track, this.localStream);

## websocket做了 也做了WebRTC信令

- 房间信令
![img_3.png](../image/img_30.png)

- webRTC信令
![img.png](../image/img_32.png)
![img_1.png](../image/img_31.png)

## mediaPlayer

## video

## audio

## 数据格式 mp4 flv

## 参考
- [MDN WebRTC](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)
- [MDN getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
- [w3c getusermedia](https://w3c.github.io/mediacapture-main/#dom-mediadevices-getusermedia)

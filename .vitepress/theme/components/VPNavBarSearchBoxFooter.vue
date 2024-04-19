<template>
  <footer class="footer">
    <div class="footer__item">
      <kbd class="item__kbd"
        ><span class="item__inner"><span class="item__key">↵</span></span></kbd
      >
      <span>跳转目标项</span>
    </div>
    <div class="footer__item">
      <div class="item__wrapper">
        <kbd class="item__kbd"
          ><span class="item__inner"
            ><span class="item__key">↓</span></span
          ></kbd
        >
        <kbd class="item__kbd"
          ><span class="item__inner"
            ><span class="item__key">↑</span></span
          ></kbd
        >
      </div>
      <span>切换目标项</span>
    </div>
    <div class="footer__item">
      <kbd class="item__kbd"
        ><span class="item__inner"
          ><span class="item__key">esc</span></span
        ></kbd
      >
      <span>关闭搜索</span>
    </div>
    <div class="footer__spacer"></div>
    <div class="footer__power">
      <span>blog</span>
      <img src="/webOffice_logo.png" alt="logo" />
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: var(--vp-c-bg);
  border-top-width: 1px;
  border-color: var(--vp-c-divider-light);
  border-top-style: solid;
  box-shadow: var(--vp-shadow-4);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
}
.footer__item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-size: 14px;
}
.item__wrapper {
  display: flex;
}
.item__kbd {
  width: 24px;
  margin-right: 8px;
  --text-opacity: 1;
  box-shadow: var(--vp-shadow-4);
  border-bottom-width: 2px;
  border-radius: 4px;
  border-color: var(--vp-c-divider);
  --gradient-color-stops: var(--vp-c-bg-mute), var(--vp-c-divider-light);
  background-image: linear-gradient(to top left, var(--gradient-color-stops));
  font-family: Menlo, Courier, monospace;
  box-sizing: border-box;
}
.item__inner {
  width: 100%;
  padding-top: 2px;
  padding-bottom: 2px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 1px;
  border-radius: 4px;
}
.item__key {
  height: 16px;
  display: block;
}
.footer__spacer {
  flex: 1;
}
.footer__power {
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    padding-right: 8px;
    font-size: 14px;
  }
}
</style>

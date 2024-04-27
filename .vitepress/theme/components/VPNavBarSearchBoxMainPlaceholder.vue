<template>
  <div class="empty__wrapper">
    <VPIconSearchEmpty class="empty__icon" />
    <p class="empty__main">
      <span class="empty__keyword"> "{{ keyword }}" </span>没有匹配到结果
    </p>
    <p class="empty__tip">
      尝试搜索一下：<span
        @click="emit('updateKeyword', 'vue')"
        class="empty__recommend"
        >vue</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
import VPIconSearchEmpty from './icons/VPIconSearchEmpty.vue'

defineProps<{
  keyword: string
}>()
const emit = defineEmits(['updateKeyword'])
</script>

<style lang="less" scoped>
.empty__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.empty__icon {
  margin-top: 50px;
  width: 100px;
  height: 100px;
}
.empty__main {
  margin-top: 50px;
  font-size: 20px;
}
.empty__keyword {
  font-weight: 600;
}
.empty__tip {
  margin-top: 15px;
}
.empty__recommend {
  padding: 0 5px;
  color: var(--vp-c-brand);
  cursor: pointer;
}
</style>

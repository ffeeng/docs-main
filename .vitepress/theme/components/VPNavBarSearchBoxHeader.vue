<template>
  <header class="header">
    <label class="header__label">
      <VPIconLoading v-if="loadingData" />
      <VPIconSearch v-else />
    </label>
    <div class="header__control">
      <input
        class="header__input"
        ref="searchInputEl"
        v-model.trim="searchKeyword"
        placeholder="搜索文档内容"
        maxlength="30"
        type="text"
      />
    </div>
    <button
      class="header__clear"
      v-show="!!keyword"
      @click="searchKeyword = ''"
    >
      <VPIconClose />
    </button>
    <div class="header__divider"></div>
    <button class="header__cancel" @click="emit('closeSearch')">取消</button>
  </header>
</template>

<script setup lang="ts">
import VPIconSearch from './icons/VPIconSearch.vue'
import VPIconLoading from './icons/VPIconLoading.vue'
import VPIconClose from './icons/VPIconClose.vue'
import { ref, computed, watch, nextTick, CSSProperties } from 'vue'

const props = defineProps<{
  value: boolean
  keyword: string
  loadingData: boolean
}>()
const emit = defineEmits(['update:keyword', 'closeSearch'])
const searchInputEl = ref<HTMLInputElement>()

const searchKeyword = computed({
  get() {
    return props.keyword
  },
  set(keyword) {
    emit('update:keyword', keyword)
  }
})

watch(
  () => props.value,
  newValue => {
    if (newValue) {
      setTimeout(() => {
        // 自动聚焦
        searchInputEl.value?.focus()
        // 清空关键字
        searchKeyword.value = ''
      }, 10)
    }
  }
)
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 72px;
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: var(--vp-c-bg);
  z-index: 101;
  transition: all 0.3s;
  transform-origin: top left;
}
.header__label {
  width: 60px;
  display: flex;
  justify-content: center;
  font-size: 24px;
}
.header__control {
  flex: 1;
  height: 100%;
}
.header__divider {
  width: 1px;
  height: 32px;
  background-color: var(--vp-c-divider-light);
}
.header__clear {
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  background-color: transparent;
  font-size: 100%;
  color: var(--vp-c-text-2);
  &:hover {
    color: var(--vp-c-text-1);
  }
}
.header__cancel {
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  background-color: transparent;
  font-size: 100%;
  color: var(--vp-c-text-2);
  &:hover {
    color: var(--vp-c-text-1);
  }
}
.header__input {
  font-size: 22px;
  width: 100%;
  height: 100%;
  line-height: 100%;
}
</style>

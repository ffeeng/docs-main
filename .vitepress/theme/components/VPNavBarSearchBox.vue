<template>
  <transition
    name="fade"
    @enter="lockRootScroll"
    @after-leave="unlockRootScroll"
  >
    <div v-show="value" class="box__overlay">
      <div class="box" :style="innerStyle">
        <VPNavBarSearchBoxHeader
          v-model:keyword="keyword"
          :value="value"
          :loading-data="loadingData"
          @close-search="onCloseSearch"
        />
        <VPNavBarSearchBoxMain
          v-model:keyword="keyword"
          :groups="groups"
          :groupLimit="groupLimit"
          :loading-data="loadingData"
          @upper-limit="onUpperLimit"
          @close-search="onCloseSearch"
        />
        <VPNavBarSearchBoxFooter v-show="!!keyword" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import VPNavBarSearchBoxHeader from './VPNavBarSearchBoxHeader.vue'
import VPNavBarSearchBoxMain from './VPNavBarSearchBoxMain.vue'
import VPNavBarSearchBoxFooter from './VPNavBarSearchBoxFooter.vue'
import { Search } from '../data/search.d'
import {
  ref,
  computed,
  watch,
  watchEffect,
  shallowRef,
  CSSProperties,
  reactive
} from 'vue'

const DEFAULT_LIMIT = 5
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const keyword = ref('')
const loadingData = ref(false)
const datasource = shallowRef<Search.Item[]>([])
const groupLimit = reactive({
  [Search.GroupType.Frontend]: DEFAULT_LIMIT,
  [Search.GroupType.Backend]: DEFAULT_LIMIT,
  [Search.GroupType.Business]: DEFAULT_LIMIT,
  [Search.GroupType.Devops]: DEFAULT_LIMIT
})
let rootScrollType = ''

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const groups = computed(() => {
  const result: Search.Group[] = [
    { text: '前端', type: Search.GroupType.Frontend, items: [] },
    { text: '后端', type: Search.GroupType.Backend, items: [] },
    { text: '业务', type: Search.GroupType.Business, items: [] },
    { text: '运维', type: Search.GroupType.Devops, items: [] }
  ]

  if (keyword.value) {
    for (const item of datasource.value) {
      console.log(item.text, keyword.value, 11)
      if (item.text.toLowerCase().includes(keyword.value.toLowerCase())) {
        const targetGroup = result.find(group => group.type === item.groupType)

        if (
          targetGroup &&
          targetGroup?.items.length < groupLimit[targetGroup.type]
        ) {
          targetGroup.items.push(item)
        }
      }
    }
  }

  return result.filter(group => group.items.length > 0)
})
const innerStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: keyword.value ? 'var(--vp-c-bg)' : 'transparent',
    boxShadow: keyword.value ? 'var(--vp-shadow-3)' : ''
  }
})

watch(keyword, () => {
  resetLmit()
})

const stop = watchEffect(async () => {
  if (!keyword.value) return

  try {
    loadingData.value = true
    const resp = await import('virtual:search-data-source-module')
    datasource.value = resp.default
    // datasource.value = []
    stop()
  } catch (error) {
    console.warn(error)
  } finally {
    loadingData.value = false
  }
})

function resetLmit() {
  for (const key of Object.keys(groupLimit)) {
    groupLimit[Number(key)] = DEFAULT_LIMIT
  }
}
function onUpperLimit(type: Search.GroupType) {
  groupLimit[type] = groupLimit[type] * 2
}
function onCloseSearch() {
  value.value = false
}
function lockRootScroll() {
  rootScrollType = document.documentElement.style.overflowY
  document.documentElement.style.overflowY = 'hidden'
}
function unlockRootScroll() {
  document.documentElement.style.overflowY = rootScrollType
}
</script>

<style lang="less" scoped>
.box__overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  }
  @media (max-width: 1024px) {
    .box {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      padding-bottom: 0;
    }
    :deep(.header) {
      border-radius: 0;
    }
    :deep(.footer) {
      display: none;
    }
  }
}
.fade-enter-from {
  opacity: 0;
  .box {
    :deep(.header) {
      transform: translate(-176px, -31px) scale(0.14, 0.55);
    }
  }
}
.fade-leave-to {
  opacity: 0;
  .box {
    :deep(.header) {
      transform: translate(-176px, -31px) scale(0.14, 0.55);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.dark .box__overlay {
  background-color: rgba(200, 200, 200, 0.6);
}
</style>

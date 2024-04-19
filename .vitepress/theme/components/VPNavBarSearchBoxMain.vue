<template>
  <main class="main" ref="mainEl" v-show="!!keyword">
    <ul v-if="groups.length > 0">
      <li v-for="group in groups" :key="group.type">
        <template v-if="group.items.length > 0">
          <p class="item__group">{{ group.text }}</p>
          <ul @click="emit('closeSearch')">
            <li
              v-for="item in group.items"
              @click="onLink(item)"
              @mouseenter.self="onEnter(item, $event)"
            >
              <a
                class="item__wrapper"
                :class="{ 'item__wrapper--active': activeItem === item }"
                :href="withBase(item.link)"
              >
                <div class="item__prefix">
                  <component :is="getTextTypeIcon(item.textType)" />
                </div>
                <div class="item__main">
                  <p class="item__text">
                    <span class="text__prefix">{{ getTextPrefix(item) }}</span>
                    <span class="text__keyword">{{
                      getTextKeyword(item)
                    }}</span>
                    <span class="text__prefix">{{ getTextSuffix(item) }}</span>
                  </p>
                  <span class="item__route">{{ getItemRoute(item) }}</span>
                </div>
                <div class="item__suffix">
                  <VPIconEnter />
                </div>
              </a>
            </li>
            <li
              class="item__loadmore"
              v-if="group.items.length >= groupLimit[group.type]"
              @click.stop="onLoadmore(group.type)"
            >
              <span>加载更多</span><VPIconAlignDown />
            </li>

          </ul>
        </template>
      </li>
    </ul>
    <VPNavBarSearchBoxMainPlaceholder
      v-else-if="keyword && !props.loadingData"
      :keyword="keyword"
      @update-keyword="onUpdateKeyword"
    />
  </main>
</template>

<script lang="ts" setup>
import VPIconPageType from './icons/VPIconPageType.vue'
import VPIconHeadingType from './icons/VPIconHeadingType.vue'
import VPIconTextType from './icons/VPIconTextType.vue'
import VPIconCodeType from './icons/VPIconCodeType.vue'
import VPIconTableType from './icons/VPIconTableType.vue'
import VPIconEnter from './icons/VPIconEnter.vue'
import VPIconAlignDown from './icons/VPIconAlignDown.vue'
import VPNavBarSearchBoxMainPlaceholder from './VPNavBarSearchBoxMainPlaceholder.vue'
import { shallowRef, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute, withBase } from 'vitepress'
import { Search } from '../data/search.d'

const mouseEnterPoint = {
  x: 0,
  y: 0
}
const props = defineProps<{
  keyword: string
  groups: Search.Group[]
  groupLimit: {
    [x: number]: number
  }
  loadingData: boolean
}>()
const emit = defineEmits(['update:keyword', 'closeSearch', 'upperLimit'])
const router = useRouter()
const route = useRoute()
const activeItem = shallowRef<Search.Item>()
const mainEl = shallowRef<HTMLElement>()

const searchKeyword = computed({
  get() {
    return props.keyword
  },
  set(keyword) {
    emit('update:keyword', keyword)
  }
})
const items = computed<Search.Item[]>(() => {
  const result: Search.Item[] = []

  for (const { items } of props.groups) {
    result.push(...items)
  }
  return result
})

onMounted(() => {
  window.addEventListener('keydown', handleSearchHotKey)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleSearchHotKey)
  })
})

function handleSearchHotKey(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const index = items.value.findIndex(item => item === activeItem.value)

    if (index === -1 || index === 0) {
      activeItem.value = items.value[items.value.length - 1]
    } else {
      activeItem.value = items.value[index - 1]
    }

    nextTick(() => {
      autoScroll(
        mainEl.value!.querySelector('.item__wrapper--active'),
        mainEl.value!
      )
    })
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const index = items.value.findIndex(item => item === activeItem.value)

    if (index === -1 || index === items.value.length - 1) {
      activeItem.value = items.value[0]
    } else {
      activeItem.value = items.value[index + 1]
    }

    nextTick(() => {
      autoScroll(
        mainEl.value!.querySelector('.item__wrapper--active'),
        mainEl.value!
      )
    })
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    if (activeItem.value) {
      navigate({
        itemUrl: withBase(activeItem.value.link)
      })
    }
  }
}

function getTextTypeIcon(textType: Search.TextType) {
  switch (textType) {
    case Search.TextType.Page:
      return VPIconPageType
    case Search.TextType.Title:
      return VPIconHeadingType
    case Search.TextType.Text:
      return VPIconTextType
    case Search.TextType.Table:
      return VPIconTableType
    case Search.TextType.Code:
      return VPIconCodeType

    default:
      break
  }
}
function onLoadmore(type: Search.GroupType) {
  emit('upperLimit', type)
}
function navigate({ itemUrl }: { itemUrl: string }) {
  emit('closeSearch')
  const { pathname: hitPathname } = new URL(window.location.origin + itemUrl)

  if (route.path === hitPathname) {
    window.location.assign(window.location.origin + itemUrl)
  } else {
    router.go(itemUrl)
  }
}
function getItemRoute(item: Search.Item) {
  return item.routeTitle.replace(',', ' > ')
}
function getTextPrefix(item: Search.Item) {
  if (!props.keyword) return ''

  const matchIndex = item.text
    .toLowerCase()
    .indexOf(props.keyword.toLocaleLowerCase())
  const prefix = item.text.slice(0, matchIndex)

  // 正则分词，仅保留单句
  return prefix.split(/[^-.()【】'"“”* \w\u4E00-\u9FA5]/).pop()
}
function getTextKeyword(item: Search.Item) {
  if (!props.keyword) return ''

  const matchIndex = item.text
    .toLowerCase()
    .indexOf(props.keyword.toLocaleLowerCase())

  const match = item.text.slice(matchIndex, matchIndex + props.keyword.length)
  return match

}
function getTextSuffix(item: Search.Item) {
  if (!props.keyword) return ''

  const matchIndex = item.text
    .toLowerCase()
    .indexOf(props.keyword.toLocaleLowerCase())
  const suffix = item.text.slice(
    matchIndex + props.keyword.length,
    item.text.length
  )

  // 正则分词，仅保留单句
  return suffix.split(/[^-.()【】'"“”* \w\u4E00-\u9FA5]/).shift()
}
function onEnter(item: Search.Item, e: MouseEvent) {
  if (activeItem.value === item) return
  if (mouseEnterPoint.x === e.clientX && mouseEnterPoint.y === e.clientY) return

  mouseEnterPoint.x = e.clientX
  mouseEnterPoint.y = e.clientY
  activeItem.value = item
}
function onLink(item: Search.Item) {
  const historyString = localStorage.getItem('SEARCH_HISTORY')
  const historyItem = {
    text: props.keyword,
    link: item.link
  }

  if (historyString) {
    const history = JSON.parse(historyString) as {
      text: string
      link: string
    }[]
    const index = history.findIndex(h => h.text === historyItem.text)

    if (index) {
      history.splice(index, 1, historyItem)
    } else {
      history.push(historyItem)
    }
    localStorage.setItem('SEARCH_HISTORY', JSON.stringify(history))
  } else {
    localStorage.setItem('SEARCH_HISTORY', JSON.stringify([historyItem]))
  }
}
function onUpdateKeyword(newKeyword: string) {
  searchKeyword.value = newKeyword
}
/**
 * 自动滚动容器以保持目标元素可见
 * @param target 目标元素
 * @param scroller 滚动元素
 */
function autoScroll(target: HTMLElement | null, scroller: HTMLElement | null) {
  if (!target || !scroller) return

  const { y, height } = target.getBoundingClientRect()
  const { y: scrollerTop, height: scrollerHeight } =
    scroller.getBoundingClientRect()

  if (y + height > scrollerTop + scrollerHeight) {
    target.scrollIntoView(false)
  } else if (y < scrollerTop) {
    target.scrollIntoView(true)
  }
}
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  background-color: var(--vp-c-bg-mute);
  box-sizing: border-box;
  overflow-y: auto;
}
.item__group {
  padding: 5px 15px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
}
.item__loadmore {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--vp-c-bg);
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: var(--vp-c-divider-light);
    color: var(--vp-c-text);
  }
}
.item__wrapper {
  padding: 5px 15px;
  height: 60px;
  background-color: var(--vp-c-bg);
  display: flex;
  cursor: pointer;
}
.item__wrapper--active {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-text-inverse-1);
  .text__keyword {
    font-weight: 700;
    color: var(--vp-c-text-inverse-1);
    text-decoration: underline;
  }
  .item__route {
    color: var(--vp-c-text-inverse-2);
  }
  .item__suffix {
    opacity: 1;
  }
}
.item__prefix {
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 15px;
}
.item__suffix {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  opacity: 0;
}
.item__main {
  width: calc(100% - 80px);
  height: 60px;
}
.item__text {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text__keyword {
  font-weight: 700;
  color: var(--vp-c-brand);
}
.item__route {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
@media (max-width: 1024px) {
  .item__main {
    width: calc(100% - 40px);
    height: 60px;
  }
  .item__suffix {
    display: none;
  }
}
</style>

<style lang="less">
.item__wrapper--active {
  background-color: var(--vp-c-brand);
}
</style>

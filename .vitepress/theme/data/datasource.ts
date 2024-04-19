import fs from 'fs'
import path from 'path'
import { Search } from './search.d'
import { sidebar } from './sidebar'

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

export const slugify = (str: string) =>
  str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()


/**
 * 获取组类型
 * @param key 导航栏路径
 */
function getNavType(key: string) {
  if (key.startsWith('/frontend')) {
    return Search.GroupType.Frontend
  } else if (key.startsWith('/backend')) {
    return Search.GroupType.Backend
  } else if (key.startsWith('/business')) {
    return Search.GroupType.Business
  } else if (key.startsWith('/devops')) {
    return Search.GroupType.Devops
  } else {
    return Search.GroupType.Frontend
  }

}

/**
 * 获取内容类型
 * @param text 文本内容
 */
function getTextType(text: string) {
  if (/\n\|[\s-:|]+/.test(text)) {
    return Search.TextType.Table
  } else if (/```|:::httpsnippet/.test(text)) {
    return Search.TextType.Code
  } else {
    return Search.TextType.Text
  }
}

/**
 * 获取搜索数据源
 */
export default function getSearchDataSource() {
  const pageItems: Search.Item[] = []
  const titleItems: Search.Item[] = []
  const textItems: Search.Item[] = []

  for (const [_, sidebarGroups] of Object.entries(sidebar)) {
    for (const sidebarGroup of sidebarGroups) {
      resolveGroup(sidebarGroup, pageItems, titleItems, textItems)
    }
  }
  return pageItems.concat(titleItems, textItems)
}

function resolveGroup(
  group: any,
  pageItems: Search.Item[],
  titleItems: Search.Item[],
  textItems: Search.Item[],
  parentTitle: string[] = [group.text!]
) {

  for (const item of group.items) {
    if (item.items) {
      resolveGroup(item, pageItems, titleItems, textItems, [
        ...parentTitle,
        item.text
      ])

    } else {
      if (item.link.startsWith('http')) continue
      let link = item.link

      if (link.endsWith('/')) {
        link = link + 'index'
      }

      if (!link.endsWith('.md')) {
        link = link + '.md'
      }

      const content = fs
        .readFileSync('/Users/fengqian/WebstormProjects/docs-main/src'+link, {
          encoding: 'utf-8'
        })
        // 文件引用内容补全
        .replace(
          /<!--\s?@include:\s?([^\s]+)\s?-->/g,
          (_: string, $1: string) => {
            const fileDir = path.resolve(
              __dirname,
              `../../${path.dirname(link)}`
            )
            const includeFilePath = path.resolve(fileDir, $1)
            return fs.readFileSync(includeFilePath, {
              encoding: 'utf-8'
            })
          }
        )
        // 删除文件头
        .replace(/---[\r\n]+[^\-]+[\r\n]+---[\r\n]+/, '')
        // 删除注释块
        .replace(/<!--[\s\S]+?-->/g, '')
        // 自定义容器仅保留内容
        .replace(/:::.*[\r\n]+/g, '')
        // 删除script标签
        .replace(/<script setup>[\r\n]+[^<]+[\r\n]+<\/script>/, '')
        // 删除图片内容
        .replace(/!\[[^\]]+\]\([^\)]+\)/g, '')
        // 链接仅保留文字
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        // 删除表格标识行
        .replace(/[\n\r]+\|[\s:\-\|]+[\n\r]+/g, '')

      const subContents = content.split(/\n#+ /)
      const anchors: string[] = []
      for (const subContent of subContents) {
        const index = subContent.indexOf('\n')
        // 截取标题
        const title = subContent.slice(0, index)
        const titleWithoutAcchors = title.replace(/#+ /, '').trim()
        const text = subContent
          // 截取内容主体
          .slice(index + 1, subContent.length)
          // 删除多余的空格
          .replace(/[\s]{2,}/g, ' ')
          .trim()
        const anchor = getUniqueAnchor(
          `#${getHashSuffix(titleWithoutAcchors)}`,
          anchors
        )
        const link = item.link + anchor

        if (title.includes('#')) {
          pageItems.push({
            text: titleWithoutAcchors,
            link,
            textType: Search.TextType.Page,
            routeTitle: parentTitle.join(' > '),
            groupType: getNavType(link)
          })
        } else {
          titleItems.push({
            text: titleWithoutAcchors,
            link,
            textType: Search.TextType.Title,
            routeTitle: [...parentTitle, item.text].join(' > '),
            groupType: getNavType(link)
          })
        }

        textItems.push({
          text,
          link,
          textType: getTextType(text),
          routeTitle: [...parentTitle, item.text].join(' > '),
          groupType: getNavType(link)
        })

      }
    }
  }
}

getSearchDataSource()


/**
 * 获取独立无二的锚点（根据现有的锚点去判断）
 * @param anchor 原始锚点
 * @param anchors 现有锚点数组
 */
function getUniqueAnchor(anchor: string, anchors: string[]) {
  if (anchors.includes(anchor)) {
    const duplicateCount = anchors.filter(item => item.includes(anchor)).length
    const uniqueAnchor = `${anchor}-${duplicateCount}`
    anchors.push(uniqueAnchor)
    return uniqueAnchor
  } else {
    anchors.push(anchor)
    return anchor
  }
}

/**
 * 获取尾部哈希化的标题
 * @param title 标题
 */
function getHashSuffix(title: string) {
  const [_, hash] = title.match(/\{#(.+)\}/) || []

  if (hash) {
    return hash
  } else {
    return slugify(title)
  }
}



import { Config as ThemeConfig } from '@vue/theme/src/vitepress/config'
import fs from 'fs'

import path from 'path'

export const sidebar: ThemeConfig['sidebar'] = {}

const dir = path.resolve(__dirname, '../../../src')

export async function getMenuData() {
  const dirs = fs.readdirSync(dir)
  // const res = [...dirs]
  // const sidebar = {}
  await readDirData('', sidebar, sidebar, 0)

  return sidebar
}
await getMenuData()

async function readDirData(base, cur, res, deep) {
  const dirs = fs.readdirSync(dir + base)

  for (let name of dirs) {
    const isDirResult = await isDir(dir + base + '/' + name)
    console.log(name + base)
    if (isDirResult) {
      if (['img'].includes(name)) continue
      if (Array.isArray(res[base.slice(1)])) {
        let item = {
          text: name,
          items: []
        }
        cur.push(item)
        await readDirData(base + '/' + name, item.items, res, deep + 1)
      } else {
        cur[name] = []
        await readDirData(base + '/' + name, cur[name], res, deep + 1)
      }
    } else {
      if (base === dir) continue
      if (!name.endsWith('.md')) continue

      name = name.replace('.md', '')
      console.log(name + base)

      if (Array.isArray(cur)) {
        if (deep === 1) {
          // debugger
          if (cur.length > 0 && cur[0].items) {
            cur[0].items.push({ text: name, link: base + '/' + name })
          } else {
            const item = {
              text: base.slice(1),
              items: [{ text: name, link: base + '/' + name }]
            }
            cur.push(item)
          }
        } else {
          cur.push({ text: name, link: base + '/' + name })
        }
      }
    }
  }
}

function isDir(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
        return
      }

      if (stats.isFile()) {
        resolve(false)
      } else if (stats.isDirectory()) {
        resolve(true)
      } else {
        reject('给定路径既不是文件也不是目录')
      }
    })
  })
}

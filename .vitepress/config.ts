import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import { fileURLToPath, URL } from 'node:url'
// import getSearchDataSource from './utils/getSearchDataSource'

const nav: ThemeConfig['nav'] = [
  // {
  //   text: '文档',
  //   activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
  //   items: [
  //     { text: '前端', link: '/frontend/html/link' },
  //     { text: '后端', link: '/backend' },
  //   ]
  // },
  {
    text: '前端',
    activeMatch: `^/frontend/`,
    link: '/frontend/'
  },
  {
    text: '后端',
    activeMatch: `^/backend/`,
    link: '/backend/'
  },
  {
    text: '业务',
    activeMatch: `^/business/`,
    link: '/business/'
  },
  {
    text: '运维',
    activeMatch: `^/devops/`,
    link: '/devops/'
  },
  {
    text: '测试',
    activeMatch: `^/test/`,
    link: '/test/'
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'Playground',
    link: 'https://play.vuejs.org'
  },
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/frontend/': [
    {
      text: 'html',
      items: [
        { text: '样式', link: '/frontend/html/link' },
        { text: '元数据', link: '/frontend/html/meta' },
        { text: '脚本', link: '/frontend/html/script' },

      ]
    },
    {
      text: 'css',
      items: [
        { text: '长度单位', link: '/frontend/css/length' },
        { text: '设置样式', link: '/frontend/css/style' },
        { text: 'flex布局', link: '/frontend/css/flex' },
        { text: '动画', link: '/frontend/css/animate' },
        { text: '特效', link: '/frontend/css/special' }
      ]
    }, {
      text: 'js',
      items: [
        { text: 'unknow', link: '/frontend/js/unknow' },
        { text: '数组', link: '/frontend/js/ecma/arr' },
        { text: '函数', link: '/frontend/js/ecma/fun' },
        { text: 'api', link: '/frontend/js/ecma/api' },
        { text: '集合', link: '/frontend/js/ecma/set' },
        { text: '字符串', link: '/frontend/js/ecma/string' },
        { text: 'Promise', link: '/frontend/js/ecma/promise' },
        { text: 'fetch', link: '/frontend/js/dom/fetch' },
        { text: 'debug', link: '/frontend/js/debug' },
        { text: '浏览器工作原理', link: '/frontend/js/browser' },
        { text: '存储', link: '/frontend/js/storage' },
        { text: 'URL参数', link: '/frontend/js/dom/url' },
        { text: 'dom', link: '/frontend/js/dom/dom' },
        { text: 'event', link: '/frontend/js/dom/event' },
        { text: 'web组件', link: '/frontend/js/dom/webComp' },
        { text: '文件IO流', link: '/frontend/js/dom/io' },
        { text: '基本语法面试', link: '/frontend/js/interview-base' },
        { text: '工程化面试', link: '/frontend/js/interview-tool' },
        { text: '其他', link: '/frontend/js/ecma/other' }

      ]
    },
    {
      text: 'vue',
      items: [
        { text: 'vue2', link: '/frontend/vue/vue2' },
        { text: 'vue2源码', link: '/frontend/vue/vue2_source' },
        { text: 'vue3', link: '/frontend/vue/vue3' },
        { text: 'vue3提案', link: '/frontend/vue/vue3_rfcs' },
        { text: 'vueRouter', link: '/frontend/vue/vue_router' },
        { text: 'extendable', link: '/frontend/vue/extendable' },
      ]
    },
    {
      text: 'react',
      items: [
        { text: '基本', link: '/frontend/react/base' }
      ]
    },
    {
      text: '三方库',
      items: [
        { text: 'axios', link: '/frontend/lib/axios' },
        { text: 'jquery', link: '/frontend/lib/jquery' },
        { text: '微信小程序', link: '/frontend/lib/wx_mini' }
      ]
    }

  ],
  '/backend/': [
    {
      text: '后端',
      items: [
        { text: 'mysql', link: '/backend/mysql/base' },
        { text: '网络基础', link: '/backend/net/index' },
        { text: 'http协议', link: '/backend/net/http' }
      ]
    }
  ],

  '/business/': [
    {
      text: '业务',
      items: [
        { text: 'sentry接入', link: '/business/sentry' },
        { text: 'playwright教程', link: '/business/playwright' },
        { text: 'ai业务', link: '/business/ai' },
        { text: '工作流程', link: '/business/workflow' },

      ]
    }
  ],

  '/devops/': [
    {
      text: '运维',
      items: [
        { text: '常用指令', link: '/devops/index' },
        { text: 'nginx', link: '/devops/nginx' },
        { text: '端口', link: '/devops/port' },
        { text: '进程管理', link: '/devops/pm2' },
        { text: '版本管理', link: '/devops/versions' },
        { text: '包管理', link: '/devops/yum' },
        { text: '部署', link: '/devops/deploy' },
        { text: '构建', link: '/devops/jenkins' }
      ]
    }
  ],

  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
      ]
    }]
}

// Placeholder of the i18n config for @vuejs-translations.
const i18n: ThemeConfig['i18n'] = {
  toc: '本页目录'
}

const searchDataSourcePlugin = function () {
  const virtualModuleId = 'virtual:search-data-source-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'search-data-source-plugin', // 必须的，将会在 warning 和 error 中显示
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const data = getSearchDataSource()
        return `export default ${JSON.stringify(data)}`
      }
    }
  }
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    i18n,

    localeLinks: [
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '21cf9df0734770a2448a9da64a700c22',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
    ],

    editLink: {
      repo: 'ffeeng/note',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} ffeeng`
    }
  },

  // plugins:[
  //   searchDataSourcePlugin()
  // ]

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarSearch\.vue$/,
          replacement: fileURLToPath(
            new URL('/Users/fengqian/WebstormProjects/docs-main/.vitepress/theme/components/VPNavBarSearch.vue', import.meta.url)
          )
        }
      ]
    },
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})

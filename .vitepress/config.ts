import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

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
    activeMatch: `^/devopts/`,
    link: '/devopts/'
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
        { text: 'debug', link: '/frontend/js/debug' },
        { text: '浏览器工作原理', link: '/frontend/js/browser' },
        { text: '存储', link: '/frontend/js/storage' },
        { text: '数组', link: '/frontend/js/array' },
        { text: 'URL参数', link: '/frontend/js/dom/url' },
        { text: 'fetch', link: '/frontend/js/dom/fetch' },
        { text: 'dom', link: '/frontend/js/dom/dom' },
        { text: 'event', link: '/frontend/js/dom/event' },
        { text: 'web组件', link: '/frontend/js/dom/webComp' },
        { text: '文件IO流', link: '/frontend/js/dom/io' },
        { text: 'interview', link: '/frontend/js/interview' },
      ]
    }

  ],
  '/backend/': [
    {
      text: 'mysql',
      items: [
        { text: 'sql语法', link: '/backend/mysql/sql' }

      ]
    }
  ],

  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' },
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
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js - The Progressive JavaScript Framework'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

    localeLinks: [
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
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
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} ffeeng`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
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

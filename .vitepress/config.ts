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
    link: '/frontend/readme.md'
  },
  {
    text: '后端',
    activeMatch: `^/backend/`,
    link: '/backend/readme.md'
  },
  {
    text: '业务',
    activeMatch: `^/business/`,
    link: '/business/readme.md'
  },
  {
    text: '运维',
    activeMatch: `^/devopts/`,
    link: '/devopts/readme.md'
  },
  {
    text: '测试',
    activeMatch: `^/test/`,
    link: '/test/readme.md'
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
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
        { text: '存储', link: '/frontend/html/storage' }
      ]
    },
    {
      text: 'css',
      items: [
        { text: '样式', link: '/frontend/html/link' },
        { text: '元数据', link: '/frontend/html/meta' },
        { text: '脚本', link: '/frontend/html/script' },
        { text: '存储', link: '/frontend/html/storage' }
      ]
    }

  ],
  '/backend/': [
    {
      text: 'mysql',
      items: [
        { text: 'sql语法', link: '/backend/mysql/sql' },

      ]
    },
  ],

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

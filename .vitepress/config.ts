import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import { fileURLToPath, URL } from 'node:url'
import { sidebar } from './theme/data/sidebar'
import getSearchDataSource from './theme/data/datasource'
// import getSearchDataSource from './utils/getSearchDataSource'
let a="file:///"+path.resolve(__dirname,'theme/components/VPNavBarSearch.vue')
// debugger
// D:\webStormProject\docs-main\.vitepress\theme\components\VPNavBarSearch.vue

const nav: ThemeConfig['nav'] = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '工具',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      {
        text: '资源工具',
        link: 'https://nav.poetries.top/'
      },
      {
        text: 'cheatSheet',
        link: 'https://devhints.io/'
      },
      {
        text: 'feHelper',
        link: 'https://www.baidufe.com/fehelper/regexp/index.html'
      },
      {
        text: '正则可视化',
        link: 'https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24'
      },
      {
        text: 'babelRepl',
        link: 'https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&corejs=false&spec=false&loose=false&code_lz=IYZwngdgxgBAZgV2gFwJYHsI2MAFASgG8AoGM7Ad2FWRggFMKYAFAJ3QFtUR7dX6Q6ADYA3egF4AfCXKyYPZABVUHeugTJcBKTLl6omQUPoA6IegDmuAIz5SeufyNiC9vQF8ANNYAMfu7Ludu7EpDiuBhBGpuZWAEx2QA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=&prettier=false&targets=&version=7.24.4&externalPlugins=&assumptions=%7B%7D'
      }
    ]
  },
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
  }
  // {
  //   text: 'Playground',
  //   link: 'https://play.vuejs.org'
  // }
]

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
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const data = getSearchDataSource()
        console.log(data)
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

  head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
  ignoreDeadLinks: true,

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    i18n,

    // localeLinks: [
    //   {
    //     link: 'https://cn.vuejs.org',
    //     text: '简体中文',
    //     repo: 'https://github.com/vuejs-translations/docs-zh-cn'
    //   }
    // ],

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

    // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/' }],

    editLink: {
      repo: 'ffeeng/docs-main',
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

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    plugins: [searchDataSourcePlugin()],
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarSearch\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "file:///"+path.resolve(__dirname,'theme/components/VPNavBarSearch.vue'),
              import.meta.url
            )
          )
        },
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL(
              "file:///"+path.resolve(__dirname,'theme/components/VPNavBarTitle.vue'),
              import.meta.url
            )
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

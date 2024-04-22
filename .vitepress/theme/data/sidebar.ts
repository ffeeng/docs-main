import { Config as ThemeConfig } from '@vue/theme/src/vitepress/config'

export const sidebar: ThemeConfig['sidebar'] = {
  '/frontend/': [
    {
      text: '前端', items: [
        { text: '概要', link: '/frontend/index' }
      ]
    },
    {
      text: 'html',
      items: [
        { text: '样式', link: '/frontend/html/link' },
        { text: '元数据', link: '/frontend/html/meta' },
        { text: '脚本', link: '/frontend/html/script' }
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
        { text: '概要', link: '/backend/index' },
        { text: 'mysql', link: '/backend/mysql/base' },
        { text: '网络基础', link: '/backend/net/index' },
        { text: 'http协议', link: '/backend/net/http' }
      ]
    }
  ],

  '/business/': [
    {
      text: '', items: [
        { text: '业务', link: '/business/index' }
      ]
    },
    {
      text: '',
      items: [
        { text: 'sentry接入', link: '/business/sentry' },
        { text: 'playwright教程', link: '/business/playwright' },
        { text: 'ai业务', link: '/business/ai' },
        { text: '工作流程', link: '/business/workflow' }
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
}

const sidebarData = require("./config/sidebar");
const path = require('path')
module.exports = {

  // theme: 'vdoing', // 使用依赖包主题
  port:"9013",
  title: "vue2ol-extend",
  description: 'vue2ol的扩展部分',
  base: '/gis-js/vue2ol-extend/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
  dest:"../../dist/vue2ol-extend",
  head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', {
      rel: 'icon',
      href: '/img/favicon.ico'
    }], //favicons，资源放在public文件夹
    ['meta', {
      name: 'keywords',
      content: 'vuepress,gis,vdoing'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#11a8cd'
    }], // 移动浏览器主题颜色
  ],

  // 主题配置
  themeConfig: {
    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '组件',
        link: '/components/'
      },
      {
        text: '插件',
        link: '/plugins/'
      },
      {
        text: '相关',
        items: [{
          text: 'vuepress',
          link: 'https://v2.vuepress.vuejs.org/zh/reference/config.html#%E7%AB%99%E7%82%B9%E9%85%8D%E7%BD%AE'
        }, {
          text: 'vue-docgen',
          link: 'https://vue-styleguidist.github.io/docs/docgen-cli.html#install'
        }, {
          text: 'openlayers',
          link: 'https://openlayers.org/'
        }, {
          text: 'vue2leaflet',
          link: 'https://vue2-leaflet.netlify.app/'
        }]
      }
    ],
    sidebarDepth: 3, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/favicon.ico', // 导航栏logo

    sidebar: sidebarData,

  },

  configureWebpack: {
    module: {
      rules: [{
        include: /packages/,
        test: /\.mjs$/,
        type: 'javascript/auto'
      }]
    },
    resolve: {
      alias: {
        'vue2ol': "../../../vue2ol/src/index.js",
        'vue2ol-extend': "../../src",
      },
    },
  },
  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  },
  // 插件
  plugins: [
    ['one-click-copy', { // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }],
    ['demo-container-v2'],
  ],
}
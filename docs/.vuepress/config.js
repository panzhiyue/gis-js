const sidebarData = require("./config/sidebar");
const path = require('path')
module.exports = {

  theme: 'vdoing', // 使用依赖包主题
  title: "@gis",
  description: '大数据应用中心gis相关的vue组件库',
  // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
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
    nav: [

      {
        text: '首页',
        link: '/'
      },
      {
        text: 'Vue2OL',
        items: [{
          text: '组件',
          link: '/vue2ol/components/Map.md'
        }]
      }, {
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
        }]
      }
    ],
    sidebarDepth: 3, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: 'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200409124835.png', // 导航栏logo
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

    sidebar: sidebarData,
    updateBar: { // 最近更新栏
      showToArticle: false, // 显示到文章页底部，默认true
    },

    category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
    tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
    social: { // 社交图标，显示于博主信息栏和页脚栏
      // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
      icons: [

      ]
    },
    footer: { // 页脚信息
      createYear: 2022, // 博客创建年份
      copyrightInfo: '', // 博客版权信息，支持a标签
    },
    // htmlModules,
  },

  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@common': "../../../@common/src",
    //   },
    // },
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

const autoGetSidebarOptionBySrcDir = require("./autoGetSidebarOptionBySrcDir.js")
const path = require("path");

// 侧边栏
module.exports = {
  '/guide/': [{
    title: '指南',
    collapsable: false,
    children: [
      '',
      'Quickstart'
    ]

  }],
  '/api/': autoGetSidebarOptionBySrcDir(path.resolve(__dirname, "../../api")),
}
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
  '/examples/': [{
    title: '示例',
    collapsable: false,
    children: [{
        title: "animation",
        children: [
          'animation/ArrowLine',
          'animation/DynamicLine',
          'animation/Flight',
          'animation/Radar',
          'animation/Scatter',
          'animation/Track',
        ]
      },
      {
        title: "interaction",
        children: [
          'interaction/GeomDrag',
        ]
      },
      {
        title: "plot",
        children: [
          'plot/drawplot',
        ]
      },
      'EShapeFile','EShapeFile'
    ]

  }],
}
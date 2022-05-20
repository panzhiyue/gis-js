// ！！！注：此文件没有使用到，仅用于测试和侧边栏数据格式的参考。

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
  '/components/': [{
      title: "animation",
      children: [
        '/components/animation/ArrowLine',
        '/components/animation/DynamicLine',
        '/components/animation/Flight',
        '/components/animation/Radar',
        '/components/animation/Scatter',
        '/components/animation/Track',
      ]
    }, {
      title: "control",
      children: [
        '/components/control/MouseInfo',
        '/components/control/MouseTips',
        '/components/control/Popup',
      ]
    },
    {
      title: "source",
      children: [
        '/components/source/BaiDu',
        '/components/source/Bing',
        '/components/source/GaoDe',
        '/components/source/GeoQ',
        '/components/source/TDT',
      ]
    },
    {
      title: "renderer",
      children: [
        '/components/renderer/CanvasClip',
      ]
    }, {
      title: "interaction",
      children: [
        '/components/interaction/PlotDraw',
      ]
    },
  ],
}
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
      title: "basic",
      children: [
        'Feature',
        'Map',
        'View',
        'Overlay',
      ]
    },
    {
      title: "layer",
      children: [
        'layer/Tile',
        'layer/Vector',
      ]
    },
    {
      title: "source",
      children: [
        'source/OSM',
        'source/Vector',
        'source/XYZ',
        'source/Stamen',
      ]
    },
    {
      title: "geom",
      children: [
        'geom/Point',
        'geom/Circle',
        'geom/LineString',
        'geom/Polygon',
        'geom/MultiPoint',
        'geom/MultiLineString',
        'geom/MultiPolygon',
      ]
    },
    {
      title: "interaction",
      children: [
        'interaction/Draw',
      ]
    },
  ],
  '/plugins/': [{
      title: "vue2ol-extend",
      children: [{
          title: "animation",
          children: [
            '/plugins/vue2ol-extend/animation/ArrowLine',
            '/plugins/vue2ol-extend/animation/DynamicLine',
            '/plugins/vue2ol-extend/animation/Flight',
            '/plugins/vue2ol-extend/animation/Radar',
            '/plugins/vue2ol-extend/animation/Scatter',
            '/plugins/vue2ol-extend/animation/Track',
          ]
        }, {
          title: "control",
          children: [
            '/plugins/vue2ol-extend/control/MouseInfo',
            '/plugins/vue2ol-extend/control/MouseTips',
            '/plugins/vue2ol-extend/control/Popup',
          ]
        },
        {
          title: "source",
          children: [
            '/plugins/vue2ol-extend/source/BaiDu',
            '/plugins/vue2ol-extend/source/Bing',
            '/plugins/vue2ol-extend/source/GaoDe',
            '/plugins/vue2ol-extend/source/GeoQ',
          ]
        },
        {
          title: "renderer",
          children: [
            '/plugins/vue2ol-extend/renderer/CanvasClip',
          ]
        }, {
          title: "interaction",
          children: [
            '/plugins/vue2ol-extend/interaction/PlotDraw',
          ]
        },
      ]
    }

  ],


}
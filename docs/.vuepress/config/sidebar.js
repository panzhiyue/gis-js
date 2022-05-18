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
      title: "Basic",
      children: [
        'Feature',
        'Map',
        'View',
        'Overlay',
      ]
    },
    {
      title: "Layer",
      children: [
        'layer/Tile',
        'layer/Vector',
      ]
    },
    {
      title: "Source",
      children: [
        'source/OSM',
        'source/Vector',
        'source/XYZ',
        'source/Stamen',
      ]
    },
    {
      title: "Geom",
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
  ],
  '/plugins/': [{
      title: "vue2ol-extend",
      children: [{
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
      ]
    }

  ],


}
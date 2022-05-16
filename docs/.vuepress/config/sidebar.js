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
        ['Feature', 'Feature'],
        ['Map', 'Map'],
        ['View', 'View'],
        ['Overlay', 'Overlay'],
      ]
    },
    {
      title: "Layer",
      children: [
        ['layer/Tile', 'Tile'],
        ['layer/Vector', 'Vector'],
      ]
    },
    {
      title: "Source",
      children: [
        ['source/OSM', 'OSM'],
        ['source/Vector', 'Vector'],
        ['source/XYZ', 'XYZ'],
        ['source/Stamen', 'Stamen'],
      ]
    },
    {
      title: "Geom",
      children: [
        ['geom/Point', 'Point'],
        ['geom/Circle', 'Circle'],
        ['geom/LineString', 'LineString'],
        ['geom/Polygon', 'Polygon'],
        ['geom/MultiPoint', 'MultiPoint'],
        ['geom/MultiLineString', 'MultiLineString'],
        ['geom/MultiPolygon', 'MultiPolygon'],
      ]
    },
  ],
  '/plugins/': [{
      title: "vue2ol-extend",
      children: [
        ['/plugins/vue2ol-extend/control/MouseInfo','Vue2olControlMouseinfo'],
        ['/plugins/vue2ol-extend/control/MouseTips', 'Vue2olControlMousetips'],
        ['/plugins/vue2ol-extend/control/Popup', 'Vue2olControlPopup'],
        ['/plugins/vue2ol-extend/source/BaiDu', 'Vue2olSourceBaidu'],
        ['/plugins/vue2ol-extend/source/Bing', 'Vue2olSourceBing'],
        ['/plugins/vue2ol-extend/source/GaoDe', 'Vue2olSourceGaode'],
        ['/plugins/vue2ol-extend/source/GeoQ', 'Vue2olSourceGeoq'],
      ]
    }

  ],


}
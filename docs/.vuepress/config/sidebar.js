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
      title: "Control",
      children: [
        ['control/MouseInfo', 'MouseInfo'],
        ['control/MouseTips', 'MouseTips'],
        ['control/Popup', 'Popup'],
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



}
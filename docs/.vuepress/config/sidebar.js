// ！！！注：此文件没有使用到，仅用于测试和侧边栏数据格式的参考。

// 侧边栏
module.exports = {
  '/vue2ol/components/': [
    {
    title: '组件',
    collapsable: false, //是否可折叠，可选的，默认true
    children: [{
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
          ['control/MouseTips', 'MouseTips'],
          ['control/Pickup', 'Pickup'],
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
      {
        title: "Animation",
        children: [
          ['animation/Scatter', 'Scatter'],
          ['animation/Flight', 'Flight'],
          ['animation/Track', 'Track'],
          ['animation/Radar', 'Radar'],
          ['animation/DynamicLine', 'DynamicLine'],
          ['animation/ArrowLine', 'ArrowLine'],
        ]
      }
    ]
  }, ],

}

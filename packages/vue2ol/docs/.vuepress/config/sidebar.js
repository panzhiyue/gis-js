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
      'layer/VectorImage',
      'layer/VectorTile',
    ]
  },
  {
    title: "source",
    children: [
      'source/OSM',
      'source/Vector',
      'source/XYZ',
      'source/Stamen',
      'source/VectorTile',
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
      'interaction/Modify',
      'interaction/Select',
      'interaction/DragPan',
      'interaction/DragZoom',
      'interaction/DragRotate',
      'interaction/MouseWheelZoom',
      'interaction/Extent',
      'interaction/DoubleClickZoom',
      'interaction/DragRotateAndZoom',
      'interaction/DragAndDrop',
      'interaction/KeyboardPan',
      'interaction/KeyboardZoom',
      'interaction/DragBox',
      'interaction/PinchZoom',
      'interaction/Snap',
    ]
  },
  {
    title: "control",
    children: [
      'control/Zoom',
      'control/Rotate',
      'control/ScaleLine',
      'control/FullScreen',
      'control/ZoomSlider',
      'control/Attribution',
      'control/OverviewMap',
      'control/ZoomToExtent',
      'control/MousePosition',
    ]
  },
  ],
  '/plugins/': [''],


}
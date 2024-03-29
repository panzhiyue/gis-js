// ！！！注：此文件没有使用到，仅用于测试和侧边栏数据格式的参考。

// 侧边栏
module.exports = {
  "/guide/": [
    {
      title: "指南",
      collapsable: false,
      children: ["Quickstart"],
    },
  ],
  "/components/": [
    {
      title: "animation",
      children: [
        "/components/animation/ArrowLine",
        "/components/animation/DynamicLine",
        "/components/animation/Flight",
        "/components/animation/Radar",
        "/components/animation/Scatter",
        "/components/animation/Track",
      ],
    },
    {
      title: "control",
      children: [
        "/components/control/Drag",
        "/components/control/MouseInfo",
        "/components/control/MouseTips",
        "/components/control/Popup",
        "/components/control/Resize",
        "/components/control/Placement",
        "/components/control/Panel",
        "/components/control/Palette",
      ],
    },
    {
      title: "layer",
      children: ["/components/layer/Echarts", "/components/layer/Shadow"],
    },
    {
      title: "source",
      children: [
        "/components/source/BaiDu",
        "/components/source/Bing",
        "/components/source/GaoDe",
        "/components/source/GeoQ",
        "/components/source/TDT",
        "/components/source/MapGISDocTile",
      ],
    },
    {
      title: "renderer",
      children: [
        "/components/renderer/CanvasClip",
        "/components/renderer/CanvasFilter",
        "/components/renderer/TileClip",
      ],
    },
    {
      title: "interaction",
      children: [
        "/components/interaction/PlotDraw",
        "/components/interaction/Pickup",
        "/components/interaction/Measure",
      ],
    },
    {
      title: "event",
      children: ["/components/event/Vector"],
    },
    {
      title: "typhoon",
      children: [
        "/components/typhoon/WindCircle",
        "/components/typhoon/Name",
        "/components/typhoon/Marker",
        "/components/typhoon/PicketLine24",
        "/components/typhoon/PicketLine48",
        "/components/typhoon/RealPath",
        "/components/typhoon/RealPoint",
        "/components/typhoon/ForecastPath",
        "/components/typhoon/ForecastPoint",
        "/components/typhoon/CurrentInfo",
        "/components/typhoon/LevelName",
        "/components/typhoon/ForecastPointInfo",
        "/components/typhoon/RealPointInfo",
        "/components/typhoon/Main",
      ],
    },
    {
      title: "debug",
      children: ["/components/debug/Mapinfo"],
    },
  ],
  "/examples/": [
    {
      title: "示例",
      collapsable: false,
      children: ["Cloud"],
    },
  ],
};

const autoGetSidebarOptionBySrcDir = require("./autoGetSidebarOptionBySrcDir.js");
const path = require("path");

// 侧边栏
module.exports = {
  "/guide/": [
    {
      title: "指南",
      collapsable: false,
      children: ["", "Quickstart"],
    },
  ],
  "/api/": autoGetSidebarOptionBySrcDir(path.resolve(__dirname, "../../api")),
  "/examples/": [
    {
      title: "示例",
      collapsable: false,
      children: [
        {
          title: "animation",
          children: [
            "animation/ArrowLine",
            "animation/DynamicLine",
            "animation/Flight",
            "animation/Radar",
            "animation/Scatter",
            "animation/Track",
          ],
        },
        {
          title: "control",
          children: ["control/Editor"],
        },
        {
          title: "interaction",
          children: ["interaction/GeomDrag", "interaction/Measure"],
        },
        {
          title: "plot",
          children: ["plot/drawplot"],
        },
        {
          title: "source",
          children: ["source/MapGISDocTile","source/TDT","source/BaiDu","source/Bing","source/GaoDe","source/GeoQ"],
        },
        {
          title: "debug",
          children: ["debug/loadFile"],
        },
        {
          title: "renderer",
          children: ["renderer/CanvasFilter"],
        },
        "EShapeFile",
      ],
    },
  ],
};

//设置token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

var viewer = new Cesium.Viewer("mapContainer", {
  animation: false, //如果设置为false，将不创建“动画”窗口小部件。
  homeButton: false, //如果设置为false，将不会创建HomeButton小部件。
  fullscreenButton: false, //如果设置为false，将不会创建FullscreenButton小部件。
  geocoder: false, //是否显示地名查找控件
  sceneModePicker: false, //是否显示投影方式控件
  baseLayerPicker: false, //如果设置为false，则不会创建BaseLayerPicker小部件。
  timeline: false, //是否显示时间线控件
  infoBox: false, //是否显示点击要素之后显示的信息
  navigationHelpButton: false, //如果设置为false，将不会创建导航帮助按钮。
  selectionIndicator: false, //如果设置为false，则不会创建SelectionIndicator小部件。
});

// 隐藏Cesium自身的logo
viewer._cesiumWidget._creditContainer.style.display = "none";
import DivPlane from "../src/Graphic/DivPlane";
import { GraphicLayer } from "../src/Layer";
const layer = new GraphicLayer({
  viewer: viewer,
});

const element = document.createElement("div");
element.className = "marsBlueGradientPnl";
element.innerHTML = "<div>我是Overlay</div>";
let graphic = new DivPlane({
  element: element,
  offset: [0, -70],
  positioning: "bottom-center",
  heading: -90,
  pitch: 0,
  roll: 90,
  scale: 20,
  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
});
layer.addGraphic(graphic);
graphic.setPosition(Cesium.Cartesian3.fromDegrees(116.266763, 30.9272, 905.9));

// 将三维球定位到中国
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(116.318889, 30.769641, 7432.2),
  orientation: {
    heading: Cesium.Math.toRadians(1),
    pitch: Cesium.Math.toRadians(-19.6),
    roll: Cesium.Math.toRadians(0),
  },
  complete: function callback() {
    // 定位完成之后的回调函数
  },
});

viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.266763, 30.9272, 905.9),
  point: {
    pixelSize: 10,
    color: Cesium.Color.YELLOW,
  },
});

setTimeout(() => {
  // layer.setViewer(null);
  layer.removeGraphic(graphic);
}, 2000);

setTimeout(() => {
  // layer.setViewer(viewer);
  layer.addGraphic(graphic);
}, 4000);

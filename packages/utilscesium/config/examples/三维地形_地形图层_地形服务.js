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

//加载地形
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
  url: 'http://hzgzsoft.com:5681/data/terrain/china/'
})

var initialPosition = new Cesium.Cartesian3.fromDegrees(118.927, 27.945, 5000);
console.log(initialPosition);
//var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
viewer.scene.camera.setView({
  destination: initialPosition,
  // orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY
});

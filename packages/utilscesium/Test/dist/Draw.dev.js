"use strict";

var _Viewer = _interopRequireDefault(require("utilscesium/Viewer"));

var _Point = _interopRequireDefault(require("utilscesium/Draw/Point"));

var _Polyline = _interopRequireDefault(require("utilscesium/Draw/Polyline"));

var _Polygon = _interopRequireDefault(require("utilscesium/Draw/Polygon"));

var _Rectangle = _interopRequireDefault(require("utilscesium/Draw/Rectangle"));

var _Circle = _interopRequireDefault(require("utilscesium/Draw/Circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjODdkODUxYy0wNmRjLTQxZjQtYWI4NC02NzVkNzg4ODViNDgiLCJpZCI6NDQ3NjMsImlhdCI6MTYxNDMyNjAzNH0.y_VCAXaJvJYUy8G2anXpNGInp8ozgwHuDx0ifoeFPVg";
var viewer = new _Viewer["default"]("map", {
  animation: false,
  homeButton: true,
  geocoder: false,
  baseLayerPicker: false,
  timeline: false,
  fullscreenButton: true,
  scene3DOnly: true,
  infoBox: false,
  sceneModePicker: false,
  navigationInstructionsInitiallyVisible: false,
  navigationHelpButton: false,
  selectionIndicator: false // terrainProvider: Cesium.createWorldTerrain({}),

});
viewer._cesiumWidget._creditContainer.style.display = "none"; //去除版权信息

var tdt_key = "6703c18da8b111f1ac38fdcfc4a138d8";
var img_tdt = new Cesium.WebMapTileServiceImageryProvider({
  url: "http://t0.tianditu.com/img_w/wmts?tk=" + tdt_key,
  layer: 'img',
  style: 'default',
  tileMatrixSetID: 'w',
  format: 'tiles',
  maximumLevel: 18
});
var layers = viewer.scene.imageryLayers;
var img_cia = new Cesium.WebMapTileServiceImageryProvider({
  url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=' + tdt_key,
  layer: 'cia',
  style: 'default',
  tileMatrixSetID: 'w',
  format: 'tiles',
  maximumLevel: 18
});
layers.addImageryProvider(img_tdt);
layers.addImageryProvider(img_cia);
document.getElementById("btnPolyline").onclick = drawPolyline;
document.getElementById("btnPolygon").onclick = drawPolygon;
document.getElementById("btnRectangle").onclick = drawRectangle;
document.getElementById("btnCircle").onclick = drawCircle;
var draw = null;

function drawPolyline() {
  if (draw) {
    draw.setActive(false);
  }

  console.log(222);
  draw = new _Polyline["default"]({
    enableRight: true
  });
  draw.drawStart.addEventListener(function () {});
  draw.drawEnd.addEventListener(function (event) {
    console.log(event);
    var positions = event.positions;
    viewer.entities.add({
      polyline: {
        positions: positions,
        material: Cesium.Color.RED,
        width: 5,
        clampToGround: true
      }
    });
  });
  draw.setViewer(viewer);
  draw.setActive(true);
}

function drawPolygon() {
  if (draw) {
    draw.setActive(false);
  }

  draw = new _Polygon["default"]({
    enableRight: true
  });
  draw.drawStart.addEventListener(function () {});
  draw.drawEnd.addEventListener(function (event) {
    var positions = event.positions;
    viewer.entities.add({
      polygon: {
        hierarchy: {
          positions: positions
        },
        material: Cesium.Color.GREEN.withAlpha(1)
      }
    });
  });
  draw.setViewer(viewer);
  draw.setActive(true);
}

function drawRectangle() {
  if (draw) {
    draw.setActive(false);
  }

  draw = new _Rectangle["default"]({
    enableRight: true
  });
  draw.drawStart.addEventListener(function () {});
  draw.drawEnd.addEventListener(function (event) {
    var rect = event.rect;
    viewer.entities.add({
      rectangle: {
        coordinates: rect,
        material: Cesium.Color.BLACK.withAlpha(0.4),
        outline: true,
        outlineWidth: 2,
        outlineColor: Cesium.Color.RED,
        height: 0
      }
    });
  });
  draw.setViewer(viewer);
  draw.setActive(true);
}

function drawCircle() {
  if (draw) {
    draw.setActive(false);
  }

  draw = new _Circle["default"]({
    enableRight: true
  });
  draw.drawStart.addEventListener(function () {});
  draw.drawEnd.addEventListener(function (event) {
    var position = event.position;
    var radius = event.radius;
    viewer.entities.add({
      position: position,
      ellipse: {
        semiMinorAxis: radius,
        semiMajorAxis: radius,
        material: Cesium.Color.BLACK.withAlpha(0.4),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  });
  draw.setViewer(viewer);
  draw.setActive(true);
}
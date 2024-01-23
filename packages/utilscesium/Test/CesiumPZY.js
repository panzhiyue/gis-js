// import "../static/js/Cesium/Cesium.js"
// import "../static/js/Cesium/Widgets/widgets.css"
import Viewer from "utilscesium/Viewer"

Cesium.Ion.defaultAccessToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjODdkODUxYy0wNmRjLTQxZjQtYWI4NC02NzVkNzg4ODViNDgiLCJpZCI6NDQ3NjMsImlhdCI6MTYxNDMyNjAzNH0.y_VCAXaJvJYUy8G2anXpNGInp8ozgwHuDx0ifoeFPVg";

let viewer = new Viewer("map", {
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
    selectionIndicator: false,
    terrainProvider: Cesium.createWorldTerrain({}),
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
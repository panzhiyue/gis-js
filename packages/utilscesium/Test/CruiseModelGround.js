import Viewer from "utilscesium/Viewer"
import Polyline from "utilscesium/Draw/Polyline"
import Polygon from "utilscesium/Draw/Polygon"
import CruiseModel from "utilscesium/Analysis/CruiseModelGround"
import CoorManager from "utilscesium/Manager/CoorManager"

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

viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
});
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
document.getElementById("btnStart").onclick = start;
document.getElementById("btnStop").onclick = stop;

let draw = null;
let points = [];

function drawPolyline() {
    if (draw) {
        draw.setActive(false);
    }
    draw = new Polyline({
        enableRight: true
    });
    draw.drawStart.addEventListener(function () {});
    draw.drawEnd.addEventListener(function (event) {
        let positions = event.positions;
        // viewer.entities.add({
        //     polyline: {
        //         positions: positions,
        //         material: Cesium.Color.RED,
        //         width: 5,
        //         clampToGround: true
        //     }
        // });

        let coorManager = new CoorManager({
            viewer: viewer
        });
        points = [];
        for (let i = 0; i < positions.length; i++) {
            let p = coorManager.cartographicToDegree(coorManager.cartesianToCartographic(positions[i]));
            points.push([p.longitude, p.latitude]);
        }
    });
    draw.setViewer(viewer);
    draw.setActive(true);
}
let cruiseModel;

function start() {
    if (cruiseModel) {
        cruiseModel.destroy();
    }
    cruiseModel = new CruiseModel({
        viewer: viewer,
        positionArr: points,
        isShowPath: true,
        isShowNode: false,
        isLoop: false,
        interval: 3,
        pathModel: "lead",
        callback: (result) => {
            cruiseModel.start();
        }
    });
    // let result = cruiseModel.getResult();
    // //result.entity.point.outlineColor = Cesium.Color.GREEN;
    // cruiseModel.start();
}

function stop() {
    cruiseModel.stop();
}
import Viewer from "utilscesium/Viewer"
import Point from "utilscesium/Draw/Point"
import Polyline from "utilscesium/Draw/Polyline"
import Polygon from "utilscesium/Draw/Polygon"
import Rectangle from "utilscesium/Draw/Rectangle"
import Circle from "utilscesium/Draw/Circle"

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
    // terrainProvider: Cesium.createWorldTerrain({}),
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


let draw = null;

function drawPolyline() {
    if (draw) {
        draw.setActive(false);
    }
    console.log(222);
    draw = new Polyline({
        enableRight: true
    });
    draw.drawStart.addEventListener(function () {});
    draw.drawEnd.addEventListener(function (event) {
        console.log(event);
        let positions = event.positions;
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
    draw = new Polygon({
        enableRight: true
    });
    draw.drawStart.addEventListener(function () {});
    draw.drawEnd.addEventListener(function (event) {
        let positions = event.positions;
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
    draw = new Rectangle({
        enableRight: true
    });
    draw.drawStart.addEventListener(function () {});
    draw.drawEnd.addEventListener(function (event) {
        let rect = event.rect;
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
    draw = new Circle({
        enableRight: true
    });
    draw.drawStart.addEventListener(function () {});
    draw.drawEnd.addEventListener(function (event) {
        let position = event.position;
        let radius = event.radius;

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
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc';
var viewer = new Cesium.Viewer('map', {
    animation: false,
    homeButton: false,
    fullscreenButton: false,
    geocoder: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    timeline: false,
    infoBox: false,
    navigationHelpButton: false,
    selectionIndicator: false,
    terrainProvider: null,
    imageryProvider: false,
    baseLayerPicker: false

});

//全球影像地图服务
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=6703c18da8b111f1ac38fdcfc4a138d8",
    layer: "tdtBasicLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: false
}));

//全球影像中文注记服务
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=6703c18da8b111f1ac38fdcfc4a138d8",
    layer: "tdtAnnoLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible"
}));


let m = new Cesium.GridMaterialProperty({
    color:Cesium.Color.RED,  //网格颜色
    cellAlpha:0.2,  //单元格透明度
    lineCount:new Cesium.Cartesian2(2,2),  //线数量
    lineThickness:new Cesium.Cartesian2(2,2),  //网格线后的
    lineOffset:new Cesium.Cartesian2(0,0),  //沿每个轴网格线的起始偏移。
});

let entity = viewer.entities.add({
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([120, 28, 120, 29, 121, 29, 121, 28]),
        material: m
    }
});

viewer.zoomTo(entity);
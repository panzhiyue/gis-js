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

var defaultColor = Cesium.Color.WHITE;
var defaultOutlineColor = Cesium.Color.BLACK;
var defaultOutlineWidth = 1.0;

if (Cesium.PolylineTrailLinkMaterialProperty == undefined) {
    function PolylineTrailLinkMaterialProperty(
        color,
        duration,
        repeat
    ) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._colorSubscription = undefined;
        if (color != null) {
            this.color = color;
        } else {
            this.color = undefined;
        }

        this.duration = duration;
        this._time = new Date().getTime();
        this._repeat = repeat;
    }
    Object.defineProperties(
        PolylineTrailLinkMaterialProperty.prototype, {
            isConstant: {
                get: function () {
                    return false;
                },
            },
            definitionChanged: {
                get: function () {
                    return this._definitionChanged;
                    return this._definitionChanged;
                    return this._definitionChanged;
                    return this._definitionChanged;
                    return this._definitionChanged;
                },
            },
            color: Cesium.createPropertyDescriptor("color"),
        }
    );
    PolylineTrailLinkMaterialProperty.prototype.getType = function (
        time
    ) {
        return "PolylineTrailLink";
    };
    PolylineTrailLinkMaterialProperty.prototype.getValue = function (
        time,
        result
    ) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            time,
            Cesium.Color.WHITE,
            result.color
        );
        result.time =
            ((new Date().getTime() - this._time) % this.duration) /
            this.duration;

        result.repeat = this._repeat;
        return result;
    };
    PolylineTrailLinkMaterialProperty.prototype.equals = function (
        other
    ) {
        return (
            this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty &&
                Property.equals(this._color, other._color))
        );
    };
    Cesium.PolylineTrailLinkMaterialProperty =
        PolylineTrailLinkMaterialProperty;
    Cesium.Material.PolylineTrailLinkType = "PolylineTrailLink";
    Cesium.Material.PolylineTrailLinkImage = "./resources/img/line.png"; //道路样式的png
    Cesium.Material.PolylineTrailLinkSource =

        "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                    {\n\
                                                    czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                    vec2 st =repeat * materialInput.st;\n\
                    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                    material.alpha = colorImage.a * color.a;\n\
                    material.diffuse = color.rgb;\n\
                                                    return material;\n\
                                                    }";
    Cesium.Material._materialCache.addMaterial(
        Cesium.Material.PolylineTrailLinkType, {
            fabric: {
                type: Cesium.Material.PolylineTrailLinkType,
                uniforms: {
                    color: new Cesium.Color(0.0, 0.0, 0.0, 1),
                    image: Cesium.Material.PolylineTrailLinkImage,
                    time: 0,
                    constantSpeed: 300,
                    repeat: {
                        x: 100,
                        y: 1,
                    },
                },
                source: Cesium.Material.PolylineTrailLinkSource,
            },
            translucent: function (material) {
                return true;
            },
        }
    );

}

if (!window.roadMaterialRoad) {
    window.roadMaterialRoad =
        new Cesium.PolylineTrailLinkMaterialProperty(
            Cesium.Color.RED,
            3000, {
                x: 1,
                y: 1,
            }
        );
    // window.roadMaterialRoad._repeat.x=50;
}

let entity = viewer.entities.add({
    polyline: {
        positions: new Cesium.CallbackProperty(() => {
                let length = getlength([
                    [120, 28],
                    [120, 29],
                    [121, 29]
                ]);
                if (length > 0) {
                    window.roadMaterialRoad._repeat.x = length / 450;
                }
                return Cesium.Cartesian3.fromDegreesArray([120, 28, 120, 29, 121, 29]);
            },
            false),
        material: window.roadMaterialRoad,
        width: 10

    }
    // corridor: {
    //     positions: Cesium.Cartesian3.fromDegreesArray([122, 28, 122, 29, 123, 29]),
    //     material: window.roadMaterialRoad,
    //     width: 10000
    // }
});
// entity.polyline.material._repeat.x = new Cesium.CallbackProperty(() => {
//     // let length = getlength([
//     //     [122, 28],
//     //     [122, 29],
//     //     [123, 29]
//     // ]);
//     //window.roadMaterialRoad._repeat.x = length / 500.0;
//     return new Cesium.PolylineTrailLinkMaterialProperty(
//         Cesium.Color.GREEN,
//         3000, {
//             x: 1,
//             y: 1,
//         }
//     );
// }, false);
// setInterval(()=>{

//     let length=getlength([[122, 28], [122, 29], [123, 29]]);
//     console.log(length/500.0);
//     window.roadMaterialRoad._repeat.x=length/500.0;

// },2000);



viewer.zoomTo(entity);


function getlength(coors) {
    var coors2 = [];
    for (let i = 0; i < coors.length; i++) {
        coors2.push(viewer.scene.cartesianToCanvasCoordinates(Cesium.Cartesian3
            .fromDegrees(coors[i][0], coors[i][1])));
    }
    let length = 0;
    for (let i = 1; i < coors2.length; i++) {
        if (!coors2[i] || !coors2[i - 1]) {
            return 0;
        }
        let len = Math.sqrt((coors2[i].x - coors2[i - 1].x) ** 2 + (coors2[i].y - coors2[i - 1].y) **
            2);
        length += len;
    }

    return length;
}
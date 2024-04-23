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

function PolylineArrow2MaterialProperty(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);

    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this._outlineColor = undefined;
    this._outlineColorSubscription = undefined;
    this._outlineWidth = undefined;
    this._outlineWidthSubscription = undefined;

    this.color = options.color;
    this.outlineColor = options.outlineColor;
    this.outlineWidth = options.outlineWidth;
}

Object.defineProperties(PolylineArrow2MaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return (
                Cesium.Property.isConstant(this._color) &&
                Cesium.Property.isConstant(this._outlineColor) &&
                Cesium.Property.isConstant(this._outlineWidth)
            );
        },
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        },
    },
    color: Cesium.createPropertyDescriptor("color"),
    outlineColor: Cesium.createPropertyDescriptor("outlineColor"),
    outlineWidth: Cesium.createPropertyDescriptor("outlineWidth"),
});

PolylineArrow2MaterialProperty.prototype.getType = function (time) {
    return "PolylineArrow2";
};

PolylineArrow2MaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
        this._color,
        time,
        defaultColor,
        result.color
    );
    result.outlineColor = Cesium.Property.getValueOrClonedDefault(
        this._outlineColor,
        time,
        defaultOutlineColor,
        result.outlineColor
    );
    result.outlineWidth = Cesium.Property.getValueOrDefault(
        this._outlineWidth,
        time,
        defaultOutlineWidth
    );
    console.log(result);
    return result;
};

PolylineArrow2MaterialProperty.prototype.equals = function (other) {
    return (
        this === other || //
        (other instanceof PolylineArrow2MaterialProperty && //
            Cesium.Property.equals(this._color, other._color) && //
            Cesium.Property.equals(this._outlineColor, other._outlineColor) && //
            Cesium.Property.equals(this._outlineWidth, other._outlineWidth))
    );
};

Cesium.Material.PolylineArrow2Type = "PolylineArrow2";
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineArrow2Type, {
    fabric: {
        type: Cesium.Material.PolylineArrow2Type,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
            outlineColor: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            outlineWidth: 1.0,
        },
        source: "#ifdef GL_OES_standard_derivatives\n\
#extension GL_OES_standard_derivatives : enable\n\
#endif\n\
\n\
uniform vec4 color;\n\
uniform vec4 outlineColor;\n\
uniform float outlineWidth;\n\
varying float v_width;\n\
czm_material line(czm_materialInput materialInput)\n\
{\n\
czm_material material = czm_getDefaultMaterial(materialInput);\n\
\n\
vec2 st = materialInput.st;\n\
float halfInteriorWidth =  0.5 * (v_width - outlineWidth) / v_width;\n\
float b = step(0.5 - halfInteriorWidth, st.t);\n\
b *= 1.0 - step(0.5 + halfInteriorWidth, st.t);\n\
\n\
// Find the distance from the closest separator (region between two colors)\n\
float d1 = abs(st.t - (0.5 - halfInteriorWidth));\n\
float d2 = abs(st.t - (0.5 + halfInteriorWidth));\n\
float dist = min(d1, d2);\n\
\n\
vec4 currentColor = mix(outlineColor, color, b);\n\
vec4 outColor = czm_antialias(outlineColor, color, currentColor, dist);\n\
outColor = czm_gammaCorrect(outColor);\n\
\n\
material.diffuse = outColor.rgb;\n\
material.alpha = outColor.a;\n\
\n\
return material;\n\
}\n\
\n\
float getPointOnLine(vec2 p0, vec2 p1, float x)\n\
{\n\
float slope = (p0.y - p1.y) / (p0.x - p1.x);\n\
return slope * (x - p0.x) + p0.y;\n\
}\n\
\n\
czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
czm_material material = line(materialInput);\n\
\n\
vec2 st = materialInput.st;\n\
\n\
#ifdef GL_OES_standard_derivatives\n\
float base = 1.0 - abs(fwidth(st.s)) * 10.0 * czm_pixelRatio;\n\
#else\n\
float base = 0.975; // 2.5% of the line will be the arrow head\n\
#endif\n\
\n\
vec2 center = vec2(1.0, 0.5);\n\
float ptOnUpperLine = getPointOnLine(vec2(base, 1.0), center, st.s);\n\
float ptOnLowerLine = getPointOnLine(vec2(base, 0.0), center, st.s);\n\
\n\
float halfWidth = 0.15;\n\
float s = step(0.5 - halfWidth, st.t);\n\
s *= 1.0 - step(0.5 + halfWidth, st.t);\n\
s *= 1.0 - step(base, st.s);\n\
\n\
float t = step(base, materialInput.st.s);\n\
t *= 1.0 - step(ptOnUpperLine, st.t);\n\
t *= step(ptOnLowerLine, st.t);\n\
\n\
// Find the distance from the closest separator (region between two colors)\n\
float dist;\n\
if (st.s < base)\n\
{\n\
float d1 = abs(st.t - (0.5 - halfWidth));\n\
float d2 = abs(st.t - (0.5 + halfWidth));\n\
dist = min(d1, d2);\n\
}\n\
else\n\
{\n\
float d1 = czm_infinity;\n\
if (st.t < 0.5 - halfWidth && st.t > 0.5 + halfWidth)\n\
{\n\
d1 = abs(st.s - base);\n\
}\n\
float d2 = abs(st.t - ptOnUpperLine);\n\
float d3 = abs(st.t - ptOnLowerLine);\n\
dist = min(min(d1, d2), d3);\n\
}\n\
\n\
vec4 outsideColor = vec4(0.0);\n\
vec4 currentColor = mix(outsideColor, color, clamp(s + t, 0.0, 1.0));\n\
vec4 outColor = czm_antialias(outsideColor, color, currentColor, dist);\n\
\n\
outColor = czm_gammaCorrect(outColor);\n\
material.diffuse = (material.diffuse+outColor.rgb)/2.0;\n\
return material;\n\
}\n\
",
    },
    translucent: true,
});


let m = new PolylineArrow2MaterialProperty({
    color: Cesium.Color.RED, //线段颜色
    outlineColor: Cesium.Color.GREEN, //边框颜色
    outlineWidth: 5 //边框厚度
});

let entity = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([122, 28, 122, 29, 123, 29]),
        material: m,
        width: 10
    }
});

viewer.zoomTo(entity);


console.log(1991);
var canvas = new utilscesium.Canvas("main");
var point = new utilscesium.geom.Point();
point.setCoordinates([30, 30]);


var feature = new utilscesium.Feature(point);
var style = new utilscesium.style.Style({
    stroke: new utilscesium.style.Stroke({
        width: 2,
        color: "#ff0000"
    }),
    fill: new utilscesium.style.Fill({
        color: "rgba(55,0,0,0.5)"
    })
    ,
    image: new utilscesium.style.Circle({
        radius: 7,
        stroke: new utilscesium.style.Stroke({
            width: 5,
            color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new utilscesium.style.Fill({
            color: 'rgba(0, 255, 255, 1)'
        })
    })
});


feature.setStyle(style);
var layer = new utilscesium.Layer();
layer.on("addFeature", function () {

});
layer.addFeature(feature);
canvas.addLayer(layer);
canvas.render();

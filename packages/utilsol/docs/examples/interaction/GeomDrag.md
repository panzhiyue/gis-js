# GeomDrag

## 基础用法
::: demo
``` vue
<template>
  <div id="container1" style="width: 100%; height: 500px; position: relative">
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <button @click="start">开始</button>
      <button @click="stop">停止</button>
      <button @click="end">结束</button>
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol"
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature"
import LineString from "ol/geom/LineString"

export default {
  data() {
    return {
      map: null,
      animation: null,
    };
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    var line = [
      [4164462.1505763642, 985738.7965919945],
      [4164462.1505763642, 2085738.7965919945],
    ];
    this.map = new Map({
      target: 'container1',
      layers: [
        new Tile({
          source: new Stamen({
            layer: "watercolor",
          }),
        }),
      ],
      view: new View({
        center: center,
        zoom: 4,
      }),
    });

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);

    let feature = new Feature({
      geometry: new LineString(line),
    });
    layer.getSource().addFeature(feature);

    this.map.getInteractions().push(new utilsol.interaction.GeomDrag());
  },
  methods: {},
};
</script>
<style>
</style>
```
:::
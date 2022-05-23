# DynamicLine

## 基础用法

::: demo 
``` vue
<template>
  <div id="container1" style="width: 100%; height: 500px; position: relative">
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <button @click="start">开始</button>
      <button @click="end">结束</button>
    </div>
  </div>
</template>
<script>
import * as utilsol from "@gis-js/utilsol"
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Tile from "ol/layer/Tile";

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
      target: "container1",
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

    this.animation = new utilsol.animation.DynamicLine({
      coordinates: line, 
      source: layer.getSource(),
    });
    this.animation.start();
  },
  methods: {
    start() {
      this.animation.start();
    },
    end() {
      this.animation.end();
    },
  },
};
</script>
<style>
</style>    
```
:::

## 修改样式（水流线）

::: demo 
``` vue
<template>
  <div id="container2" style="width: 100%; height: 500px; position: relative">
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <button @click="start">开始</button>
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
      target: "container2",
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

    this.animation = new utilsol.animation.DynamicLine({
      coordinates: line,
      outlineColor:"rgba(30,144,255, 0.7)",
      outlineWidth:5,
      innerlineWidith:5,
      innerlineDash: [20, 27],
      source: layer.getSource(),
    });
    this.animation.start();
  },
  methods: {
    start() {
      this.animation.start();
    },
    end() {
      this.animation.end();
    },
  },
};
</script>
<style>
</style>
```
:::
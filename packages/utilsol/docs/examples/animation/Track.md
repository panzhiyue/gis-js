# Track

## 基础用法

::: demo
``` vue
<template>
  <div id="container1">
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <button @click="start">开始</button>
      <button @click="stop">停止</button>
      <button @click="end">结束</button>
    </div>
  </div>
</template>
<script>
import Map from "ol/Map";
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol"
export default {
  data() {
    return {
      map: null,
      animation: null,
    };
  },
  mounted() {
    var center = [37.41, 8.82];

    var line = [
      [37.41, 8.82],
      [37.41, 12.82],
      [46.41, 12.82],
      [42.41, 11.82],
      [41.41, 18.82],
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
        projection: "EPSG:4326",
      }),
    });

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);
    this.animation = new utilsol.animation.Track({
      coordinates: line,
      source: layer.getSource(),
    });
    this.animation.start();
  },
  methods: {
    start() {
      this.animation.start();
    },
    stop() {
      this.animation.stop();
    },
    end() {
      this.animation.end();
    },
  },
};
</script>
<style>
#container1 {
  width: 100%;
  height: 500px;
  position: relative;
}
</style>
```
:::

## 修改样式

::: demo
``` vue
<template>
  <div id="container2">
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <button @click="start">开始</button>
      <button @click="stop">停止</button>
      <button @click="end">结束</button>
    </div>
  </div>
</template>
<script>
import Map from "ol/Map";
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol"
import { Style, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      map: null,
      animation: null,
    };
  },
  mounted() {
    var center = [37.41, 8.82];

    var line = [
      [37.41, 8.82],
      [37.41, 12.82],
      [46.41, 12.82],
      [42.41, 11.82],
      [41.41, 18.82],
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
        projection: "EPSG:4326",
      }),
    });

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);
    this.animation = new utilsol.animation.Track({
      coordinates: line,
      source: layer.getSource(),
      lineStyle: {
        stroke: {
          color: "#666",
        },
      },
      lineAnimationStyle: {
        stroke: {
          color: "#f00",
        },
      },
      pointAnimationStyle(options) {
        let style = new Style({
          image: new Circle({
            radius: options.fraction * 10,
            fill: new Fill({ color: "#ffff00" }),
          }),
        });
        return style;
      },
    });
    this.animation.start();
  },
  methods: {
    start() {
      this.animation.start();
    },
    stop() {
      this.animation.stop();
    },
    end() {
      this.animation.end();
    },
  },
};
</script>
<style>
#container2 {
  width: 100%;
  height: 500px;
  position: relative;
}
</style>
```
:::
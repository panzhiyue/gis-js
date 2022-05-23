# Radar

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
import { transform } from "ol/proj";
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

    this.animation = new utilsol.animation.Radar({
      center: center,
      radius: 5,
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

## 修改样式
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
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import * as utilsol from "@gis-js/utilsol"
import icon from "./radar.png"

export default {
  data() {
    return {
      map: null,
      animation: null,
    };
  },
  mounted() {
    var center = [37.41, 8.82];

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

    this.animation = new utilsol.animation.Radar({
      center: center,
      radius: 5,
      source: layer.getSource(),
      arcAngle: 0.5,
      arcStyle: {
        fill: {
          color: "rgba(255,0,0,0.002)",
        },
      },
      centerStyle: () => {
        let style = new Style({
          zIndex: -1,
          image: new Icon({
            src: icon,
            rotateWithView: false,
            rotation: 0,
            scale: 0.1,
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
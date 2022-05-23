# Scatter

## 基础用法

::: demo
``` vue
<template>
  <div id="container1">
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
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

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

    this.animation = new utilsol.animation.Scatter({
      coordinate: [4164462.1505763642, 985738.7965919945],
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
import * as utilsol from "@gis-js/utilsol"

export default {
  data() {
    return {
      map: null,
      animation: null,
    };
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

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

    this.animation = new utilsol.animation.Scatter({
      coordinate: [4164462.1505763642, 985738.7965919945],
      source: layer.getSource(),
      centerStyle: {
        circle: {
          radius: 10,
          fill: "#00ff00",
        },
      },
      rippleStyle: {
        circle: {
          fill: "#00ff00",
        },
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

## 设置文本

::: demo
``` vue
<template>
  <div id="container3" style="width: 100%; height: 500px; position: relative">
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
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    this.map = new Map({
      target: "container3",
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

    this.animation = new utilsol.animation.Scatter({
      coordinate: [4164462.1505763642, 985738.7965919945],
      source: layer.getSource(),
      centerStyle: {
        circle: {
          radius: 10,
          fill: "#00ff00",
        },
        text: {
          text: "A",
        },
      },
      rippleStyle: {
        circle: {
          fill: "#00ff00",
        },
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
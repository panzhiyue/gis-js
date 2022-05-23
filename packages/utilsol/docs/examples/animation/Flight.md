# Flight

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
import Tile from "ol/layer/Tile"

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

    this.animation = new utilsol.animation.Flight({
      from: [4164462.1505763642, 985738.7965919945],
      to: [4164462.1505763642, 2085738.7965919945],
      radius: 1000000,
      angle: -120,
      space: 10000,
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

    this.animation = new utilsol.animation.Flight({
      from: [4164462.1505763642, 985738.7965919945],
      to: [4164462.1505763642, 2085738.7965919945],
      radius: 1000000,
      angle: -120,
      space: 10000,
      source: layer.getSource(),
      endArrow: {
        color: "#666",
      },
      lineStyle: {
        stroke: {
          color: "#666",
          lineDash: [5],
          width: 3,
        },
      },
      animationArrow: {
        color: "red",
      },
      lineAnimationStyle: {
        stroke: {
          color: "red",
          width: 3,
        },
      },
      pointAnimationStyle: false,
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
</style>
```
:::

## 点运动
::: demo 
``` vue
<template>
  <div id="container3" style="width: 100%; height: 500px; position: relative">
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

    this.animation = new utilsol.animation.Flight({
      from: [4164462.1505763642, 985738.7965919945],
      to: [4164462.1505763642, 2085738.7965919945],
      radius: 1000000,
      angle: -120,
      space: 10000,
      source: layer.getSource(),
      endArrow: {
        color: "#666",
      },
      lineStyle: {
        stroke: {
          color: "#666",
          lineDash: [5],
          width: 3,
        },
      },
      animationArrow: false,
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
</style>
```
:::


## 自定义
::: demo 
``` vue
<template>
  <div id="container4" style="width: 100%; height: 500px; position: relative">
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
import icon from "./plane.svg"

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
      target:"container4",
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

    this.animation = new utilsol.animation.Flight({
      from: [4164462.1505763642, 985738.7965919945],
      to: [4164462.1505763642, 2085738.7965919945],
      radius: 1000000,
      angle: -120,
      space: 10000,
      source: layer.getSource(),
      endArrow: {
        color: "#666",
      },
      animationArrow: false,
      pointAnimationStyle: function (options) {
        let coordinates = options.target
          .getFeature()
          .getGeometry()
          .getCoordinates();
        let fraction = options.fraction;
        let end = coordinates[fraction];
        let start = coordinates[fraction - 1] || end;

        // 防止相邻的2个点相同，出现抖动
        if (utilsol.utils.equal(start, end)) {
          start = coordinates[fraction - 2] || end;
        }
        return utilsol.style.arrow.createArrow(start, end, {
          src: icon,
          color: "#409eff",
          scale: 1.5,
        });
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
</style>
```
:::
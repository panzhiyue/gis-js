# utilsol/source/TDT

## 基础用法

::: demo

```vue
<template>
  <div id="container"></div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import * as style from "ol/style";
import * as utilsol from "@gis-js/utilsol";

export default {
  data() {
    return {
      map: null,
      plotDraw: null,
      plotEdit: null,
      drawLayer: null,
    };
  },
  mounted() {
    let center = [37.41, 8.82];
    this.map = new Map({
      target: "container",
      view: new View({
        center: center,
        zoom: 1,
        projection: "EPSG:4326",
      }),
    });

    let layer = new Tile({
      source: new utilsol.source.TDT({
        layer: "vec",
        tk: "6703c18da8b111f1ac38fdcfc4a138d8",
      }),
    });
    this.map.addLayer(layer);
  },
  methods: {},
};
</script>
<style>
#container {
  width: 100%;
  height: 500px;
  position: relative;
}
</style>
```

:::

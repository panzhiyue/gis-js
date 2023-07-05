# utilsol/source/GaoDe（高德）

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
    };
  },
  mounted() {
    let center = [120, 28];
    this.map = new Map({
      target: "container",
      view: new View({
        center: center,
        zoom: 3,
        projection: "EPSG:4326",
      }),
    });

    let layer = new Tile({
      source: new utilsol.source.GaoDe({
        layer:"normal_map"
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

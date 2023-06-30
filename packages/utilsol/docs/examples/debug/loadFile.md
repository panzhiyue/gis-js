# LoadFile

## GeoJson

::: demo

```vue
<template>
  <div id="container1" style="width: 100%; height: 500px; position: relative">
    <button @click="handleClick">加载</button>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol";
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
export default {
  data() {
    return {
      map: null,
      layer: null,
    };
  },
  mounted() {
    var center = [37.41, 8.82]

    this.map = new Map({
      target: "container1",
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: 4,
        projection: "EPSG:4326",
      }),
    });

    this.layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(this.layer);
    utilsol.debug.init(window, this.map, this.layer);
  },
  methods: {
    handleClick() {
      window.loadFile("topojson");
    },
  },
};
</script>
<style></style>
```

:::

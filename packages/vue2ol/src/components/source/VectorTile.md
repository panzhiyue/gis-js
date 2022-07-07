

## 基础用法

::: demo
```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vectortile :zIndex="10">
      <vue2ol-source-vectortile :options="sourceOptions"> </vue2ol-source-vectortile>
    </vue2ol-layer-vectortile>
  </vue2ol-map>
</template>

<script>
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [121, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      sourceOptions: {
        url: "../../data/geojson/point.json",
        format: new GeoJSON(),
        projection: "EPSG:4326",
      },
    };
  },
  mounted() {},
};
</script>
```
:::

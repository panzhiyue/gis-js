## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt :options="{ devicePixelRatio: devicePixelRatio }">
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector key="vector1" :z-index="3" :style-obj="style">
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-shadow :z-index="1">
      <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
    </vue2ol-layer-shadow>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
import * as style from "ol/style";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      polygon: null,
      devicePixelRatio: global.devicePixelRatio,
      coordinates: [],
      style: null,
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28],
      ],
    ]);

    let coordinates = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        coordinates.push([117.5 + i * 0.1, 26.5 + j * 0.1]);
      }
    }
    this.coordinates = coordinates;

    this.style = new style.Style({
      fill: new style.Fill({
        color: "#D4F0FF",
      }),
    });
  },
};
</script>
```

:::

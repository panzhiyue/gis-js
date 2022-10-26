## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-mapboxvector :zIndex="10" :options="options">
    </vue2ol-layer-mapboxvector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [0, 0], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      options: {
        styleUrl: "mapbox://styles/mapbox/bright-v9",
        accessToken:
          "sk.eyJ1IjoicGFuemhpeXVlIiwiYSI6ImNsOXA4b2gyYTAyMGQ0MHFtYTNsZmZ6emEifQ.PSU_edcZjq8tUsJJULc64w",
      },
    };
  },
  mounted() {},
};
</script>
```

:::

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-graticule :options="options"> </vue2ol-layer-graticule>
  </vue2ol-map>
</template>

<script>
import { Stroke } from "ol/style";
import KML from "ol/format/KML";
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      options: {
        strokeStyle: new Stroke({
          color: "rgba(255,120,0,0.9)",
          width: 2,
          lineDash: [0.5, 4],
        }),
        showLabels: true,
        wrapX: false,
      },
    };
  },
};
</script>
```

:::

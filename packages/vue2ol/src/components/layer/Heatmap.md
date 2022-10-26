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
    <vue2ol-layer-heatmap :options="heatmapOptions">
      <vue2ol-source-vector :options="sourceOptions"> </vue2ol-source-vector>
    </vue2ol-layer-heatmap>
  </vue2ol-map>
</template>

<script>
import KML from "ol/format/KML";
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      heatmapOptions: {},
      sourceOptions: {
        url: "/gis-js/vue2ol/data/kml/2012_Earthquakes_Mag5.kml",
        format: new KML({
          extractStyles: false,
        }),
      },
    };
  },
};
</script>
```

:::

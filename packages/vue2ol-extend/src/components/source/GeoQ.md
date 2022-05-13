## 基础用法

::: demo
```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-geoq
        layer="theme_hydro"
        @ready="onReady"
      ></vue2ol-source-geoq>
    </vue2ol-layer-tile>
    <!-- <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-geoq layer="satellite_annotion"></vue2ol-source-geoq>
    </vue2ol-layer-tile> -->
    <vue2ol-control-mouseinfo></vue2ol-control-mouseinfo>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 5, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
    };
  },
  methods: {
    onReady(mapObject) {
      
    },
  },
};
</script>
```
:::

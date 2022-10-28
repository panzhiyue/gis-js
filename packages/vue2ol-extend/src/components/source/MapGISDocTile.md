## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-mapgisdoctile
        :options="options"
      ></vue2ol-source-mapgisdoctile>
    </vue2ol-layer-tile>
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
      options: {
        url: "http://develop.smaryun.com:6163/igs/rest/mrms/docs/Hubei4326",
        projection: "EPSG:4326",
      },
    };
  },
  methods: {},
};
</script>
```

:::

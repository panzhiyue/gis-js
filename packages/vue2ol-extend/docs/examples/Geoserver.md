# Geoserver

## WMS瓦片

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>

    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="img"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="cia"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tilewms :url="url" :params="params" serverType='geoserver'></vue2ol-source-tilewms>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
    };
  },
  mounted() {
  },
};
</script>
```

:::

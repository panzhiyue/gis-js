## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm> </vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tilewms :options="options"> </vue2ol-source-tilewms>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      options: {
        url: "https://ahocevar.com/geoserver/wms",
        params: {
          LAYERS: "topp:states",
          tiled:true
        },
        serverType: "geoserver",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
```

:::

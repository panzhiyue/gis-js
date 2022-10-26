## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-cartodb :options="options"></vue2ol-source-cartodb>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [0, 0], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      options: {
        account: "documentation",
        config: {
          layers: [
            {
              type: "cartodb",
              options: {
                cartocss_version: "2.1.1",
                cartocss: "#layer { polygon-fill: #F00; }",
                sql: "select * from european_countries_e where area > 0",
              },
            },
          ],
        },
      },
    };
  },
};
</script>
```

:::

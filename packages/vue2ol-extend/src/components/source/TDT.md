## 基础用法

::: demo
```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1" >
      <vue2ol-source-tdt :layer="'img'" tk='cc4ded9c8fa65c654611568acc889439' @ready="onReady"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile :zIndex="2" >
      <vue2ol-source-tdt :layer="'cva'" tk='cc4ded9c8fa65c654611568acc889439'></vue2ol-source-tdt>
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
    };
  },
  methods:{
      onReady(mapObject){
      
      }
  }
};
</script>
```
:::

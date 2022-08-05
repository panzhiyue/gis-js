## 基础用法

::: demo
```vue
<template>
  <vue2ol-map style="height: 400px" @click="onMapClick" @ready="onMapReady">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :name="'osm'">
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-control-popup :position="position" direction="bottom">
      <div>I'm a bullet box</div>
    </vue2ol-control-popup>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      position: null,
    };
  },
  methods: {
    onMapClick(event) {
      let pixel = this.map.getEventPixel(event.originalEvent);
      this.position = this.map.getCoordinateFromPixel(pixel);
    },
    onMapReady(map) {
      this.map = map;
    },
  },
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```
:::

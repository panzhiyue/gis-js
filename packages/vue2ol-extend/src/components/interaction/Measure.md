## 基础用法

::: demo

```vue
<template>
  <select v-model="active" style="width:200px;">
    <option value="1">激活</option>
    <option value="0">取消</option>
  </select>
  <select v-model="type">
    <option value="LineString">LineString</option>
    <option value="Polygon">Polygon</option>
  </select>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="img"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="cva"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-interaction-measure  :type="type" :active="active=='1'"></vue2ol-interaction-measure>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      type: "LineString",
      active:"0",
    };
  },
  watch: {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```

:::

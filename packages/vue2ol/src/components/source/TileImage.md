## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tileimage
        :options="options"
        :tileUrlFunction="handleTileUrlFunction"
      >
      </vue2ol-source-tileimage>
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
        projection: "EPSG:3857",
      },
    };
  },
  mounted() {},
  methods: {
    handleTileUrlFunction(coor) {
      return `https://b.tile.openstreetmap.org/${coor[0]}/${coor[1]}/${coor[2]}.png`;
    },
  },
};
</script>
```

:::

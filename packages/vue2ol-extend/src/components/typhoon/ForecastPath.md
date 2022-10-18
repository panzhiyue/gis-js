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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-typhoon-forecastpath :data="realPathData"></vue2ol-typhoon-forecastpath>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [124.7, 26.6], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      typhoonData: null,
    };
  },
  computed: {
    realPathData() {
      if (this.typhoonData) {
        return this.typhoonData[8][40][11].BABJ.map((item) => {
          return {
            lng: item[2],
            lat: item[3],
            speed: item[5],
          };
        });
      } else {
        return [];
      }
    },
  },
  async mounted() {
    const response = await fetch("../../data/typhoon.json");
    const body = await response.json();
    this.typhoonData = body.typhoon;
  },
};
</script>
```

:::

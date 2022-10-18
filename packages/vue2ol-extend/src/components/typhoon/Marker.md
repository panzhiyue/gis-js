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
        <vue2ol-typhoon-marker
          :position="position"
          :duration="duration"
          :clockwise="false"
        ></vue2ol-typhoon-marker>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
const typhoonData = {
  dateTime: "2021-09-07T00:00:00.000+00:00",
  lon: 136.7,
  lat: 15.6,
  pres: 1000.0,
  moveSpeed: 10.0,
  dir: "西北西",
  speed: 18.0,
  wndRadius: [
    {
      speed: "30KTS",
      ne: 200,
      es: 180,
      ws: 180,
      wn: 200,
    },
  ],
  level: "TS",
  downDate: "2021-09-18T01:20:00.000+00:00",
};
export default {
  data() {
    return {
      zoom: 7, //级别
      center: [136.7, 15.6], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      duration: 4000,
    };
  },
  computed: {
    position() {
      return [typhoonData.lon, typhoonData.lat];
    },
  },
  mounted() {},
};
</script>
```

:::

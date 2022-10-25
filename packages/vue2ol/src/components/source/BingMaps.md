## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-bingmaps :options="sourceOptions"></vue2ol-source-bingmaps>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
const styles = [
  "RoadOnDemand",
  "Aerial",
  "AerialWithLabelsOnDemand",
  "CanvasDark",
  "OrdnanceSurvey",
];
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [0, 0], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      sourceOptions: {
        key: "Ai94YLVPSgicKdjaNIwPIWsgovxCnwboHKdj7mklUQIl9cN4Ndq-Gcb7AQJZyDuA",
        imagerySet: styles[1],
      },
    };
  },
};
</script>
```

:::

# 气象云图

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
    <vue2ol-layer-image v-if="cloudData">
      <vue2ol-source-imagestatic
        :options="cloudOptions"

      ></vue2ol-source-imagestatic>
    </vue2ol-layer-image>
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
      cloudOptions:{},
      cloudData: null,
    };
  },
  mounted() {
    fetch("https://typhoon.slt.zj.gov.cn/Api/LeastCloud").then((result) => {
      result.json().then((obj) => {
        this.cloudOptions.imageExtent = [
          obj.minLng,
          obj.minLat,
          obj.maxLng,
          obj.maxLat,
        ];
        this.cloudOptions.url = obj.cloud1h;
        this.cloudData = obj;
      });
    });
  },
};
</script>
```

:::

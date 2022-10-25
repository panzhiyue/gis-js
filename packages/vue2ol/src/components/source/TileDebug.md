## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tiledebug
        :options="sourceOptions"
      ></vue2ol-source-tiledebug>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
import XYZSource from "ol/source/XYZ";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      sourceOptions: {
        projection: "EPSG:4326", //坐标系
        // tileGrid: xyzSource.getTileGrid(), //获取瓦片图层数据对象（osmSource）的网格信息
      },
    };
  },
};
</script>
```

:::

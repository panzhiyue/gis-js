---

title: Vue2olRendererCanvasfilter

---

# Vue2olRendererCanvasfilter

> Canvas 滤镜

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt> </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-renderer-canvasfilter> </vue2ol-renderer-canvasfilter>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      polygon: null
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28]
      ]
    ]);
  }
};
</script>
```

:::

## Props

| 名称       | 描述     | 类型   | 取值范围 | 默认值 |
| ---------- | -------- | ------ | -------- | ------ |
| parentMap  | 父亲地图 | null   | -        |        |
| grayscale  |          | string | -        | 0      |
| sepia      |          | string | -        | 0      |
| saturate   |          | string | -        | 0      |
| hueRotate  |          | string | -        | 0      |
| invert     |          | string | -        | 0      |
| opacity    |          | string | -        | 0      |
| brightness |          | string | -        | 0      |
| contrast   |          | string | -        | 0      |
| blur       |          | string | -        | 0      |
| dropShadow |          | string | -        | 0      |
| options    |          | object | -        |        |

---

title: Vue2olRendererCanvasclip

---

# Vue2olRendererCanvasclip

> Canvas 裁切(可能多个图层共用一个渲染器，不要重复加载)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm> </vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-renderer-canvasclip :geometry="polygon">
    </vue2ol-renderer-canvasclip>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [123.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      polygon: null
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [122, 28],
        [124, 28],
        [124, 27],
        [123, 27],
        [122, 28]
      ]
    ]);
  }
};
</script>
```

:::

## Props

| 名称      | 描述                               | 类型 | 取值范围 | 默认值 |
| --------- | ---------------------------------- | ---- | -------- | ------ |
| parentMap | 父亲地图                           | null | -        |        |
| geometry  | 裁切面几何<br/>`@params` undefined |      | -        |        |

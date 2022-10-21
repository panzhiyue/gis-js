---

title: Vue2olRendererTileclip

---

# Vue2olRendererTileclip

> Tile 图层裁切(根据传入的面几何裁切地图)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt
        :layer="'vec'"
        :options="{ devicePixelRatio: devicePixelRatio }"
      >
        <vue2ol-renderer-tileclip
          :geometry="polygon"
          mode="clip"
        ></vue2ol-renderer-tileclip>
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import { Vue2olRendererTileclip } from "@gis-js/vue2ol-extend";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
        zoomFactor: 2
      },
      polygon: null,

      devicePixelRatio: global.devicePixelRatio
    };
  },
  mounted() {
    console.log(22);
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28]
      ]
    ]);
    console.log(9999);
  }
};
</script>
```

:::

## Props

| 名称         | 描述                                       | 类型   | 取值范围 | 默认值 |
| ------------ | ------------------------------------------ | ------ | -------- | ------ |
| parentSource | 父亲数据源                                 | null   | -        |        |
| geometry     | 裁切面几何<br/>`@typeNaem` ol/geom/Polygon |        | -        |        |
| mode         | 裁切模式（show 显示区域内，裁切区域内）    | string | -        | "show" |

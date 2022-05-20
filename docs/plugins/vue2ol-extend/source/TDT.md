---

title: Vue2olSourceTdt

---

# Vue2olSourceTdt

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-tdt
        :layer="'img'"
        tk="cc4ded9c8fa65c654611568acc889439"
        @ready="onReady"
      ></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-tdt
        :layer="'cva'"
        tk="cc4ded9c8fa65c654611568acc889439"
      ></vue2ol-source-tdt>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 5, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      }
    };
  },
  methods: {
    onReady(mapObject) {}
  }
};
</script>
```

:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型                                                    | 取值范围                                                                        | 默认值                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- |
| properties       | 属性                                                                                                                                                  | object                                                  | -                                                                               |                                          |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -                                                                               |                                          |
| parentLayer      | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -                                                                               |                                          |
| attributes       | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -                                                                               |                                          |
| projection       | 坐标系                                                                                                                                                | {import('ol/proj').ProjectionLike}                      | -                                                                               | "EPSG:4326"                              |
| tileLoadFunction |                                                                                                                                                       | {import('ol/Tile').LoadFunction\|undefined}             | -                                                                               |                                          |
| tileUrlFunction  |                                                                                                                                                       | {import('ol/Tile').UrlFunction\|undefined}              | -                                                                               |                                          |
| url              |                                                                                                                                                       | string                                                  | -                                                                               |                                          |
| urls             |                                                                                                                                                       | {string[]}                                              | -                                                                               |                                          |
| layer            | 矢量地图:vec,矢量注记:cva,矢量英文注记:eva,影像地图:img,影像注记:cia,影像英文注记:eia,地形地图:ter,地形注记:cta,全球境界:ibo                          | string                                                  | `"vec" \| "cva" \| "eva" \| "img" \| "cia" \| "eia" \| "ter" \| "cta" \| "ibo"` | "img"                                    |
| tk               |                                                                                                                                                       | string                                                  | -                                                                               | () => "cc4ded9c8fa65c654611568acc889439" |

---

title: vue2ol-source-bind

---

# vue2ol-source-bind

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-bind @ready="onReady"></vue2ol-source-bind>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 2, //级别
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

| 名称             | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        |        |
| parentLayer      | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes       | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection       |                                                                                                                                                       | string\|object                                          | -        |        |
| tileLoadFunction |                                                                                                                                                       | {import('ol/Tile').LoadFunction\|undefined}             | -        |        |
| url              |                                                                                                                                                       | string                                                  | -        |        |
| urls             |                                                                                                                                                       | {string[]}                                              | -        |        |
| tileUrlFunction  |                                                                                                                                                       | {import('ol/Tile').UrlFunction\|undefined}              | -        |        |

---

title: Vue2olSourceGaode

---

# Vue2olSourceGaode

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-gaode
        layer="satellite_map"
        @ready="onReady"
      ></vue2ol-source-gaode>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-gaode layer="satellite_annotion"></vue2ol-source-gaode>
    </vue2ol-layer-tile>
    <vue2ol-control-mouseinfo></vue2ol-control-mouseinfo>
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

| 名称       | 描述                                                                   | 类型   | 取值范围                                                  | 默认值       |
| ---------- | ---------------------------------------------------------------------- | ------ | --------------------------------------------------------- | ------------ |
| properties | 属性                                                                   | object | -                                                         |              |
| layer      | 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion | string | `"normal_map" \| "satellite_map" \| "satellite_annotion"` | "normal_map" |
| options    | ol/source/XYZ 对应的实例化参数                                         | object | -                                                         |              |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

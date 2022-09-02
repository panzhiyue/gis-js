---

title: Vue2olSourceGeoq

---

# Vue2olSourceGeoq

> 智图

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="1">
      <vue2ol-source-geoq
        layer="theme_hydro"
        @ready="onReady"
      ></vue2ol-source-geoq>
    </vue2ol-layer-tile>
    <!-- <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-geoq layer="satellite_annotion"></vue2ol-source-geoq>
    </vue2ol-layer-tile> -->
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

| 名称       | 描述                                                                                              | 类型                               | 取值范围                                                                               | 默认值       |
| ---------- | ------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- | ------------ |
| properties | 属性                                                                                              | object                             | -                                                                                      |              |
| layer      | 矢量地图:normal_map,午夜蓝:normal_purplishblue,灰色:normal_gray,暖色:normal_warm,水系:theme_hydro | string                             | `"normal_map" \| "normal_purplishblue" \| "normal_gray"\|"normal_warm"\|"theme_hydro"` | "normal_map" |
| projection | 坐标系                                                                                            | {import('ol/proj').ProjectionLike} | -                                                                                      | "EPSG:3857"  |
| options    | ol/source/XYZ 对应的实例化参数                                                                    | object                             | -                                                                                      |              |

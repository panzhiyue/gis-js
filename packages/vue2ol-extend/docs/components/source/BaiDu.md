---

title: Vue2olSourceBaidu

---

# Vue2olSourceBaidu

> 百度地图

[See](https://blog.csdn.net/u013594477/article/details/83988055)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :zIndex="2">
      <vue2ol-source-baidu layer="normal_map"></vue2ol-source-baidu>
    </vue2ol-layer-tile>
    <!-- <vue2ol-layer-tile :zIndex="3">
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile> -->
    <vue2ol-control-mouseinfo></vue2ol-control-mouseinfo>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
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

| 名称             | 描述                                                                                                                                                  | 类型                                                    | 取值范围                                                  | 默认值       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------- | ------------ |
| properties       | 属性                                                                                                                                                  | object                                                  | -                                                         |              |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -                                                         |              |
| parentLayer      | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -                                                         |              |
| attributes       | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -                                                         |              |
| projection       | 坐标系                                                                                                                                                | {import('ol/proj').ProjectionLike}                      | -                                                         | "EPSG:3857"  |
| tileLoadFunction |                                                                                                                                                       | {import('ol/Tile').LoadFunction\|undefined}             | -                                                         |              |
| tileUrlFunction  |                                                                                                                                                       | {import('ol/Tile').UrlFunction\|undefined}              | -                                                         |              |
| url              |                                                                                                                                                       | string                                                  | -                                                         |              |
| urls             |                                                                                                                                                       | {string[]}                                              | -                                                         |              |
| layer            | 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion                                                                                | string                                                  | `"normal_map" \| "satellite_map" \| "satellite_annotion"` | "normal_map" |

## Events

| 名称  | 属性                                                              | 描述           |
| ----- | ----------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/source/TileImage').default` - undefined | 组件就绪时触发 |

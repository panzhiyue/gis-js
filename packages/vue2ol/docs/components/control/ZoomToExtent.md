---

title: Vue2olControlZoomtoextent

---

# Vue2olControlZoomtoextent

> ol/control/ZoomToExtent 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_control_ZoomToExtent-ZoomToExtent.html)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-control-zoomtoextent></vue2ol-control-zoomtoextent>
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
      },
      radius: 0.1
    };
  }
};
</script>
```

:::

## Events

| 名称   | 属性                                                                 | 描述                     |
| ------ | -------------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/control/ZoomToExtent').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/control/ZoomToExtent').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/control/ZoomToExtent').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

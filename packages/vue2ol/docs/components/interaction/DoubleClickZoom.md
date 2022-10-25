---

title: Vue2olInteractionDoubleclickzoom

---

# Vue2olInteractionDoubleclickzoom

> [ol/interaction/DoubleClickZoom](https://openlayers.org/en/latest/apidoc/module-ol_interaction_DoubleClickZoom-DoubleClickZoom.html)的 vue 组件

允许用户通过双击地图进行缩放

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-interaction-doubleclickzoom
      :active="active == '1'"
    ></vue2ol-interaction-doubleclickzoom>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      mapOptions: {
        interactions: []
      },
      active: "0"
    };
  },
  mounted() {}
};
</script>
```

:::

## 双击缩小

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-interaction-doubleclickzoom
      :active="active == '1'"
      :options="options"
    ></vue2ol-interaction-doubleclickzoom>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      mapOptions: {
        interactions: []
      },
      active: "0",
      options: {
        delta: -1
      }
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称       | 描述                                                                                                                                                  | 类型    | 取值范围 | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------ |
| properties | 属性                                                                                                                                                  | object  | -        |        |
| options    | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object  | -        | {}     |
| parentMap  | 父地图                                                                                                                                                | object  | -        |        |
| active     | 是否激活                                                                                                                                              | boolean | -        |        |

## Events

| 名称   | 属性                                                                        | 描述                   |
| ------ | --------------------------------------------------------------------------- | ---------------------- |
| init   | **mapObject** `import('ol/interaction/DoubleClickZoom').default` - 地图元素 | 地图元素初始化完时触发 |
| append | **mapObject** `import('ol/interaction/DoubleClickZoom').default` - 地图元素 | 地图元素初始化完时触发 |
| ready  | **mapObject** `import('ol/interaction/DoubleClickZoom').default` - 地图元素 | 地图元素初始化完时触发 |

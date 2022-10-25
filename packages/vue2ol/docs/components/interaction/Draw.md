---

title: Vue2olInteractionDraw

---

# Vue2olInteractionDraw

> [ol/interaction/Draw](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html)的 vue 组件

绘制几何

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <div>
    <select v-model="type" style="width:200px;">
      <option value=""></option>
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          v-if="type"
          :type="type"
          :active="true"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      features: [],
      type: "Point"
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称         | 描述                                                                                                                                                  | 类型    | 取值范围 | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------ |
| properties   | 属性                                                                                                                                                  | object  | -        |        |
| options      | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object  | -        | {}     |
| parentMap    | 父地图                                                                                                                                                | object  | -        |        |
| active       | 是否激活                                                                                                                                              | boolean | -        |        |
| parentSource | 父数据源                                                                                                                                              | object  | -        |        |
| type         | 几何类型                                                                                                                                              | string  | -        |        |

## Events

| 名称   | 属性                                                             | 描述                   |
| ------ | ---------------------------------------------------------------- | ---------------------- |
| init   | **mapObject** `import('ol/interaction/Draw').default` - 地图元素 | 地图元素初始化完时触发 |
| append | **mapObject** `import('ol/interaction/Draw').default` - 地图元素 | 地图元素初始化完时触发 |
| ready  | **mapObject** `import('ol/interaction/Draw').default` - 地图元素 | 地图元素初始化完时触发 |

---

title: Vue2olInteractionDraw

---

# Vue2olInteractionDraw

---

## 基础用法

::: demo

```vue
<template>
  <div>
    <select v-model="type" style="width:200px;">
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

| 名称         | 描述     | 类型    | 取值范围 | 默认值 |
| ------------ | -------- | ------- | -------- | ------ |
| properties   | 属性     | object  | -        |        |
| parentMap    | 父地图   | object  | -        |        |
| parentSource | 父数据源 | object  | -        |        |
| active       | 是否激活 | boolean | -        |        |
| type         | 几何类型 | string  | -        |        |

## Events

| 名称  | 属性                                                             | 描述                   |
| ----- | ---------------------------------------------------------------- | ---------------------- |
| init  | **mapObject** `import('ol/interaction/Draw').default` - 地图元素 | 地图元素初始化完时触发 |
| ready | **mapObject** `import('ol/interaction/Draw').default` - 地图元素 | 地图元素初始化完时触发 |

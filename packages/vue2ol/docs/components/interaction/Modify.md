---

title: Vue2olInteractionModify

---

# Vue2olInteractionModify

> [ol/interaction/Modify](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Modify-Modify.html)的 vue 组件

用于修改特征几何的交互。要修改已添加到现有源的功能，请使用该 source 选项构建修改交互。如果要修改集合中的特征（例如，选择交互使用的集合），请使用 features 选项构造交互。必须使用 a source 或 features 选项构建交互。

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
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector>
        <vue2ol-feature :options="options"> </vue2ol-feature>
        <vue2ol-interaction-modify
          :active="active == '1'"
        ></vue2ol-interaction-modify>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
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

      active: "1",
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28]
          ]
        ]),
        name: "testFeature"
      }
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

## Events

| 名称   | 属性                                                               | 描述                   |
| ------ | ------------------------------------------------------------------ | ---------------------- |
| init   | **mapObject** `import('ol/interaction/Modify').default` - 地图元素 | 地图元素初始化完时触发 |
| append | **mapObject** `import('ol/interaction/Modify').default` - 地图元素 | 地图元素初始化完时触发 |
| ready  | **mapObject** `import('ol/interaction/Modify').default` - 地图元素 | 地图元素初始化完时触发 |

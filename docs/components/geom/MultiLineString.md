---

title: Vue2olGeomMultilinestring

---

# Vue2olGeomMultilinestring

> ol/geom/MultiLineString 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiLineString-MultiLineString.html)

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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-multilinestring :coordinates="coordinates">
          </vue2ol-geom-multilinestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
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
      coordinates: [
        [
          [120, 28],
          [120, 29]
        ],
        [
          [120, 28],
          [119, 29]
        ]
      ]
    };
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型   | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------ |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object | -        |        |
| feature     | 要素，如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/Feature').default}                                                                   | object | -        |        |
| opt_layout  | 布局<br/>`@typeName` {import('ol/geom/GeometryLayout').default}                                                                                       | object | -        |        |
| coordinates | 坐标或 LineString 几何图形。<br/>`@typeName` {Array<Array<import('ol/coordinate').Coordinate>\|import('ol/geom/LineString').default>}                 | array  | -        |        |

## Events

| 名称  | 属性                                                                  | 描述           |
| ----- | --------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/geom/MultiLineString').default` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

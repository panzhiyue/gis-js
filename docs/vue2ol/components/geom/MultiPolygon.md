---

title: vue2ol-geom-multipolygon

---

# vue2ol-geom-multipolygon

> ol/geom/MultiPolygon 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiPolygon-MultiPolygon.html)

---

## 基础用法

::: demo
vue2ol/geom/MultiPolygon/basic
:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型   | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------ |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object | -        |        |
| feature     | 要素，如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/Feature').default}                                                                   | object | -        |        |
| opt_layout  | 布局<br/>`@typeName` {import('ol/geom/GeometryLayout').default}                                                                                       | object | -        |        |
| coordinates | 坐标。<br/>`@typeName` {Array<Array<Array<import('ol/coordinate').Coordinate>>>}                                                                      | array  | -        |        |

## Events

| 名称  | 属性                                                               | 描述           |
| ----- | ------------------------------------------------------------------ | -------------- |
| ready | **mapObject** `import('ol/geom/MultiPolygon').default` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

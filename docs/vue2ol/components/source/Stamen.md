---

title: vue2ol-source-stamen

---

# vue2ol-source-stamen

> ol/source/Stamen 的 vue 组件

Since: v1.0.0

---

## 基础用法

::: demo
vue2ol/source/Stamen/basic
:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型           | 取值范围                                                                                                                                                                     | 默认值    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object         | -                                                                                                                                                                            |           |
| parentLayer      | 图层,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/layer/BaseLayer').default}                                                            | object         | -                                                                                                                                                                            |           |
| attributes       | 属性<br/>`@typeName` {import('ol/source/Source').AttributionLike\|undefined}                                                                          | object         | -                                                                                                                                                                            |           |
| projection       |                                                                                                                                                       | string\|object | -                                                                                                                                                                            |           |
| tileLoadFunction | <br/>`@typeName` {import('ol/Tile').LoadFunction\|undefined}                                                                                          | func           | -                                                                                                                                                                            |           |
| url              |                                                                                                                                                       | string         | -                                                                                                                                                                            |           |
| urls             | <br/>`@typeName` {string[]}                                                                                                                           | array          | -                                                                                                                                                                            |           |
| tileUrlFunction  | <br/>`@typeName` {import('ol/Tile').UrlFunction\|undefined}                                                                                           | func           | -                                                                                                                                                                            |           |
| layer            | 图层名称                                                                                                                                              | string         | `'terrain'\|'terrain-background'\|'terrain-labels'\|'terrain-lines'\|'toner-background'\|'toner'\|'toner-hybrid'\|'toner-labels'\|'toner-lines'\|'toner-lite'\|'watercolor'` | 'terrain' |

## Events

| 名称  | 属性                                                           | 描述           |
| ----- | -------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/source/Stamen').default` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

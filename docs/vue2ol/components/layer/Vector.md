---

title: vue2ol-layer-vector

---

# vue2ol-layer-vector

> ol/layer/Vector 的 vue 组件

Since: v1.0.0

---

## 基础用法

::: demo
vue2ol/layer/Vector/basic
:::

## geojson

::: demo
vue2ol/layer/Vector/geojson
:::

## Props

| 名称          | 描述                                                                                                                                                                                                                                                                                                                                          | 类型                       | 取值范围 | 默认值 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- | ------ |
| options       | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值                                                                                                                                                                                         | object                     | -        |        |
| parentMap     | 地图,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/Map').default}                                                                                                                                                                                                                                                                | object                     | -        |        |
| name          | 图层名称                                                                                                                                                                                                                                                                                                                                      | string                     | -        |        |
| extent        | 图层渲染的边界范围。该层将不会在此范围之外渲染。                                                                                                                                                                                                                                                                                              | import('ol/extent').Extent | -        |        |
| maxResolution | 图层可见的最大分辨率（不包括）。                                                                                                                                                                                                                                                                                                              | number                     | -        |        |
| maxZoom       | 图层可见的最大缩放（不包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                                                                                                                                                                                                                      | number                     | -        |        |
| minResolution | 图层可见的最小分辨率（包括）。                                                                                                                                                                                                                                                                                                                | number                     | -        |        |
| minZoom       | 图层可见的最小缩放（包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                                                                                                                                                                                                                        | number                     | -        |        |
| opacity       | 图层的不透明度，允许值范围从 0 到 1。                                                                                                                                                                                                                                                                                                         | number                     | -        |        |
| visible       | 图层可见性                                                                                                                                                                                                                                                                                                                                    | boolean                    | -        | true   |
| zIndex        | 图层层级，值越大显示在上层                                                                                                                                                                                                                                                                                                                    | number                     | -        |        |
| styleObj      | 特征的样式。这可以是单个样式对象、样式数组或采用特征和分辨率并返回样式数组的函数。如果设置为 null，则图层没有样式（null 样式），因此只有具有自己样式的要素才会在图层中呈现。不带参数调用 setStyle()以重置为默认样式。<br/>因为 style 是保留属性，因此改名为 styleObj<br/>`@typeName` {import('ol/style/Style').StyleLike\| null \| undefined} | object\|func               | -        |        |

## Events

| 名称  | 属性                                                                   | 描述           |
| ----- | ---------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/layer/Vector').default` - openlayer 瓦片图层 | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

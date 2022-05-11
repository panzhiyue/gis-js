---

title: vue2ol-source-baidu

---

# vue2ol-source-baidu

> 百度地图

[See](https://blog.csdn.net/u013594477/article/details/83988055)

---

## 基础用法

::: demo
vue2ol/source/BaiDu/basic
:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型           | 取值范围                                                  | 默认值       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------- | ------------ |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object         | -                                                         |              |
| parentLayer      | 图层,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/layer/BaseLayer').default}                                                            | object         | -                                                         |              |
| attributes       | 属性<br/>`@typeName` {import('ol/source/Source').AttributionLike\|undefined}                                                                          | object         | -                                                         |              |
| projection       | 坐标系<br/>`@typeName` {import('ol/proj').ProjectionLike}                                                                                             | string\|object | -                                                         | "EPSG:3857"  |
| tileLoadFunction | <br/>`@typeName` {import('ol/Tile').LoadFunction\|undefined}                                                                                          | func           | -                                                         |              |
| url              |                                                                                                                                                       | string         | -                                                         |              |
| urls             | <br/>`@typeName` {string[]}                                                                                                                           | array          | -                                                         |              |
| tileUrlFunction  | <br/>`@typeName` {import('ol/Tile').UrlFunction\|undefined}                                                                                           | func           | -                                                         |              |
| layer            | 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion                                                                                | string         | `"normal_map" \| "satellite_map" \| "satellite_annotion"` | "normal_map" |

## Events

| 名称  | 属性                                                              | 描述           |
| ----- | ----------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/source/TileImage').default` - undefined | 组件就绪时触发 |

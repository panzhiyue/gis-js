---

title: vue2ol-source-tdt

---

# vue2ol-source-tdt

---

## 基础用法

::: demo
vue2ol/source/TDT/basic
:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型           | 取值范围                                                                        | 默认值                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------- |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object         | -                                                                               |                                          |
| parentLayer      | 图层,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/layer/BaseLayer').default}                                                            | object         | -                                                                               |                                          |
| attributes       | 属性<br/>`@typeName` {import('ol/source/Source').AttributionLike\|undefined}                                                                          | object         | -                                                                               |                                          |
| projection       | 坐标系<br/>`@typeName` {import('ol/proj').ProjectionLike}                                                                                             | string\|object | -                                                                               | "EPSG:4326"                              |
| tileLoadFunction | <br/>`@typeName` {import('ol/Tile').LoadFunction\|undefined}                                                                                          | func           | -                                                                               |                                          |
| url              |                                                                                                                                                       | string         | -                                                                               |                                          |
| urls             | <br/>`@typeName` {string[]}                                                                                                                           | array          | -                                                                               |                                          |
| tileUrlFunction  | <br/>`@typeName` {import('ol/Tile').UrlFunction\|undefined}                                                                                           | func           | -                                                                               |                                          |
| layer            | 矢量地图:vec,矢量注记:cva,矢量英文注记:eva,影像地图:img,影像注记:cia,影像英文注记:eia,地形地图:ter,地形注记:cta,全球境界:ibo                          | string         | `"vec" \| "cva" \| "eva" \| "img" \| "cia" \| "eia" \| "ter" \| "cta" \| "ibo"` | "img"                                    |
| tk               |                                                                                                                                                       | string         | -                                                                               | () => "cc4ded9c8fa65c654611568acc889439" |
